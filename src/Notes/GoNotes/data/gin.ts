import type { GoNote } from '../types';

const note = {
    notionId: 'go-gin',
    slug: 'gin',
    title: 'Gin: getting started',
    updatedOn: '2026-10-19',
    blocks: [
        { id: 'gin-role', type: 'sub_header', richText: [['Gin']] },
        { id: 'gin-definition', type: 'bulleted_list', richText: [['Gin is a Go package for building HTTP applications. It provides methods for registering routes, reading requests, and writing responses.']] },
        { id: 'gin-net-http', type: 'bulleted_list', richText: [['Gin works with Go’s '], ['net/http', [['c']]], [' package. A Gin application is compiled and run as an ordinary Go program.']] },

        { id: 'gin-dependencies', type: 'sub_header', richText: [['Setup']] },
        { id: 'gin-module', type: 'bulleted_list', richText: [['A Go module records the application’s Gin dependency in '], ['go.mod', [['c']]], ['. '], ['go.sum', [['c']]], [' records dependency checksums.']] },
        { id: 'gin-version', type: 'bulleted_list', richText: [['The selected Gin release’s '], ['go.mod', [['c']]], [' states the minimum Go version it requires.']] },
        { id: 'gin-no-generator', type: 'bulleted_list', richText: [['Gin requires no project generator or fixed directory structure. A first application can use one '], ['main.go', [['c']]], [' file.']] },

        { id: 'gin-engine-heading', type: 'sub_header', richText: [['Engine']] },
        { id: 'gin-engine', type: 'bulleted_list', richText: [['An engine is the Gin object that stores the application’s route registrations. Its Go struct type is '], ['gin.Engine', [['c']]], ['.']] },
        { id: 'gin-engine-dispatch', type: 'bulleted_list', richText: [['When a request arrives, the engine uses the request’s HTTP method and path to find the registered function that will handle it.']] },
        { id: 'gin-default', type: 'bulleted_list', richText: [['gin.Default()', [['c']]], [' creates an engine and returns '], ['*gin.Engine', [['c']]], [', a pointer to that object.']] },
        { id: 'gin-default-processing', type: 'bulleted_list', richText: [['gin.Default()', [['c']]], [' includes request logging and panic recovery.']] },
        { id: 'gin-engine-lifetime', type: 'bulleted_list', richText: [['The application normally creates its engine once during startup. The same engine handles later requests.']] },
        { id: 'gin-engine-listening', type: 'bulleted_list', richText: [['Engine creation does not start the HTTP server. Route registration and server startup are separate steps.']] },

        { id: 'gin-handler-heading', type: 'sub_header', richText: [['Handler']] },
        { id: 'gin-handler-role', type: 'bulleted_list', richText: [['A handler is the Go function that runs for a registered route. It reads request data, performs the operation, and writes the response.']] },
        { id: 'gin-handler', type: 'bulleted_list', richText: [['Gin names its handler function type '], ['gin.HandlerFunc', [['c']]], ['. Its signature is '], ['func(*gin.Context)', [['c']]], ['.']] },
        { id: 'gin-handler-return', type: 'bulleted_list', richText: [['A handler returns no Go value. It sends the HTTP response through its context parameter.']] },

        { id: 'gin-context-heading', type: 'sub_header', richText: [['Context']] },
        { id: 'gin-context', type: 'bulleted_list', richText: [['gin.Context', [['c']]], [' holds access to the current request and its response writer. Gin supplies a pointer to it when calling a handler.']] },
        { id: 'gin-context-name', type: 'bulleted_list', richText: [['The parameter is commonly named '], ['c', [['c']]], ['. Response methods such as '], ['c.JSON', [['c']]], [' write to that request’s response.']] },
        { id: 'gin-context-lifetime', type: 'bulleted_list', richText: [['A context belongs to the request being handled. It is not application-wide storage.']] },

        { id: 'gin-routes', type: 'sub_header', richText: [['Route registration']] },
        { id: 'gin-route-definition', type: 'bulleted_list', richText: [['A route registration associates an HTTP method and path with a handler on the engine.']] },
        { id: 'gin-registration', type: 'bulleted_list', richText: [['The engine’s '], ['GET', [['c']]], [' method registers a GET route. Registration stores the handler function for later requests; it does not call the function immediately.']] },

        { id: 'gin-server', type: 'sub_header', richText: [['HTTP server']] },
        { id: 'gin-run', type: 'bulleted_list', richText: [['The engine’s '], ['Run', [['c']]], [' method starts a Go HTTP server using that engine to handle requests. Its address argument selects the interface and port to listen on.']] },
        { id: 'gin-run-order', type: 'bulleted_list', richText: [['Routes are registered before '], ['Run', [['c']]], ['. The call blocks while the server is running and returns an error if the server cannot start.']] },
        {
            id: 'gin-first-server', type: 'example', example: {
                title: 'Basic server', language: 'go',
                description: ['The example requires Go compatible with the selected Gin release.', 'In an empty directory, the first two commands create a module and add Gin. The code is saved as main.go before go run . runs.', 'The curl command runs in a second terminal while the server is running.'],
                code: `package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func ping(c *gin.Context) {
    // Request handling: write the response through c.
    c.JSON(http.StatusOK, gin.H{"message": "pong"})
}

func main() {
    // Engine creation.
    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }

    // Route registration: ping is the handler function.
    router.GET("/ping", ping)

    // HTTP server startup.
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
                commands: `go mod init example.com/gin-notes
go get github.com/gin-gonic/gin
go run .

# In another terminal:
curl -s http://127.0.0.1:8080/ping`,
                result: '{"message":"pong"}',
                explanation: [
                    'Engine: router holds the *gin.Engine returned by gin.Default(). The variable is named router because this engine selects handlers for routes.',
                    'Handler: ping is the function registered for GET /ping. Passing ping without parentheses gives Gin the function to call later.',
                    'Server: router.Run listens on the local machine at port 8080. The curl command sends GET /ping to that address.',
                    'Request handling: Gin finds the route, prepares its context, and calls ping with that context as c.',
                    'Response: c.JSON sends status 200 from http.StatusOK and encodes the supplied value as JSON. gin.H is a short name for map[string]any.',
                    'SetTrustedProxies(nil) configures this direct-traffic example to ignore forwarded client IP headers.',
                    'A port conflict makes Run return an error. log.Fatal prints it and exits. Ctrl+C stops this local server.',
                ],
            },
        },

        { id: 'gin-sources', type: 'sub_header', richText: [['References']] },
        { id: 'gin-docs', type: 'bulleted_list', richText: [['Gin quickstart', [['a', 'https://gin-gonic.com/en/docs/quickstart/']]]] },
        { id: 'gin-api', type: 'bulleted_list', richText: [['Gin package API', [['a', 'https://pkg.go.dev/github.com/gin-gonic/gin']]]] },
    ],
} as const satisfies GoNote;

export default note;
