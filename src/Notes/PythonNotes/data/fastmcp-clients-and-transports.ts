import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastmcp-clients-and-transports",
    "title": "FastMCP clients and transports",
    "summary": "Call tools, read resources, retrieve prompts, and choose in-memory, stdio, or HTTP connections.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "client",
            "title": "Calling a tool from Python",
            "bullets": [
                "FastMCP Client operations are asynchronous.",
                "Use `async with` to open and close the connection.",
                "Pass a FastMCP instance for an in-memory connection.",
                "This needs no separate server process or listening port.",
                "call_tool returns a result wrapper.",
                "Use data for the decoded Python value, or content for MCP content blocks."
            ],
            "examples": [
                {
                    "title": "Calling the word-count tool in memory",
                    "description": [
                        "Save as `client.py` beside `server.py` from the first server note.",
                        "Run `uv` run python `client.py`."
                    ],
                    "code": "import asyncio\nfrom fastmcp import Client\nfrom server import mcp\n\nasync def main():\n    async with Client(mcp) as client:\n        result = await client.call_tool(\n            \"word_count\", {\"text\": \"Python notes are clear\"}\n        )\n        print(result.data)\n\nasyncio.run(main())",
                    "result": "4",
                    "explanation": [
                        "Importing server does not run its `main` guard.",
                        "Client(mcp) handles the in-memory connection."
                    ]
                }
            ]
        },
        {
            "id": "read",
            "title": "Reading resources and retrieving prompts",
            "bullets": [
                "read_resource returns content items.",
                "Text items expose text; binary items expose blob.",
                "get_prompt returns messages.",
                "Inspect each message content rather than treating the response as a tool result."
            ],
            "examples": [
                {
                    "title": "Reading study content and building a prompt",
                    "description": [
                        "Save as `content_client.py` beside `content_server.py` from the resources note.",
                        "Run `uv` run python `content_client.py`."
                    ],
                    "code": "import asyncio\nfrom fastmcp import Client\nfrom content_server import mcp\n\nasync def main():\n    async with Client(mcp) as client:\n        content = await client.read_resource(\"study://topics/variables\")\n        print(content[0].text)\n        prompt = await client.get_prompt(\"revision\", {\"topic\": \"variables\"})\n        print(prompt.messages[0].content.text)\n\nasyncio.run(main())",
                    "result": "A variable is a name bound to an object.\nAsk me three questions about variables.",
                    "explanation": [
                        "Both functions return text in this server.",
                        "Other servers may return different content types."
                    ]
                }
            ]
        },
        {
            "id": "transports",
            "title": "Choosing how the client connects",
            "bullets": [
                "stdio connects local processes through standard input and output.",
                "The client launches the server subprocess.",
                "Keep `stdout` for protocol messages in a stdio server.",
                "Send diagnostic logs to `stderr`.",
                "HTTP connects to a separately running server.",
                "Use the server MCP URL, including its /mcp path by default."
            ],
            "examples": [
                {
                    "title": "Connecting through a local subprocess",
                    "description": [
                        "Use the same project environment and `server.py` from the first server note.",
                        "Save as `subprocess_client.py` and run `uv` run python `subprocess_client.py`."
                    ],
                    "code": "import asyncio\nfrom pathlib import Path\nfrom fastmcp import Client\n\nasync def main():\n    server_path = Path(__file__).with_name(\"server.py\")\n    async with Client(server_path) as client:\n        result = await client.call_tool(\"word_count\", {\"text\": \"Learn MCP\"})\n        print(result.data)\n\nasyncio.run(main())",
                    "result": "2",
                    "explanation": [
                        "Pass a Path for a local Python server file.",
                        "Strings are used for URLs in current FastMCP documentation."
                    ]
                },
                {
                    "title": "Connecting to a local HTTP server",
                    "description": [
                        "In the first terminal, run `uv` run fastmcp run `server.py`:mcp --transport http --host 127.0.0.1 --port 8000.",
                        "Save the Python code as `http_client.py`.",
                        "In a second terminal, run `uv` run python `http_client.py` from the same project."
                    ],
                    "code": "import asyncio\nfrom fastmcp import Client\n\nasync def main():\n    async with Client(\"http://127.0.0.1:8000/mcp\") as client:\n        result = await client.call_tool(\"word_count\", {\"text\": \"Learn MCP\"})\n        print(result.data)\n\nasyncio.run(main())",
                    "result": "2",
                    "explanation": [
                        "The CLI imports the mcp instance and chooses HTTP.",
                        "It does not execute the file `main` guard.",
                        "The example binds only to this computer.",
                        "A remotely accessible service needs authentication, authorization, and HTTPS."
                    ]
                }
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Client connections and results",
                        "href": "https://gofastmcp.com/clients/client"
                    }
                ],
                [
                    {
                        "text": "Getting prompts",
                        "href": "https://gofastmcp.com/clients/prompts"
                    }
                ],
                [
                    {
                        "text": "Running servers and transports",
                        "href": "https://gofastmcp.com/deployment/running-server"
                    }
                ]
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Reading resources",
                        "href": "https://gofastmcp.com/clients/resources"
                    }
                ]
            ]
        }
    ]
};

export default note;
