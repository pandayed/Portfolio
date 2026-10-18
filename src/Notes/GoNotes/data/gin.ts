import type { GoNote } from '../types';

const note = {
    notionId: 'go-gin',
    slug: 'gin',
    title: 'Gin',
    updatedOn: '2026-10-18',
    blocks: [
        { id: 'gin-role', type: 'sub_header', richText: [['Gin and HTTP requests']] },
        { id: 'gin-definition', type: 'bulleted_list', richText: [['Gin is a Go framework for HTTP servers and APIs. It builds on the standard '], ['net/http', [['c']]], [' package.']] },
        { id: 'gin-route-definition', type: 'bulleted_list', richText: [['A route connects an HTTP method and URL path to a handler. A handler is the function that processes the request.']] },
        { id: 'gin-flow', type: 'bulleted_list', richText: [['Request → route matching → middleware → handler → response. Middleware adds shared request processing.']] },
        { id: 'gin-boundary', type: 'bulleted_list', richText: [['Gin handles the HTTP layer. Database access and application rules remain ordinary Go code.']] },

        { id: 'gin-start', type: 'sub_header', richText: [['Router and request context']] },
        { id: 'gin-engine', type: 'bulleted_list', richText: [['gin.Engine', [['c']]], [' holds routes and middleware. '], ['gin.Default()', [['c']]], [' creates an engine with request logging and panic recovery.']] },
        { id: 'gin-new', type: 'bulleted_list', richText: [['gin.New()', [['c']]], [' creates an engine without those middleware. Recovery handles panics in the request chain; it does not replace ordinary error handling.']] },
        { id: 'gin-context', type: 'bulleted_list', richText: [['Each handler receives '], ['*gin.Context', [['c']]], ['. It provides request data, response methods, and values shared within that request.']] },
        { id: 'gin-net-context', type: 'bulleted_list', richText: [['c.Request.Context()', [['c']]], [' is the standard '], ['context.Context', [['c']]], [' for cancellation and deadlines. Pass it to database and outgoing HTTP operations.']] },
        {
            id: 'gin-first-server', type: 'example', example: {
                title: 'A local server returns JSON', language: 'go',
                description: ['The example requires Go compatible with the selected Gin release.', 'In a new directory, run go mod init example.com/gin-notes, then go get github.com/gin-gonic/gin.', 'Save the code as main.go. Run go run ., then run the curl command in another terminal.'],
                code: `package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }

    router.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "pong"})
    })

    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
                commands: 'curl -s http://127.0.0.1:8080/ping',
                result: '{"message":"pong"}',
                explanation: ['The server listens only on the local machine at port 8080.', 'GET /ping selects the handler. c.JSON sends status 200 and a JSON response.', 'gin.H is a short name for map[string]any.', 'This server has no reverse proxy. SetTrustedProxies(nil) disables trust in forwarded client IP headers.'],
            },
        },

        { id: 'gin-input', type: 'sub_header', richText: [['Routes and request values']] },
        { id: 'gin-methods', type: 'bulleted_list', richText: [['GET usually reads a resource. POST usually creates one. PUT replaces it, PATCH changes part of it, and DELETE removes it. The handler implements these meanings.']] },
        { id: 'gin-param', type: 'bulleted_list', richText: [['A path such as '], ['/books/:id', [['c']]], [' captures one path segment. '], ['c.Param("id")', [['c']]], [' reads it as a string.']] },
        { id: 'gin-query', type: 'bulleted_list', richText: [['For '], ['/books?limit=10', [['c']]], [', '], ['c.Query("limit")', [['c']]], [' reads the query value. '], ['c.DefaultQuery', [['c']]], [' supplies a fallback only when the key is absent.']] },
        { id: 'gin-convert', type: 'bulleted_list', richText: [['Path and query values need conversion and validation before use as numbers or application identifiers.']] },
        { id: 'gin-forms', type: 'bulleted_list', richText: [['c.PostForm', [['c']]], [' reads a form field from the request body. A form field, query value, and path parameter are separate input sources.']] },
        { id: 'gin-groups', type: 'bulleted_list', richText: [['router.Group("/api")', [['c']]], [' gives related routes a shared prefix. Registering '], ['GET("/books", handler)', [['c']]], [' on that group creates '], ['GET /api/books', [['c']]], ['.']] },

        { id: 'gin-binding', type: 'sub_header', richText: [['JSON '], ['binding', [['c']]], [' and validation']] },
        { id: 'gin-bind-definition', type: 'bulleted_list', richText: [['Binding decodes request data into a Go value. '], ['ShouldBindJSON', [['c']]], [' reads JSON into a struct and returns decoding or validation errors.']] },
        { id: 'gin-tags', type: 'bulleted_list', richText: [['A '], ['json', [['c']]], [' tag maps a JSON key to an exported struct field. A '], ['binding', [['c']]], [' tag declares validation rules.']] },
        { id: 'gin-required', type: 'bulleted_list', richText: [['The '], ['required', [['c']]], [' rule rejects a field’s zero value. A pointer field can distinguish an omitted value from an explicitly supplied zero or false.']] },
        { id: 'gin-bind-control', type: 'bulleted_list', richText: [['ShouldBindJSON', [['c']]], [' leaves the error response to the handler. '], ['BindJSON', [['c']]], [' automatically aborts with status 400 on a '], ['binding', [['c']]], [' error.']] },
        {
            id: 'gin-create', type: 'example', example: {
                title: 'A handler validates a book title', language: 'go',
                description: ['Add this function to main.go from the local server example.', 'Inside main, before router.Run, register router.POST("/books", createBook). Restart the server.'],
                code: `func createBook(c *gin.Context) {
    var input struct {
        Title string \`json:"title" binding:"required,max=200"\`
    }

    c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 4096)
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid book input"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"title": input.Title})
}`,
                commands: `curl -s http://127.0.0.1:8080/books \
  -H 'Content-Type: application/json' \
  -d '{"title":"Go notes"}'`,
                result: '{"title":"Go notes"}',
                explanation: ['The body limit is 4096 bytes. Invalid JSON, an empty title, or a title longer than 200 characters returns status 400.', 'return ends the handler after the error response.', 'A body such as {} returns {"error":"invalid book input"}. Internal error details stay out of the response.', 'The handler validates and echoes the title. It does not save a book, so it returns 200 rather than claiming creation with 201.'],
            },
        },

        { id: 'gin-responses', type: 'sub_header', richText: [['Responses and application errors']] },
        { id: 'gin-response-methods', type: 'bulleted_list', richText: [['c.JSON', [['c']]], [' serializes a value as JSON. '], ['c.String', [['c']]], [' writes text. '], ['c.Status', [['c']]], [' sets the HTTP status without a body.']] },
        { id: 'gin-statuses', type: 'bulleted_list', richText: [['Common statuses: 200 success, 201 created, 204 success without a body, 400 invalid input, 404 missing resource, and 500 unexpected server failure.']] },
        { id: 'gin-errors', type: 'bulleted_list', richText: [['A failed database call is an application error. The handler or shared error middleware maps it to an HTTP response.']] },
        { id: 'gin-error-record', type: 'bulleted_list', richText: [['c.Error(err)', [['c']]], [' records an error on the request context. It does not send a response by itself.']] },
        { id: 'gin-single-response', type: 'bulleted_list', richText: [['After writing a final error response, the handler returns. Otherwise later code can still run and attempt another response.']] },

        { id: 'gin-middleware', type: 'sub_header', richText: [['Middleware and execution order']] },
        { id: 'gin-middleware-scope', type: 'bulleted_list', richText: [['Middleware has the same function signature as a handler. It can log a request, check access, or attach request values.']] },
        { id: 'gin-use', type: 'bulleted_list', richText: [['router.Use', [['c']]], [' attaches global middleware. '], ['Group.Use', [['c']]], [' limits it to a group. A route can also receive middleware before its final handler. Register middleware before the routes that need it.']] },
        { id: 'gin-next', type: 'bulleted_list', richText: [['c.Next()', [['c']]], [' runs the remaining handlers before continuing with the code after that call. With middleware A then B, execution can be A before → B before → handler → B after → A after.']] },
        { id: 'gin-abort', type: 'bulleted_list', richText: [['c.Abort()', [['c']]], [' prevents pending handlers from running. It does not end the current function. An access check can send '], ['c.AbortWithStatusJSON(403, ...)', [['c']]], [' and then return.']] },
        { id: 'gin-values', type: 'bulleted_list', richText: [['c.Set', [['c']]], [' stores a request value. '], ['c.Get', [['c']]], [' reads it and reports whether it exists. Middleware can pass a verified user identity to later handlers this way.']] },

        { id: 'gin-lifecycle', type: 'sub_header', richText: [['Request lifetime and server configuration']] },
        { id: 'gin-shared-state', type: 'bulleted_list', richText: [['Handler', [['c']]], ['s for different requests can run concurrently. Shared maps and other mutable application state still need synchronization.']] },
        { id: 'gin-context-reuse', type: 'bulleted_list', richText: [['Gin reuses request contexts. A goroutine that outlives a handler must not retain the original '], ['*gin.Context', [['c']]], ['.']] },
        { id: 'gin-copy', type: 'bulleted_list', richText: [['c.Copy()', [['c']]], [' provides a read-only copy for background work. The copy must not write a response, and it does not extend the request deadline.']] },
        { id: 'gin-timeouts', type: 'bulleted_list', richText: [['An '], ['http.Server', [['c']]], [' can use the Gin engine as its '], ['Handler', [['c']]], ['. It provides explicit read, write, and idle timeout settings.']] },
        { id: 'gin-shutdown', type: 'bulleted_list', richText: [['http.Server.Shutdown', [['c']]], [' stops accepting new connections and waits for active requests within a supplied context deadline.']] },
        { id: 'gin-proxies', type: 'bulleted_list', richText: [['Behind a reverse proxy, '], ['SetTrustedProxies', [['c']]], [' lists the proxy IP addresses or networks allowed to supply client IP headers. Trusting every proxy allows clients to forge those headers.']] },
        { id: 'gin-sources', type: 'sub_header', richText: [['References']] },
        { id: 'gin-docs', type: 'bulleted_list', richText: [['Gin documentation', [['a', 'https://gin-gonic.com/en/docs/']]]] },
        { id: 'gin-api', type: 'bulleted_list', richText: [['Gin package API', [['a', 'https://pkg.go.dev/github.com/gin-gonic/gin']]]] },
        { id: 'gin-proxy-source', type: 'bulleted_list', richText: [['Trusted proxy configuration', [['a', 'https://gin-gonic.com/en/docs/server-config/trusted-proxies/']]]] },
    ],
} as const satisfies GoNote;

export default note;
