import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'rail-fence-client-server',
    title: 'Rail fence client and server',
    summary: 'Separate the transport exercise from the rail fence transformation and its security limits.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'reference-flow',
            title: 'Reference program flow',
            bullets: [
                'The client reads a message and numeric key.',
                'It applies a rail fence transformation and sends the resulting text.',
                'The server receives the text, reverses the transformation, and sends the plain text back.',
                'The client prints the returned text.',
            ],
        },
        {
            id: 'separate-concerns',
            title: 'Separate transport from transformation',
            paragraphs: ['Keep encode, decode, send, receive, and connection handling as separate functions. Each function then has one contract and can be checked independently.'],
            examples: [{
                code: [
                    'def send_text(sock, text):',
                    '    payload = text.encode("utf-8")',
                    '    sock.sendall(len(payload).to_bytes(4, "big"))',
                    '    sock.sendall(payload)',
                ].join('\n'),
            }],
        },
        {
            id: 'validation',
            title: 'Validate the key and connection',
            bullets: [
                'Reject keys below 2 before running the rail fence logic.',
                'Handle an empty message explicitly.',
                'Treat a closed connection as a normal end condition.',
                'Close both the accepted connection and listening socket with context managers.',
            ],
        },
        {
            id: 'security-limit',
            title: 'Security limit',
            paragraphs: ['Rail fence is a classical transposition cipher. It rearranges characters but does not provide modern confidentiality, integrity, or peer authentication.'],
            exceptions: ['Do not use this transformation to protect passwords, tokens, or private network traffic. Use TLS through a maintained library for real client-server security.'],
        },
    ],
};

export default note;
