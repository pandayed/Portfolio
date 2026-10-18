import type { GoNote } from '../types';

const note = {
    notionId: 'go-encoding-json',
    slug: 'encoding-json',
    title: 'encoding/json',
    updatedOn: '2026-10-18',
    blocks: [
        { id: 'json-conversion', type: 'sub_header', richText: [['Go values and JSON']] },
        { id: 'json-role', type: 'bulleted_list', richText: [['encoding/json', [['c']]], [' is a standard-library package. It converts Go values to JSON and JSON back to Go values.']] },
        { id: 'json-scope', type: 'bulleted_list', richText: [['These notes use the encoding/json import path. The separate encoding/json/v2 package has different defaults.']] },
        { id: 'json-marshal', type: 'bulleted_list', richText: [['json.Marshal', [['c']]], [' encodes a Go value and returns JSON as []byte plus an error.']] },
        { id: 'json-unmarshal', type: 'bulleted_list', richText: [['json.Unmarshal', [['c']]], [' decodes JSON bytes into a destination. It needs a non-nil pointer so it can change that destination.']] },
        { id: 'json-indent', type: 'bulleted_list', richText: [['json.MarshalIndent', [['c']]], [' adds indentation for readable output. It does not change the data.']] },

        { id: 'json-fields', type: 'sub_header', richText: [['Struct fields and tags']] },
        { id: 'json-exported', type: 'bulleted_list', richText: [['Only exported struct fields participate. Without a tag, the JSON key uses the Go field name.']] },
        { id: 'json-tag', type: 'bulleted_list', richText: [['json:"name"', [['c']]], [' changes the JSON key. '], ['json:"-"', [['c']]], [' excludes the field.']] },
        { id: 'json-omitempty', type: 'bulleted_list', richText: [['omitempty', [['c']]], [' omits false, zero, nil pointers or interfaces, and empty strings, arrays, slices, or maps during encoding.']] },
        { id: 'json-empty-struct', type: 'bulleted_list', richText: [['A struct value is not empty under omitempty. A pointer can represent an optional nested struct.']] },
        { id: 'json-absent', type: 'bulleted_list', richText: [['An absent key leaves the destination field unchanged. In a newly declared struct, that field keeps its zero value.']] },
        { id: 'json-null', type: 'bulleted_list', richText: [['JSON null sets a pointer, slice, map, or interface to nil. For other Go types, null leaves the value unchanged without an error.']] },
        { id: 'json-pointer', type: 'bulleted_list', richText: [['In a fresh struct, a pointer distinguishes an omitted or null field from an explicit zero. Distinguishing omission from null needs extra presence tracking.']] },
        {
            id: 'json-roundtrip', type: 'example', example: {
                title: 'A struct becomes JSON and returns to Go', language: 'go',
                description: ['The example requires Go and no external packages.', 'The code is saved as main.go. The command runs that file.'],
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
}

func main() {
    data, err := json.Marshal(Book{Title: "Go notes", Draft: true})
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(string(data))

    var book Book
    if err := json.Unmarshal(data, &book); err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%s | %d | %t\\n", book.Title, book.Pages, book.Draft)
}`,
                commands: 'go run main.go',
                result: '{"title":"Go notes"}\nGo notes | 0 | false',
                explanation: ['Pages is zero, so omitempty excludes it. Draft is always excluded by its tag.', 'The decoded Book is a new value. Its absent fields retain their zero values.', 'string(data) displays the JSON bytes as text.'],
            },
        },

        { id: 'json-types', type: 'sub_header', richText: [['Known and dynamic data shapes']] },
        { id: 'json-typed', type: 'bulleted_list', richText: [['A struct describes known keys and field types. A slice describes a JSON array. A map describes keys chosen at runtime.']] },
        { id: 'json-any', type: 'bulleted_list', richText: [['Decoding into any produces map[string]any for objects, []any for arrays, float64 for numbers, and nil for null. Strings and booleans keep their corresponding Go types.']] },
        { id: 'json-numbers', type: 'bulleted_list', richText: [['Large integers can lose precision when decoded as float64. A typed integer field avoids that conversion and reports overflow.']] },
        { id: 'json-use-number', type: 'bulleted_list', richText: [['Decoder.UseNumber()', [['c']]], [' keeps numbers in interface values as json.Number. Its Int64 or Float64 methods return conversion errors when applicable.']] },
        { id: 'json-raw', type: 'bulleted_list', richText: [['json.RawMessage', [['c']]], [' keeps a JSON fragment as bytes. It allows a later decoding step after a field identifies the payload type.']] },
        { id: 'json-nil', type: 'bulleted_list', richText: [['A nil slice or map encodes as null. A non-nil empty slice encodes as []; a non-nil empty map encodes as {}.']] },
        { id: 'json-bytes', type: 'bulleted_list', richText: [['[]byte is a special case: it encodes as a base64 string rather than an array of numbers.']] },

        { id: 'json-streams', type: 'sub_header', richText: [['Readers, writers, and decoding boundaries']] },
        { id: 'json-decoder', type: 'bulleted_list', richText: [['json.NewDecoder', [['c']]], [' reads from an io.Reader, such as a file or request body. Decode reads the next JSON value.']] },
        { id: 'json-encoder', type: 'bulleted_list', richText: [['json.NewEncoder', [['c']]], [' writes to an io.Writer. Encode adds a newline after the JSON value.']] },
        { id: 'json-trailing', type: 'bulleted_list', richText: [['One successful Decode does not prove the input contains only one value. For a single document, a second Decode must return io.EOF.']] },
        { id: 'json-unknown', type: 'bulleted_list', richText: [['Unknown object keys are ignored by default. '], ['DisallowUnknownFields()', [['c']]], [' rejects them when decoding into a struct.']] },
        {
            id: 'json-strict', type: 'example', example: {
                title: 'A decoder accepts exactly one document', language: 'go',
                description: ['The code is saved as a separate main.go and uses only standard-library packages.', 'The input contains one object. Unknown fields and additional JSON values are rejected.'],
                code: `package main

import (
    "encoding/json"
    "fmt"
    "io"
    "log"
    "strings"
)

func main() {
    var input struct {
        Title string \`json:"title"\`
    }
    decoder := json.NewDecoder(strings.NewReader(\`{"title":"Go notes"}\`))
    decoder.DisallowUnknownFields()
    if err := decoder.Decode(&input); err != nil {
        log.Fatal(err)
    }

    var extra any
    if err := decoder.Decode(&extra); err != io.EOF {
        if err != nil {
            log.Fatal(err)
        }
        log.Fatal("expected one JSON value")
    }
    fmt.Println(input.Title)
}`,
                commands: 'go run main.go', result: 'Go notes',
                explanation: ['A second object after the first one reaches the explicit extra-value error.', 'Malformed trailing content produces a decoding error.', 'This checks the document shape. An empty title still needs an application validation rule.'],
            },
        },

        { id: 'json-errors', type: 'sub_header', richText: [['Errors and input rules']] },
        { id: 'json-invalid', type: 'bulleted_list', richText: [['Malformed JSON and incompatible destination types produce errors. A failed decode may already have changed some destination fields; discard the partial result.']] },
        { id: 'json-unsupported', type: 'bulleted_list', richText: [['Functions, channels, cyclic values, NaN, and infinity cannot be marshaled as ordinary JSON values.']] },
        { id: 'json-valid', type: 'bulleted_list', richText: [['json.Valid', [['c']]], [' checks syntax only. It does not check required keys, allowed values, or application rules.']] },
        { id: 'json-duplicates', type: 'bulleted_list', richText: [['Duplicate object keys are processed in order. Later values replace or merge with earlier values, depending on the destination type.']] },
        { id: 'json-case', type: 'bulleted_list', richText: [['Struct key matching accepts case-insensitive matches. DisallowUnknownFields does not reject duplicate keys or require exact letter case.']] },
        { id: 'json-custom', type: 'bulleted_list', richText: [['MarshalJSON and UnmarshalJSON methods define a type’s custom JSON representation. Ordinary types and tags are enough when the default mapping fits.']] },
        { id: 'json-references', type: 'sub_header', richText: [['References']] },
        { id: 'json-source', type: 'bulleted_list', richText: [['encoding/json API and behavior', [['a', 'https://pkg.go.dev/encoding/json']]]] },
        { id: 'json-v2-source', type: 'bulleted_list', richText: [['encoding/json/v2 differences', [['a', 'https://pkg.go.dev/encoding/json/v2']]]] },
    ],
} as const satisfies GoNote;

export default note;
