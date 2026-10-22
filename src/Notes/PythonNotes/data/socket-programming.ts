import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "socket-programming",
    "title": "Socket programming",
    "summary": "Connect a small TCP client and server, then define a real message boundary.",
    "updatedOn": "2026-09-20",
    "sections": [
        {
            "id": "tcp-flow",
            "title": "TCP client and server flow",
            "bullets": [
                "The server creates a socket, binds an address, listens, and accepts a connection.",
                "The client creates a socket and connects to the server address.",
                "Both sides send bytes and receive bytes.",
                "Text must be encoded before sending and decoded after receiving."
            ]
        },
        {
            "id": "server",
            "title": "Minimal TCP server",
            "examples": [
                {
                    "code": "import socket\n\nwith socket.socket() as server:\n    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)\n    server.bind((\"localhost\", 1234))\n    server.listen()\n\n    connection, address = server.accept()\n    with connection:\n        data = connection.recv(1024)\n        connection.sendall(data)",
                    "title": "Minimal TCP server",
                    "description": [
                        "The server runs in one terminal and listens on `localhost:1234`.",
                        "It accepts one connection and echoes the bytes received by one `recv` call."
                    ],
                    "explanation": [
                        "The single `recv(1024)` call reads up to 1024 bytes.",
                        "This minimal example does not implement message framing or guarantee receipt of a complete message."
                    ]
                }
            ]
        },
        {
            "id": "client",
            "title": "Minimal TCP client",
            "examples": [
                {
                    "code": "import socket\n\nwith socket.socket() as client:\n    client.connect((\"localhost\", 1234))\n    client.sendall(\"Hello\".encode(\"utf-8\"))\n    reply = client.recv(1024).decode(\"utf-8\")\n    print(reply)  # Hello (when connected to the echo server above)",
                    "title": "Minimal TCP client",
                    "description": [
                        "The server above is already running in a separate terminal.",
                        "This client connects to `localhost:1234` and sends UTF-8 text."
                    ],
                    "explanation": [
                        "The printed text is `Hello` when the full short reply arrives in one read.",
                        "TCP may split bytes across reads. A complete protocol needs the message-boundary rules below."
                    ]
                }
            ]
        },
        {
            "id": "message-boundaries",
            "title": "Message boundaries",
            "bullets": [
                "TCP is a byte stream.",
                "One send call does not guarantee one matching recv call.",
                "A protocol must say where each message ends.",
                "Use a fixed message size when every message has that size.",
                "Use a delimiter when the delimiter cannot appear unescaped in the message.",
                "Prefix each message with its byte length for general binary or text data.",
                "Loop until every expected byte arrives.",
                "recv(1024) reads up to 1024 bytes and may return fewer.",
                "It returns b\"\" when the peer closes the connection."
            ]
        },
        {
            "id": "datatype-checker",
            "title": "What the datatype checker can validate",
            "bullets": [
                "The reference project sends user text to a server and classifies it by scanning characters.",
                "This is useful as a socket exercise, but it does not define a complete number format.",
                "Inputs such as -10, 1.2.3, or an empty string need explicit parsing rules.",
                "Use `int` or `float` conversion when the goal is to parse a number."
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
