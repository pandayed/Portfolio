import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'tools-and-libraries',
    title: 'Python tools and libraries at a glance',
    summary: 'One-line descriptions of common Python tools, libraries, and frameworks.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'uv',
            title: 'uv',
            paragraphs: ['uv is a tool for managing Python versions, virtual environments, and project dependencies.'],
        },
        {
            id: 'pip',
            title: 'pip',
            paragraphs: ['pip is a tool for installing Python packages.'],
        },
        {
            id: 'venv',
            title: 'venv',
            paragraphs: ['venv is a built-in Python module for creating virtual environments.'],
        },
        {
            id: 'ruff',
            title: 'Ruff',
            paragraphs: ['Ruff is a tool for checking and formatting Python code.'],
        },
        {
            id: 'pytest',
            title: 'pytest',
            paragraphs: ['pytest is a framework for writing and running Python tests.'],
        },
        {
            id: 'mypy',
            title: 'mypy',
            paragraphs: ['mypy is a tool for checking Python type hints without running the code.'],
        },
        {
            id: 'pydantic',
            title: 'Pydantic',
            paragraphs: ['Pydantic is a library for validating data using Python type hints.'],
        },
        {
            id: 'fastapi',
            title: 'FastAPI',
            paragraphs: ['FastAPI is a web framework for building HTTP APIs with Python.'],
        },
        {
            id: 'django',
            title: 'Django',
            paragraphs: ['Django is a web framework for building web applications.'],
        },
        {
            id: 'flask',
            title: 'Flask',
            paragraphs: ['Flask is a lightweight web framework for building web applications.'],
        },
        {
            id: 'requests',
            title: 'Requests',
            paragraphs: ['Requests is a library for sending HTTP requests from Python.'],
        },
        {
            id: 'httpx',
            title: 'HTTPX',
            paragraphs: ['HTTPX is an HTTP client library that supports regular and async requests.'],
        },
        {
            id: 'sqlalchemy',
            title: 'SQLAlchemy',
            paragraphs: ['SQLAlchemy is a database toolkit for writing SQL and mapping Python classes to tables.'],
        },
        {
            id: 'alembic',
            title: 'Alembic',
            paragraphs: ['Alembic is a tool for managing database schema changes with SQLAlchemy.'],
        },
        {
            id: 'numpy',
            title: 'NumPy',
            paragraphs: ['NumPy is a library for numerical work with multidimensional arrays.'],
        },
        {
            id: 'pandas',
            title: 'pandas',
            paragraphs: ['pandas is a library for working with tabular data.'],
        },
        {
            id: 'celery',
            title: 'Celery',
            paragraphs: ['Celery is a task queue for running background jobs with workers.'],
        },
    ],
};

export default note;
