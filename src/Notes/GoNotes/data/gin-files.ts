import type { GoNote } from '../types';

const note = {
    notionId: "go-gin-files",
    slug: "gin-files",
    title: "Gin: files and templates",
    updatedOn: "2026-10-19",
    blocks: [
        {"id": "files-multipart", "type": "sub_header", "richText": [["Multipart requests and FormFile"]]},
        {"id": "files-form", "type": "bulleted_list", "richText": [["A file upload uses a request body with separate parts for files and ordinary form fields. This format is called "], ["multipart/form-data", [["c"]]], ["."]]},
        {"id": "files-read", "type": "bulleted_list", "richText": [["Gin supplies "], ["c *gin.Context", [["c"]]], [" to the handler. "], ["c.FormFile(\"file\")", [["c"]]], [" is a method call on that context. Its argument is the form field name, not a filename or disk path."]]},
        {"id": "ff-header", "type": "bulleted_list", "richText": [["FormFile returns a "], ["*multipart.FileHeader", [["c"]]], [" and an error. The header describes the upload, including "], ["Filename", [["c"]]], [" and "], ["Size", [["c"]]], [". Receiving the header does not save the file permanently."]]},
        {"id": "ff-open", "type": "bulleted_list", "richText": [["header.Open()", [["c"]]], [" opens the uploaded content for reading. The returned file can be in memory or in temporary disk storage. Its "], ["Close()", [["c"]]], [" method releases the opened file."]]},
        { id: "ff-first-server", type: 'example', example: {
            title: "One uploaded file and its size",
            language: "go",
            description: ["The program is saved as main.go in a new directory. The commands create its Go module and start the server.", "The curl commands run in another terminal from the same directory. The first creates a four-byte input file. This server only inspects uploads."],
            code: `package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func inspectFile(c *gin.Context) {
    c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 2<<20)
    defer func() {
        if form := c.Request.MultipartForm; form != nil {
            _ = form.RemoveAll()
        }
    }()

    header, err := c.FormFile("file")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "cannot read upload"})
        return
    }
    c.JSON(http.StatusOK, gin.H{
        "filename": header.Filename,
        "bytes": header.Size,
    })
}

func main() {
    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.MaxMultipartMemory = 256 << 10
    router.POST("/inspect", inspectFile)
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "go mod init example.com/gin-files\ngo get github.com/gin-gonic/gin\ngo run .\n\n# In another terminal:\nprintf 'Gin\\n' > sample.txt\ncurl -s -F 'file=@sample.txt' http://127.0.0.1:8080/inspect\ncurl -s -F 'document=@sample.txt' http://127.0.0.1:8080/inspect",
            result: "First upload: {\"bytes\":4,\"filename\":\"sample.txt\"}\nSecond upload: {\"error\":\"cannot read upload\"}",
            explanation: ["curl -F creates multipart form data. file=@sample.txt sends the local file under the field name file.", "header, err := stores both FormFile results. header.Filename describes the uploaded name, and header.Size is the byte count.", "The second request uses the field name document. FormFile(\"file\") cannot find it, so the handler writes the error response.", "The body wrapper limits the total upload request to 2 MiB. This introductory handler uses one error message for parsing and size failures. The size-checking example below distinguishes them.", "defer schedules the unnamed cleanup function for when inspectFile returns. After parsing, c.Request.MultipartForm may contain temporary disk files.", "form != nil checks that a form was parsed. form.RemoveAll() deletes its temporary files. _ discards the returned cleanup error.", "This handler selects the first file under file. The next section shows how to inspect all file parts."],
        } },
        {"id": "ff-multiple", "type": "sub_header", "richText": [["MultipartForm and multiple files"]]},
        {"id": "ff-map", "type": "bulleted_list", "richText": [["c.MultipartForm()", [["c"]]], [" parses the form and returns a "], ["*multipart.Form", [["c"]]], [" plus an error. "], ["form.File", [["c"]]], [" maps field names to lists of file headers. "], ["form.Value", [["c"]]], [" maps ordinary field names to lists of strings."]]},
        { id: "ff-multiple-example", type: 'example', example: {
            title: "Repeated file fields and a text field",
            language: "go",
            description: ["This handler is added outside main in main.go. Inside main, router.POST(\"/batch\", inspectBatch) is registered before router.Run.", "It uses sample.txt created in the first example. The same local file is sent twice to show a repeated field."],
            code: `func inspectBatch(c *gin.Context) {
    c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 2<<20)
    defer func() {
        if form := c.Request.MultipartForm; form != nil {
            _ = form.RemoveAll()
        }
    }()
    form, err := c.MultipartForm()
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid multipart body"})
        return
    }
    files := form.File["files"]
    if len(files) == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "files field missing"})
        return
    }
    names := make([]string, 0, len(files))
    for _, header := range files {
        names = append(names, header.Filename)
    }
    c.JSON(http.StatusOK, gin.H{
        "filenames": names,
        "labels": form.Value["label"],
    })
}`,
            commands: "curl -s -F 'files=@sample.txt' -F 'files=@sample.txt' \\\n  -F 'label=notes' http://127.0.0.1:8080/batch",
            result: "{\"filenames\":[\"sample.txt\",\"sample.txt\"],\"labels\":[\"notes\"]}",
            explanation: ["form.File[\"files\"] looks up the list stored under the files field name. len(files) counts its headers.", "make([]string, 0, len(files)) creates an empty string slice with room for the names. A slice is a list of values.", "range visits each uploaded header. _ ignores its index. append adds that header’s filename to names.", "form.Value[\"label\"] returns a list too, because a text field can also be repeated.", "The handler inspects metadata without opening or storing the file contents."],
        } },
        {"id": "files-limits", "type": "sub_header", "richText": [["Body limits and file limits"]]},
        {"id": "files-memory", "type": "bulleted_list", "richText": [["router.MaxMultipartMemory", [["c"]]], [" sets the multipart file memory threshold in bytes. File data exceeding the threshold can use temporary disk storage. This is not a maximum upload size."]]},
        {"id": "files-total", "type": "bulleted_list", "richText": [["http.MaxBytesReader(c.Writer, c.Request.Body, limit)", [["c"]]], [" wraps the incoming body and limits its total size. The handler assigns the wrapper back to "], ["c.Request.Body", [["c"]]], [" before parsing."]]},
        {"id": "files-separate", "type": "bulleted_list", "richText": [["header.Size", [["c"]]], [" supports a separate per-file check after parsing. The total request size also includes multipart boundaries and form fields."]]},
        {"id": "files-type", "type": "bulleted_list", "richText": [["The uploaded filename and Content-Type are supplied by the client. Multipart parsing and size checks do not verify the file’s actual format."]]},
        { id: "files-upload-example", type: 'example', example: {
            title: "Total body limit, file count, and content reading",
            language: "go",
            description: ["This standalone program replaces main.go from the first example and uses the same Go module.", "It accepts exactly one file field named file. Its total body limit is 2 MiB and its per-file limit is 1 MiB.", "The commands run after go run . starts the server. They use sample.txt from the first example. No permanent upload is stored."],
            code: `package main

