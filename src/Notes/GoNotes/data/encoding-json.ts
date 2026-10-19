import type { GoNote } from '../types';

const note = {
    notionId: "go-encoding-json",
    slug: "encoding-json",
    title: "encoding/json",
    updatedOn: "2026-10-19",
    blocks: [
        {"id": "json-conversion", "type": "sub_header", "richText": [["Go values and JSON"]]},
        {"id": "json-role", "type": "bulleted_list", "richText": [["encoding/json", [["c"]]], [" is Go’s standard-library package for converting Go values to JSON text and JSON text back to Go values. Importing it gives the package name "], ["json", [["c"]]], [" in the code."]]},
        {"id": "json-scope", "type": "bulleted_list", "richText": [["These notes use the "], ["encoding/json", [["c"]]], [" import path. The separate "], ["encoding/json/v2", [["c"]]], [" package has different defaults."]]},
        {"id": "j-syntax", "type": "bulleted_list", "richText": [["A JSON object contains quoted keys paired with values, such as "], ["{\"title\":\"Go notes\",\"pages\":120}", [["c"]]], [". JSON values can be objects, arrays, strings, numbers, booleans, or null."]]},
        {"id": "j-marshal-heading", "type": "sub_header", "richText": [["Marshal and Go structs"]]},
        {"id": "json-marshal", "type": "bulleted_list", "richText": [["json.Marshal(value)", [["c"]]], [" is a package function. It returns two results: JSON bytes of type "], ["[]byte", [["c"]]], [" and an error. A nil error means encoding succeeded."]]},
        {"id": "j-struct", "type": "bulleted_list", "richText": [["A struct groups named Go fields. Each field has a name and a type. A struct value supplies the data that Marshal converts into a JSON object."]]},
        { id: "j-marshal-example", type: 'example', example: {
            title: "Struct field to JSON key",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
)

type Book struct {
    Title string \`json:"title"\`
}

func main() {
    book := Book{Title: "Go notes"}
    data, err := json.Marshal(book)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(string(data))
}`,
            commands: "go run main.go",
            result: "{\"title\":\"Go notes\"}",
            explanation: ["type Book struct declares a Go type. Title is its field name. string is that field’s Go type.", "The backticks enclose a struct tag. json:\"title\" tells this package to use the JSON key \"title\" for the Go field Title. It is metadata, not an assignment to Title.", "Book{Title: \"Go notes\"} creates a struct value. book := stores that value in a new variable.", "data, err := stores both results from json.Marshal(book). if err != nil handles an encoding failure before using data.", "[]byte means a slice of bytes. string(data) converts those bytes to text for display. fmt.Println writes that text and a newline to the terminal."],
        } },
        {"id": "j-unmarshal-heading", "type": "sub_header", "richText": [["Unmarshal and destination pointers"]]},
        {"id": "json-unmarshal", "type": "bulleted_list", "richText": [["json.Unmarshal(data, destination)", [["c"]]], [" reads JSON bytes and fills a Go destination. It returns an error, not the decoded value."]]},
        {"id": "j-pointer", "type": "bulleted_list", "richText": [["The destination is passed as a non-nil pointer. For a variable named book, "], ["&book", [["c"]]], [" supplies its address so Unmarshal can update that variable."]]},
        { id: "j-unmarshal-example", type: 'example', example: {
            title: "JSON key to Go field",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
)

type Book struct {
    Title string \`json:"title"\`
    Pages int    \`json:"pages"\`
}

func main() {
    data := []byte(\`{"title":"Go notes","pages":120}\`)
    var book Book
    if err := json.Unmarshal(data, &book); err != nil {
        log.Fatal(err)
    }
    fmt.Println(book.Title)
    fmt.Println(book.Pages)
}`,
            commands: "go run main.go",
            result: "Go notes\n120",
            explanation: ["The backticks around the JSON create a raw Go string. Its double quotes do not need backslash escapes. []byte(...) converts it to the input bytes Unmarshal expects.", "var book Book creates a Book value with empty Title and zero Pages. &book gives Unmarshal the address of that value.", "The tag json:\"title\" maps the JSON key title to book.Title. The JSON number 120 fills the int field book.Pages.", "if err := ... declares err for the if statement. The decoded fields are read only after the error check passes.", "Passing book instead of &book produces an InvalidUnmarshalError because the destination would not be a writable pointer.", "Encoding converts Go to JSON. Decoding converts JSON to Go. Neither operation saves data to a database."],
        } },
        {"id": "json-fields", "type": "sub_header", "richText": [["Struct tags and omitted fields"]]},
        {"id": "json-exported", "type": "bulleted_list", "richText": [["Exported fields start with a capital letter and participate in JSON conversion. Without a tag, the JSON key is the Go field name."]]},
        {"id": "json-tag", "type": "bulleted_list", "richText": [["json:\"name\"", [["c"]]], [" selects a JSON key. "], ["json:\"-\"", [["c"]]], [" excludes a field from both encoding and decoding."]]},
        {"id": "json-omitempty", "type": "bulleted_list", "richText": [["omitempty", [["c"]]], [" omits an empty field during encoding: false, zero, nil pointers or interfaces, and zero-length strings, arrays, slices, or maps. It is not a required-field rule for decoding."]]},
        {"id": "json-empty-struct", "type": "bulleted_list", "richText": [["A struct value is not empty under omitempty. A nil pointer can represent an optional nested struct."]]},
        { id: "json-roundtrip", type: 'example', example: {
            title: "Field names, exclusions, and omitempty",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
)

type Book struct {
    Title string \`json:"title"\`
    Pages int    \`json:"pages,omitempty"\`
    Draft bool   \`json:"-"\`
    privateNote string
}

func main() {
    book := Book{Title: "Go notes", Draft: true, privateNote: "internal"}
    data, err := json.Marshal(book)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(string(data))

    var decoded Book
    if err := json.Unmarshal(data, &decoded); err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%s | %d | %t\\n", decoded.Title, decoded.Pages, decoded.Draft)
}`,
            commands: "go run main.go",
            result: "{\"title\":\"Go notes\"}\nGo notes | 0 | false",
            explanation: ["json:\"pages,omitempty\" has a key name followed by an encoding option, separated by a comma.", "Pages is zero, so Marshal omits it. A nonzero Pages value would be included under pages.", "Draft is excluded even though its value is true. privateNote is unexported, so it is excluded too.", "decoded is a fresh struct. The JSON contains neither pages nor Draft, so those fields keep zero and false.", "The format placeholders %s, %d, and %t print a string, integer, and boolean."],
        } },
        {"id": "j-indent-heading", "type": "sub_header", "richText": [["MarshalIndent"]]},
        {"id": "json-indent", "type": "bulleted_list", "richText": [["json.MarshalIndent(value, prefix, indent)", [["c"]]], [" formats JSON across several lines. The prefix appears at the start of each later line. indent supplies one indentation level."]]},
        { id: "j-indent-example", type: 'example', example: {
            title: "Indented JSON",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
)

func main() {
    data, err := json.MarshalIndent(map[string]int{"pages": 120}, "", "  ")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(string(data))
}`,
            commands: "go run main.go",
            result: "{\n  \"pages\": 120\n}",
            explanation: ["map[string]int is a map with string keys and integer values. The value contains one entry, pages: 120.", "The empty prefix adds no line prefix. The two-space indent adds two spaces for each nesting level.", "The formatting changes whitespace, not the key or its value."],
        } },
        {"id": "j-presence-heading", "type": "sub_header", "richText": [["Missing keys, null, and pointers"]]},
        {"id": "json-absent", "type": "bulleted_list", "richText": [["An absent JSON key leaves its destination unchanged. In a newly declared struct, that field keeps its zero value. Reusing a populated struct can preserve an earlier value."]]},
        {"id": "json-null", "type": "bulleted_list", "richText": [["JSON null sets a pointer, slice, map, or interface to nil. For other Go types, null leaves the value unchanged without reporting an error, unless a custom UnmarshalJSON method handles it."]]},
        {"id": "json-pointer", "type": "bulleted_list", "richText": [["A pointer can represent an explicit zero separately from no value. In a fresh struct, omission and null both produce a nil pointer. Distinguishing those two cases requires extra presence tracking."]]},
        { id: "j-presence-example", type: 'example', example: {
            title: "Omitted, null, and explicit zero",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
)

type Settings struct {
    Limit *int \`json:"limit"\`
}

func main() {
    inputs := []string{\`{}\`, \`{"limit":null}\`, \`{"limit":0}\`}
    for _, input := range inputs {
        var settings Settings
        if err := json.Unmarshal([]byte(input), &settings); err != nil {
            log.Fatal(err)
        }
        if settings.Limit == nil {
            fmt.Println(input, "=> nil")
        } else {
            fmt.Println(input, "=>", *settings.Limit)
        }
    }

    count := 7
    if err := json.Unmarshal([]byte(\`null\`), &count); err != nil {
        log.Fatal(err)
    }
    fmt.Println("count:", count)
}`,
            commands: "go run main.go",
            result: "{} => nil\n{\"limit\":null} => nil\n{\"limit\":0} => 0\ncount: 7",
            explanation: ["*int declares a pointer to an integer. nil means there is no pointed-to integer. *settings.Limit reads the integer only after the nil check.", "Each loop iteration creates a fresh Settings. Omitted and null limit values leave its pointer nil. Explicit zero creates a non-nil pointer holding 0.", "count is an ordinary int already holding 7. Decoding null into &count succeeds and leaves 7 unchanged."],
        } },
        {"id": "json-types", "type": "sub_header", "richText": [["Slices, maps, and dynamic values"]]},
        {"id": "json-typed", "type": "bulleted_list", "richText": [["A struct describes known keys and field types. A slice, such as "], ["[]string", [["c"]]], [", describes a JSON array. A map, such as "], ["map[string]int", [["c"]]], [", describes object keys chosen at runtime."]]},
        {"id": "json-any", "type": "bulleted_list", "richText": [["any", [["c"]]], [" can hold a value of any Go type. Unmarshal into any uses "], ["map[string]any", [["c"]]], [" for objects, "], ["[]any", [["c"]]], [" for arrays, float64 for numbers, and nil for null. Strings and booleans keep their Go types."]]},
        { id: "j-shapes-example", type: 'example', example: {
            title: "Typed arrays and dynamic objects",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
)

func main() {
    var titles []string
    if err := json.Unmarshal([]byte(\`["Go","Gin"]\`), &titles); err != nil {
        log.Fatal(err)
    }
    fmt.Println(titles[0], len(titles))

    var object map[string]any
    if err := json.Unmarshal([]byte(\`{"title":"Go","pages":120}\`), &object); err != nil {
        log.Fatal(err)
    }
    fmt.Printf("title type: %T\\n", object["title"])
    fmt.Printf("pages type: %T\\n", object["pages"])
}`,
            commands: "go run main.go",
            result: "Go 2\ntitle type: string\npages type: float64",
            explanation: ["titles[0] reads the first slice item. len(titles) counts its items.", "The map’s string keys come from the JSON object. Its any values allow different types under different keys.", "%T prints the concrete Go type of a value. pages becomes float64 because its destination map value is any, not a declared int field.", "Reading a dynamic value as a specific type requires a checked type assertion, as in the UseNumber example below."],
        } },
        {"id": "json-nil", "type": "bulleted_list", "richText": [["A nil slice or map encodes as null. A non-nil empty slice encodes as []; a non-nil empty map encodes as {}."]]},
        {"id": "json-bytes", "type": "bulleted_list", "richText": [["A byte slice "], ["[]byte", [["c"]]], [" is a special case. Marshal encodes it as a base64 string, which represents binary bytes as text, rather than a JSON number array."]]},
        { id: "j-empty-example", type: 'example', example: {
            title: "Nil collections, empty collections, and bytes",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
)

func main() {
    values := []any{
        []string(nil),
        []string{},
        map[string]int(nil),
        map[string]int{},
        []byte("Go"),
    }
    for _, value := range values {
        data, err := json.Marshal(value)
        if err != nil {
            log.Fatal(err)
        }
        fmt.Println(string(data))
    }
}`,
            commands: "go run main.go",
            result: "null\n[]\nnull\n{}\n\"R28=\"",
            explanation: ["[]string(nil) and map[string]int(nil) create typed nil values. The {} literals create empty but non-nil collections.", "The outer []any slice holds all five values so the same loop can encode each one.", "The two bytes in \"Go\" become the base64 text R28=. Marshal then writes that text as a quoted JSON string."],
        } },
        {"id": "json-streams", "type": "sub_header", "richText": [["Decoders and encoders"]]},
        {"id": "json-decoder", "type": "bulleted_list", "richText": [["json.NewDecoder(reader)", [["c"]]], [" creates a "], ["*json.Decoder", [["c"]]], [". A reader supplies bytes, for example from a string, file, or HTTP request body. "], ["decoder.Decode(&value)", [["c"]]], [" reads the next JSON value into that destination."]]},
        {"id": "json-encoder", "type": "bulleted_list", "richText": [["json.NewEncoder(writer)", [["c"]]], [" creates a "], ["*json.Encoder", [["c"]]], [". A writer accepts bytes. "], ["encoder.Encode(value)", [["c"]]], [" writes JSON and adds a newline."]]},
        { id: "j-stream-example", type: 'example', example: {
            title: "String reader to decoder, value to writer",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "log"
    "os"
    "strings"
)

type Book struct {
    Title string \`json:"title"\`
}

func main() {
    reader := strings.NewReader(\`{"title":"Go notes"}\`)
    decoder := json.NewDecoder(reader)
    var book Book
    if err := decoder.Decode(&book); err != nil {
        log.Fatal(err)
    }
    encoder := json.NewEncoder(os.Stdout)
    if err := encoder.Encode(book); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "go run main.go",
            result: "{\"title\":\"Go notes\"}\n",
            explanation: ["strings.NewReader wraps a Go string as a reader. NewDecoder returns an object stored in decoder.", "Decode is a method on decoder, not on the input string. Its &book argument lets it fill book.", "os.Stdout is the process’s standard output writer. NewEncoder stores that destination in encoder.", "Encode is a method on encoder. It receives the Go value, then writes its JSON plus a newline.", "Marshal and Unmarshal work with byte slices. Encoder and Decoder work with reader and writer objects."],
        } },
        {"id": "j-numbers-heading", "type": "sub_header", "richText": [["UseNumber and numeric precision"]]},
        {"id": "json-numbers", "type": "bulleted_list", "richText": [["JSON numbers decoded into any normally become float64. That type cannot represent every large integer exactly. A typed integer destination avoids that float conversion and reports overflow."]]},
        {"id": "json-use-number", "type": "bulleted_list", "richText": [["Calling "], ["decoder.UseNumber()", [["c"]]], [" before Decode keeps numbers in interface values as "], ["json.Number", [["c"]]], [". This is a string-based Go type that preserves the number’s text."]]},
        { id: "j-number-example", type: 'example', example: {
            title: "Large integer with UseNumber",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    "strings"
)

func main() {
    decoder := json.NewDecoder(strings.NewReader(\`{"id":9007199254740993}\`))
    decoder.UseNumber()
    var object map[string]any
    if err := decoder.Decode(&object); err != nil {
        log.Fatal(err)
    }
    number, ok := object["id"].(json.Number)
    if !ok {
        log.Fatal("id is not a number")
    }
    id, err := number.Int64()
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(number.String())
    fmt.Println(id)

    fraction := json.Number("1.5")
    value, err := fraction.Float64()
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(value)
}`,
            commands: "go run main.go",
            result: "9007199254740993\n9007199254740993\n1.5",
            explanation: ["UseNumber configures this decoder before it reads the input. It does not change every JSON operation in the program.", "object[\"id\"].(json.Number) uses a two-result type assertion. ok is false if the dynamic value has another Go type.", "number.String() returns the original numeric text. number.Int64() parses it as a signed 64-bit integer and returns a value plus an error.", "Int64 fails for a fraction or an integer outside its range. Float64 converts to floating point and can fail for invalid text or an out-of-range value.", "UseNumber preserves the source number until a conversion is chosen. Converting it to float64 can still lose integer precision."],
        } },
        {"id": "j-raw-heading", "type": "sub_header", "richText": [["RawMessage and deferred decoding"]]},
        {"id": "json-raw", "type": "bulleted_list", "richText": [["json.RawMessage", [["c"]]], [" stores a JSON fragment as bytes. A program can decode the surrounding object first, inspect a type field, and decode the fragment into the matching Go type later."]]},
        { id: "j-raw-example", type: 'example', example: {
            title: "Envelope and typed payload",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
)

type Message struct {
    Kind string          \`json:"kind"\`
    Data json.RawMessage \`json:"data"\`
}

type Book struct {
    Title string \`json:"title"\`
}

func main() {
    data := []byte(\`{"kind":"book","data":{"title":"Go notes"}}\`)
    var message Message
    if err := json.Unmarshal(data, &message); err != nil {
        log.Fatal(err)
    }
    if message.Kind != "book" {
        log.Fatal("unsupported message kind")
    }
    var book Book
    if err := json.Unmarshal(message.Data, &book); err != nil {
        log.Fatal(err)
    }
    fmt.Println(book.Title)
}`,
            commands: "go run main.go",
            result: "Go notes",
            explanation: ["The first Unmarshal fills Kind and keeps the data object in message.Data as JSON bytes.", "The kind check selects the payload shape. The second Unmarshal decodes that fragment into Book.", "RawMessage delays conversion of the fragment. It does not bypass JSON syntax checking of the surrounding document."],
        } },
        {"id": "j-strict-heading", "type": "sub_header", "richText": [["Unknown fields and document boundaries"]]},
        {"id": "json-unknown", "type": "bulleted_list", "richText": [["Unknown object keys are ignored by default when decoding into a struct. "], ["decoder.DisallowUnknownFields()", [["c"]]], [" makes that decoder reject them."]]},
        {"id": "json-trailing", "type": "bulleted_list", "richText": [["One successful Decode reads one JSON value. It does not prove that the input ends there. For a single document, another Decode must return "], ["io.EOF", [["c"]]], [", meaning the reader has no more input."]]},
        { id: "json-strict", type: 'example', example: {
            title: "One document with known struct fields",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "io"
    "strings"
)

type Book struct {
    Title string \`json:"title"\`
}

func decodeBook(text string) (Book, error) {
    decoder := json.NewDecoder(strings.NewReader(text))
    decoder.DisallowUnknownFields()
    var book Book
    if err := decoder.Decode(&book); err != nil {
        return Book{}, err
    }
    var extra any
    if err := decoder.Decode(&extra); err != io.EOF {
        if err != nil {
            return Book{}, err
        }
        return Book{}, fmt.Errorf("expected one JSON value")
    }
    return book, nil
}

func main() {
    inputs := []string{
        \`{"title":"Go"}\`,
        \`{"title":"Go","extra":1}\`,
        \`{"title":"Go"} {}\`,
    }
    for _, input := range inputs {
        book, err := decodeBook(input)
        if err != nil {
            fmt.Println(err)
            continue
        }
        fmt.Println(book.Title)
    }
}`,
            commands: "go run main.go",
            result: "Go\njson: unknown field \"extra\"\nexpected one JSON value",
            explanation: ["decodeBook returns a Book and an error. Book{} is an empty struct value used on failure paths.", "The first Decode rejects unknown fields because DisallowUnknownFields was called on this decoder.", "The second Decode tries to read another value. io.EOF is the expected result after one valid document and any trailing whitespace.", "A second object produces nil from the second Decode, so decodeBook creates its own extra-value error. Malformed trailing text produces a decoding error instead.", "continue moves the loop to its next input after displaying a failure. An empty title still requires a separate application rule."],
        } },
        {"id": "json-errors", "type": "sub_header", "richText": [["Errors and syntax checks"]]},
        {"id": "json-invalid", "type": "bulleted_list", "richText": [["Malformed JSON and values incompatible with the destination produce different errors. A failed type conversion may already have changed other fields. The partial result is not a validated application value."]]},
        {"id": "json-unsupported", "type": "bulleted_list", "richText": [["Functions, channels, cyclic values, NaN, and infinity cannot be marshaled as ordinary JSON values. Marshal returns an error instead."]]},
        {"id": "json-valid", "type": "bulleted_list", "richText": [["json.Valid(data)", [["c"]]], [" returns a boolean for JSON syntax only. It does not check destination types, required keys, or application rules."]]},
        { id: "j-error-example", type: 'example', example: {
            title: "Syntax, type, and encoding failures",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "errors"
    "fmt"
)

type Book struct {
    Pages int \`json:"pages"\`
}

func main() {
    var book Book
    err := json.Unmarshal([]byte(\`{"pages":\`), &book)
    var syntax *json.SyntaxError
    fmt.Println("syntax error:", errors.As(err, &syntax))

    err = json.Unmarshal([]byte(\`{"pages":"many"}\`), &book)
    var mismatch *json.UnmarshalTypeError
    fmt.Println("type error:", errors.As(err, &mismatch))

    _, err = json.Marshal(func() {})
    var unsupported *json.UnsupportedTypeError
    fmt.Println("unsupported type:", errors.As(err, &unsupported))

    fmt.Println("valid syntax:", json.Valid([]byte(\`{"pages":"many"}\`)))
}`,
            commands: "go run main.go",
            result: "syntax error: true\ntype error: true\nunsupported type: true\nvalid syntax: true",
            explanation: ["errors.As checks whether an error contains the requested Go error type. The pointer argument lets it store that typed error if found.", "The first input stops before its value and closing brace. It is invalid JSON syntax.", "The second input is valid JSON but cannot fill an int with the string \"many\". That produces an UnmarshalTypeError.", "func() {} creates a function value. Marshal cannot encode a function, so it returns an UnsupportedTypeError. _ discards its unusable byte result.", "Valid returns true for the second input because syntax is valid. It does not know the intended Book type."],
        } },
        {"id": "j-matching-heading", "type": "sub_header", "richText": [["Duplicate keys and case matching"]]},
        {"id": "json-duplicates", "type": "bulleted_list", "richText": [["Duplicate object keys are processed in order. Later values replace or merge with earlier values depending on the destination type."]]},
        {"id": "json-case", "type": "bulleted_list", "richText": [["Struct key matching accepts case-insensitive matches. DisallowUnknownFields does not reject duplicate keys or require exact letter case."]]},
        { id: "j-matching-example", type: 'example', example: {
            title: "Repeated key and uppercase key",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    "strings"
)

type Book struct {
    Title string \`json:"title"\`
}

func main() {
    inputs := []string{
        \`{"title":"first","title":"last"}\`,
        \`{"TITLE":"uppercase key"}\`,
    }
    for _, input := range inputs {
        var book Book
        decoder := json.NewDecoder(strings.NewReader(input))
        decoder.DisallowUnknownFields()
        if err := decoder.Decode(&book); err != nil {
            log.Fatal(err)
        }
        fmt.Println(book.Title)
    }
}`,
            commands: "go run main.go",
            result: "last\nuppercase key",
            explanation: ["For the string field Title, the later duplicate value replaces the first.", "TITLE matches the tagged key title without exact letter case. Neither input contains an unknown field under these rules.", "Rejecting unknown fields is narrower than rejecting duplicate keys or enforcing exact case. These defaults belong to encoding/json, not every JSON decoder."],
        } },
        {"id": "j-custom-heading", "type": "sub_header", "richText": [["Custom JSON methods"]]},
        {"id": "json-custom", "type": "bulleted_list", "richText": [["A type can define "], ["MarshalJSON() ([]byte, error)", [["c"]]], [" to choose its JSON output. A pointer receiver can define "], ["UnmarshalJSON([]byte) error", [["c"]]], [" to fill the value during decoding. The package calls these methods when the type implements their contracts."]]},
        { id: "j-custom-example", type: 'example', example: {
            title: "Custom string encoding and decoding",
            language: "go",
            description: ["This standalone program is saved as main.go. It uses only Go standard-library packages.", "Each example replaces the previous main.go rather than adding a second main function."],
            code: `package main

import (
    "encoding/json"
    "fmt"
    "log"
    "strings"
)

type Label string

func (label Label) MarshalJSON() ([]byte, error) {
    return json.Marshal(strings.ToUpper(string(label)))
}

func (label *Label) UnmarshalJSON(data []byte) error {
    var text string
    if err := json.Unmarshal(data, &text); err != nil {
        return err
    }
    *label = Label(strings.ToLower(text))
    return nil
}

func main() {
    data, err := json.Marshal(Label("Go"))
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(string(data))

    var label Label
    if err := json.Unmarshal([]byte(\`"HELLO"\`), &label); err != nil {
        log.Fatal(err)
    }
    fmt.Println(label)
}`,
            commands: "go run main.go",
            result: "\"GO\"\nhello",
            explanation: ["type Label string declares a distinct Go type based on string. Label(\"Go\") converts a string to that type.", "(label Label) is a value receiver: MarshalJSON is a method of Label. The package calls it during Marshal.", "string(label) converts back to an ordinary string before json.Marshal is called inside the method. That avoids calling Label.MarshalJSON recursively and lets the package handle quoting and escaping.", "(label *Label) is a pointer receiver. UnmarshalJSON receives the destination address so it can assign through *label.", "The decode method first decodes into an ordinary Go string. It then lowercases the text and converts it to Label. JSON null also succeeds here: text stays empty, so this custom method assigns an empty Label.", "Custom methods are useful for a distinct representation rule. Ordinary fields and tags are simpler when their default mapping is sufficient."],
        } },
        {"id": "json-references", "type": "sub_header", "richText": [["References"]]},
        {"id": "json-source", "type": "bulleted_list", "richText": [["encoding/json API and behavior", [["a", "https://pkg.go.dev/encoding/json"]]]]},
        {"id": "json-v2-source", "type": "bulleted_list", "richText": [["encoding/json/v2 differences", [["a", "https://pkg.go.dev/encoding/json/v2"]]]]},
    ],
} as const satisfies GoNote;

export default note;
