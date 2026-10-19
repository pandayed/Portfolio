import type { GoNote } from '../types';

const note = {
    notionId: "go-gin-responses",
    slug: "gin-responses",
    title: "Gin: responses and errors",
    updatedOn: "2026-10-19",
    blocks: [
        {"id": "gin-responses-0", "type": "sub_header", "richText": [["JSON responses"]]},
        {"id": "gin-responses-0-0", "type": "bulleted_list", "richText": [["Gin supplies "], ["c *gin.Context", [["c"]]], [" to each handler. Response methods such as "], ["c.JSON(...)", [["c"]]], [" are called on that request’s context."]]},
        {"id": "gin-responses-0-1", "type": "bulleted_list", "richText": [["c.JSON(status, value)", [["c"]]], [" converts a Go value into JSON and writes it as the response body. Its first argument sets the HTTP status. Its second argument supplies the data."]]},
        {"id": "gr-json-header", "type": "bulleted_list", "richText": [["Gin also sets the response’s "], ["Content-Type", [["c"]]], [" header to "], ["application/json; charset=utf-8", [["c"]]], [". This header identifies the body format."]]},
        { id: "gr-json-server", type: 'example', example: {
            title: "JSON response from a named handler",
            language: "go",
            description: ["The program is saved as main.go in a new directory. The commands create its Go module and start the server.", "The curl command runs in another terminal. It shows the status, response headers, and body."],
            code: `package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func readBook(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"title": "Go notes"})
}

func main() {
    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.GET("/book", readBook)
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "go mod init example.com/gin-responses\ngo get github.com/gin-gonic/gin\ngo run .\n\n# In another terminal:\ncurl -i http://127.0.0.1:8080/book",
            result: "Status: 200\nContent-Type: application/json; charset=utf-8\nBody: {\"title\":\"Go notes\"}",
            explanation: ["router.GET registers readBook as the handler. Gin calls it when GET /book arrives and supplies c for that request.", "http is the imported net/http package. http.StatusOK is its named constant for the number 200.", "gin.H is Gin’s name for map[string]any: a map with string keys and values of any Go type.", "gin.H{\"title\": \"Go notes\"} creates one map entry. \"title\" is the JSON key and \"Go notes\" is its value.", "c.JSON encodes that map and writes the response. The handler does not return the JSON value to Gin.", "The displayed result selects the relevant response details. Headers such as Date and Content-Length are omitted."],
        } },
        {"id": "gr-struct", "type": "sub_header", "richText": [["Response structs"]]},
        {"id": "gin-responses-0-3", "type": "bulleted_list", "richText": [["A named struct gives a response a declared set of fields and Go types. "], ["gin.H", [["c"]]], [" is useful for a small response without a separate type declaration."]]},
        {"id": "gr-struct-tags", "type": "bulleted_list", "richText": [["JSON encoding includes exported fields, whose names start with a capital letter. A "], ["json", [["c"]]], [" tag supplies a JSON key without changing the Go field name."]]},
        { id: "gr-struct-example", type: 'example', example: {
            title: "Struct fields and JSON keys",
            language: "go",
            description: ["This type and handler are added outside main in the program above.", "Inside main, router.GET(\"/book-details\", bookDetails) is registered before router.Run. No extra imports are required."],
            code: `type BookResponse struct {
    ID    int    \`json:"id"\`
    Title string \`json:"title"\`
}

func bookDetails(c *gin.Context) {
    book := BookResponse{ID: 1, Title: "Go notes"}
    c.JSON(http.StatusOK, book)
}`,
            commands: "curl -i http://127.0.0.1:8080/book-details",
            result: "Status: 200\nBody: {\"id\":1,\"title\":\"Go notes\"}",
            explanation: ["type BookResponse struct declares a Go type with two fields. ID has type int. Title has type string.", "The backticks enclose struct tags. json:\"title\" tells JSON encoding to use the key \"title\" for the Go field Title. The tag is metadata, not a value assigned to Title.", "BookResponse{ID: 1, Title: \"Go notes\"} creates a value and fills its fields. book := stores that value in a new variable named book.", "c.JSON receives book as its second argument. It converts ID to a JSON number and Title to a JSON string."],
        } },
        {"id": "gr-other-formats", "type": "sub_header", "richText": [["Text, bytes, and XML"]]},
        {"id": "gin-responses-0-2", "type": "bulleted_list", "richText": [["c.String(status, format, values...)", [["c"]]], [" writes text. The format can contain placeholders such as "], ["%s", [["c"]]], [", which Gin replaces with the supplied string values."]]},
        {"id": "gr-data", "type": "bulleted_list", "richText": [["c.Data(status, contentType, data)", [["c"]]], [" writes a byte slice. The caller supplies the content type because Gin does not infer the bytes’ format."]]},
        {"id": "gr-xml", "type": "bulleted_list", "richText": [["c.XML(status, value)", [["c"]]], [" converts a Go value to XML and sets "], ["application/xml; charset=utf-8", [["c"]]], [". Struct tags named "], ["xml", [["c"]]], [" control XML element names."]]},
        { id: "gin-responses-formats-example", type: 'example', example: {
            title: "Text, raw bytes, and XML routes",
            language: "go",
            description: ["These declarations are added outside main in main.go.", "Inside main, registerResponseFormats(router) runs before router.Run. The existing imports are sufficient."],
            code: `type BookXML struct {
    ID    int    \`xml:"id"\`
    Title string \`xml:"title"\`
}

func registerResponseFormats(router *gin.Engine) {
    router.GET("/format/text", func(c *gin.Context) {
        c.String(http.StatusOK, "Book %s: %s", "1", "Go notes")
    })
    router.GET("/format/data", func(c *gin.Context) {
        c.Data(http.StatusOK, "text/plain; charset=utf-8", []byte("raw bytes"))
    })
    router.GET("/format/xml", func(c *gin.Context) {
        c.XML(http.StatusOK, BookXML{ID: 1, Title: "Go notes"})
    })
}`,
            commands: "curl -i http://127.0.0.1:8080/format/text\ncurl -i http://127.0.0.1:8080/format/data\ncurl -i http://127.0.0.1:8080/format/xml",
            result: "Text body: Book 1: Go notes\nData body: raw bytes\nXML body: <BookXML><id>1</id><title>Go notes</title></BookXML>",
            explanation: ["Each route uses an unnamed function as its handler. Gin supplies c when that function runs.", "c.String replaces the two %s placeholders in order with \"1\" and \"Go notes\".", "[]byte(\"raw bytes\") converts the string into a byte slice. c.Data sends those bytes without JSON or XML encoding.", "BookXML is the Go struct name and the outer XML element name. The xml tags supply the inner element names id and title.", "All three responses use status 200. The text and data responses use text/plain; charset=utf-8.", "HTML rendering, files, and downloads are covered in Gin: files and templates."],
        } },
        {"id": "gin-responses-1", "type": "sub_header", "richText": [["Status and response headers"]]},
        {"id": "gin-responses-1-1", "type": "bulleted_list", "richText": [["c.Status(code)", [["c"]]], [" sets the response status without writing a body. "], ["c.Header(name, value)", [["c"]]], [" sets a response header."]]},
        {"id": "gin-responses-1-4", "type": "bulleted_list", "richText": [["Headers are set before a method writes the response body. A body-writing method such as "], ["c.JSON", [["c"]]], [" sends its own status argument too."]]},
        { id: "gr-status-example", type: 'example', example: {
            title: "Header and response without a body",
            language: "go",
            description: ["This handler is added outside main in main.go.", "Inside main, router.DELETE(\"/saved-book\", deleteSavedBook) is registered before router.Run."],
            code: `func deleteSavedBook(c *gin.Context) {
    c.Header("X-Operation", "remove-saved-book")
    c.Status(http.StatusNoContent)
}`,
            commands: "curl -i -X DELETE http://127.0.0.1:8080/saved-book",
            result: "Status: 204\nX-Operation: remove-saved-book\nNo response body",
            explanation: ["c.Header receives the header name first and its value second.", "http.StatusNoContent is the net/http constant for 204. The handler finishes without calling a body-writing method.", "This example only demonstrates the response. It does not delete a stored book."],
        } },
        {"id": "gin-responses-2", "type": "sub_header", "richText": [["Response commitment"]]},
        {"id": "gin-responses-2-0", "type": "bulleted_list", "richText": [["A response is committed when its status and headers have been sent. Later code cannot replace them."]]},
        {"id": "gin-responses-2-1", "type": "bulleted_list", "richText": [["c.Status", [["c"]]], [" can hold a status until a body write, an explicit header flush, or the end of request processing. "], ["c.JSON", [["c"]]], [", "], ["c.String", [["c"]]], [", and "], ["c.Data", [["c"]]], [" write the body as part of their call."]]},
        {"id": "gin-responses-2-2", "type": "bulleted_list", "richText": [["c.Writer", [["c"]]], [" is Gin’s response writer. Its "], ["Written()", [["c"]]], [" method reports whether the status and headers have been sent."]]},
        {"id": "gin-responses-2-3", "type": "bulleted_list", "richText": [["Writing an error response does not stop the Go function. "], ["return", [["c"]]], [" ends the current handler so it cannot write a success body afterward."]]},
        { id: "gr-commit-example", type: 'example', example: {
            title: "Writer state before and after JSON",
            language: "go",
            description: ["This handler is added outside main in main.go. The existing log import is used.", "Inside main, router.GET(\"/writer-state\", writerState) is registered before router.Run."],
            code: `func writerState(c *gin.Context) {
    c.Status(http.StatusAccepted)
    log.Printf("before JSON: %t", c.Writer.Written())

    c.JSON(http.StatusOK, gin.H{"saved": true})
    log.Printf("after JSON: %t", c.Writer.Written())
    return
}`,
            commands: "curl -i http://127.0.0.1:8080/writer-state",
            result: "Response status: 200\nResponse body: {\"saved\":true}\n\nServer log messages, without timestamps:\nbefore JSON: false\nafter JSON: true",
            explanation: ["c.Status initially selects 202, but sends no body and does not commit the response.", "c.JSON selects 200 before writing. It replaces the pending 202 because the response was not committed yet.", "The body write commits the response. Written then reports true.", "%t formats a Go boolean as true or false in the server log.", "The final return ends this handler. It does not undo a response already written."],
        } },
        {"id": "gin-responses-2-4", "type": "bulleted_list", "richText": [["A failure after part of a streamed response has been sent cannot become a fresh JSON error response. That failure path can log the error and stop sending data."]]},
        {"id": "gin-responses-3", "type": "sub_header", "richText": [["Application error mapping"]]},
        {"id": "gin-responses-3-0", "type": "bulleted_list", "richText": [["A Go function can return a value and an "], ["error", [["c"]]], [". The handler checks the error before writing a success response."]]},
        {"id": "gin-responses-3-1", "type": "bulleted_list", "richText": [["errors.Is(err, target)", [["c"]]], [" checks whether an error matches a known error, including through wrapping. Wrapping adds context while preserving the original error."]]},
        {"id": "gin-responses-3-2", "type": "bulleted_list", "richText": [["Gin does not automatically translate returned Go errors into responses. The handler chooses a status and public error fields. Internal error details can stay in the server log."]]},
        { id: "gin-responses-3-3", type: 'example', example: {
            title: "Missing-book error mapping",
            language: "go",
            description: ["These declarations are added outside main in main.go. Its imports also include errors and fmt.", "Inside main, router.GET(\"/books/:id\", lookupBook) is registered before router.Run. This lookup uses fixed values instead of a database."],
            code: `var errBookMissing = errors.New("book missing")

func lookupTitle(id string) (string, error) {
    if id == "1" {
        return "Go notes", nil
    }
    return "", fmt.Errorf("lookup book: %w", errBookMissing)
}

func lookupBook(c *gin.Context) {
    title, err := lookupTitle(c.Param("id"))
    if err != nil {
        if errors.Is(err, errBookMissing) {
            c.JSON(http.StatusNotFound, gin.H{"error": gin.H{
                "code": "book_not_found", "message": "Book not found",
            }})
            return
        }
        log.Printf("book lookup failed: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": gin.H{
            "code": "internal_error", "message": "Request failed",
        }})
        return
    }
    c.JSON(http.StatusOK, gin.H{"title": title})
}`,
            commands: "curl -i http://127.0.0.1:8080/books/1\ncurl -i http://127.0.0.1:8080/books/2",
            result: "Book 1: status 200, body {\"title\":\"Go notes\"}\nBook 2: status 404, body {\"error\":{\"code\":\"book_not_found\",\"message\":\"Book not found\"}}",
            explanation: ["errors.New creates errBookMissing once. The lookup returns this known error when the ID is not \"1\".", "lookupTitle returns two results: a string and an error. A nil error means the lookup succeeded.", "fmt.Errorf adds \"lookup book\" to the message. Its %w placeholder preserves errBookMissing inside the new error.", "title, err := stores both results. c.Param(\"id\") supplies the path value, such as \"2\".", "errors.Is identifies errBookMissing through the wrapper. The handler writes its chosen 404 response and returns.", "The nested gin.H puts code and message inside an \"error\" JSON object. Clients can check the code without depending on the message text.", "The fixed lookup cannot produce an unexpected error. The remaining branch demonstrates where a real service failure would be logged and mapped to 500.", "The success response runs only when err is nil. Each failure branch returns before reaching it."],
        } },
        {"id": "gin-responses-4", "type": "sub_header", "richText": [["Recorded errors and shared error handling"]]},
        {"id": "gin-responses-4-0", "type": "bulleted_list", "richText": [["c.Error(err)", [["c"]]], [" adds a non-nil Go error to "], ["c.Errors", [["c"]]], [", the list of errors recorded for this request. It does not write a response or stop the handler."]]},
        {"id": "gin-responses-4-1", "type": "bulleted_list", "richText": [["Shared error middleware is a Gin handler that surrounds the route handler. Code after its "], ["c.Next()", [["c"]]], [" call runs after the remaining handlers finish."]]},
        {"id": "gin-responses-4-2", "type": "bulleted_list", "richText": [["The route can record an error and let the middleware write the error response. If the route has already committed a response, the middleware cannot replace it."]]},
        { id: "gin-responses-4-4", type: 'example', example: {
            title: "Shared error response",
            language: "go",
            description: ["These functions are added outside main in main.go. Its imports also include errors.", "Inside main, router.Use(errorResponses()) is called before router.GET(\"/failure\", failRequest). Both run before router.Run."],
            code: `func errorResponses() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
        if len(c.Errors) == 0 {
            return
        }
        log.Print("request failed")
        if c.Writer.Written() {
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": gin.H{
            "code": "internal_error", "message": "Request failed",
        }})
    }
}

func failRequest(c *gin.Context) {
    _ = c.Error(errors.New("example service unavailable"))
    c.Abort()
}`,
            commands: "curl -i http://127.0.0.1:8080/failure",
            result: "Status: 500\nBody: {\"error\":{\"code\":\"internal_error\",\"message\":\"Request failed\"}}",
            explanation: ["errorResponses() returns a function with Gin’s handler signature. router.Use registers that returned function as middleware.", "c.Next runs the remaining handlers. For /failure, this includes failRequest.", "errors.New creates the example error. c.Error records it on this request and returns a *gin.Error. The assignment to _ discards that return value.", "c.Abort stops pending handlers in the Gin chain. It does not end the current function. Here the function ends immediately afterward.", "Execution then resumes after c.Next in the middleware. len(c.Errors) counts the recorded errors. No errors means the middleware returns without writing anything.", "c.Writer.Written() prevents the middleware from adding an error body to an already committed response.", "The middleware writes a fixed public error and logs a fixed server message. Recording an error alone would not produce this JSON.", "This policy maps every recorded error to 500. Expected application errors need explicit mappings, as in the previous example."],
        } },
        {"id": "gin-responses-5", "type": "sub_header", "richText": [["Related notes and references"]]},
        {"id": "gr-files-link", "type": "bulleted_list", "richText": [["HTML, files, and downloads", [["a", "#/notes/go/gin-files"]]]]},
        {"id": "gin-responses-5-0", "type": "bulleted_list", "richText": [["Middleware execution order", [["a", "#/notes/go/gin-middleware"]]]]},
        {"id": "gin-responses-5-1", "type": "bulleted_list", "richText": [["Gin rendering documentation", [["a", "https://gin-gonic.com/en/docs/rendering/rendering/"]]]]},
        {"id": "gin-responses-5-2", "type": "bulleted_list", "richText": [["Gin error handling middleware", [["a", "https://gin-gonic.com/en/docs/middleware/error-handling-middleware/"]]]]},
        {"id": "gin-responses-5-3", "type": "bulleted_list", "richText": [["Go errors.Is", [["a", "https://pkg.go.dev/errors#Is"]]]]},
        {"id": "gin-responses-5-4", "type": "bulleted_list", "richText": [["HTTP response writer contract", [["a", "https://pkg.go.dev/net/http#ResponseWriter"]]]]},
    ],
} as const satisfies GoNote;

export default note;
