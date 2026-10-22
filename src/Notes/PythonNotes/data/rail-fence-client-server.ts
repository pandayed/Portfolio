import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "rail-fence-client-server",
    "title": "Rail fence client and server",
    "summary": "Separate the transport exercise from the rail fence transformation and its security limits.",
    "updatedOn": "2026-09-20",
    "sections": [
        {
            "id": "reference-flow",
            "title": "Reference program flow",
            "bullets": [
                "The client reads a message and numeric key.",
                "It applies a rail fence transformation and sends the resulting text.",
                "The server receives the text, reverses the transformation, and sends the plain text back.",
                "The client prints the returned text."
            ]
        },
        {
            "id": "separate-concerns",
            "title": "Separating transport from transformation",
            "examples": [
                {
                    "code": "def send_text(sock, text):\n    payload = text.encode(\"utf-8\")\n    sock.sendall(len(payload).to_bytes(4, \"big\"))\n    sock.sendall(payload)",
                    "title": "Sending a length-prefixed message",
                    "description": [
                        "The helper receives a connected socket as `sock` and a string as `text`."
                    ],
                    "explanation": [
                        "The helper encodes the text as UTF-8 bytes.",
                        "It sends the byte count as a four-byte big-endian integer before the message.",
                        "The receiver must read the four-byte prefix, then loop until that many message bytes arrive."
                    ]
                }
            ],
            "bullets": [
                "Keep encode, decode, send, receive, and connection handling as separate functions.",
                "Each function then has one contract and can be checked independently."
            ]
        },
        {
            "id": "validation",
            "title": "Validating the key and connection",
            "bullets": [
                "Reject keys below 2 before running the rail fence logic.",
                "Handle an empty message explicitly.",
                "Treat a closed connection as a normal end condition.",
                "Close both the accepted connection and listening socket with context managers."
            ]
        },
        {
            "id": "security-limit",
            "title": "Security limit",
            "bullets": [
                "Rail fence is a classical transposition cipher.",
                "It rearranges characters but does not provide modern confidentiality, integrity, or peer authentication."
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
