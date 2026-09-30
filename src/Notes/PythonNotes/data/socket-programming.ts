import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'socket-programming',
    title: 'Socket programming',
    summary: 'Connect a small TCP client and server, then define a real message boundary.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'tcp-flow',
            title: 'TCP client and server flow',
            bullets: [
                'The server creates a socket, binds an address, listens, and accepts a connection.',
                'The client creates a socket and connects to the server address.',
                'Both sides send bytes and receive bytes.',
                'Text must be encoded before sending and decoded after receiving.',
            ],
        },
        {
            id: 'server',
            title: 'Minimal TCP server',
            examples: [{
                code: [
                    'import socket',
                    '',
                    'with socket.socket() as server:',
                    '    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)',
                    '    server.bind(("localhost", 1234))',
                    '    server.listen()',
                    '',
                    '    connection, address = server.accept()',
                    '    with connection:',
                    '        data = connection.recv(1024)',
                    '        connection.sendall(data)',
                ].join('\n'),
            }],
        },
        {
            id: 'client',
            title: 'Minimal TCP client',
            examples: [{
                code: [
                    'import socket',
                    '',
                    'with socket.socket() as client:',
                    '    client.connect(("localhost", 1234))',
                    '    client.sendall("Hello".encode("utf-8"))',
                    '    reply = client.recv(1024).decode("utf-8")',
                    '    print(reply)  # Hello (when connected to the echo server above)',
                ].join('\n'),
            }],
        },
        {
            id: 'message-boundaries',
            title: 'Message boundaries',
            paragraphs: ['TCP is a byte stream. One send call does not guarantee one matching recv call. A protocol must say where each message ends.'],
            bullets: [
                'Use a fixed message size when every message has that size.',
                'Use a delimiter when the delimiter cannot appear unescaped in the message.',
                'Prefix each message with its byte length for general binary or text data.',
                'Loop until every expected byte arrives.',
            ],
            bullets: ['recv(1024) reads up to 1024 bytes and may return fewer. It returns b"" when the peer closes the connection.'],
        },
        {
            id: 'datatype-checker',
            title: 'What the datatype checker can validate',
            paragraphs: ['The reference project sends user text to a server and classifies it by scanning characters. This is useful as a socket exercise, but it does not define a complete number format. Inputs such as -10, 1.2.3, or an empty string need explicit parsing rules. Use int or float conversion when the goal is to parse a number.'],
        },
    ],
};

export default note;
