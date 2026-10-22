import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'http',
    title: 'A basic HTTP server',
    summary: 'Receive requests and return JSON with the built-in HTTP module.',
    scope: 'nodejs',
    updatedOn: '2026-10-21',
    pointwise: true,
    inlineCode: true,
    exampleLayout: 'grouped',
    references: [
        { title: 'Node.js HTTP', href: 'https://nodejs.org/api/http.html' },
    ],
    sections: [
        {
            id: 'requests-responses',
            title: 'Requests and responses',
            bullets: [
                'An HTTP server receives a request and sends a response.',
                '`createServer` from `node:http` registers a function that runs for each request.',
                'The request object provides the method and URL. The response object sends the result.',
                'A route matches a request method and path to a response.',
                'A status code describes the result. `200` means success and `404` means not found.',
                'The `Content-Type` header describes the response body’s format.',
                '`response.end()` finishes the response. It can also send the body.',
            ],
            examples: [{
                title: 'Serve two local JSON routes',
                description: [
                    'The example requires Node.js. The request commands also require `curl`.',
                    'The code belongs in `server.mjs`.',
                    'The server uses `127.0.0.1`, the loopback address that accepts connections from this computer.',
                    'Port `3001` must be available.',
                ],
                language: 'javascript',
                runnable: false,
                code: `import { createServer } from 'node:http';

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (request.method === 'GET' && request.url === '/') {
        response.statusCode = 200;
        response.end(JSON.stringify({ message: 'Hello' }));
        return;
    }

    if (request.method === 'GET' && request.url === '/health') {
        response.statusCode = 200;
        response.end(JSON.stringify({ status: 'ok' }));
        return;
    }

    response.statusCode = 404;
    response.end(JSON.stringify({ error: 'Not found' }));
});

server.on('error', (error) => {
    console.error(error.message);
    process.exitCode = 1;
});

server.listen(3001, '127.0.0.1', () => {
    console.log('Listening at http://127.0.0.1:3001');
});`,
                commands: `# First terminal: start the server.
node server.mjs

# Second terminal: send each request separately.
curl http://127.0.0.1:3001/
curl http://127.0.0.1:3001/health
curl http://127.0.0.1:3001/missing

# In the first terminal, Ctrl+C stops the server.`,
                result: `First terminal:
Listening at http://127.0.0.1:3001

Response bodies from the three requests:
{"message":"Hello"}
{"status":"ok"}
{"error":"Not found"}`,
                explanation: [
                    'Each `return` prevents another response after a route matches.',
                    '`JSON.stringify` converts an object to JSON text.',
                    'The first two requests receive `200`. The last receives `404`.',
                    '`curl -i http://127.0.0.1:3001/health` also shows the status and response headers.',
                    'An occupied port triggers the server’s `error` event instead of the listening message.',
                    'This example matches exact URL strings. A query string changes the match.',
                    'The example handles local requests only. It does not handle request bodies, authentication, or deployment.',
                ],
            }],
        },
    ],
};

export default note;
