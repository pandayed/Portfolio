import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "fastmcp-resources-and-prompts",
    "title": "FastMCP resources and prompts",
    "summary": "Expose readable content, parameterized resource URIs, and reusable prompt messages.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "resource",
            "title": "Reading content by URI",
            "bullets": [
                "Register readable content with @`mcp.resource` and a unique URI.",
                "FastMCP calls the function when a client reads that URI.",
                "A template such as study://topics/{topic} passes the URI parameter to the function.",
                "Keep its name aligned with the function parameter."
            ]
        },
        {
            "id": "prompt",
            "title": "Generating reusable messages",
            "bullets": [
                "Register a prompt with @mcp.prompt.",
                "The function name identifies the prompt; arguments customize its messages.",
                "Returning a string creates a user message.",
                "The host decides how to use that message with a model."
            ],
            "examples": [
                {
                    "title": "Providing a guide, topic notes, and a revision prompt",
                    "description": [
                        "Save as `content_server.py` beside `server.py` from the previous note.",
                        "This is a separate server."
                    ],
                    "code": "from fastmcp import FastMCP\n\nmcp = FastMCP(\"Study content\")\n\n@mcp.resource(\"study://guide\")\ndef guide() -> str:\n    \"\"\"Read the study instructions.\"\"\"\n    return \"Read a topic, run its example, then explain the result.\"\n\n@mcp.resource(\"study://topics/{topic}\")\ndef topic_note(topic: str) -> str:\n    \"\"\"Read a short topic note.\"\"\"\n    notes = {\"variables\": \"A variable is a name bound to an object.\"}\n    return notes.get(topic, \"No note available.\")\n\n@mcp.prompt\ndef revision(topic: str) -> str:\n    \"\"\"Create a revision request for a topic.\"\"\"\n    return f\"Ask me three questions about {topic}.\"\n\nif __name__ == \"__main__\":\n    mcp.run()\n",
                    "explanation": [
                        "Reading study://`guide` returns the instructions.",
                        "Reading study://topics/variables supplies topic=\"variables\" to `topic_note`.",
                        "Getting `revision` with topic=\"variables\" returns a message asking three questions.",
                        "It does not produce the questions or a model answer."
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
                        "text": "Resources and templates",
                        "href": "https://gofastmcp.com/servers/resources"
                    }
                ],
                [
                    {
                        "text": "Prompt definitions",
                        "href": "https://gofastmcp.com/servers/prompts"
                    }
                ]
            ]
        }
    ]
};

export default note;
