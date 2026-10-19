import type { GoNote } from '../types';

const note = {
    notionId: 'go-gin-routing', slug: 'gin-routing', title: 'Gin: routing', updatedOn: '2026-10-19',
    blocks: [
        { id: 'gr-head', type: 'sub_header', richText: [['HEAD']] },
        { id: 'gr-head-get', type: 'bulleted_list', richText: [['HEAD', [['c']]], [' asks for the status and headers a GET request would receive, but the server sends no response body.']] },
        { id: 'gr-head-use', type: 'bulleted_list', richText: [['A client can use HEAD to check a download’s size or modification details without transferring the file content.']] },
        { id: 'gr-head-register', type: 'bulleted_list', richText: [['In Gin, '], ['router.HEAD', [['c']]], [' registers a HEAD handler. Registering a GET handler alone does not add one.']] },
        { id: 'gr-options-heading', type: 'sub_header', richText: [['OPTIONS']] },
        { id: 'gr-options-meaning', type: 'bulleted_list', richText: [['OPTIONS', [['c']]], [' asks how a server supports communication with the target path. An API can answer with its supported HTTP methods in an '], ['Allow', [['c']]], [' response header.']] },
        { id: 'gr-options-register', type: 'bulleted_list', richText: [['router.OPTIONS', [['c']]], [' registers that handler in Gin. Application code supplies the response and keeps its method list consistent with the routes.']] },
        { id: 'gr-methods-example', type: 'example', example: {
            title: 'GET, HEAD, and OPTIONS requests', language: 'go',
            description: ['The fragment extends main.go from Gin: getting started and uses its existing imports.', 'These functions are added outside main. Inside main, registerReportRoutes(router) runs before router.Run.', 'The three curl commands run in another terminal after the server starts.'],
            code: `func registerReportRoutes(router *gin.Engine) {
    router.GET("/report", getReport)
    router.HEAD("/report", headReport)
    router.OPTIONS("/report", reportOptions)
}

func getReport(c *gin.Context) {
    c.String(http.StatusOK, "ready")
}

func headReport(c *gin.Context) {
    c.Header("Content-Type", "text/plain; charset=utf-8")
    c.Header("Content-Length", "5")
    c.Status(http.StatusOK)
}

func reportOptions(c *gin.Context) {
    c.Header("Allow", "GET, HEAD, OPTIONS")
    c.Status(http.StatusNoContent)
}`,
            commands: `curl -i http://127.0.0.1:8080/report
curl -I http://127.0.0.1:8080/report
curl -i -X OPTIONS http://127.0.0.1:8080/report`,
            result: `Relevant response parts, with automatic headers omitted:

GET /report
Status: 200
Content-Type: text/plain; charset=utf-8
Content-Length: 5
Body: ready

HEAD /report
Status: 200
Content-Type: text/plain; charset=utf-8
Content-Length: 5
No body

OPTIONS /report
Status: 204
Allow: GET, HEAD, OPTIONS
No body`,
            explanation: ['The engine stores three routes with the same path and different methods. Each route names its own handler.', 'curl -I sends HEAD. curl -i includes response headers in the displayed output; it does not change the request method.', 'The HEAD Content-Length describes the five bytes GET would send. It does not mean HEAD sends those bytes.', 'The size is fixed because the response text is fixed. A changing resource needs matching metadata rather than a hardcoded size.', 'The OPTIONS handler supplies Allow explicitly. It describes this path, not every route in the application.', 'This is a plain OPTIONS response. Browser CORS preflight also needs CORS-specific headers.'],
        } },

        { id: 'gr-patterns', type: 'sub_header', richText: [['Route patterns']] },
        { id: 'gr-static', type: 'bulleted_list', richText: [['/books/search', [['c']]], [' is a static path. '], ['/books/:id', [['c']]], [' captures one segment. The static path takes precedence when both match.']] },
        { id: 'gr-wildcard', type: 'bulleted_list', richText: [['/assets/*path', [['c']]], [' captures the remaining path, including its leading slash. A catch-all parameter must be at the end of the pattern.']] },
        { id: 'gr-string', type: 'bulleted_list', richText: [['c.Param("id")', [['c']]], [' returns text. The name '], [':id', [['c']]], [' does not restrict the value to a number.']] },
        { id: 'gr-typed-parameters', type: 'bulleted_list', richText: [['Typed path and query input uses '], ['ShouldBindUri and ShouldBindQuery', [['a', '#/notes/go/gin-binding']]], ['.']] },
        { id: 'gr-conflict', type: 'bulleted_list', richText: [['Duplicate method-and-path registrations and incompatible wildcard patterns can panic during setup. Routes are registered before the server starts.']] },
        { id: 'gr-pattern-example', type: 'example', example: {
            title: 'Static, named, and catch-all paths', language: 'go',
            description: ['This is an independent extension of the getting-started main.go, using its existing imports.', 'Add this function and call registerPathExamples(router) before router.Run. Other examples registering /books/:id are not combined with it.'],
            code: `func registerPathExamples(router *gin.Engine) {
    router.GET("/books/search", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"mode": "search"})
    })
    router.GET("/books/:id", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"id": c.Param("id")})
    })
    router.GET("/assets/*path", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"path": c.Param("path")})
    })
}`,
            commands: `curl -s http://127.0.0.1:8080/books/search
curl -s http://127.0.0.1:8080/books/12
curl -s http://127.0.0.1:8080/assets/css/site.css`,
            result: `{"mode":"search"}
{"id":"12"}
{"path":"/css/site.css"}`,
            explanation: ['The static /books/search handler runs instead of treating search as an id.', 'The named parameter captures one segment. Its value remains a string, including when that string contains digits.', 'The catch-all captures several segments and keeps the leading slash.', 'These handlers demonstrate matching only. The /assets route returns the captured text; it does not read a file.'],
        } },

        { id: 'gr-query', type: 'sub_header', richText: [['Query parameters']] },
        { id: 'gr-query-read', type: 'bulleted_list', richText: [['c.Query("q")', [['c']]], [' returns an empty string for both a missing key and '], ['?q=', [['c']]], ['. '], ['c.GetQuery("q")', [['c']]], [' also reports whether the key exists.']] },
        { id: 'gr-query-default', type: 'bulleted_list', richText: [['c.DefaultQuery("limit", "20")', [['c']]], [' returns the text "20" only when the key is absent. An explicitly empty value stays empty.']] },
        { id: 'gr-query-repeat', type: 'bulleted_list', richText: [['c.QueryArray("tag")', [['c']]], [' reads repeated keys such as '], ['?tag=go&tag=web', [['c']]], ['. '], ['c.Query', [['c']]], [' reads only the first value.']] },
        { id: 'gr-query-example', type: 'example', example: {
            title: 'Missing, empty, and repeated query values', language: 'go',
            description: ['Add this function to the getting-started main.go. It uses the existing imports.', 'Before router.Run, register router.GET("/search", searchBooks).'],
            code: `func searchBooks(c *gin.Context) {
    query, present := c.GetQuery("q")
    c.JSON(http.StatusOK, gin.H{
        "q": query,
        "qPresent": present,
        "limit": c.DefaultQuery("limit", "20"),
        "firstTag": c.Query("tag"),
        "tags": c.QueryArray("tag"),
    })
}`,
            commands: `curl -s 'http://127.0.0.1:8080/search?q=gin&tag=go&tag=web'
curl -s 'http://127.0.0.1:8080/search?q=&limit='
curl -s http://127.0.0.1:8080/search`,
            result: `{"firstTag":"go","limit":"20","q":"gin","qPresent":true,"tags":["go","web"]}
{"firstTag":"","limit":"","q":"","qPresent":true,"tags":null}
{"firstTag":"","limit":"20","q":"","qPresent":false,"tags":null}`,
            explanation: ['GetQuery distinguishes the empty q value in the second request from the missing key in the third.', 'DefaultQuery returns its fallback only for an absent limit. Its result is still a string.', 'Query reads the first tag. QueryArray reads both tags in submitted order; absent tags produce a nil slice, encoded here as null.', 'These helpers read raw strings. Typed query conversion and validation belong to ShouldBindQuery.'],
        } },

        { id: 'gr-groups', type: 'sub_header', richText: [['Route groups']] },
        { id: 'gr-group-path', type: 'bulleted_list', richText: [['router.Group', [['c']]], [' creates a route group with a shared path prefix. Routes and nested groups add their paths to that prefix.']] },
        { id: 'gr-group-nested', type: 'bulleted_list', richText: [['Group '], ['middleware scope and execution', [['a', '#/notes/go/gin-middleware']]], [' are covered in the middleware notes.']] },
        { id: 'gr-group-example', type: 'example', example: {
            title: 'Nested groups and version prefixes', language: 'go',
            description: ['Add this function to the getting-started main.go. It uses the existing imports.', 'Inside main, registerBookGroups(router) runs before router.Run.'],
            code: `func registerBookGroups(router *gin.Engine) {
    api := router.Group("/api")
    v1 := api.Group("/v1")
    books := v1.Group("/books")
    books.GET("", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"version": "v1"})
    })
    books.GET("/:id", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"id": c.Param("id"), "version": "v1"})
    })

    v2 := api.Group("/v2")
    v2.GET("/books", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"version": "v2"})
    })
}`,
            commands: `curl -i http://127.0.0.1:8080/api/v1/books
curl -i http://127.0.0.1:8080/api/v1/books/7
curl -i http://127.0.0.1:8080/api/v2/books`,
            result: `Relevant response parts:
GET /api/v1/books: 200, {"version":"v1"}
GET /api/v1/books/7: 200, {"id":"7","version":"v1"}
GET /api/v2/books: 200, {"version":"v2"}`,
            explanation: ['Group creates a route group, not another engine or HTTP server. Each nested group adds its prefix.', 'An empty route path on books uses the group path /api/v1/books exactly.', 'The v2 group creates /api/v2/books. Its handler defines that version’s response separately.'],
        } },

        { id: 'gr-fallbacks', type: 'sub_header', richText: [['Route fallbacks']] },
        { id: 'gr-no-route', type: 'bulleted_list', richText: [['router.NoRoute', [['c']]], [' customizes the 404 response when no route matches.']] },
        { id: 'gr-no-method', type: 'bulleted_list', richText: [['HandleMethodNotAllowed', [['c']]], [' defaults to false. A path registered for a different method normally produces 404.']] },
        { id: 'gr-enable-method', type: 'bulleted_list', richText: [['With '], ['router.HandleMethodNotAllowed = true', [['c']]], [', Gin returns 405 when the path exists for another method. '], ['router.NoMethod', [['c']]], [' customizes that response. An Allow header identifies supported methods.']] },
        { id: 'gr-fallback-example', type: 'example', example: {
            title: 'NoRoute and NoMethod responses', language: 'go',
            description: ['Add this function to the getting-started main.go and call registerFallbacks(router) before router.Run.', 'The example adds only GET /status. Its NoRoute and NoMethod handlers configure fallback responses for the whole engine.'],
            code: `func registerFallbacks(router *gin.Engine) {
    router.HandleMethodNotAllowed = true
    router.NoRoute(func(c *gin.Context) {
        c.JSON(http.StatusNotFound, gin.H{"error": "route not found"})
    })
    router.NoMethod(func(c *gin.Context) {
        c.JSON(http.StatusMethodNotAllowed, gin.H{"error": "method not allowed"})
    })
    router.GET("/status", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"status": "ready"})
    })
}`,
            commands: `curl -i http://127.0.0.1:8080/status
curl -i http://127.0.0.1:8080/missing
curl -i -X POST http://127.0.0.1:8080/status`,
            result: `Relevant response parts:
GET /status: 200, {"status":"ready"}
GET /missing: 404, {"error":"route not found"}
POST /status: 405, Allow: GET, {"error":"method not allowed"}`,
            explanation: ['GET /missing has no matching path, so Gin calls NoRoute.', 'POST /status has a known path but no POST handler. The enabled setting makes Gin call NoMethod and supply Allow: GET.', 'With HandleMethodNotAllowed set to false and the server restarted, POST /status instead reaches NoRoute and returns its 404 response.', 'Registering NoMethod without enabling HandleMethodNotAllowed does not activate the 405 lookup.'],
        } },
        { id: 'gr-redirects', type: 'sub_header', richText: [['Redirects']] },
        { id: 'gr-slash', type: 'bulleted_list', richText: [['RedirectTrailingSlash', [['c']]], [' defaults to true. If adding or removing the final slash finds a route, Gin redirects GET with 301 and other methods with 307.']] },
        { id: 'gr-explicit-redirect', type: 'bulleted_list', richText: [['c.Redirect', [['c']]], [' sends an explicit redirect. A fixed destination avoids accepting an arbitrary external redirect target from request input.']] },
        { id: 'gr-redirect-example', type: 'example', example: {
            title: 'Automatic and explicit redirects', language: 'go',
            description: ['Add this function to the getting-started main.go and call registerRedirects(router) before router.Run.', 'The curl commands omit -L so they show the redirect response rather than following it.'],
            code: `func registerRedirects(router *gin.Engine) {
    router.RedirectTrailingSlash = true
    router.GET("/articles/", func(c *gin.Context) {
        c.String(http.StatusOK, "articles")
    })
    router.POST("/articles/", func(c *gin.Context) {
        c.Status(http.StatusNoContent)
    })
    router.GET("/old-articles", func(c *gin.Context) {
        c.Redirect(http.StatusFound, "/articles/")
    })
}`,
            commands: `curl -i http://127.0.0.1:8080/articles
curl -i -X POST http://127.0.0.1:8080/articles
curl -i http://127.0.0.1:8080/old-articles`,
            result: `Relevant response headers:
GET /articles: 301, Location: /articles/
POST /articles: 307, Location: /articles/
GET /old-articles: 302, Location: /articles/`,
            explanation: ['Only /articles/ is registered. Gin adds the missing slash by redirecting /articles.', 'The 307 response tells a client following the POST redirect to preserve its method and body.', 'With RedirectTrailingSlash false and the server restarted, the first two requests produce 404 instead.', 'The /old-articles handler explicitly chooses 302 and a fixed destination. It continues to redirect even when automatic slash redirects are disabled.'],
        } },
        { id: 'gr-sources', type: 'sub_header', richText: [['References']] },
        { id: 'gr-api', type: 'bulleted_list', richText: [['Gin Context, Engine, and RouterGroup API', [['a', 'https://pkg.go.dev/github.com/gin-gonic/gin']]]] },
        { id: 'gr-http-source', type: 'bulleted_list', richText: [['HTTP HEAD and OPTIONS semantics', [['a', 'https://www.rfc-editor.org/rfc/rfc9110.html#section-9.3.2']]]] },
        { id: 'gr-path-source', type: 'bulleted_list', richText: [['Gin path parameters', [['a', 'https://gin-gonic.com/en/docs/routing/param-in-path/']]]] },
        { id: 'gr-groups-source', type: 'bulleted_list', richText: [['Gin route groups', [['a', 'https://gin-gonic.com/en/docs/routing/grouping-routes/']]]] },
        { id: 'gr-query-source', type: 'bulleted_list', richText: [['Gin query parameters', [['a', 'https://gin-gonic.com/en/docs/routing/querystring-param/']]]] },
    ],
} as const satisfies GoNote;
export default note;