import (
    "errors"
    "io"
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    if err := r.SetTrustedProxies(nil); err != nil { log.Fatal(err) }
    r.MaxMultipartMemory = 256 << 10
    r.POST("/inspect", func(c *gin.Context) {
        c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 2<<20)
        defer func() {
            if form := c.Request.MultipartForm; form != nil { _ = form.RemoveAll() }
        }()
        form, err := c.MultipartForm()
        if err != nil {
            var tooLarge *http.MaxBytesError
            if errors.As(err, &tooLarge) {
                c.JSON(http.StatusRequestEntityTooLarge, gin.H{"error": "body too large"})
            } else {
                c.JSON(http.StatusBadRequest, gin.H{"error": "invalid multipart body"})
            }
            return
        }
        files := form.File["file"]
        if len(files) != 1 || len(form.File) != 1 {
            c.JSON(http.StatusBadRequest, gin.H{"error": "one file required"})
            return
        }
        header, err := c.FormFile("file")
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "file field missing"})
            return
        }
        const maxFile = 1 << 20
        if header.Size > maxFile {
            c.JSON(http.StatusRequestEntityTooLarge, gin.H{"error": "file too large"})
            return
        }
        src, err := header.Open()
        if err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot read file"})
            return
        }
        defer src.Close()
        n, err := io.Copy(io.Discard, io.LimitReader(src, maxFile+1))
        if err != nil {
            c.JSON(http.StatusBadRequest, gin.H{"error": "incomplete file"})
            return
        }
        if n > maxFile {
            c.JSON(http.StatusRequestEntityTooLarge, gin.H{"error": "file too large"})
            return
        }
        c.JSON(http.StatusOK, gin.H{"bytes": n})
    })
    if err := r.Run("127.0.0.1:8080"); err != nil { log.Fatal(err) }
}`,
            commands: "curl -s -F 'file=@sample.txt' http://127.0.0.1:8080/inspect",
            explanation: ["2 << 20 is 2 × 1,048,576 bytes, or 2 MiB. 256 << 10 is 256 KiB. The << operator shifts the integer bits left.", "r is the engine variable in this program. MaxMultipartMemory affects where parsed file contents are held, while MaxBytesReader limits the whole body.", "MultipartForm parses once and exposes the file map. len(form.File) counts file field names. len(files) counts uploaded files under the field named file.", "errors.As checks whether a parsing error contains a *http.MaxBytesError. That case selects the body-too-large response.", "FormFile retrieves the header from the already parsed form. header.Open opens its contents, and defer src.Close() schedules closing them.", "io.LimitReader(src, maxFile+1) permits at most one byte beyond the file limit. io.Copy reads those bytes into io.Discard, which stores nothing. It returns the byte count n and an error.", "The extra byte detects an oversized file rather than silently accepting a shortened copy. The header size is checked before opening too.", "Deferred calls run in reverse order. src.Close runs before the earlier cleanup function removes multipart temporary files.", "This example checks sizes and file counts. File-format validation is a separate application rule."],
            result: "{\"bytes\":4}",
        } },
        {"id": "files-store", "type": "sub_header", "richText": [["Upload names and storage"]]},
        {"id": "files-name", "type": "bulleted_list", "richText": [["An uploaded filename is untrusted input. A server-generated name avoids using it as a directory path or overwriting another upload with the same client filename."]]},
        {"id": "ff-save", "type": "bulleted_list", "richText": [["c.SaveUploadedFile(header, destination)", [["c"]]], [" copies an uploaded file to a server-side path and returns an error. The header identifies the upload. The destination identifies where the server saves it."]]},
        {"id": "files-private", "type": "bulleted_list", "richText": [["A directory exposed with "], ["router.Static", [["c"]]], [" is public. Upload storage remains separate unless the application deliberately makes those files public."]]},
        { id: "ff-save-example", type: 'example', example: {
            title: "Saving an upload under a generated name",
            language: "go",
            description: ["This helper is added outside main in the size-checking program. Its imports also include mime/multipart and os.", "At the end of that program’s /inspect handler, saveUpload(c, header) replaces c.JSON(http.StatusOK, gin.H{\"bytes\": n}). All size and count checks stay before it.", "The files are stored in the operating system’s temporary directory. They remain after the request until deleted separately or by system cleanup."],
            code: `func saveUpload(c *gin.Context, header *multipart.FileHeader) {
    destination, err := os.CreateTemp("", "gin-upload-*")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot create file"})
        return
    }
    path := destination.Name()
    if err := destination.Close(); err != nil {
        _ = os.Remove(path)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot close file"})
        return
    }
    if err := c.SaveUploadedFile(header, path); err != nil {
        _ = os.Remove(path)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot save file"})
        return
    }
    c.JSON(http.StatusCreated, gin.H{"saved": true})
}`,
            commands: "curl -i -F 'file=@sample.txt' http://127.0.0.1:8080/inspect",
            result: "Status: 201\nBody: {\"saved\":true}",
            explanation: ["The helper receives the same c and file header used by the upload handler. It does not read a second request.", "os.CreateTemp creates a uniquely named file. The empty directory argument selects the system temporary directory. The * in gin-upload-* is replaced with a generated suffix.", "destination.Name() returns the generated storage path. Close releases that initial file handle before Gin opens the destination for copying.", "SaveUploadedFile copies the upload into that path. The client’s header.Filename is never used as a storage path.", "If closing or saving fails, os.Remove removes the generated file. The successful file is separate from multipart parsing’s temporary files, so RemoveAll does not delete it.", "The response reports success without exposing the server’s filesystem path. This helper demonstrates local storage, not a persistent upload catalog."],
        } },
        {"id": "files-download", "type": "sub_header", "richText": [["File responses and downloads"]]},
        {"id": "ff-file", "type": "bulleted_list", "richText": [["c.File(path)", [["c"]]], [" sends a server-side file as the response. "], ["c.FileAttachment(path, name)", [["c"]]], [" also sets a download filename in the "], ["Content-Disposition", [["c"]]], [" response header."]]},
        {"id": "files-attachment", "type": "bulleted_list", "richText": [["The path selects the file on the server. The download name is the filename suggested to the client. These arguments need not have the same name."]]},
        {"id": "files-path", "type": "bulleted_list", "richText": [["A request ID can select a server-owned path from a lookup. Joining an arbitrary request path to a directory can allow access outside that directory."]]},
        {"id": "files-access", "type": "bulleted_list", "richText": [["Gin’s file methods do not check who may access a document. Private downloads need the application’s access check before the file response."]]},
        { id: "ff-download-example", type: 'example', example: {
            title: "File path and attachment name",
            language: "go",
            description: ["This function is added outside main in the current program. Inside main, registerDownloads(r) runs before r.Run. In the introductory program the engine variable is router instead of r.", "From the module directory, the setup command creates documents/guide.txt. All files in this example are public."],
            code: `func registerDownloads(router *gin.Engine) {
    router.GET("/guide", func(c *gin.Context) {
        c.File("./documents/guide.txt")
    })
    downloads := map[string]string{"guide": "./documents/guide.txt"}
    router.GET("/downloads/:id", func(c *gin.Context) {
        path, exists := downloads[c.Param("id")]
        if !exists {
            c.Status(http.StatusNotFound)
            return
        }
        c.FileAttachment(path, "go-guide.txt")
    })
}`,
            commands: "mkdir -p documents\nprintf 'Guide' > documents/guide.txt\n# After restarting the server:\ncurl -s http://127.0.0.1:8080/guide\ncurl -i http://127.0.0.1:8080/downloads/guide",
            result: "GET /guide body: Guide\nGET /downloads/guide body: Guide\nDownload header: Content-Disposition: attachment; filename=\"go-guide.txt\"",
            explanation: ["The paths beginning with ./ are relative to the directory from which the server runs.", "map[string]string creates a lookup from a request ID to a server-owned path. c.Param(\"id\") selects its entry.", "path, exists := reads the path and whether it exists in the lookup. An unknown ID returns 404.", "FileAttachment sends documents/guide.txt but suggests go-guide.txt as the client’s filename. The request never supplies a filesystem path."],
        } },
        {"id": "ff-static-section", "type": "sub_header", "richText": [["Static directories and single files"]]},
        {"id": "files-static", "type": "bulleted_list", "richText": [["router.Static(urlPrefix, directory)", [["c"]]], [" serves files under a URL prefix. "], ["router.StaticFile(url, path)", [["c"]]], [" exposes one file at one URL. Both calls register routes during startup."]]},
        { id: "files-download-example", type: 'example', example: {
            title: "Static directory and single-file routes",
            language: "go",
            description: ["This function is added outside main in the current program. Inside main, registerAssets(r) runs before r.Run. The introductory program names its engine router.", "The public directory is created relative to the directory from which go run . starts. It contains no private uploads or configuration files."],
            code: `func registerAssets(router *gin.Engine) {
    router.Static("/assets", "./public")
    router.StaticFile("/help", "./public/help.txt")
}`,
            commands: "mkdir -p public\nprintf 'Help' > public/help.txt\n# After restarting the server:\ncurl -s http://127.0.0.1:8080/assets/help.txt\ncurl -s http://127.0.0.1:8080/help",
            result: "Both response bodies: Help",
            explanation: ["Static maps the URL prefix /assets to the disk directory ./public. The remaining URL path help.txt selects the file inside that directory.", "StaticFile maps exactly /help to ./public/help.txt.", "These methods serve existing files. They do not create the directory or its contents."],
        } },
        {"id": "files-html", "type": "sub_header", "richText": [["HTML templates and data"]]},
        {"id": "files-template", "type": "bulleted_list", "richText": [["An HTML template is a server-owned text file containing HTML and placeholders. Gin uses Go’s "], ["html/template", [["c"]]], [" package to fill those placeholders with data."]]},
        {"id": "files-load", "type": "bulleted_list", "richText": [["router.LoadHTMLFiles(paths...)", [["c"]]], [" loads named template files during setup. "], ["c.HTML(status, templateName, data)", [["c"]]], [" renders one of those templates for the current request."]]},
        {"id": "ff-dot", "type": "bulleted_list", "richText": [["Inside a template, "], ["{{.Name}}", [["c"]]], [" reads Name from the supplied data. With "], ["gin.H{\"Name\": \"Ada\"}", [["c"]]], [", Name is the map key. It is not a Go variable declared in the HTML file."]]},
        { id: "files-loaders-example", type: 'example', example: {
            title: "Template file, data key, and rendered HTML",
            language: "go",
            description: ["This standalone program replaces main.go and uses the existing Gin module. It runs from the module directory.", "The setup commands create templates/greeting.html. The Go source is saved as main.go. Only one example server runs on port 8080 at a time."],
            code: `package main

