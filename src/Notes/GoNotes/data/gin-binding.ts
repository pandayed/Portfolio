import type { GoNote } from '../types';

const note = {
    notionId: 'go-gin-binding',
    slug: 'gin-binding',
    title: 'Gin: binding and validation',
    updatedOn: '2026-10-19',
    blocks: [
        {"id": "gb-role", "type": "sub_header", "richText": [["Binding and validation"]]},
        {"id": "gb-definition", "type": "bulleted_list", "richText": [["Binding reads request data and fills a Go variable. Validation checks rules on the values after they have been read."]]},
        {"id": "gb-context", "type": "bulleted_list", "richText": [["Gin passes a "], ["*gin.Context", [["c"]]], [" parameter to each handler. The examples name it "], ["c", [["c"]]], [". Binding methods are called on this value, such as "], ["c.ShouldBindJSON(&input)", [["c"]]], ["."]]},
        {"id": "gb-tags", "type": "sub_header", "richText": [["Request struct"]]},
        {"id": "gb-struct-definition", "type": "bulleted_list", "richText": [["A struct is a Go value with named fields. A request struct describes the fields the handler expects to read."]]},
        {"id": "gb-tags-definition", "type": "bulleted_list", "richText": [["A struct tag is text written after a field’s type, inside backticks. Packages such as Gin and Go’s JSON decoder read this metadata."]]},
        { id: "gb-struct-example", type: 'example', example: {
            title: "Field name, type, and JSON tag",
            language: "go",
            description: ["These declarations are used in the JSON server below. They are not a separate runnable program.", "The request field is a book title represented as text."],
            code: `type BookInput struct {
    Title string \`json:"title"\`
}

var input BookInput`,
            explanation: ["type BookInput struct defines a Go type named BookInput. It has one field.", "Title is the Go field name. string is the field’s Go type.", "The backticks enclose the struct tag. Inside it, json is the tag key and \"title\" is its value.", "json:\"title\" tells JSON decoding to read the JSON key title into the Go field Title. It is not another field or the title’s actual text.", "var input BookInput creates a variable of this type. Before binding, input.Title is the empty string.", "The Go field is still accessed as input.Title. The tag does not rename it to input.title.", "Title starts with an uppercase letter, so it is exported. The JSON decoder can fill exported fields."],
        } },
        {"id": "gb-json-method", "type": "sub_header", "richText": [["ShouldBindJSON"]]},
        {"id": "gb-json-receiver", "type": "bulleted_list", "richText": [["c.ShouldBindJSON", [["c"]]], [" is a method on "], ["*gin.Context", [["c"]]], [". It reads JSON from this request’s body and decodes it into the destination passed to the method."]]},
        {"id": "gb-json-address", "type": "bulleted_list", "richText": [["In "], ["c.ShouldBindJSON(&input)", [["c"]]], [", "], ["input", [["c"]]], [" is the variable to fill. "], ["&input", [["c"]]], [" passes its memory address so the method can change that variable."]]},
        {"id": "gb-json-return", "type": "bulleted_list", "richText": [["The call returns an "], ["error", [["c"]]], [" value. "], ["nil", [["c"]]], [" means decoding and any configured validation passed. A non-nil error means the handler must handle the failure."]]},
        { id: "gb-json-server", type: 'example', example: {
            title: "JSON request into BookInput",
            language: "go",
            description: ["The example requires Go compatible with the selected Gin release.", "In an empty directory, the first two commands create a module and add Gin. The code is saved as main.go before go run . runs.", "The curl commands run in another terminal while the server is running."],
            code: `package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

type BookInput struct {
    Title string \`json:"title"\`
}

func readBookInput(c *gin.Context) {
    var input BookInput
    c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 4096)

    err := c.ShouldBindJSON(&input)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid book input"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"title": input.Title})
}

func main() {
    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.POST("/book-input", readBookInput)
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "go mod init example.com/gin-binding-notes\ngo get github.com/gin-gonic/gin\ngo run .\n\n# In another terminal:\ncurl -s http://127.0.0.1:8080/book-input -H 'Content-Type: application/json' -d '{\"title\":\"Gin notes\"}'\ncurl -s http://127.0.0.1:8080/book-input -H 'Content-Type: application/json' -d '{\"title\":42}' ",
            result: "{\"title\":\"Gin notes\"}\n{\"error\":\"invalid book input\"}",
            explanation: ["POST /book-input calls readBookInput. Gin supplies this request’s context as c.", "The first body contains the JSON key title with value \"Gin notes\". The json:\"title\" tag connects that key to the Go field Title.", "c.ShouldBindJSON(&input) fills input.Title with \"Gin notes\". The following c.JSON call sends that field’s value back to the client.", "err := declares the local variable err and stores the method’s result. if err != nil enters the failure branch.", "The second body gives title a number. It cannot fill the string field, so the method returns an error and the handler sends its failure response.", "The body limit is 4096 bytes. The Body limits section shows separate handling for an oversized body.", "The final gin.H value constructs the response. Binding itself does not send a response or save a book."],
        } },
        {"id": "gb-validation", "type": "sub_header", "richText": [["Validation tags"]]},
        {"id": "gb-validation-order", "type": "bulleted_list", "richText": [["After decoding, Gin checks rules written in the field’s "], ["binding", [["c"]]], [" tag. The same "], ["c.ShouldBindJSON", [["c"]]], [" call returns those validation errors."]]},
        {"id": "gb-tag-roles", "type": "bulleted_list", "richText": [["The "], ["json", [["c"]]], [" tag chooses the JSON key. The "], ["binding", [["c"]]], [" tag declares checks on the resulting Go field value."]]},
        { id: "gb-validation-tags-example", type: 'example', example: {
            title: "Required title and length limit",
            language: "go",
            description: ["In the JSON server above, the BookInput declaration is replaced with this version. The handler and route stay unchanged.", "The server is restarted before these requests run."],
            code: `type BookInput struct {
    Title string \`json:"title" binding:"required,max=200"\`
}`,
            commands: "curl -s http://127.0.0.1:8080/book-input -H 'Content-Type: application/json' -d '{\"title\":\"Gin\"}'\ncurl -s http://127.0.0.1:8080/book-input -H 'Content-Type: application/json' -d '{\"title\":\"\"}'\ncurl -s http://127.0.0.1:8080/book-input -H 'Content-Type: application/json' -d '{}' ",
            result: "{\"title\":\"Gin\"}\n{\"error\":\"invalid book input\"}\n{\"error\":\"invalid book input\"}",
            explanation: ["Both tag entries belong to the same Title field. The space separates json:\"title\" from binding:\"required,max=200\" inside the backticks.", "required rejects the empty string. max=200 limits a string to 200 characters.", "The missing title in {} leaves input.Title empty, so it fails required just like an explicit empty title.", "A number such as {\"title\":42} still fails decoding before string validation can run.", "Without the binding tag, {} would decode successfully and input.Title would stay empty.", "A spaces-only title is not an empty string. The Binding errors example includes a separate whitespace check."],
        } },
        {"id": "gb-auto-method", "type": "sub_header", "richText": [["ShouldBind"]]},
        {"id": "gb-auto", "type": "bulleted_list", "richText": [["c.ShouldBind(&input)", [["c"]]], [" chooses the decoder using the request method and Content-Type. "], ["c.ShouldBindJSON(&input)", [["c"]]], [" chooses JSON explicitly."]]},
        {"id": "gb-auto-source", "type": "bulleted_list", "richText": [["For GET requests, ShouldBind uses form binding. For other requests, Content-Type selects formats such as JSON or URL-encoded form data."]]},
        {"id": "gb-content-type", "type": "bulleted_list", "richText": [["ShouldBindJSON does not enforce the Content-Type header. Its explicit JSON choice is separate from checking which media types an endpoint accepts."]]},
        { id: "gb-form-example", type: 'example', example: {
            title: "JSON and form input with ShouldBind",
            language: "go",
            description: ["This type and handler are added to main.go from the JSON server above.", "Inside main, router.POST(\"/book-form\", bindBookForm) is registered before router.Run. No extra imports are required."],
            code: `type BookFormInput struct {
    Title string \`json:"title" form:"title" binding:"required"\`
    Shelf string \`json:"shelf" form:"shelf" binding:"required"\`
}

func bindBookForm(c *gin.Context) {
    var input BookFormInput
    err := c.ShouldBind(&input)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "title and shelf are required"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"title": input.Title, "shelf": input.Shelf})
}`,
            commands: "curl -s http://127.0.0.1:8080/book-form -H 'Content-Type: application/json' -d '{\"title\":\"Gin\",\"shelf\":\"go\"}'\ncurl -s 'http://127.0.0.1:8080/book-form?shelf=go' -d 'title=Gin' ",
            result: "{\"shelf\":\"go\",\"title\":\"Gin\"}\n{\"shelf\":\"go\",\"title\":\"Gin\"}",
            explanation: ["The first request declares application/json. ShouldBind selects JSON decoding and reads the json tags.", "curl -d in the second request sends application/x-www-form-urlencoded. ShouldBind selects form binding and reads the form tags.", "Form binding can combine body fields and query values: title comes from the body, while shelf comes from the URL.", "For this URL-encoded POST, a body value wins if the same key also appears in the query.", "The form tag is metadata for form/query binding. It does not add another Go field."],
        } },
        {"id": "gb-query-method", "type": "sub_header", "richText": [["ShouldBindQuery"]]},
        {"id": "gb-query-source", "type": "bulleted_list", "richText": [["c.ShouldBindQuery(&input)", [["c"]]], [" reads only query parameters. It uses "], ["form", [["c"]]], [" tags to map query keys to Go fields."]]},
        {"id": "gb-query-conversion", "type": "bulleted_list", "richText": [["The field’s Go type controls conversion. Binding a query value into an "], ["int", [["c"]]], [" field requires integer text."]]},
        { id: "gb-query-example", type: 'example', example: {
            title: "Query input into an integer field",
            language: "go",
            description: ["This type and handler are added to the JSON server’s main.go, using its existing imports.", "Inside main, router.GET(\"/books\", listBooks) is registered before router.Run."],
            code: `type ListBooksInput struct {
    Limit int \`form:"limit" binding:"min=1,max=100"\`
}

func listBooks(c *gin.Context) {
    input := ListBooksInput{Limit: 20}
    err := c.ShouldBindQuery(&input)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "limit must be between 1 and 100"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"limit": input.Limit})
}`,
            commands: "curl -s http://127.0.0.1:8080/books\ncurl -s 'http://127.0.0.1:8080/books?limit=10'\ncurl -s 'http://127.0.0.1:8080/books?limit=abc' ",
            result: "{\"limit\":20}\n{\"limit\":10}\n{\"error\":\"limit must be between 1 and 100\"}",
            explanation: ["Limit is an int field. form:\"limit\" maps the query key limit to that field.", "ListBooksInput{Limit: 20} creates an input value with a default Limit of 20. The := syntax declares input and assigns that value.", "An absent key preserves 20. limit=10 is converted from URL text into the integer 10.", "For an integer, min=1 and max=100 check its numeric range. For a string, these rules check its length.", "limit=abc fails conversion. limit=0 and limit=101 fail validation. An explicitly empty numeric value becomes zero and also fails min=1."],
        } },
        {"id": "gb-uri-method", "type": "sub_header", "richText": [["ShouldBindUri"]]},
        {"id": "gb-uri-source", "type": "bulleted_list", "richText": [["c.ShouldBindUri(&input)", [["c"]]], [" fills fields from named route parameters. A "], ["uri", [["c"]]], [" tag identifies which parameter fills a field."]]},
        { id: "gb-uri-example", type: 'example', example: {
            title: "Path input into an integer field",
            language: "go",
            description: ["This type and handler are added to the JSON server’s main.go, using its existing imports.", "Inside main, router.GET(\"/authors/:id\", authorByID) is registered before router.Run."],
            code: `type AuthorPath struct {
    ID int64 \`uri:"id" binding:"min=1"\`
}

func authorByID(c *gin.Context) {
    var input AuthorPath
    err := c.ShouldBindUri(&input)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "id must be a positive integer"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"id": input.ID})
}`,
            commands: "curl -s http://127.0.0.1:8080/authors/7\ncurl -s http://127.0.0.1:8080/authors/abc",
            result: "{\"id\":7}\n{\"error\":\"id must be a positive integer\"}",
            explanation: ["The route names its parameter id. The uri:\"id\" tag maps that parameter to the Go field ID.", "The field type int64 requires an integer that fits in 64 bits. min=1 then checks that it is positive.", "The method is called on c, just like JSON and query binding. Its source is the matched path rather than the request body."],
        } },
        {"id": "gb-presence", "type": "sub_header", "richText": [["Required and optional values"]]},
        {"id": "gb-required", "type": "bulleted_list", "richText": [["required", [["c"]]], [" rejects the Go field’s zero value. For a string this is empty text; for an integer it is 0; for a boolean it is false."]]},
        {"id": "gb-pointer", "type": "bulleted_list", "richText": [["A pointer field can record whether a value was supplied. "], ["*bool", [["c"]]], [" is a pointer to a boolean; "], ["nil", [["c"]]], [" means it points to no value."]]},
        { id: "gb-pointer-example", type: 'example', example: {
            title: "Required boolean with an explicit false",
            language: "go",
            description: ["This type and handler are added to the JSON server’s main.go, using its existing imports.", "Inside main, router.PATCH(\"/preferences\", updatePreferences) is registered before router.Run."],
            code: `type PreferencesInput struct {
    Enabled *bool \`json:"enabled" binding:"required"\`
}

func updatePreferences(c *gin.Context) {
    var input PreferencesInput
    err := c.ShouldBindJSON(&input)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "enabled must be a boolean"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"enabled": *input.Enabled})
}`,
            commands: "curl -s -X PATCH http://127.0.0.1:8080/preferences -H 'Content-Type: application/json' -d '{\"enabled\":false}'\ncurl -s -X PATCH http://127.0.0.1:8080/preferences -H 'Content-Type: application/json' -d '{}' ",
            result: "{\"enabled\":false}\n{\"error\":\"enabled must be a boolean\"}",
            explanation: ["A plain bool field with required would reject false. The *bool field lets validation check whether a pointer exists instead.", "The first request creates a non-nil pointer to false, so required passes.", "In a fresh input value, both an omitted enabled field and an explicit null leave the pointer nil. Both fail required.", "*input.Enabled reads the boolean that the pointer refers to. Successful required validation makes that dereference safe here.", "A pointer alone does not distinguish an omitted field from a null field."],
        } },
        {"id": "gb-optional", "type": "bulleted_list", "richText": [["In a "], ["binding", [["c"]]], [" tag, "], ["omitempty", [["c"]]], [" skips later validation rules for an empty value. The next example uses "], ["binding:\"omitempty,email\"", [["c"]]], [" for an optional email address."]]},
        {"id": "gb-json-errors", "type": "sub_header", "richText": [["Binding errors"]]},
        {"id": "gb-error-kinds", "type": "bulleted_list", "richText": [["A wrong JSON field type is a decoding error. A decoded value that fails a binding tag is a validation error. Both return through the binding method’s error result."]]},
        {"id": "gb-validator-errors", "type": "bulleted_list", "richText": [["Gin uses "], ["github.com/go-playground/validator/v10", [["c"]]], [" for field validation. Its "], ["validator.ValidationErrors", [["c"]]], [" value contains the fields that failed their rules."]]},
        { id: "gb-validation-example", type: 'example', example: {
            title: "Validation error mapping",
            language: "go",
            description: ["This type and handler are added to main.go. Its imports also include errors, strings, and github.com/go-playground/validator/v10.", "Inside main, router.POST(\"/validated-book\", validateBookInput) is registered before router.Run."],
            code: `type ValidatedBookInput struct {
    Title string \`json:"title" binding:"required,max=200"\`
    Email string \`json:"email" binding:"omitempty,email"\`
}

func validateBookInput(c *gin.Context) {
    var input ValidatedBookInput
    if err := c.ShouldBindJSON(&input); err != nil {
        var failures validator.ValidationErrors
        if !errors.As(err, &failures) {
            c.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON input"})
            return
        }
        fields := map[string]string{}
        for _, failure := range failures {
            switch failure.Field() {
            case "Title":
                fields["title"] = "title is required and must have at most 200 characters"
            case "Email":
                fields["email"] = "email must be a valid email address"
            }
        }
        c.JSON(http.StatusBadRequest, gin.H{"fields": fields})
        return
    }
    if strings.TrimSpace(input.Title) == "" {
        c.JSON(http.StatusBadRequest, gin.H{"fields": gin.H{"title": "title must contain text"}})
        return
    }
    c.JSON(http.StatusOK, gin.H{"title": input.Title, "email": input.Email})
}`,
            commands: "curl -s http://127.0.0.1:8080/validated-book -H 'Content-Type: application/json' -d '{\"title\":\"Gin\",\"email\":\"wrong\"}'\ncurl -s http://127.0.0.1:8080/validated-book -H 'Content-Type: application/json' -d '{\"title\":\"   \"}' ",
            result: "{\"fields\":{\"email\":\"email must be a valid email address\"}}\n{\"fields\":{\"title\":\"title must contain text\"}}",
            explanation: ["errors.As checks whether the returned error contains validator.ValidationErrors and puts it into failures.", "The for loop visits each failed field. failure.Field() returns its Go field name, such as Email. The switch chooses a public message under the JSON name email.", "omitempty skips the email rule when Email is empty. A supplied nonempty email must pass the email rule.", "required accepts spaces. strings.TrimSpace(input.Title) checks for a title with no non-space text after validation succeeds.", "A wrong field type such as {\"title\":42} takes the decoding-error branch instead of the validation-error loop."],
        } },
        {"id": "gb-bind-method", "type": "sub_header", "richText": [["BindJSON"]]},
        {"id": "gb-errors-control", "type": "bulleted_list", "richText": [["c.BindJSON(&input)", [["c"]]], [" also reads JSON and runs validation. On failure, it aborts the pending handler chain and commits status 400 before returning the error."]]},
        { id: "gb-bindjson-example", type: 'example', example: {
            title: "Automatic binding failure response",
            language: "go",
            description: ["This handler is added to main.go after the Validation tags example, using its BookInput type with required.", "Inside main, router.POST(\"/automatic-input\", automaticInput) is registered before router.Run."],
            code: `func automaticInput(c *gin.Context) {
    var input BookInput
    err := c.BindJSON(&input)
    if err != nil {
        return
    }
    c.JSON(http.StatusOK, gin.H{"title": input.Title})
}`,
            commands: "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8080/automatic-input -H 'Content-Type: application/json' -d '{}' ",
            result: "400",
            explanation: ["The missing title fails required. BindJSON has already committed status 400, so the handler returns without choosing another response.", "The ShouldBindJSON server above writes its own JSON failure body. This BindJSON handler writes no custom failure body.", "The return statement is still needed to end the current function after the binding error."],
        } },
        {"id": "gb-limits", "type": "sub_header", "richText": [["Body limits"]]},
        {"id": "gb-size", "type": "bulleted_list", "richText": [["http.MaxBytesReader", [["c"]]], [" wraps "], ["c.Request.Body", [["c"]]], [" to limit how many bytes binding can read. The wrapper must be assigned before the binding call."]]},
        { id: "gb-json-example", type: 'example', example: {
            title: "Oversized JSON input",
            language: "go",
            description: ["This handler is added to main.go and uses BookInput. The imports also include errors.", "Inside main, router.POST(\"/limited-input\", limitedInput) is registered before router.Run.", "The small 32-byte limit makes the failure visible with a short request."],
            code: `func limitedInput(c *gin.Context) {
    var input BookInput
    c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 32)
    err := c.ShouldBindJSON(&input)
    if err != nil {
        var tooLarge *http.MaxBytesError
        if errors.As(err, &tooLarge) {
            c.JSON(http.StatusRequestEntityTooLarge, gin.H{"error": "body too large"})
            return
        }
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid book input"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"title": input.Title})
}`,
            commands: "curl -s http://127.0.0.1:8080/limited-input -H 'Content-Type: application/json' -d '{\"title\":\"This title makes the JSON body longer than thirty-two bytes\"}' ",
            result: "{\"error\":\"body too large\"}",
            explanation: ["c.Request.Body is the input reader that ShouldBindJSON reads. c.Writer lets MaxBytesReader interact with the HTTP response writer.", "The valid JSON body shown here is longer than 32 bytes. Reading it produces a *http.MaxBytesError.", "errors.As identifies that error so this handler can return its body-too-large response separately from other decoding or validation failures.", "A malformed body can fail decoding before the size limit is reached. The handler does not assume every invalid body is too large."],
        } },
        {"id": "gb-unknown-fields", "type": "sub_header", "richText": [["Unknown JSON fields"]]},
        {"id": "gb-unknown", "type": "bulleted_list", "richText": [["By default, JSON keys with no matching Go field are ignored. "], ["gin.EnableJsonDecoderDisallowUnknownFields()", [["c"]]], [" changes Gin’s JSON binding to reject them."]]},
        { id: "gb-strict-example", type: 'example', example: {
            title: "Unknown-field rejection",
            language: "go",
            description: ["These functions are added outside main in main.go and use its BookInput type.", "Inside main, registerStrictInput(router) is called before router.Run.", "The server is restarted after this startup setting changes."],
            code: `func registerStrictInput(router *gin.Engine) {
    gin.EnableJsonDecoderDisallowUnknownFields()
    router.POST("/strict-input", strictInput)
}

func strictInput(c *gin.Context) {
    var input BookInput
    err := c.ShouldBindJSON(&input)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid input or unknown field"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"title": input.Title})
}`,
            commands: "curl -s http://127.0.0.1:8080/strict-input \\\n  -H 'Content-Type: application/json' -d '{\"title\":\"Gin\",\"ownerId\":7}'",
            result: "{\"error\":\"invalid input or unknown field\"}",
            explanation: ["BookInput has Title but no field mapped to ownerId. The extra ownerId key therefore produces the error response.", "Removing ownerId produces {\"title\":\"Gin\"}.", "This startup setting affects all Gin JSON-binding handlers in the process, not only /strict-input."],
        } },
        {"id": "gb-body-reuse", "type": "sub_header", "richText": [["Repeated body binding"]]},
        {"id": "gb-consume", "type": "bulleted_list", "richText": [["A request body is read in order. After "], ["c.ShouldBindJSON", [["c"]]], [" reads it, a second call normally reaches the end of the body."]]},
        {"id": "gb-buffer", "type": "bulleted_list", "richText": [["c.ShouldBindBodyWith", [["c"]]], [" keeps the body bytes in the Gin context so later calls can decode those same bytes again."]]},
        { id: "gb-reuse-example", type: 'example', example: {
            title: "Repeated body binding",
            language: "go",
            description: ["These types and this handler are added to main.go. Its imports also include github.com/gin-gonic/gin/binding.", "Inside main, router.POST(\"/body-views\", bodyViews) is registered before router.Run.", "This example demonstrates two separate validation views of one JSON object. Both types declare both accepted keys."],
            code: `type TitleView struct {
    Title   string \`json:"title" binding:"required"\`
    Edition int    \`json:"edition"\`
}

type EditionView struct {
    Title   string \`json:"title"\`
    Edition int    \`json:"edition" binding:"min=1"\`
}

func bodyViews(c *gin.Context) {
    c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 4096)
    var titleView TitleView
    var editionView EditionView

    err := c.ShouldBindBodyWith(&titleView, binding.JSON)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid title view"})
        return
    }
    err = c.ShouldBindBodyWith(&editionView, binding.JSON)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid edition view"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"title": titleView.Title, "edition": editionView.Edition})
}`,
            commands: "curl -s http://127.0.0.1:8080/body-views \\\n  -H 'Content-Type: application/json' -d '{\"title\":\"Gin\",\"edition\":2}'",
            result: "{\"edition\":2,\"title\":\"Gin\"}",
            explanation: ["binding is the imported Gin subpackage. binding.JSON selects JSON decoding for this method call. It is supplied as the second argument; it is not the request’s JSON data or a struct tag.", "The first call reads and caches the body, fills titleView, and checks its required title.", "The second call reads the cached bytes, fills editionView, and checks its edition range. err = reassigns the existing error variable.", "Both views include title and edition, so unknown-field rejection also accepts this request.", "Replacing both calls with ShouldBindJSON leaves the second call at end-of-input and returns an error.", "The cached bytes use memory, so the body limit stays before the first read. A single struct and one binding call are simpler when only one validation view is needed."],
        } },
        {"id": "gb-sources", "type": "sub_header", "richText": [["References"]]},
        {"id": "gb-source-main", "type": "bulleted_list", "richText": [["Gin binding and validation", [["a", "https://gin-gonic.com/en/docs/binding/binding-and-validation/"]]]]},
        {"id": "gb-source-query", "type": "bulleted_list", "richText": [["Gin query and form binding", [["a", "https://gin-gonic.com/en/docs/binding/bind-query-or-post/"]]]]},
        {"id": "gb-source-api", "type": "bulleted_list", "richText": [["Gin binding API", [["a", "https://pkg.go.dev/github.com/gin-gonic/gin"]]]]},
        {"id": "gb-source-structs", "type": "bulleted_list", "richText": [["Go struct types and tags", [["a", "https://go.dev/ref/spec#Struct_types"]]]]},
    ],
} as const satisfies GoNote;

export default note;
