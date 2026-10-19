import type { GoNote } from '../types';

const note = {
    notionId: "go-gin-middleware",
    slug: "gin-middleware",
    title: "Gin: middleware",
    updatedOn: "2026-10-19",
    blocks: [
        {"id": "gin-middleware-0", "type": "sub_header", "richText": [["Middleware functions"]]},
        {"id": "gin-middleware-0-0", "type": "bulleted_list", "richText": [["A Gin middleware function performs work shared by several routes, such as logging a request. It receives "], ["c *gin.Context", [["c"]]], [", just like a route handler."]]},
        {"id": "gm-signature", "type": "bulleted_list", "richText": [["gin.HandlerFunc", [["c"]]], [" is Gin’s name for the function type "], ["func(*gin.Context)", [["c"]]], [". The function receives one Gin context and returns no value."]]},
        {"id": "gin-middleware-0-1", "type": "bulleted_list", "richText": [["Gin runs middleware and the matched route handler in an ordered list called the handler chain. They receive the same context for that request."]]},
        {"id": "gm-use", "type": "bulleted_list", "richText": [["router.Use(middleware)", [["c"]]], [" registers a middleware function on the engine. Registration happens during startup. Gin calls the registered function for each request that uses it."]]},
        {"id": "gm-next-intro", "type": "bulleted_list", "richText": [["Inside middleware, "], ["c.Next()", [["c"]]], [" runs the remaining handlers. Statements after that call run when those handlers finish."]]},
        { id: "gm-first-server", type: 'example', example: {
            title: "One middleware and one route",
            language: "go",
            description: ["The program is saved as main.go in a new directory. The commands create its Go module and start the server.", "The curl command runs in another terminal."],
            code: `package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func requestLog(c *gin.Context) {
    log.Print("middleware: before")
    c.Next()
    log.Print("middleware: after")
}

func readBook(c *gin.Context) {
    log.Print("route: readBook")
    c.JSON(http.StatusOK, gin.H{"title": "Go notes"})
}

func main() {
    router := gin.New()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.Use(requestLog)
    router.GET("/book", readBook)
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "go mod init example.com/gin-middleware\ngo get github.com/gin-gonic/gin\ngo run .\n\n# In another terminal:\ncurl -i http://127.0.0.1:8080/book",
            result: "Response: status 200, body {\"title\":\"Go notes\"}\n\nApplication log messages, without timestamps:\nmiddleware: before\nroute: readBook\nmiddleware: after",
            explanation: ["gin.New creates the engine without Gin’s built-in logging and recovery middleware.", "router.Use(requestLog) passes the function itself, without calling it. Its parameter c is supplied later by Gin, when a request arrives.", "router.GET registers readBook after requestLog. The request chain is requestLog followed by readBook.", "requestLog writes the first log message. c.Next then runs readBook, which writes JSON.", "When readBook finishes, c.Next returns. requestLog writes its final message.", "The custom log messages appear in the server terminal. The JSON body is sent to curl. Gin startup messages are omitted from the displayed log."],
        } },
        {"id": "gm-factories", "type": "sub_header", "richText": [["Middleware factories"]]},
        {"id": "gin-middleware-0-2", "type": "bulleted_list", "richText": [["A middleware factory is a function that creates and returns a middleware function. Its arguments configure the returned function."]]},
        {"id": "gm-factory-timing", "type": "bulleted_list", "richText": [["The factory runs when setup code calls it. The returned middleware runs later for each request. A factory is useful when several middleware functions share the same code but use different settings."]]},
        { id: "gin-middleware-2-4", type: 'example', example: {
            title: "Nested middleware order",
            language: "go",
            description: ["These functions are added outside main in main.go from the first example.", "Inside main, router.Use(trace(\"A\"), trace(\"B\")) runs before router.GET(\"/order\", order). Both run before router.Run.", "For this example, the earlier router.Use(requestLog) registration is omitted so only the two trace functions log the request."],
            code: `func trace(name string) gin.HandlerFunc {
    return func(c *gin.Context) {
        log.Print(name + " before")
        c.Next()
        log.Print(name + " after")
    }
}

func order(c *gin.Context) {
    log.Print("route")
    c.Status(http.StatusNoContent)
}`,
            commands: "curl -i http://127.0.0.1:8080/order",
            result: "Application log messages, without timestamps:\nA before\nB before\nroute\nB after\nA after",
            explanation: ["trace(name string) receives a string setting. Its return type gin.HandlerFunc means it returns a function, not a response.", "return func(c *gin.Context) creates an unnamed function and returns it. That function remembers the name passed to trace. A function that retains a surrounding variable is called a closure.", "trace(\"A\") runs during registration and returns one middleware function. trace(\"B\") returns another. router.Use receives those two functions in that order.", "For each GET /order, the A function calls c.Next, which runs B. B calls c.Next, which runs order.", "After order returns, B finishes its after-work. A then resumes and finishes its after-work.", "The response has status 204 and no body. The five messages appear in the server terminal."],
        } },
        {"id": "gin-middleware-2", "type": "sub_header", "richText": [["Next and execution order"]]},
        {"id": "gin-middleware-2-0", "type": "bulleted_list", "richText": [["c.Next()", [["c"]]], [" is a method on the current "], ["*gin.Context", [["c"]]], [". It runs all remaining handlers in the chain, then returns to the caller."]]},
        {"id": "gin-middleware-2-2", "type": "bulleted_list", "richText": [["Returning normally from middleware also lets Gin continue to pending handlers. Omitting "], ["c.Next()", [["c"]]], [" does not block the route."]]},
        {"id": "gin-middleware-2-3", "type": "bulleted_list", "richText": [["c.Next()", [["c"]]], [" is needed when statements must run after the remaining handlers. A normal return cannot resume the function after those handlers finish."]]},
        { id: "gm-no-next", type: 'example', example: {
            title: "Middleware without Next",
            language: "go",
            description: ["These functions are added outside main in main.go.", "Inside main, registerNoNext(router) runs before router.Run. No extra imports are required."],
            code: `func beforeOnly(c *gin.Context) {
    log.Print("beforeOnly")
    return
}

func registerNoNext(router *gin.Engine) {
    router.GET("/without-next", beforeOnly, func(c *gin.Context) {
        log.Print("route")
        c.Status(http.StatusNoContent)
    })
}`,
            commands: "curl -i http://127.0.0.1:8080/without-next",
            result: "Response: status 204, no body\nRoute-specific log messages, without timestamps:\nbeforeOnly\nroute",
            explanation: ["router.GET receives the path, the beforeOnly middleware, and an unnamed final handler.", "beforeOnly returns without calling Next or Abort. Gin continues to the final handler.", "Any engine middleware registered earlier also runs. Its messages are omitted here."],
        } },
        {"id": "gin-middleware-1", "type": "sub_header", "richText": [["Middleware scope and registration"]]},
        {"id": "gin-middleware-1-0", "type": "bulleted_list", "richText": [["router.Use(...)", [["c"]]], [" adds middleware to the engine. "], ["group.Use(...)", [["c"]]], [" adds middleware to one group. A route registration can also take middleware before its final handler."]]},
        {"id": "gin-middleware-1-1", "type": "bulleted_list", "richText": [["Routes keep the handler chain assembled when they are registered. Adding middleware later does not update existing route chains."]]},
        {"id": "gin-middleware-1-2", "type": "bulleted_list", "richText": [["A subgroup inherits its parent’s middleware when the subgroup is created. Later changes to the parent do not update that subgroup."]]},
        {"id": "gin-middleware-1-3", "type": "bulleted_list", "richText": [["Route and middleware registration belongs before "], ["router.Run", [["c"]]], [". These calls configure the engine rather than a single incoming request."]]},
        { id: "gin-middleware-scopes-example", type: 'example', example: {
            title: "Global, group, and route scopes",
            language: "go",
            description: ["This function is added outside main alongside trace and order from the factory example.", "Inside main, registerScopeRoutes(router) runs before router.Run. The earlier router.Use calls are omitted so the log only contains the scopes shown here."],
            code: `func registerScopeRoutes(router *gin.Engine) {
    router.Use(trace("global"))
    router.GET("/public", order)

    api := router.Group("/api")
    api.Use(trace("group"))
    api.GET("/early", order)

    child := api.Group("/child")
    api.Use(trace("late"))
    api.GET("/late", order)
    child.GET("/status", order)
    api.GET("/local", trace("route"), order)
}`,
            commands: "curl -i http://127.0.0.1:8080/public\ncurl -i http://127.0.0.1:8080/api/early\ncurl -i http://127.0.0.1:8080/api/late\ncurl -i http://127.0.0.1:8080/api/child/status\ncurl -i http://127.0.0.1:8080/api/local",
            result: "Middleware before-messages by path:\n/public: global\n/api/early: global, group\n/api/late: global, group, late\n/api/child/status: global, group\n/api/local: global, group, late, route",
            explanation: ["Each route logs route after its before-messages. Its after-messages run in reverse order. All five responses are 204.", "The early route keeps its original chain after api.Use adds late.", "The child group also keeps the parent chain captured when api.Group created it.", "Only /api/local includes the middleware supplied directly to its route registration.", "These messages exclude any other middleware already registered on the engine.", "api := router.Group(\"/api\") creates a route group and stores it in api. api.Use registers middleware on that group.", "child := api.Group(\"/child\") creates a subgroup with the combined prefix /api/child.", "api.GET(\"/local\", trace(\"route\"), order) supplies one middleware directly between the route path and its final handler."],
        } },
        {"id": "gin-middleware-3", "type": "sub_header", "richText": [["Abort and return"]]},
        {"id": "gin-middleware-3-0", "type": "bulleted_list", "richText": [["c.Abort()", [["c"]]], [" marks pending handlers so Gin skips them. It does not write a response or end the current Go function."]]},
        {"id": "gin-middleware-3-1", "type": "bulleted_list", "richText": [["return", [["c"]]], [" ends the current function. It does not stop Gin from running pending handlers unless the chain was also aborted."]]},
        {"id": "gin-middleware-3-2", "type": "bulleted_list", "richText": [["c.AbortWithStatusJSON(status, value)", [["c"]]], [" combines aborting the chain with writing a JSON response. A following "], ["return", [["c"]]], [" stops the current function too."]]},
        {"id": "gin-middleware-3-3", "type": "bulleted_list", "richText": [["Earlier middleware waiting inside "], ["c.Next()", [["c"]]], [" still resumes after an abort. Its after-work must respect any response already sent."]]},
        { id: "gm-abort-example", type: 'example', example: {
            title: "Disabled routes with Abort and AbortWithStatusJSON",
            language: "go",
            description: ["These functions are added outside main in main.go. Inside main, registerDisabledRoutes(router) runs before router.Run.", "The disabled state is fixed for this example. It demonstrates chain control, not authentication."],
            code: `func disabled(c *gin.Context) {
    c.Abort()
    c.JSON(http.StatusServiceUnavailable, gin.H{"error": "disabled"})
    return
}

func disabledJSON(c *gin.Context) {
    c.AbortWithStatusJSON(http.StatusServiceUnavailable,
        gin.H{"error": "disabled"})
    return
}

func shouldNotRun(c *gin.Context) {
    log.Print("unexpected route execution")
    c.JSON(http.StatusOK, gin.H{"enabled": true})
}

func registerDisabledRoutes(router *gin.Engine) {
    router.GET("/disabled", disabled, shouldNotRun)
    router.GET("/disabled-json", disabledJSON, shouldNotRun)
}`,
            commands: "curl -i http://127.0.0.1:8080/disabled\ncurl -i http://127.0.0.1:8080/disabled-json",
            result: "Both responses: status 503, body {\"error\":\"disabled\"}\nNo \"unexpected route execution\" log message",
            explanation: ["disabled calls Abort, but its next statement still runs and writes JSON. return then ends disabled.", "disabledJSON performs the abort and response write in one method call. It produces the same response.", "In both routes, Gin skips shouldNotRun because the chain was aborted.", "Using only return would let shouldNotRun execute, as the earlier example without Next demonstrates.", "If trace middleware surrounds these routes, its after-messages still run when its c.Next call returns."],
        } },
        {"id": "gin-middleware-4", "type": "sub_header", "richText": [["Request values"]]},
        {"id": "gin-middleware-4-0", "type": "bulleted_list", "richText": [["c.Set(key, value)", [["c"]]], [" stores a value on the current Gin context. Later handlers for that request can read it with "], ["c.Get(key)", [["c"]]], ["."]]},
        {"id": "gm-get-results", "type": "bulleted_list", "richText": [["c.Get", [["c"]]], [" returns two results: the stored value and a boolean saying whether the key exists. The value has type "], ["any", [["c"]]], [", so its specific Go type may need checking."]]},
        {"id": "gin-middleware-4-1", "type": "bulleted_list", "richText": [["A type assertion such as "], ["value.(string)", [["c"]]], [" reads an "], ["any", [["c"]]], [" value as a particular Go type. Its two-result form also reports whether that type matches."]]},
        {"id": "gin-middleware-4-2", "type": "bulleted_list", "richText": [["The writer and reader use the same key. A prefix such as "], ["books.", [["c"]]], [" helps avoid clashes with other middleware keys."]]},
        {"id": "gin-middleware-4-3", "type": "bulleted_list", "richText": [["Values stored with "], ["c.Set", [["c"]]], [" belong to that request. They are not persistent sessions or shared application storage."]]},
        { id: "gin-middleware-4-4", type: 'example', example: {
            title: "Value from middleware to route handler",
            language: "go",
            description: ["These functions are added outside main in main.go. Inside main, registerRequestValues(router) runs before router.Run.", "The fixed catalog name keeps the example focused on Set, Get, and the type check."],
            code: `func catalogName(c *gin.Context) {
    c.Set("books.catalog", "main")
}

func catalogStatus(c *gin.Context) {
    value, exists := c.Get("books.catalog")
    if !exists {
        c.AbortWithStatusJSON(http.StatusInternalServerError,
            gin.H{"error": "catalog missing"})
        return
    }

    name, valid := value.(string)
    if !valid {
        c.AbortWithStatusJSON(http.StatusInternalServerError,
            gin.H{"error": "invalid catalog type"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"catalog": name})
}

func registerRequestValues(router *gin.Engine) {
    router.GET("/catalog", catalogName, catalogStatus)
}`,
            commands: "curl -i http://127.0.0.1:8080/catalog",
            result: "Response: status 200, body {\"catalog\":\"main\"}",
            explanation: ["catalogName stores the string \"main\" under the key \"books.catalog\". It returns without Next, so Gin continues to catalogStatus.", "value, exists := stores both Get results. !exists means the key was absent.", "name, valid := value.(string) checks the stored type. name holds the string when valid is true. The two-result form avoids a panic when the value has another type.", "The first error branch handles a missing key. The second handles a value stored under that key with the wrong type.", "c.JSON sends the checked string in the response. The next request gets its own context values."],
        } },
        {"id": "gm-builtins", "type": "sub_header", "richText": [["Built-in logging and recovery"]]},
        {"id": "gin-middleware-0-3", "type": "bulleted_list", "richText": [["gin.Logger()", [["c"]]], [" returns request-logging middleware. "], ["gin.Recovery()", [["c"]]], [" returns middleware that catches a panic in the request chain and normally writes status 500."]]},
        {"id": "gm-default", "type": "bulleted_list", "richText": [["gin.Default()", [["c"]]], [" creates an engine with both middleware already registered. "], ["gin.New()", [["c"]]], [" creates an engine without either, so "], ["router.Use(...)", [["c"]]], [" can register them explicitly."]]},
        { id: "gin-middleware-explicit-defaults", type: 'example', example: {
            title: "Explicit logging and panic recovery",
            language: "go",
            description: ["This main function replaces main in the first program. It uses the same imports.", "The two handler functions are written directly inside router.GET. No functions from the other examples are required."],
            code: `func main() {
    router := gin.New()
    router.Use(gin.Logger(), gin.Recovery())
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.GET("/ok", func(c *gin.Context) {
        c.Status(http.StatusNoContent)
    })
    router.GET("/panic", func(c *gin.Context) {
        panic("example handler failure")
    })
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "curl -i http://127.0.0.1:8080/ok\ncurl -i http://127.0.0.1:8080/panic",
            result: "/ok: status 204, no body\n/panic: status 500, no body",
            explanation: ["gin.Logger writes request log lines. gin.Recovery catches the deliberate panic and records its stack trace.", "Recovery runs in the request chain. It does not catch panics in goroutines started by the handler.", "The engine can also be created with gin.Default() instead of the gin.New and router.Use lines. Adding Logger and Recovery again would run them twice.", "gin.Logger() and gin.Recovery() are factory calls during setup. router.Use receives their returned middleware functions.", "panic stops the normal handler flow. Recovery catches this deliberate panic while the response is still unwritten, so this example returns 500.", "Recovery does not turn ordinary returned Go errors into responses. Those errors are handled explicitly in Gin: responses and errors."],
        } },
        {"id": "gin-middleware-5", "type": "sub_header", "richText": [["Related notes and references"]]},
        {"id": "gin-middleware-5-0", "type": "bulleted_list", "richText": [["Authentication and browser access", [["a", "#/notes/go/gin-auth"]]]]},
        {"id": "gin-middleware-5-1", "type": "bulleted_list", "richText": [["Response ownership and error middleware", [["a", "#/notes/go/gin-responses"]]]]},
        {"id": "gin-middleware-5-2", "type": "bulleted_list", "richText": [["Gin middleware scopes", [["a", "https://gin-gonic.com/en/docs/middleware/using-middleware/"]]]]},
        {"id": "gin-middleware-5-3", "type": "bulleted_list", "richText": [["Gin custom middleware", [["a", "https://gin-gonic.com/en/docs/middleware/custom-middleware/"]]]]},
        {"id": "gin-middleware-5-4", "type": "bulleted_list", "richText": [["Gin handler chain API", [["a", "https://pkg.go.dev/github.com/gin-gonic/gin#Context.Next"]]]]},
    ],
} as const satisfies GoNote;

export default note;
