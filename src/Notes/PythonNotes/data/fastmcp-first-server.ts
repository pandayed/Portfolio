import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastmcp-first-server",
    "title": "A first FastMCP tool server",
    "summary": "Install FastMCP, expose a typed function, and understand how a client calls it.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "install",
            "title": "Installing in a project",
            "bullets": [
                "FastMCP requires Python 3.10 or newer.",
                "Use a project environment to keep dependencies separate.",
                "The installation commands use `uv`, as in the FastAPI notes."
            ],
            "examples": [
                {
                    "title": "Creating a FastMCP project",
                    "description": [
                        "Run these commands in a terminal with `uv` installed."
                    ],
                    "code": "uv init fastmcp-notes --bare\ncd fastmcp-notes\nuv add fastmcp\nuv run fastmcp version",
                    "explanation": [
                        "`uv` records the dependency and resolves a version in `uv`.lock.",
                        "The version command shows the installed versions; exact output depends on your environment."
                    ],
                    "language": "text"
                }
            ]
        },
        {
            "id": "tool",
            "title": "Registering a typed function",
            "bullets": [
                "Create a FastMCP instance, then register a function with @mcp.tool.",
                "Parameter annotations describe inputs.",
                "A return annotation describes the result.",
                "The docstring explains the operation to callers.",
                "Registration makes a function discoverable.",
                "A client must call the tool before its body runs."
            ],
            "examples": [
                {
                    "title": "Exposing a word-count tool",
                    "description": [
                        "Save this as `server.py` in the project directory.",
                        "Run `uv` run python `server.py` to start it with the default stdio transport."
                    ],
                    "code": "from fastmcp import FastMCP\n\nmcp = FastMCP(\"Study tools\")\n\n@mcp.tool\ndef word_count(text: str) -> int:\n    \"\"\"Count whitespace-separated words in text.\"\"\"\n    return len(text.split())\n\nif __name__ == \"__main__\":\n    mcp.run()\n",
                    "explanation": [
                        "The tool name is `word_count`.",
                        "A client supplies an argument object such as {\"text\": \"Python notes are clear\"} and receives the integer 4.",
                        "The main guard starts the server when the file runs as a script.",
                        "Importing it exposes mcp without starting that blocking run call.",
                        "A stdio server waits for MCP messages.",
                        "Starting the process does not call `word_count` or display a normal interactive prompt."
                    ]
                }
            ]
        },
        {
            "id": "validation",
            "title": "Validating inputs and keeping errors useful",
            "bullets": [
                "FastMCP validates incoming tool arguments against the generated schema.",
                "Type annotations alone do not validate ordinary direct Python function calls.",
                "Business rules still belong in your code.",
                "A valid string can be empty; an integer can be outside your allowed range.",
                "Keep tool descriptions specific.",
                "State units, limits, and whether an operation changes data.",
                "The server runs with its process permissions.",
                "Limit file, network, and data access to what each tool needs.",
                "Keep credentials outside source code."
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "FastMCP installation",
                        "href": "https://gofastmcp.com/getting-started/installation"
                    }
                ],
                [
                    {
                        "text": "FastMCP quickstart",
                        "href": "https://gofastmcp.com/getting-started/quickstart"
                    }
                ],
                [
                    {
                        "text": "Tool definitions and validation",
                        "href": "https://gofastmcp.com/servers/tools"
                    }
                ]
            ]
        }
    ]
};

export default note;