import (
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func greeting(c *gin.Context) {
    c.HTML(http.StatusOK, "greeting.html", gin.H{"Name": "Ada"})
}

func main() {
    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.LoadHTMLFiles("templates/greeting.html")
    router.GET("/hello", greeting)
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "mkdir -p templates\nprintf '<p>Hello {{.Name}}</p>' > templates/greeting.html\ngo run .\n\n# In another terminal:\ncurl -i http://127.0.0.1:8080/hello",
            result: "Status: 200\nContent-Type: text/html; charset=utf-8\nBody: <p>Hello Ada</p>",
            explanation: ["LoadHTMLFiles receives the disk path templates/greeting.html. With this simple file, its template name is the base filename greeting.html.", "c.HTML receives three arguments: status 200, template name greeting.html, and the data map.", "The map has the key Name with value Ada. The dot in {{.Name}} starts from that supplied map and selects Name.", "The template processor replaces the placeholder with Ada. Gin writes the resulting HTML, not the placeholder syntax.", "A missing or invalid template file fails during startup. The template path and source are controlled by the server."],
        } },
        {"id": "ff-glob", "type": "bulleted_list", "richText": [["router.LoadHTMLGlob(pattern)", [["c"]]], [" loads files matching a path pattern. In "], ["templates/*.html", [["c"]]], [", the * matches names within that directory. It does not recursively load every nested directory."]]},
        { id: "ff-glob-example", type: 'example', example: {
            title: "Glob loader for the same template",
            language: "go",
            description: ["This main function replaces main in the preceding template example. greeting, imports, and templates/greeting.html stay the same.", "The change demonstrates the alternative loader separately. Both loaders are not needed for this one template."],
            code: `func main() {
    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.LoadHTMLGlob("templates/*.html")
    router.GET("/hello", greeting)
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "go run .\n# In another terminal:\ncurl -s http://127.0.0.1:8080/hello",
            result: "<p>Hello Ada</p>",
            explanation: ["The pattern matches templates/greeting.html, so greeting.html remains the template name passed to c.HTML.", "LoadHTMLFiles lists exact paths. LoadHTMLGlob selects paths through a pattern. Neither takes its path from the incoming request."],
        } },
        {"id": "ff-escaping", "type": "sub_header", "richText": [["HTML escaping and parsed templates"]]},
        {"id": "files-escape", "type": "bulleted_list", "richText": [["html/template", [["c"]]], [" escapes ordinary string values according to where they appear in HTML. Casting untrusted data to "], ["template.HTML", [["c"]]], [" bypasses that protection and can allow script injection."]]},
        {"id": "ff-parsed", "type": "bulleted_list", "richText": [["router.SetHTMLTemplate(parsed)", [["c"]]], [" registers a template that Go code has already parsed. This is an alternative to Gin’s file loaders."]]},
        { id: "files-template-example", type: 'example', example: {
            title: "Inline template and HTML escaping",
            language: "go",
            description: ["This standalone program replaces main.go in the same Go module. It needs no template file.", "The template is a fixed string in Go code. The name query value supplies data only."],
            code: `package main

import (
    "html/template"
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    if err := r.SetTrustedProxies(nil); err != nil { log.Fatal(err) }
    page := template.Must(template.New("greeting").Parse(
        "<!doctype html><html><body><p>Hello {{.Name}}</p></body></html>"))
    r.SetHTMLTemplate(page)
    r.GET("/hello", func(c *gin.Context) {
        c.HTML(http.StatusOK, "greeting", gin.H{"Name": c.Query("name")})
    })
    if err := r.Run("127.0.0.1:8080"); err != nil { log.Fatal(err) }
}`,
            commands: "curl -s 'http://127.0.0.1:8080/hello?name=%3Cb%3EAda%3C%2Fb%3E'",
            result: "<!doctype html><html><body><p>Hello &lt;b&gt;Ada&lt;/b&gt;</p></body></html>",
            explanation: ["template.New(\"greeting\") creates a template named greeting. Parse reads its fixed source and returns the parsed template plus an error.", "template.Must accepts those results and panics during startup if parsing failed. page holds the parsed template.", "r.SetHTMLTemplate(page) registers it with Gin. c.HTML selects the name greeting and passes a map containing Name.", "c.Query(\"name\") reads the query string value. The URL encodes <b>Ada</b> as %3Cb%3EAda%3C%2Fb%3E.", "The template processor escapes the angle brackets because the query value is an ordinary string. The response contains &lt;b&gt;Ada&lt;/b&gt;.", "A browser displays the literal text <b>Ada</b> rather than bold text. The request value is never parsed as template source."],
        } },
        {"id": "files-references", "type": "sub_header", "richText": [["References"]]},
        {"id": "files-ref-api", "type": "bulleted_list", "richText": [["Gin file and template APIs", [["a", "https://pkg.go.dev/github.com/gin-gonic/gin"]]], [" · "], ["HTTP body limits", [["a", "https://pkg.go.dev/net/http#MaxBytesReader"]]], [" · "], ["HTML template escaping", [["a", "https://pkg.go.dev/html/template"]]]]},
    ],
} as const satisfies GoNote;

export default note;
