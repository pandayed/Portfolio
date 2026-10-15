import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastmcp-basics",
    "title": "MCP and FastMCP",
    "summary": "Understand hosts, clients, servers, and the three capabilities before writing a FastMCP server.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "mcp",
            "title": "MCP connects an application to capabilities",
            "bullets": [
                "Model Context Protocol (MCP) defines how applications discover and use capabilities supplied by servers.",
                "The host is the AI application. A client is the component that communicates with a server. A server exposes operations, data, or prompt templates.",
                "A language model can propose a tool call. The host applies its policies and sends the request through the client. The server executes its code and returns a result.",
                "An MCP server can run locally or over a network. It does not need to contain a language model."
            ]
        },
        {
            "id": "components",
            "title": "Tools, resources, and prompts",
            "bullets": [
                "A tool performs an operation with arguments. Examples include calculating a total or searching records. Tools can read data or change it.",
                "A resource supplies readable content identified by a URI, such as an application guide. A resource template uses parameters in that URI.",
                "A prompt produces reusable messages for a task. Retrieving a prompt does not itself ask a model to generate an answer."
            ]
        },
        {
            "id": "framework",
            "title": "FastMCP supplies the Python implementation",
            "bullets": [
                "FastMCP is a Python framework for writing MCP servers and clients. It handles protocol messages, validation, and transport around your functions.",
                "These notes use the standalone fastmcp package and imports from fastmcp. Older examples may use mcp.server.fastmcp from the MCP Python SDK; use documentation for the package you installed.",
                "FastAPI exposes HTTP routes for API callers. FastMCP exposes MCP capabilities for MCP clients. An HTTP transport does not turn an MCP tool into an ordinary REST endpoint.",
                [
                    "Before starting, read ",
                    {
                        "text": "Functions",
                        "href": "#/notes/python/functions-and-scope"
                    },
                    ", ",
                    {
                        "text": "Scope, closures, and decorators",
                        "href": "#/notes/python/scope-and-closures"
                    },
                    ", and ",
                    {
                        "text": "Threads, processes, and asyncio",
                        "href": "#/notes/python/concurrency-and-asyncio"
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
                    {
                        "text": "MCP architecture",
                        "href": "https://modelcontextprotocol.io/docs/learn/architecture"
                    }
                ],
                [
                    {
                        "text": "FastMCP introduction",
                        "href": "https://gofastmcp.com/getting-started/welcome"
                    }
                ]
            ]
        }
    ]
};

export default note;
