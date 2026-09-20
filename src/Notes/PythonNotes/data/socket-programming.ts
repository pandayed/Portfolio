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
            title: 'Small server',
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
            title: 'Small client',
            examples: [{
                code: [
                    'import socket',
                    '',
                    'with socket.socket() as client:',
                    '    client.connect(("localhost", 1234))',
                    '    client.sendall("Hello".encode("utf-8"))',
                    '    reply = client.recv(1024).decode("utf-8")',
                    '    print(reply)',
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
            exceptions: ['recv(1024) means receive up to 1024 bytes. It can return fewer bytes. It returns b"" when the peer closes the connection.'],
        },
        {
            id: 'datatype-checker',
            title: 'About the datatype-checker example',
            paragraphs: ['The reference project sends user text to a server and classifies it by scanning characters. This is useful as a socket exercise, but it is not a reliable parser.'],
            exceptions: ['Inputs such as -10, 1.2.3, an empty string, or mixed letters and punctuation need explicit grammar rules. Use int or float conversion inside narrow try blocks when numeric parsing is the actual goal.'],
        },
    ],
};

export default note;
