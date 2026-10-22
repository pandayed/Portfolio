import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastapi-backend-service",
    "title": "Building a database-backed FastAPI service",
    "summary": "Connect FastAPI to PostgreSQL, manage a session per request, and add schema migrations.",
    "updatedOn": "2026-10-01",
    "sections": [
        {
            "id": "pieces",
            "title": "What each part does",
            "bullets": [
                "FastAPI handles the HTTP request.",
                "Pydantic validates its data.",
                "SQLAlchemy runs database work through psycopg, the PostgreSQL driver.",
                "Alembic changes the database schema when the model changes.",
                [
                    "This example uses the synchronous SQLAlchemy API. A regular `def` path operation can use it without mixing synchronous database calls into an `async def` operation. Read ",
                    {
                        "text": "Async and blocking operations",
                        "href": "#/notes/python/fastapi-async-operations"
                    },
                    " before choosing an async database setup."
                ],
                "pydantic-settings reads and validates the database URL from the environment.",
                "One SQLAlchemy Engine owns the connection pool for this application process.",
                "A FastAPI dependency gives each request its own SQLAlchemy Session and closes it afterward.",
                "The path operation commits a successful write.",
                "Alembic applies table changes separately."
            ]
        },
        {
            "id": "install",
            "title": "Installing packages and setting the database URL",
            "examples": [
                {
                    "title": "Installing the packages",
                    "language": "text",
                    "code": "uv add sqlalchemy \"psycopg[binary]\" alembic pydantic-settings\nexport DATABASE_URL=\"postgresql+psycopg://app_user:local_password@localhost:5432/tasks_db\"",
                    "result": "Replace the example credentials and database name before running the application. The PostgreSQL server and database must already exist.",
                    "description": [
                        [
                            "Start with the project from ",
                            {
                                "text": "A first FastAPI application",
                                "href": "#/notes/python/fastapi-first-app"
                            },
                            ". Have a PostgreSQL database and a user that can create tables in it. Replace the values in the URL with that database user, password, and database name."
                        ]
                    ]
                }
            ],
            "bullets": [
                "Keep the real password out of source files and version control.",
                "The URL explicitly names the psycopg driver, so it does not depend on SQLAlchemy choosing a default PostgreSQL driver."
            ]
        },
        {
            "id": "connection",
            "title": "Creating the engine, model, and session dependency",
            "examples": [
                {
                    "title": "database.py",
                    "code": "from pydantic_settings import BaseSettings\nfrom sqlalchemy import String, create_engine\nfrom sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker\n\n\nclass Settings(BaseSettings):\n    database_url: str\n\n\nsettings = Settings()\nengine = create_engine(settings.database_url)\nSessionLocal = sessionmaker(bind=engine)\n\n\nclass Base(DeclarativeBase):\n    pass\n\n\nclass Task(Base):\n    __tablename__ = \"tasks\"\n\n    id: Mapped[int] = mapped_column(primary_key=True)\n    title: Mapped[str] = mapped_column(String(200))\n\n\ndef get_session():\n    with SessionLocal() as session:\n        yield session",
                    "result": "Importing database.py defines the model and engine. The first database operation obtains a connection from the engine pool.",
                    "explanation": [
                        "The dependency closes the Session after the request; it does not commit a write automatically."
                    ],
                    "description": [
                        "The file is saved as `database.py` in the same project."
                    ]
                }
            ],
            "bullets": [
                "The Engine manages access to database connections.",
                "The Session tracks queries and changes for one request."
            ]
        },
        {
            "id": "routes",
            "title": "Creating and reading a task",
            "examples": [
                {
                    "title": "main.py",
                    "code": "from typing import Annotated\n\nfrom fastapi import Depends, FastAPI, HTTPException\nfrom pydantic import BaseModel, ConfigDict, Field\nfrom sqlalchemy.orm import Session\n\nfrom database import Task, get_session\n\n\nclass TaskCreate(BaseModel):\n    title: str = Field(min_length=1, max_length=200)\n\n\nclass TaskRead(BaseModel):\n    model_config = ConfigDict(from_attributes=True)\n    id: int\n    title: str\n\n\napp = FastAPI()\nSessionDep = Annotated[Session, Depends(get_session)]\n\n\n@app.post(\"/tasks\", response_model=TaskRead, status_code=201)\ndef create_task(data: TaskCreate, session: SessionDep):\n    task = Task(title=data.title)\n    session.add(task)\n    session.commit()\n    session.refresh(task)\n    return task\n\n\n@app.get(\"/tasks/{task_id}\", response_model=TaskRead)\ndef read_task(task_id: int, session: SessionDep):\n    task = session.get(Task, task_id)\n    if task is None:\n        raise HTTPException(status_code=404, detail=\"Task not found\")\n    return task",
                    "result": "POST /tasks stores a task and returns HTTP 201. GET /tasks/{task_id} returns it or HTTP 404 when the ID does not exist.",
                    "explanation": [
                        "`TaskCreate` describes incoming JSON.",
                        "`TaskRead` describes the response and reads fields from the SQLAlchemy object.",
                        "FastAPI supplies a Session through `Depends` for each request."
                    ],
                    "description": [
                        "The file is saved as `main.py` in the same project."
                    ]
                }
            ]
        },
        {
            "id": "migrations",
            "title": "Creating the table with Alembic",
            "examples": [
                {
                    "title": "Initializing Alembic",
                    "language": "text",
                    "code": "uv run alembic init migrations",
                    "result": "Alembic creates alembic.ini and migrations/env.py.",
                    "description": [
                        "The command runs from the FastAPI project directory after the database model is defined."
                    ]
                },
                {
                    "title": "Changes in migrations/env.py",
                    "code": "from database import Base, settings\n\nconfig.set_main_option(\n    \"sqlalchemy.url\", settings.database_url.replace(\"%\", \"%%\")\n)\ntarget_metadata = Base.metadata",
                    "description": [
                        "The code replaces `target_metadata = None` in the generated `migrations/env.py`, after Alembic defines `config`.",
                        "The rest of the generated file stays in place."
                    ],
                    "explanation": [
                        "Escaping percent signs lets Alembic read a URL that contains an encoded password."
                    ]
                },
                {
                    "title": "Generating, reviewing, and applying the migration",
                    "language": "text",
                    "code": "uv run alembic revision --autogenerate -m \"create tasks\"\n# Read the generated upgrade() and downgrade() before applying it.\nuv run alembic upgrade head\nuv run fastapi dev main.py",
                    "result": "The migration creates the tasks table. The FastAPI development server then starts.",
                    "description": [
                        "The database connection settings and model metadata are configured before generating the migration.",
                        "The generated `upgrade()` and `downgrade()` are reviewed before `uv run alembic upgrade head` applies changes."
                    ]
                }
            ],
            "bullets": [
                "Alembic compares SQLAlchemy model metadata with the database and generates a migration draft."
            ]
        },
        {
            "id": "try-it",
            "title": "Sending a request and reading the result",
            "examples": [
                {
                    "language": "text",
                    "code": "curl -X POST http://127.0.0.1:8000/tasks \\\n  -H \"content-type: application/json\" \\\n  -d '{\"title\":\"Write notes\"}'\n# Example response: {\"id\":1,\"title\":\"Write notes\"}\n\ncurl http://127.0.0.1:8000/tasks/1\n# Example response: {\"id\":1,\"title\":\"Write notes\"}",
                    "result": "The POST writes a row. The GET reads that row using the ID returned by POST.",
                    "title": "Sending a request and reading the result",
                    "description": [
                        "Run these commands in another terminal while the server is running."
                    ],
                    "explanation": [
                        "The first generated ID may differ if the table already contains tasks.",
                        "Use the ID returned by POST in the GET URL."
                    ]
                }
            ]
        },
        {
            "id": "other-pieces",
            "title": "Adding other libraries when the service needs them",
            "bullets": [
                [
                    "Login managed by this service: FastAPI security helpers with ",
                    {
                        "text": "PyJWT and pwdlib",
                        "href": "https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/"
                    },
                    " for signed tokens and password hashes."
                ],
                [
                    "Calls to another HTTP API: ",
                    {
                        "text": "HTTPX",
                        "href": "https://www.python-httpx.org/"
                    },
                    " for outgoing requests."
                ],
                [
                    "Small work after a response: FastAPI ",
                    {
                        "text": "BackgroundTasks",
                        "href": "https://fastapi.tiangolo.com/tutorial/background-tasks/"
                    },
                    ". For jobs that need separate workers, consider Celery with a broker such as Redis."
                ],
                [
                    "Service logs: Python’s built-in ",
                    {
                        "text": "logging module",
                        "href": "https://docs.python.org/3/library/logging.html"
                    },
                    ". API checks: `pytest` and FastAPI’s ",
                    {
                        "text": "TestClient",
                        "href": "https://fastapi.tiangolo.com/tutorial/testing/"
                    },
                    "."
                ]
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    "For more detail on the database layers, see the ",
                    {
                        "text": "SQLAlchemy Engine",
                        "href": "https://docs.sqlalchemy.org/en/20/core/engines.html"
                    },
                    ", ",
                    {
                        "text": "Session",
                        "href": "https://docs.sqlalchemy.org/en/20/orm/session_basics.html"
                    },
                    ", ",
                    {
                        "text": "psycopg driver",
                        "href": "https://www.psycopg.org/psycopg3/docs/basic/install.html"
                    },
                    ", and ",
                    {
                        "text": "Alembic migration",
                        "href": "https://alembic.sqlalchemy.org/en/latest/autogenerate.html"
                    },
                    " documentation."
                ]
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
