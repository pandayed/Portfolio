import type { GoNote } from '../types';

const note = {
    notionId: "go-gin-context",
    slug: "gin-context",
    title: "Gin: context and concurrency",
    updatedOn: "2026-10-19",
    blocks: [
        {"id": "gin-context-0", "type": "sub_header", "richText": [["Gin context and Go context"]]},
        {"id": "gc-gin", "type": "bulleted_list", "richText": [["Gin passes "], ["c *gin.Context", [["c"]]], [" to a handler. This Gin context provides request data and response methods such as "], ["c.JSON", [["c"]]], ["."]]},
        {"id": "gin-context-0-1", "type": "bulleted_list", "richText": [["c.Request", [["c"]]], [" is the incoming "], ["*http.Request", [["c"]]], [". Calling its "], ["Context()", [["c"]]], [" method returns a standard Go "], ["context.Context", [["c"]]], ["."]]},
        {"id": "gc-standard", "type": "bulleted_list", "richText": [["The standard context carries cancellation signals and deadlines to work performed for the request. It does not provide Gin response methods."]]},
        {"id": "gin-context-0-2", "type": "bulleted_list", "richText": [["A service function can accept "], ["ctx context.Context", [["c"]]], [" as its first parameter. The handler supplies "], ["c.Request.Context()", [["c"]]], [", so that function does not need to import Gin."]]},
        {"id": "gin-context-0-3", "type": "bulleted_list", "richText": [["Using "], ["*gin.Context", [["c"]]], [" directly as a standard context can depend on Gin’s fallback configuration. Passing "], ["c.Request.Context()", [["c"]]], [" explicitly uses the HTTP request’s lifetime."]]},
        {"id": "gin-context-1", "type": "sub_header", "richText": [["Request cancellation"]]},
        {"id": "gin-context-1-0", "type": "bulleted_list", "richText": [["For an incoming server request, Go cancels its context when the client connection closes, an HTTP/2 request is canceled, or the HTTP handler returns."]]},
        {"id": "gin-context-1-1", "type": "bulleted_list", "richText": [["Cancellation is a signal. It does not forcibly stop a function or goroutine. The work must check the context or call an API that checks it."]]},
        {"id": "gc-done", "type": "bulleted_list", "richText": [["ctx.Done()", [["c"]]], [" returns a channel that closes when the context is canceled. A channel lets Go code wait for a signal or pass values between goroutines."]]},
        {"id": "gc-err", "type": "bulleted_list", "richText": [["ctx.Err()", [["c"]]], [" returns nil while the context is active. After cancellation, it reports "], ["context.Canceled", [["c"]]], [" or "], ["context.DeadlineExceeded", [["c"]]], ["."]]},
        { id: "gc-cancel-server", type: 'example', example: {
            title: "Request cancellation in a service function",
            language: "go",
            description: ["This program is saved as main.go in a new directory. The commands create its module and start the server.", "The first curl waits for the simulated work. The second curl disconnects after one second. It runs in another terminal."],
            code: `package main

import (
    "context"
    "log"
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
)

func loadTitle(ctx context.Context) (string, error) {
    timer := time.NewTimer(3 * time.Second)
    defer timer.Stop()

    select {
    case <-timer.C:
        return "Go notes", nil
    case <-ctx.Done():
        return "", ctx.Err()
    }
}

func bookTitle(c *gin.Context) {
    ctx := c.Request.Context()
    title, err := loadTitle(ctx)
    if err != nil {
        log.Printf("load stopped: %v", err)
        return
    }
    c.JSON(http.StatusOK, gin.H{"title": title})
}

func main() {
    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.GET("/title", bookTitle)
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "go mod init example.com/gin-context\ngo get github.com/gin-gonic/gin\ngo run .\n\n# In another terminal:\ncurl -i http://127.0.0.1:8080/title\ncurl --max-time 1 http://127.0.0.1:8080/title",
            result: "First request, after about three seconds:\nStatus: 200\nBody: {\"title\":\"Go notes\"}\n\nSecond request:\ncurl reports a timeout.\nServer log message, without timestamp: load stopped: context canceled",
            explanation: ["ctx := stores the standard request context in a variable. loadTitle receives that same context.", "loadTitle returns two values: a title string and an error. Its simulated delay stands in for context-aware service work.", "time.NewTimer creates a timer. timer.C is its channel. defer timer.Stop() schedules timer cleanup when loadTitle returns.", "select waits until one of its channel operations is ready. <-timer.C waits for the timer. <-ctx.Done() waits for cancellation.", "If the timer finishes first, loadTitle returns the title and a nil error. The handler writes JSON.", "If curl disconnects first, Go cancels the context. loadTitle returns ctx.Err(), and the handler logs it without trying to send a response to the disconnected client.", "The service call is synchronous here. Watching a context does not require starting another goroutine."],
        } },
        {"id": "gin-context-1-3", "type": "bulleted_list", "richText": [["Request work passes the same context, or a context derived from it, to further calls. "], ["context.Background()", [["c"]]], [" creates a context without request cancellation, so substituting it breaks that connection."]]},
        {"id": "gin-context-2", "type": "sub_header", "richText": [["Timeouts and deadlines"]]},
        {"id": "gin-context-2-0", "type": "bulleted_list", "richText": [["A timeout is a duration allowed for work. A deadline is the time at which that duration ends."]]},
        {"id": "gin-context-timeout-parent", "type": "bulleted_list", "richText": [["context.WithTimeout(parent, duration)", [["c"]]], [" returns a child context and a cancel function. The child is canceled when its timeout expires, its parent is canceled, or cancel is called. An earlier parent deadline still applies."]]},
        {"id": "gin-context-2-1", "type": "bulleted_list", "richText": [["defer cancel()", [["c"]]], [" schedules the cancel function when the current function returns. This releases timeout resources on success and error paths too."]]},
        { id: "gc-timeout-example", type: 'example', example: {
            title: "Service call with a shorter timeout",
            language: "go",
            description: ["This handler is added outside main in main.go. The imports also include errors.", "Inside main, router.GET(\"/title-timeout\", titleWithTimeout) is registered before router.Run. It uses loadTitle from the first example."],
            code: `func titleWithTimeout(c *gin.Context) {
    parent := c.Request.Context()
    ctx, cancel := context.WithTimeout(parent, time.Second)
    defer cancel()

    title, err := loadTitle(ctx)
    if err != nil {
        if parent.Err() != nil {
            return
        }
        if errors.Is(err, context.DeadlineExceeded) {
            c.JSON(http.StatusGatewayTimeout,
                gin.H{"error": "title lookup timed out"})
            return
        }
        c.JSON(http.StatusInternalServerError,
            gin.H{"error": "title lookup failed"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"title": title})
}`,
            commands: "curl -i http://127.0.0.1:8080/title-timeout",
            result: "After about one second: status 504, body {\"error\":\"title lookup timed out\"}",
            explanation: ["ctx, cancel := stores both results from WithTimeout. time.Second is a Go duration representing one second.", "loadTitle needs three seconds, but watches the child context. It stops when that context reaches its one-second deadline.", "errors.Is checks for the deadline error. The handler selects the error response explicitly. WithTimeout does not write an HTTP response.", "parent.Err() distinguishes an ended incoming request from the shorter child timeout. The handler avoids a new response when the parent is already canceled.", "defer cancel() runs on every return path. Calling cancel again after expiry is safe.", "A timeout cannot interrupt work that ignores the context. It does not automatically terminate the handler or a worker."],
        } },
        {"id": "gc-outgoing", "type": "sub_header", "richText": [["Outgoing HTTP requests"]]},
        {"id": "gin-context-2-2", "type": "bulleted_list", "richText": [["http.NewRequestWithContext(ctx, method, url, body)", [["c"]]], [" creates an outgoing request tied to ctx. "], ["client.Do(req)", [["c"]]], [" sends it. A successful call returns a response whose body must be closed."]]},
        { id: "gin-context-2-3", type: 'example', example: {
            title: "Downstream timeout and cancellation",
            language: "go",
            description: ["These declarations are added outside main in main.go. Its imports also include errors.", "Inside main, registerDependencyRoutes(router) runs before router.Run.", "The extra /slow-health route simulates a slow dependency on the same local server. The outgoing address is fixed in the program."],
            code: `var dependencyClient = &http.Client{
    Timeout: 2 * time.Second,
    CheckRedirect: func(req *http.Request, via []*http.Request) error {
        return http.ErrUseLastResponse
    },
}

func dependencyStatus(c *gin.Context) {
    ctx, cancel := context.WithTimeout(c.Request.Context(), time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, http.MethodGet,
        "http://127.0.0.1:8080/slow-health", nil)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "request failed"})
        return
    }
    response, err := dependencyClient.Do(req)
    if err != nil {
        if c.Request.Context().Err() != nil {
            return
        }
        status := http.StatusBadGateway
        if errors.Is(err, context.DeadlineExceeded) {
            status = http.StatusGatewayTimeout
        }
        c.JSON(status, gin.H{"error": "dependency unavailable"})
        return
    }
    defer response.Body.Close()
    if response.StatusCode != http.StatusOK {
        c.JSON(http.StatusBadGateway, gin.H{"error": "dependency unavailable"})
        return
    }
    c.Status(http.StatusNoContent)
}

func slowHealth(c *gin.Context) {
    _, err := loadTitle(c.Request.Context())
    if err != nil {
        return
    }
    c.Status(http.StatusOK)
}

func registerDependencyRoutes(router *gin.Engine) {
    router.GET("/slow-health", slowHealth)
    router.GET("/dependency", dependencyStatus)
}`,
            commands: "curl -i http://127.0.0.1:8080/dependency",
            explanation: ["dependencyClient is a shared *http.Client. &http.Client{...} creates the client and takes its address. Go HTTP clients are safe for concurrent use.", "The client’s Timeout is two seconds. This request’s child context expires sooner, after one second.", "http.NewRequestWithContext creates a GET request. Its nil body means there is no outgoing request body.", "dependencyClient.Do sends the request. Cancellation covers waiting for a connection, sending the request, and reading its response.", "The local /slow-health handler waits three seconds through loadTitle, so the outgoing request reaches its one-second deadline first.", "errors.Is identifies the deadline error. A connection or other dependency failure maps to 502. An ended incoming request returns without a new error response.", "CheckRedirect is a function stored in the client configuration. Returning http.ErrUseLastResponse prevents the client from following redirects.", "On success, defer response.Body.Close() closes the body when the handler returns. This code checks the status without forwarding the body.", "Changing the simulated delay in loadTitle to less than one second lets /slow-health return 200. The dependency handler then returns 204."],
            result: "After about one second: status 504, body {\"error\":\"dependency unavailable\"}",
        } },
        {"id": "gc-goroutines", "type": "sub_header", "richText": [["Goroutines and channels"]]},
        {"id": "gc-go", "type": "bulleted_list", "richText": [["A goroutine runs a function concurrently with other work. The "], ["go", [["c"]]], [" keyword starts it. Starting a goroutine does not make the caller wait for it to finish."]]},
        {"id": "gin-context-4-2", "type": "bulleted_list", "richText": [["A worker can send a result through a channel. The request handler receives that result and writes the response, so workers do not write through the same Gin context concurrently."]]},
        { id: "gc-worker-example", type: 'example', example: {
            title: "Worker result and request cancellation",
            language: "go",
            description: ["These declarations are added outside main in main.go. They use loadTitle and the existing imports.", "Inside main, router.GET(\"/worker-title\", workerTitle) is registered before router.Run."],
            code: `type titleResult struct {
    title string
    err   error
}

func workerTitle(c *gin.Context) {
    ctx := c.Request.Context()
    results := make(chan titleResult, 1)

    go func() {
        title, err := loadTitle(ctx)
        results <- titleResult{title: title, err: err}
    }()

    select {
    case result := <-results:
        if result.err != nil {
            return
        }
        c.JSON(http.StatusOK, gin.H{"title": result.title})
    case <-ctx.Done():
        return
    }
}`,
            commands: "curl -i http://127.0.0.1:8080/worker-title\ncurl --max-time 1 http://127.0.0.1:8080/worker-title",
            result: "First request, after about three seconds: status 200, body {\"title\":\"Go notes\"}\nSecond request: curl reports a timeout.",
            explanation: ["titleResult groups the worker’s string and error into one Go value. Lowercase fields work here because this value is used directly by Go code, not encoded as JSON.", "make(chan titleResult, 1) creates a channel with space to hold one titleResult. results <- value sends a value. <-results receives it.", "go func() { ... }() defines and starts an unnamed function. It uses the standard ctx, not the Gin context c.", "select waits for a worker result or cancellation. Only the request handler calls c.JSON.", "The one-item channel buffer lets the worker send its final result even if cancellation made the handler return first.", "loadTitle watches ctx, so the worker can finish after cancellation. Cancellation signals the worker to stop, but is not itself a wait for its completion.", "This one service call does not need concurrency. The earlier synchronous version is simpler. This example isolates the worker and channel syntax."],
        } },
        {"id": "gin-context-3", "type": "sub_header", "richText": [["Gin context reuse and Copy"]]},
        {"id": "gin-context-3-0", "type": "bulleted_list", "richText": [["Gin reuses its context objects for later requests. Keeping the original "], ["*gin.Context", [["c"]]], [" after the request can expose another request’s data."]]},
        {"id": "gin-context-3-1", "type": "bulleted_list", "richText": [["c.Copy()", [["c"]]], [" returns a copied Gin context intended for reading outside the handler. The copy must not write responses or continue the handler chain."]]},
        {"id": "gin-context-3-2", "type": "bulleted_list", "richText": [["Copying the Gin context does not copy the response connection or extend the standard request context’s lifetime."]]},
        {"id": "gin-context-3-3", "type": "bulleted_list", "richText": [["The copy can still contain pointers, maps, or slices referring to shared data. Copy does not make those underlying objects independent."]]},
        {"id": "gin-context-3-4", "type": "bulleted_list", "richText": [["When a worker needs only a string, copying that string into a local variable avoids retaining the whole Gin context."]]},
        { id: "gin-context-copy-example", type: 'example', example: {
            title: "Copied context in a worker",
            language: "go",
            description: ["This handler is added outside main in main.go. It uses the existing imports.", "Inside main, router.GET(\"/snapshot\", contextSnapshot) is registered before router.Run. Channel and goroutine syntax follows the preceding example."],
            code: `func contextSnapshot(c *gin.Context) {
    c.Set("snapshot.label", "Go notes")
    copied := c.Copy()
    results := make(chan string, 1)

    go func() {
        value, exists := copied.Get("snapshot.label")
        label, valid := value.(string)
        if !exists || !valid {
            results <- ""
            return
        }
        results <- label
    }()

    select {
    case label := <-results:
        if label == "" {
            c.JSON(http.StatusInternalServerError,
                gin.H{"error": "snapshot unavailable"})
            return
        }
        c.JSON(http.StatusOK, gin.H{"label": label})
    case <-c.Request.Context().Done():
        return
    }
}`,
            commands: "curl -s http://127.0.0.1:8080/snapshot",
            result: "{\"label\":\"Go notes\"}",
            explanation: ["c.Set stores a string for this request. copied := c.Copy() stores the copied Gin context in a new variable.", "The worker calls copied.Get, not c.Get. It reads a copied request value without retaining the original Gin context.", "value, exists receives the Get results. label, valid := value.(string) checks whether the stored value is a string without panicking on another type.", "The stored string is immutable. No mutable map or pointer is shared through this value.", "make(chan string, 1) leaves room for the worker’s single result even if the handler returns on cancellation.", "Only the original request handler calls c.JSON. The worker never writes through the copied context.", "This worker performs one bounded lookup. Copy does not keep the incoming request alive."],
        } },
        {"id": "gin-context-4", "type": "sub_header", "richText": [["Shared application state"]]},
        {"id": "gin-context-4-0", "type": "bulleted_list", "richText": [["Go’s HTTP server can run different request handlers at the same time. A variable outside the handler can therefore be shared by several requests."]]},
        {"id": "gin-context-4-1", "type": "bulleted_list", "richText": [["A mutex lets one goroutine at a time access protected data. "], ["c.Set", [["c"]]], [" protects neither an application counter nor objects stored through it."]]},
        { id: "gc-mutex-example", type: 'example', example: {
            title: "Counter shared by concurrent requests",
            language: "go",
            description: ["These declarations are added outside main in main.go. Its imports also include sync.", "Inside main, router.GET(\"/visits\", countVisit) is registered before router.Run."],
            code: `var visitsMu sync.Mutex
var visits int

func countVisit(c *gin.Context) {
    visitsMu.Lock()
    visits++
    current := visits
    visitsMu.Unlock()

    c.JSON(http.StatusOK, gin.H{"visits": current})
}`,
            commands: "curl -s http://127.0.0.1:8080/visits\ncurl -s http://127.0.0.1:8080/visits",
            result: "On a fresh server with no other /visits requests:\n{\"visits\":1}\n{\"visits\":2}",
            explanation: ["visits and visitsMu are package variables. All calls to countVisit use the same counter and mutex.", "Lock waits for exclusive access. visits++ adds one. current := visits copies the count while it is still protected.", "Unlock releases the mutex before JSON encoding and network writes. Those writes do not need access to the shared counter.", "All reads and writes of visits must use this same mutex. Locking only some accesses would still allow a data race.", "Concurrent responses may arrive in a different order from their counter values. Restarting this server resets the in-memory counter."],
        } },
        {"id": "gin-context-5", "type": "sub_header", "richText": [["Work beyond the request"]]},
        {"id": "gin-context-5-1", "type": "bulleted_list", "richText": [["A job that must continue after the response needs a lifetime owned by the application, with its own cancellation and shutdown policy. Neither the original Gin context nor its copy extends the incoming request’s lifetime."]]},
        {"id": "gc-background", "type": "bulleted_list", "richText": [["Starting a goroutine with "], ["context.Background()", [["c"]]], [" alone provides no shutdown signal, deadline, or wait for completion. Background job design belongs with application lifecycle management."]]},
        {"id": "gin-context-5-4", "type": "bulleted_list", "richText": [["Application shutdown and timeouts", [["a", "#/notes/go/gin-server"]]]]},
        {"id": "gin-context-6", "type": "sub_header", "richText": [["References"]]},
        {"id": "gin-context-6-0", "type": "bulleted_list", "richText": [["Go request context lifetime", [["a", "https://pkg.go.dev/net/http#Request.Context"]]]]},
        {"id": "gin-context-6-1", "type": "bulleted_list", "richText": [["Go context cancellation and deadlines", [["a", "https://pkg.go.dev/context"]]]]},
        {"id": "gin-context-6-2", "type": "bulleted_list", "richText": [["Gin context copy contract", [["a", "https://pkg.go.dev/github.com/gin-gonic/gin#Context.Copy"]]]]},
    ],
} as const satisfies GoNote;

export default note;
