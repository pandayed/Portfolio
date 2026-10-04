import type { GoNote } from '../types';

const note = {
    "notionId": "2ef24eb1-ed54-809e-8b5d-f92ac35da6cc",
    "slug": "go-by-questions",
    "title": "Go by Questions",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "questions-revision-intro",
            "type": "text",
            "richText": [
                [
                    "Use these 100 questions for revision. Each answer gives the rule or edge case, with links to the main explanations. Beginner and Medium cover common language use; Hard and Expert add runtime, tooling and API details."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81aa-8f77-eea71868dd94",
            "type": "header",
            "richText": [
                [
                    "Beginner"
                ]
            ]
        },
        {
            "id": "question-B01",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B01 — What is a Go package, and what must a runnable (executable) program contain?"
                ]
            ]
        },
        {
            "id": "question-B01-answer",
            "type": "text",
            "richText": [
                [
                    "A package groups Go source files into a namespace. A runnable program needs package main and func main() with no parameters or results. Identifiers beginning with an uppercase letter are exported."
                ]
            ]
        },
        {
            "id": "question-B01-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Packages",
                    [
                        [
                            "a",
                            "#/notes/go/packages"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B02",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B02 — How do import forms work, including aliases and blank imports?"
                ]
            ]
        },
        {
            "id": "question-B02-answer",
            "type": "text",
            "richText": [
                [
                    "A regular import uses the imported package name. An alias changes that name locally. A dot import brings exported names into the file scope. A blank import runs package initialization without introducing a usable name."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81f2-8d70-f874d0b8945e",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    f \"fmt\"\n    _ \"net/http/pprof\" // registers profiling handlers\n)\n\nfunc main() { f.Println(\"ok\") }"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B02-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Packages",
                    [
                        [
                            "a",
                            "#/notes/go/packages"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B03",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B03 — What is the difference between var declarations and := short variable declarations?"
                ]
            ]
        },
        {
            "id": "question-B03-answer",
            "type": "text",
            "richText": [
                [
                    "var works at package or function scope and can declare a type without an initializer. := works inside functions and infers types. In the same block, it can reassign existing variables only when at least one non-blank variable is new and existing types match."
                ]
            ]
        },
        {
            "id": "question-B03-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Constants & Variables",
                    [
                        [
                            "a",
                            "#/notes/go/constants-variables"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B04",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B04 — How do const and iota work?"
                ]
            ]
        },
        {
            "id": "question-B04-answer",
            "type": "text",
            "richText": [
                [
                    "const declares constant values. iota starts at zero in each const declaration and increments for each constant specification, including skipped entries. An untyped numeric constant can fit different numeric types if its value is representable."
                ]
            ]
        },
        {
            "id": "question-B04-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Constants & Variables",
                    [
                        [
                            "a",
                            "#/notes/go/constants-variables"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Iota & Flags",
                    [
                        [
                            "a",
                            "#/notes/go/const-iota"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B04-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Iota specification",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Iota"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B05",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B05 — What are Go’s basic built-in types and their zero values?"
                ]
            ]
        },
        {
            "id": "question-B05-answer",
            "type": "text",
            "richText": [
                [
                    "Numeric types default to 0, bool to false, and string to \"\". Pointers, slices, maps, channels, functions and interfaces default to nil. Array elements and struct fields get their own zero values. byte aliases uint8; rune aliases int32."
                ]
            ]
        },
        {
            "id": "question-B05-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Zero Values",
                    [
                        [
                            "a",
                            "#/notes/go/zero-values"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B06",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B06 — What’s the difference between a defined type and a type alias, and how do conversions work?"
                ]
            ]
        },
        {
            "id": "question-B06-answer",
            "type": "text",
            "richText": [
                [
                    "type MyInt int defines a distinct type with underlying type int. Converting an int variable to MyInt requires an explicit conversion. type MyInt = int is an alias for the same type. Go does not implicitly convert between different numeric variable types."
                ]
            ]
        },
        {
            "id": "question-B06-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Defined type and type alias",
                    [
                        [
                            "a",
                            "#/notes/go/defined-type-and-type-alias"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B07",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B07 — How do if, for, and switch work in Go?"
                ]
            ]
        },
        {
            "id": "question-B07-answer",
            "type": "text",
            "richText": [
                [
                    "if can start with a short statement scoped to its branches. for supports counted, condition-only, infinite and range loops. switch selects a matching case and does not fall through automatically. Explicit fallthrough runs the next case body without testing its condition."
                ]
            ]
        },
        {
            "id": "question-B07-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "If, else & switch",
                    [
                        [
                            "a",
                            "#/notes/go/if-else-switch"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Range & For Loops",
                    [
                        [
                            "a",
                            "#/notes/go/range-for-loops"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B08",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B08 — How do multiple return values work, and what is the blank identifier _?"
                ]
            ]
        },
        {
            "id": "question-B08-answer",
            "type": "text",
            "richText": [
                [
                    "Functions can return several values, often a result and an error. Assign them to separate variables. The blank identifier _ discards a value; discarding an error should be a deliberate choice."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8185-bfe7-e37cff162f59",
            "type": "code",
            "richText": [
                [
                    "v, err := strconv.Atoi(\"42\")\nif err != nil { panic(err) }\nfmt.Println(v) // 42\n\n_, err = strconv.Atoi(\"bad\") // discard the result, retain the error\nfmt.Println(err != nil) // true"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B08-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Functions",
                    [
                        [
                            "a",
                            "#/notes/go/functions"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B09",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B09 — What are named return values and “naked returns,” and when should you avoid them?"
                ]
            ]
        },
        {
            "id": "question-B09-answer",
            "type": "text",
            "richText": [
                [
                    "Named results are variables declared by the function signature and initialized to zero values. A bare return returns their current values. Explicit return expressions are easier to follow when a function has several branches or many lines."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8198-aea9-f8e5dbefcfb6",
            "type": "code",
            "richText": [
                [
                    "func div(a, b int) (q int, err error) {\n    if b == 0 { return 0, fmt.Errorf(\"divide by zero\") }\n    q = a / b\n    return // returns q, err\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B09-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Functions",
                    [
                        [
                            "a",
                            "#/notes/go/functions"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B10",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B10 — What does defer do, and in what order do deferred calls run?"
                ]
            ]
        },
        {
            "id": "question-B10-answer",
            "type": "text",
            "richText": [
                [
                    "defer runs a call when the surrounding function returns, including while a panic unwinds it. Deferred calls run last-in, first-out. The function value and arguments are evaluated when the defer statement executes."
                ]
            ]
        },
        {
            "id": "question-B10-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Defer",
                    [
                        [
                            "a",
                            "#/notes/go/defer"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B11",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B11 — What is Go’s idiomatic error handling pattern?"
                ]
            ]
        },
        {
            "id": "question-B11-answer",
            "type": "text",
            "richText": [
                [
                    "Return an error for expected failures and check it before using the result. Add useful operation context when propagating it. Returning a wrapped error preserves its cause for callers."
                ]
            ]
        },
        {
            "id": "question-B11-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Errors",
                    [
                        [
                            "a",
                            "#/notes/go/errors"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B12",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B12 — What is the difference between panic and returning an error? How does recover work?"
                ]
            ]
        },
        {
            "id": "question-B12-answer",
            "type": "text",
            "richText": [
                [
                    "An error lets the caller decide how to handle a failure. panic unwinds the current goroutine. recover can stop that unwind only when called directly by a deferred function in the same goroutine. If that deferred call recovers the panic, the containing function returns to its caller; execution does not resume at the panic site."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8120-a301-c0bfdaab0556",
            "type": "code",
            "richText": [
                [
                    "func safe() (err error) {\n    defer func() {\n        if r := recover(); r != nil {\n            err = fmt.Errorf(\"panic: %v\", r)\n        }\n    }()\n    panic(\"broken invariant\")\n}\n// safe() returns an error with text \"panic: broken invariant\"."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B12-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Panic & Recover",
                    [
                        [
                            "a",
                            "#/notes/go/panic-recover"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B13",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B13 — Arrays vs slices: how are they different semantically?"
                ]
            ]
        },
        {
            "id": "question-B13-answer",
            "type": "text",
            "richText": [
                [
                    "An array has a length in its type and assignment copies its elements. A slice value describes a portion of an underlying array. Assigning a slice copies that description, so both slices may still share elements."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-813b-a9bd-f50fb0627150",
            "type": "code",
            "richText": [
                [
                    "a := [3]int{1, 2, 3}\nb := a\nb[0] = 99\n// a[0] == 1, b[0] == 99 (array copy)\n\ns := []int{1, 2, 3}\nt := s\nt[0] = 99\n// s[0] == 99, t[0] == 99 (shared backing array)"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B13-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Slices & Arrays",
                    [
                        [
                            "a",
                            "#/notes/go/slices-arrays"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B14",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B14 — How do len, cap, make, and append work for slices?"
                ]
            ]
        },
        {
            "id": "question-B14-answer",
            "type": "text",
            "richText": [
                [
                    "len is the visible element count; cap is the remaining capacity from the slice start in its backing array. make sets the initial length and optional capacity. append returns the updated slice and allocates a new backing array when capacity is insufficient."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-810c-a720-c521a1374419",
            "type": "code",
            "richText": [
                [
                    "s := make([]int, 0, 2)\ns = append(s, 1, 2)\ns = append(s, 3) // capacity is exhausted, so append allocates a new backing array"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B14-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Slices & Arrays",
                    [
                        [
                            "a",
                            "#/notes/go/slices-arrays"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B15",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B15 — How do maps work, including the “comma ok” idiom and delete?"
                ]
            ]
        },
        {
            "id": "question-B15-answer",
            "type": "text",
            "richText": [
                [
                    "A map associates comparable keys with values. m[k] returns the value or its zero value; v, ok := m[k] also reports whether the key exists. delete is safe for absent keys and nil maps. Reading a nil map is safe; assigning an entry panics."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-818d-ab18-d267afe035b3",
            "type": "code",
            "richText": [
                [
                    "var m map[string]int\nv, ok := m[\"x\"]\nfmt.Println(v, ok) // 0 false\n\nm = make(map[string]int)\nm[\"x\"] = 1\nv, ok = m[\"x\"]\nfmt.Println(v, ok) // 1 true\ndelete(m, \"x\")"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B15-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Maps",
                    [
                        [
                            "a",
                            "#/notes/go/maps"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B16",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B16 — How do strings, bytes, and runes work in Go?"
                ]
            ]
        },
        {
            "id": "question-B16-answer",
            "type": "text",
            "richText": [
                [
                    "A string is an immutable sequence of bytes; UTF-8 validity is not required. Indexing gives a byte and len counts bytes. rune aliases int32. Ranging over a string decodes UTF-8 into runes and reports byte indices. Invalid UTF-8 yields the replacement rune with a one-byte advance."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8150-9848-e290d54a4830",
            "type": "code",
            "richText": [
                [
                    "s := \"€\"\nfmt.Println(len(s)) // 3 bytes in UTF-8\n\nfor i, r := range s {\n    fmt.Println(i, r) // i is byte index, r is rune\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B17",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B17 — What is a struct, and how do composite literals work?"
                ]
            ]
        },
        {
            "id": "question-B17-answer",
            "type": "text",
            "richText": [
                [
                    "A struct groups named fields. A keyed literal such as User{Name: \"Ada\"} makes field choices clear and leaves omitted fields at zero values. An unkeyed literal depends on field order. Function-valued fields are allowed; methods are declared separately."
                ]
            ]
        },
        {
            "id": "question-B17-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Struct",
                    [
                        [
                            "a",
                            "#/notes/go/struct"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B18",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B18 — How do pointers work in Go, and when are they nil?"
                ]
            ]
        },
        {
            "id": "question-B18-answer",
            "type": "text",
            "richText": [
                [
                    "&x takes an address, *p accesses the pointed-to value, and *T is a pointer type. A pointer starts as nil unless initialized. Dereferencing nil panics. Ordinary Go pointers do not support arithmetic."
                ]
            ]
        },
        {
            "id": "question-B18-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Pointers",
                    [
                        [
                            "a",
                            "#/notes/go/pointers"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B19",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B19 — What is a method in Go, and what is a receiver?"
                ]
            ]
        },
        {
            "id": "question-B19-answer",
            "type": "text",
            "richText": [
                [
                    "A method is a function with a receiver, such as func (c *Counter) Inc(). Its receiver base must be a defined type in the same package, rather than a pointer or interface type. Receiver choice also affects method sets and mutation."
                ]
            ]
        },
        {
            "id": "question-B19-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Methods",
                    [
                        [
                            "a",
                            "#/notes/go/methods"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B20",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B20 — What is an interface, and how does implicit implementation work?"
                ]
            ]
        },
        {
            "id": "question-B20-answer",
            "type": "text",
            "richText": [
                [
                    "A value interface describes required methods. A type implements it implicitly by having those methods. any aliases interface{} and accepts any value. Interfaces with type-set terms serve as generic constraints rather than ordinary value types."
                ]
            ]
        },
        {
            "id": "question-B20-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Interfaces",
                    [
                        [
                            "a",
                            "#/notes/go/interfaces"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B21",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B21 — What are type assertions and type switches?"
                ]
            ]
        },
        {
            "id": "question-B21-answer",
            "type": "text",
            "richText": [
                [
                    "x.(T) checks an interface value against T. The comma-ok form avoids a panic if the assertion fails; T can also be an interface. A type switch selects a branch using the interface value’s dynamic type."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-813d-adde-ce90278cd327",
            "type": "code",
            "richText": [
                [
                    "var x any = 42\n\nif v, ok := x.(int); ok {\n    fmt.Println(v)\n}\n\nswitch v := x.(type) {\ncase int:\n    fmt.Println(\"int\", v)\ncase string:\n    fmt.Println(\"string\", v)\ndefault:\n    fmt.Println(\"other\")\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B21-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Interfaces",
                    [
                        [
                            "a",
                            "#/notes/go/interfaces"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B22",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B22 — What is embedding, and how is it different from inheritance?"
                ]
            ]
        },
        {
            "id": "question-B22-answer",
            "type": "text",
            "richText": [
                [
                    "An embedded field can promote selectors from its type. Embedding composes values rather than creating a subtype. Accessibility, ambiguous names and the outer type’s method set determine which promoted selectors are available."
                ]
            ]
        },
        {
            "id": "question-B22-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Embeddings",
                    [
                        [
                            "a",
                            "#/notes/go/embeddings"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B23",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B23 — What’s the difference between new and make?"
                ]
            ]
        },
        {
            "id": "question-B23-answer",
            "type": "text",
            "richText": [
                [
                    "new(T) returns *T pointing to a zero-initialized T. make creates a slice, map or channel value with the requested size or capacity. For example, new(map[string]int) points to a nil map, while make(map[string]int) creates a map that accepts entries."
                ]
            ]
        },
        {
            "id": "question-B23-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Pointers",
                    [
                        [
                            "a",
                            "#/notes/go/pointers"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B23-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "new reference",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/builtin#new"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B24",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B24 — What is a goroutine, and what is the key practical rule about shared memory?"
                ]
            ]
        },
        {
            "id": "question-B24-answer",
            "type": "text",
            "richText": [
                [
                    "A goroutine runs a function concurrently under the Go runtime. Synchronize accesses to shared data when at least one access writes it. Read-only sharing does not itself cause a race. Starting a goroutine does not wait for it to finish."
                ]
            ]
        },
        {
            "id": "question-B24-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Goroutines",
                    [
                        [
                            "a",
                            "#/notes/go/goroutines"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B25",
            "type": "sub_sub_header",
            "richText": [
                [
                    "B25 — How do channels work (buffered vs unbuffered), and what does close mean?"
                ]
            ]
        },
        {
            "id": "question-B25-answer",
            "type": "text",
            "richText": [
                [
                    "An unbuffered send waits for a receiver. A buffered send waits when the buffer is full; receives wait while an open channel is empty. close means no more sends. Receivers drain buffered values, then get the zero value with ok == false. Sending after close or closing twice panics."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-818e-a71b-c8d0d59f0503",
            "type": "code",
            "richText": [
                [
                    "ch := make(chan int, 2)\nch <- 1\nch <- 2\nclose(ch)\n\nfor v := range ch { // drains 1,2 then stops\n    fmt.Println(v)\n}\n\nv, ok := <-ch // v==0, ok==false (already closed and drained)\n_ = v; _ = ok"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-B25-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Channels",
                    [
                        [
                            "a",
                            "#/notes/go/channels"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8109-93b4-e34fd687f934",
            "type": "header",
            "richText": [
                [
                    "Medium"
                ]
            ]
        },
        {
            "id": "question-M01",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M01 — What is the context package for, and what are the rules for using it correctly?"
                ]
            ]
        },
        {
            "id": "question-M01-answer",
            "type": "text",
            "richText": [
                [
                    "Context carries cancellation, deadlines and request-scoped metadata across API calls. Pass ctx explicitly, normally first. Call a derived context’s cancel function to release resources. Cancellation is cooperative: the operation must observe it. Use private key types for metadata and explicit parameters for general options."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8163-a1a6-f5acb3cbfca1",
            "type": "code",
            "richText": [
                [
                    "func fetch(ctx context.Context, url string) error {\n    ctx, cancel := context.WithTimeout(ctx, 200*time.Millisecond)\n    defer cancel()\n    req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)\n    if err != nil { return err }\n    resp, err := http.DefaultClient.Do(req)\n    if err != nil { return err }\n    defer resp.Body.Close()\n    _, err = io.Copy(io.Discard, resp.Body)\n    return err\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M01-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Context and Timeout",
                    [
                        [
                            "a",
                            "#/notes/go/context-and-timeout"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M02",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M02 — How do init() functions work and in what order do they run?"
                ]
            ]
        },
        {
            "id": "question-M02-answer",
            "type": "text",
            "richText": [
                [
                    "Imported packages initialize before their importers. Within a package, variables initialize in dependency order, then each init function runs in source order. Across files, that order follows how files are presented to the compiler; build systems are encouraged to use lexical file order. main starts after initialization finishes."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81a1-ba64-ee8158f25f0b",
            "type": "code",
            "richText": [
                [
                    "var x = initial()\n\nfunc initial() int { return 7 }\nfunc init() { x++ }\n// x is 8 after this package finishes initialization."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M02-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "init() Function",
                    [
                        [
                            "a",
                            "#/notes/go/init-function"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M02-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Initialization specification",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Package_initialization"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M03",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M03 — How do Go modules resolve versions (Minimal Version Selection), and what is replace used for?"
                ]
            ]
        },
        {
            "id": "question-M03-answer",
            "type": "text",
            "richText": [
                [
                    "Minimal Version Selection chooses the highest required version of each module path in the build graph, rather than the newest published version. replace substitutes another version or a local directory. It does not add a requirement, and replacement directives in dependencies do not control the main module’s build."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8108-9463-eca60a746ca8",
            "type": "code",
            "richText": [
                [
                    "module example.com/app\n\ngo 1.22\n\nrequire example.com/lib v1.4.0\n\nreplace example.com/lib => ../lib"
                ]
            ],
            "language": "go.mod"
        },
        {
            "id": "question-M03-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "go.mod",
                    [
                        [
                            "a",
                            "#/notes/go/go-mod"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M04",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M04 — What is variable shadowing, and why is := a common source of bugs?"
                ]
            ]
        },
        {
            "id": "question-M04-answer",
            "type": "text",
            "richText": [
                [
                    "A declaration in an inner scope can shadow an outer variable. := inside an if or loop can therefore leave the outer value unchanged. Shadowing is valid syntax; a bug occurs when later code uses the wrong variable."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8131-ba2d-ee7a9ce212c2",
            "type": "code",
            "richText": [
                [
                    "func shadowed() error {\n    var err error\n    if true {\n        err := fmt.Errorf(\"inner failure\") // new variable\n        fmt.Println(err)\n    }\n    return err // BUG: returns nil and loses the failure\n}\n// Assign with err = ... to update the outer err, or return the inner err."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M04-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Constants & Variables",
                    [
                        [
                            "a",
                            "#/notes/go/constants-variables"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M05",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M05 — Value receiver vs pointer receiver: what are the exact semantics and typical rules?"
                ]
            ]
        },
        {
            "id": "question-M05-answer",
            "type": "text",
            "richText": [
                [
                    "A value receiver copies the receiver. A pointer receiver receives a pointer and can mutate the original. Copying a struct still copies references in its fields, so a value receiver may mutate shared slice or map contents. Avoid copying synchronization values and measure copy costs before choosing for performance."
                ]
            ]
        },
        {
            "id": "question-M05-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Methods",
                    [
                        [
                            "a",
                            "#/notes/go/methods"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M06",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M06 — What is a method set, and how does it affect interface satisfaction?"
                ]
            ]
        },
        {
            "id": "question-M06-answer",
            "type": "text",
            "richText": [
                [
                    "For a defined non-interface type T, T has its value-receiver methods; *T has both value- and pointer-receiver methods. An addressable value can call a pointer method through automatic address-taking. That convenience does not add the method to T’s method set for interface assignment."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81d7-9002-e77a8a18abc5",
            "type": "code",
            "richText": [
                [
                    "type I interface{ M() }\ntype T struct{}\nfunc (t *T) M() {}\n\nvar _ I = &T{} // ok\n// var _ I = T{} // compile error"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M06-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Methods",
                    [
                        [
                            "a",
                            "#/notes/go/methods"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M07",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M07 — What is the “typed nil in an interface” trap?"
                ]
            ]
        },
        {
            "id": "question-M07-answer",
            "type": "text",
            "richText": [
                [
                    "A nil interface has no dynamic type or value. Assigning a nil *MyErr gives the interface a dynamic type, so the interface is non-nil. Return a nil error explicitly on success rather than returning a typed nil pointer as error."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8156-bc41-dfb6052d2654",
            "type": "code",
            "richText": [
                [
                    "type MyErr struct{}\nfunc (*MyErr) Error() string { return \"x\" }\n\nvar p *MyErr = nil\nvar err error = p\nfmt.Println(err == nil) // false (typed nil)"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M07-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Interfaces",
                    [
                        [
                            "a",
                            "#/notes/go/interfaces"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M08",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M08 — What is the difference between a nil slice and an empty slice? When does it matter?"
                ]
            ]
        },
        {
            "id": "question-M08-answer",
            "type": "text",
            "richText": [
                [
                    "Both nil and non-nil empty slices have length zero and support range and append. Only the nil slice compares equal to nil. An empty slice can have spare capacity. For []int with encoding/json and no omission tags, nil encodes as null and a non-nil empty slice as []."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81de-9608-fb0139bedfdb",
            "type": "code",
            "richText": [
                [
                    "var a []int\nb := []int{}\nfmt.Println(a == nil, len(a)) // true 0\nfmt.Println(b == nil, len(b)) // false 0\naJSON, err := json.Marshal(a)\nif err != nil { panic(err) }\nbJSON, err := json.Marshal(b)\nif err != nil { panic(err) }\nfmt.Println(string(aJSON), string(bJSON)) // null []"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M08-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Slices & Arrays",
                    [
                        [
                            "a",
                            "#/notes/go/slices-arrays"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M09",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M09 — How can append accidentally overwrite data due to shared backing arrays?"
                ]
            ]
        },
        {
            "id": "question-M09-answer",
            "type": "text",
            "richText": [
                [
                    "append writes into the existing backing array when capacity permits. Another slice covering those positions observes the overwrite. A full slice expression such as base[:2:2] restricts capacity so the next append allocates; copying provides independent element storage."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81a7-8b23-f7fc1a56400c",
            "type": "code",
            "richText": [
                [
                    "base := []int{1, 2, 3, 4}\na := base[:2]      // [1 2], cap 4\nb := base[2:3]     // [3], shares backing array\n\na = append(a, 99)  // writes into base[2]\nfmt.Println(b[0])  // 99 (was 3)"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M09-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Slices & Arrays",
                    [
                        [
                            "a",
                            "#/notes/go/slices-arrays"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M10",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M10 — What does copy(dst, src) guarantee?"
                ]
            ]
        },
        {
            "id": "question-M10-answer",
            "type": "text",
            "richText": [
                [
                    "copy copies min(len(dst), len(src)) elements and handles overlapping source and destination correctly. It does not allocate a new destination or promise that the resulting slices are independent. Element values such as pointers are copied without cloning their targets."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8173-b312-c7dbd6004af7",
            "type": "code",
            "richText": [
                [
                    "s := []int{1, 2, 3, 4}\ncopy(s[1:], s[:3]) // overlapping copy\nfmt.Println(s)     // [1 1 2 3]"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M10-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Slices & Arrays",
                    [
                        [
                            "a",
                            "#/notes/go/slices-arrays"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M11",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M11 — What are the rules for closing channels, and what are the most common mistakes?"
                ]
            ]
        },
        {
            "id": "question-M11-answer",
            "type": "text",
            "richText": [
                [
                    "The sender-side owner should close only after every send has finished. With several senders, a coordinator waits for all of them before closing. A receiver usually cannot know that condition. Closure is a completion signal, not required cleanup for every channel."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8179-ac8e-f646404634a2",
            "type": "code",
            "richText": [
                [
                    "jobs := make(chan int)\nvar senders sync.WaitGroup\nsenders.Add(2)\nfor i := 0; i < 2; i++ {\n    go func(v int) {\n        defer senders.Done()\n        jobs <- v\n    }(i)\n}\ngo func() {\n    senders.Wait()\n    close(jobs) // both senders are finished\n}()\nfor job := range jobs { fmt.Println(job) }\n// Prints 0 and 1; either order is possible."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M11-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Channels",
                    [
                        [
                            "a",
                            "#/notes/go/channels"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M12",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M12 — How does select behave, including default?"
                ]
            ]
        },
        {
            "id": "question-M12-answer",
            "type": "text",
            "richText": [
                [
                    "select chooses one ready communication case uniformly pseudo-randomly when several are ready. With none ready, default runs immediately if present; otherwise select blocks. This provides no source-order priority or strict fairness guarantee. Repeating a default case without blocking can spin."
                ]
            ]
        },
        {
            "id": "question-M12-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Select",
                    [
                        [
                            "a",
                            "#/notes/go/select"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M13",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M13 — How do sync.WaitGroup rules prevent races and panics?"
                ]
            ]
        },
        {
            "id": "question-M13-answer",
            "type": "text",
            "richText": [
                [
                    "For the Add/Done pattern, register work before launching it and before Wait can observe a zero counter. Match every increment with Done. Do not copy a WaitGroup after use, and finish an earlier Wait before reusing it for a new batch. WaitGroup tracks completion rather than protecting shared mutations."
                ]
            ]
        },
        {
            "id": "question-M13-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "WaitGroup",
                    [
                        [
                            "a",
                            "#/notes/go/workgroups"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M14",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M14 — When should you use sync.Mutex vs sync.RWMutex?"
                ]
            ]
        },
        {
            "id": "question-M14-answer",
            "type": "text",
            "richText": [
                [
                    "Mutex grants one exclusive lock. RWMutex permits simultaneous readers but excludes writers. When a writer is waiting, later readers block; recursive RLock can therefore deadlock. Start with the simpler lock and benchmark realistic workloads before assuming RWMutex is faster."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8148-85fd-c784dee86a1f",
            "type": "code",
            "richText": [
                [
                    "var mu sync.RWMutex\nm := map[string]int{\"count\": 1}\nmu.RLock()\nv := m[\"count\"]\nmu.RUnlock()\nmu.Lock()\nm[\"count\"] = v + 1\nmu.Unlock()\n// Individual accesses are protected. A read-modify-write invariant\n// would require holding one exclusive lock across both accesses."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M14-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Mutex",
                    [
                        [
                            "a",
                            "#/notes/go/mutex"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "RWMutex",
                    [
                        [
                            "a",
                            "#/notes/go/rwmutex"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M15",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M15 — How does error wrapping work with %w, errors.Is, and errors.As?"
                ]
            ]
        },
        {
            "id": "question-M15-answer",
            "type": "text",
            "richText": [
                [
                    "%w preserves an error as a wrapped cause. errors.Is searches the error tree for a matching target, including custom Is methods. errors.As finds an error assignable to a target type, including custom As methods. Both can examine more than the outer error."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8136-9f08-f21a6255ef3b",
            "type": "code",
            "richText": [
                [
                    "var ErrNotFound = errors.New(\"not found\")\n\nerr := fmt.Errorf(\"load user: %w\", ErrNotFound)\nfmt.Println(errors.Is(err, ErrNotFound)) // true"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M15-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Errors",
                    [
                        [
                            "a",
                            "#/notes/go/errors"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M16",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M16 — How do you define a custom error type that supports unwrapping?"
                ]
            ]
        },
        {
            "id": "question-M16-answer",
            "type": "text",
            "richText": [
                [
                    "A custom error implements Error() string. Unwrap() error exposes one cause to errors.Is and errors.As. Construct the pointer type shown below, and require a non-nil cause because Error calls the cause’s Error method."
                ]
            ]
        },
        {
            "id": "question-M16-caveat",
            "type": "text",
            "richText": [
                [
                    "The error type and helper are package declarations; the errors.Is expression is an illustrative call."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8138-8ae9-db0d0919f1df",
            "type": "code",
            "richText": [
                [
                    "type OpError struct {\n    Op  string\n    Err error // must be non-nil in this example\n}\nfunc (e *OpError) Error() string { return e.Op + \": \" + e.Err.Error() }\nfunc (e *OpError) Unwrap() error { return e.Err }\n\nfunc loadFailure() error {\n    return &OpError{Op: \"load\", Err: os.ErrNotExist}\n}\n// errors.Is(loadFailure(), os.ErrNotExist) is true."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M16-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Errors",
                    [
                        [
                            "a",
                            "#/notes/go/errors"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M17",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M17 — Why is defer inside hot loops sometimes a performance problem, and what’s a safe alternative?"
                ]
            ]
        },
        {
            "id": "question-M17-answer",
            "type": "text",
            "richText": [
                [
                    "A defer inside a loop runs at function exit, so open files and other resources can accumulate across iterations. Use a helper whose return ends each resource lifetime. Defer cost depends on the compiler and code shape; measure a hot path rather than removing defer categorically."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81cf-a021-e56bf9421eba",
            "type": "code",
            "richText": [
                [
                    "func visitFiles(files []string, use func(*os.File) error) error {\n    for _, name := range files {\n        err := func() error {\n            f, err := os.Open(name)\n            if err != nil { return err }\n            defer f.Close() // closes at this helper’s return\n            return use(f)\n        }()\n        if err != nil { return err }\n    }\n    return nil\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M17-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Defer",
                    [
                        [
                            "a",
                            "#/notes/go/defer"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M18",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M18 — What is the “loop variable capture” trap with goroutines, and what is the safest pattern?"
                ]
            ]
        },
        {
            "id": "question-M18-answer",
            "type": "text",
            "richText": [
                [
                    "Before Go 1.22 semantics, closures could share a loop variable declared by the loop. For language versions Go 1.22 and later, := loop declarations create fresh iteration variables. Assignment to an existing variable with = still reuses it. Passing a value as a goroutine parameter works across versions; output order remains concurrent."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8135-aedf-f9b29018c520",
            "type": "code",
            "richText": [
                [
                    "vals := []int{1, 2, 3}\nvar wg sync.WaitGroup\nfor _, v := range vals {\n    wg.Add(1)\n    go func(x int) {\n        defer wg.Done()\n        fmt.Println(x)\n    }(v) // one explicit value copy, valid across language versions\n}\nwg.Wait()\n// Prints 1, 2 and 3 in an unspecified order."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M18-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Closures",
                    [
                        [
                            "a",
                            "#/notes/go/closures"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Goroutines",
                    [
                        [
                            "a",
                            "#/notes/go/goroutines"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M18-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go 1.22 loop variables",
                    [
                        [
                            "a",
                            "https://go.dev/blog/loopvar-preview"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M19",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M19 — What are the key differences between time.After and time.NewTimer in long-running systems?"
                ]
            ]
        },
        {
            "id": "question-M19-answer",
            "type": "text",
            "richText": [
                [
                    "time.After returns only the timer channel; NewTimer exposes Stop and Reset for control and reuse. Reuse can avoid repeated timer allocation. Go 1.23 timer semantics prevent stale channel values after Reset or Stop and allow collection of unreachable timers. They require a main-module go version of at least 1.23 and no legacy asynctimerchan setting."
                ]
            ]
        },
        {
            "id": "question-M19-caveat",
            "type": "text",
            "richText": [
                [
                    "Legacy timer behavior requires stopping and draining an active timer before reuse, with one goroutine coordinating receives. This example assumes the Go 1.23 behavior instead."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8126-8564-c96019e05cef",
            "type": "code",
            "richText": [
                [
                    "func waitForJobs(ctx context.Context, jobs <-chan int) error {\n    t := time.NewTimer(time.Second)\n    defer t.Stop()\n    for {\n        select {\n        case _, ok := <-jobs:\n            if !ok { return nil }\n            t.Reset(time.Second) // refresh inactivity deadline\n        case <-t.C:\n            return fmt.Errorf(\"no job within one second\")\n        case <-ctx.Done():\n            return ctx.Err()\n        }\n    }\n}\n// Go 1.23 timer semantics. The main module must opt into them.\n// One goroutine owns this timer and receives from its channel."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M19-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Date & Time",
                    [
                        [
                            "a",
                            "#/notes/go/date-time"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M19-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Timer.Reset contract",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/time#Timer.Reset"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Go 1.23 timer compatibility",
                    [
                        [
                            "a",
                            "https://go.dev/doc/go1.23#timer-changes"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M20",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M20 — How do you implement a worker pool with channels?"
                ]
            ]
        },
        {
            "id": "question-M20-answer",
            "type": "text",
            "richText": [
                [
                    "A fixed set of workers reads a jobs channel. The producer closes it after submitting all jobs, workers finish their range loops, and a WaitGroup joins them. The example processes each submitted integer once; worker execution and result order are unspecified."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8179-bac8-ed9513d2e372",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    jobs := make(chan int)\n    var wg sync.WaitGroup\n    for i := 0; i < 4; i++ {\n        wg.Add(1)\n        go func() {\n            defer wg.Done()\n            for j := range jobs { fmt.Println(j * j) }\n        }()\n    }\n    for _, j := range []int{1, 2, 3} { jobs <- j }\n    close(jobs)\n    wg.Wait()\n}\n// Prints 1, 4 and 9 in an unspecified order."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M20-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Channels",
                    [
                        [
                            "a",
                            "#/notes/go/channels"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M21",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M21 — What is table-driven testing and why is it idiomatic in Go?"
                ]
            ]
        },
        {
            "id": "question-M21-answer",
            "type": "text",
            "richText": [
                [
                    "Table-driven tests put inputs and expected results in a slice and run the same check for each case. Subtests give cases separate names and failure reports. Add boundary and error cases that check behavior, rather than duplicating implementation details."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81d9-9bf1-da1b0fba1ebc",
            "type": "code",
            "richText": [
                [
                    "func Add(a, b int) int { return a + b }\n\nfunc TestAdd(t *testing.T) {\n    cases := []struct {\n        name string\n        a, b, want int\n    }{\n        {\"positive\", 1, 2, 3},\n        {\"zero\", 0, 0, 0},\n        {\"negative\", -1, 2, 1},\n    }\n    for _, tc := range cases {\n        t.Run(tc.name, func(t *testing.T) {\n            if got := Add(tc.a, tc.b); got != tc.want {\n                t.Fatalf(\"got %d, want %d\", got, tc.want)\n            }\n        })\n    }\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M22",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M22 — How do you write a correct benchmark with testing.B?"
                ]
            ]
        },
        {
            "id": "question-M22-answer",
            "type": "text",
            "richText": [
                [
                    "The b.N benchmark form repeats the measured operation b.N times. Exclude setup with ResetTimer, keep observable results to avoid dead-code removal, and report allocations when useful. Newer Go versions also offer b.Loop; this example uses the older, widely supported form."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8154-b5cc-e8079ba9bb8a",
            "type": "code",
            "richText": [
                [
                    "var sink int\n\nfunc sum(data []int) int {\n    total := 0\n    for _, v := range data { total += v }\n    return total\n}\n\nfunc BenchmarkSum(b *testing.B) {\n    data := make([]int, 1_000)\n    for i := range data { data[i] = i }\n    b.ReportAllocs()\n    b.ResetTimer()\n    for i := 0; i < b.N; i++ { sink = sum(data) }\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M23",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M23 — What does go test -race detect, and what are its limits?"
                ]
            ]
        },
        {
            "id": "question-M23-answer",
            "type": "text",
            "richText": [
                [
                    "The race detector instruments executed memory accesses and reports unsynchronized conflicting accesses. It only covers paths and schedules that run. A clean run is not proof of race freedom, deadlock freedom or correct higher-level invariants. Instrumentation also changes timing and resource use."
                ]
            ]
        },
        {
            "id": "question-M24",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M24 — How do you do basic profiling in Go?"
                ]
            ]
        },
        {
            "id": "question-M24-answer",
            "type": "text",
            "richText": [
                [
                    "Profile one concrete package at a time and keep its test binary with the profile. CPU profiles sample running code; memory profiles sample allocations. Replace ./mypkg below with the package to inspect. For a running service, net/http/pprof can expose a local diagnostic endpoint."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81b1-8748-fa2ade8140ff",
            "type": "code",
            "richText": [
                [
                    "go test ./mypkg -run=^$ -bench=. -cpuprofile=cpu.out -memprofile=mem.out\ngo tool pprof cpu.out\ngo tool pprof -inuse_space mem.out\ngo tool pprof -alloc_space mem.out"
                ]
            ],
            "language": "shell"
        },
        {
            "id": "question-M24-extra-0",
            "type": "text",
            "richText": [
                [
                    "Registering pprof handlers alone does not start a server. This example starts a diagnostic server on loopback."
                ]
            ]
        },
        {
            "id": "question-M24-extra-1",
            "type": "code",
            "richText": [
                [
                    "go func() {\n    log.Print(http.ListenAndServe(\"localhost:6060\", nil))\n}()"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-M24-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Profiling flags",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/cmd/go#hdr-Testing_flags"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Single-package restriction",
                    [
                        [
                            "a",
                            "https://go.dev/src/cmd/go/internal/test/test.go"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M25",
            "type": "sub_sub_header",
            "richText": [
                [
                    "M25 — What are generics in Go, and what do constraints do?"
                ]
            ]
        },
        {
            "id": "question-M25-answer",
            "type": "text",
            "richText": [
                [
                    "Generics add type parameters checked against constraints. any allows any type; comparable permits equality operations. Since Go 1.20, an interface type such as any can satisfy comparable, but comparing interface values with non-comparable dynamic values can still panic. Type inference can infer arguments from a call."
                ]
            ]
        },
        {
            "id": "question-M25-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Generics",
                    [
                        [
                            "a",
                            "#/notes/go/generics"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8125-b40a-fa5be5ac6979",
            "type": "header",
            "richText": [
                [
                    "Hard"
                ]
            ]
        },
        {
            "id": "question-H01",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H01 — What does the Go memory model guarantee, and what does it not guarantee?"
                ]
            ]
        },
        {
            "id": "question-H01-answer",
            "type": "text",
            "richText": [
                [
                    "The memory model defines visibility through sequencing within a goroutine and synchronization between goroutines. A data-race-free program has a sequentially consistent execution. Missing synchronization does not automatically imply a race when data is not shared or is read-only, but conflicting unordered accesses do."
                ]
            ]
        },
        {
            "id": "question-H01-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "H02",
                    [
                        [
                            "a",
                            "#go-note-question-H02"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H01-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go memory model",
                    [
                        [
                            "a",
                            "https://go.dev/ref/mem"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H02",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H02 — What exactly is a data race in Go?"
                ]
            ]
        },
        {
            "id": "question-H02-answer",
            "type": "text",
            "richText": [
                [
                    "A data race is an unordered pair of accesses to the same memory location from different goroutines, with at least one write and at least one non-atomic access. Synchronization establishes the ordering needed to exclude the race. Races on multiword values can expose inconsistent representations."
                ]
            ]
        },
        {
            "id": "question-H03",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H03 — When should you use sync/atomic instead of a mutex?"
                ]
            ]
        },
        {
            "id": "question-H03-answer",
            "type": "text",
            "richText": [
                [
                    "Use atomics for independently updated counters, flags or published pointers whose protocol fits atomic operations. Use a mutex for related fields that must change together. A series of atomic operations does not make a whole transaction atomic. Use atomic access consistently for the shared location."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8191-9c6d-f0825865bb1e",
            "type": "code",
            "richText": [
                [
                    "var n atomic.Int64\nn.Add(1)\nv := n.Load()\n_ = v"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H03-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Mutex",
                    [
                        [
                            "a",
                            "#/notes/go/mutex"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "E08",
                    [
                        [
                            "a",
                            "#go-note-question-E08"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H04",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H04 — How do channels establish happens-before relationships?"
                ]
            ]
        },
        {
            "id": "question-H04-answer",
            "type": "text",
            "richText": [
                [
                    "A channel send synchronizes before its corresponding receive completes. Closing synchronizes before a receive that returns the zero value because the channel is closed. For an unbuffered channel, the receive also synchronizes before the send completes. These rules publish preceding writes; they do not protect later unsynchronized mutations."
                ]
            ]
        },
        {
            "id": "question-H04-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Channel synchronization",
                    [
                        [
                            "a",
                            "https://go.dev/ref/mem#chan"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H05",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H05 — How does using a nil channel in select help structure concurrent code?"
                ]
            ]
        },
        {
            "id": "question-H05-answer",
            "type": "text",
            "richText": [
                [
                    "A nil channel disables its send or receive case in select. Setting an exhausted input to nil prevents a closed input from remaining ready forever while another input is still active. A select with only nil channels and no default blocks indefinitely."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-810c-865b-de6275d38a46",
            "type": "code",
            "richText": [
                [
                    "func merge(ctx context.Context, a, b <-chan int, out chan<- int) {\n    for a != nil || b != nil {\n        var v int\n        var ok bool\n        select {\n        case v, ok = <-a:\n            if !ok { a = nil; continue }\n        case v, ok = <-b:\n            if !ok { b = nil; continue }\n        case <-ctx.Done():\n            return\n        }\n        select {\n        case out <- v:\n        case <-ctx.Done():\n            return\n        }\n    }\n}\n// The caller owns out and decides when to close it."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H05-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Select",
                    [
                        [
                            "a",
                            "#/notes/go/select"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H06",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H06 — What is the most common context-related goroutine leak, and how do you prevent it?"
                ]
            ]
        },
        {
            "id": "question-H06-answer",
            "type": "text",
            "richText": [
                [
                    "A goroutine can remain blocked after its caller stops waiting if it never observes cancellation. Select on ctx.Done at channel waits, handle channel closure, and pass ctx into cancellable work. A context does not interrupt arbitrary CPU work or an uncancellable call. The example exits on cancellation or exhausted input."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81bf-bdae-caf1d8e25635",
            "type": "code",
            "richText": [
                [
                    "func consume(ctx context.Context, jobs <-chan int) error {\n    for {\n        select {\n        case job, ok := <-jobs:\n            if !ok { return nil }\n            fmt.Println(job) // bounded work in this example\n        case <-ctx.Done():\n            return ctx.Err()\n        }\n    }\n}\n// A ready job can win alongside cancellation. For longer work,\n// pass ctx into that work and check it during execution."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H06-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Context and Timeout",
                    [
                        [
                            "a",
                            "#/notes/go/context-and-timeout"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H07",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H07 — What is escape analysis, and how does it affect allocations?"
                ]
            ]
        },
        {
            "id": "question-H07-answer",
            "type": "text",
            "richText": [
                [
                    "Escape analysis helps the compiler choose stack or heap storage. A returned address must remain valid after the function returns, but inlining and caller use can avoid a separate heap allocation. Pointer syntax, new and closures do not by themselves guarantee heap allocation. Inspect the actual build’s diagnostics."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8127-ab17-e1e3b26588a4",
            "type": "code",
            "richText": [
                [
                    "func New() *int {\n    x := 1\n    return &x // must stay valid; a non-inlined call may allocate on the heap\n}\n// Inspect a concrete package:\n// go build -gcflags=-m ./mypkg\n// go build -gcflags=-m=2 ./mypkg"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H07-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Allocation FAQ",
                    [
                        [
                            "a",
                            "https://go.dev/doc/faq#stack_or_heap"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H08",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H08 — How do goroutine stacks work (growth and implications)?"
                ]
            ]
        },
        {
            "id": "question-H08-answer",
            "type": "text",
            "richText": [
                [
                    "In the standard Go runtime, goroutine stacks start small and can grow by copying; the runtime may later shrink them. Ordinary Go pointers are handled by the runtime during stack movement. Storing addresses as integers or breaking unsafe rules can defeat that handling. Excessive recursion can still exhaust the stack limit."
                ]
            ]
        },
        {
            "id": "question-H09",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H09 — How does Go’s garbage collector work at a high level, and what is GOGC?"
                ]
            ]
        },
        {
            "id": "question-H09-answer",
            "type": "text",
            "richText": [
                [
                    "The standard Go runtime marks objects reachable from roots such as stacks and globals, then sweeps unreachable objects. Most collection work is concurrent, with brief stop-the-world phases. GOGC adjusts the target growth between collections. A higher value generally trades more heap space for less collection work; a lower value makes the opposite trade. This is a target rather than a fixed memory cap."
                ]
            ]
        },
        {
            "id": "question-H09-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "E01",
                    [
                        [
                            "a",
                            "#go-note-question-E01"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H09-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go GC guide",
                    [
                        [
                            "a",
                            "https://go.dev/doc/gc-guide"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H10",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H10 — What are the exact semantics of sync.Pool?"
                ]
            ]
        },
        {
            "id": "question-H10-answer",
            "type": "text",
            "richText": [
                [
                    "sync.Pool holds temporary reusable objects. Get may ignore stored objects and return a new value; any item may disappear at any time without notification. Put hands ownership back to the pool, so stop accessing that object until you get it again. Use explicit ownership for caches and resources requiring Close."
                ]
            ]
        },
        {
            "id": "question-H11",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H11 — Why is concurrent access to a plain Go map unsafe, even for “concurrent reads and occasional writes”?"
                ]
            ]
        },
        {
            "id": "question-H11-answer",
            "type": "text",
            "richText": [
                [
                    "Concurrent reads of an unchanged map are safe. A read, iteration or write racing with a write requires synchronization. Runtime map checks are not a reliable race detector. Protect a regular map and its invariants with a lock, or use sync.Map when its documented workload fits."
                ]
            ]
        },
        {
            "id": "question-H11-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Maps",
                    [
                        [
                            "a",
                            "#/notes/go/maps"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H12",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H12 — Why is map iteration order not stable, and why should you never depend on it?"
                ]
            ]
        },
        {
            "id": "question-H12-answer",
            "type": "text",
            "richText": [
                [
                    "Map iteration order is unspecified and is not guaranteed to match the preceding iteration. Copy and sort keys when deterministic output is required. If the map is shared with writers, synchronize the snapshot too; sorting does not make concurrent map access safe."
                ]
            ]
        },
        {
            "id": "question-H12-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Maps",
                    [
                        [
                            "a",
                            "#/notes/go/maps"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H13",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H13 — What is the “sub-slice memory retention” problem for slices, and how do you fix it?"
                ]
            ]
        },
        {
            "id": "question-H13-answer",
            "type": "text",
            "richText": [
                [
                    "A small subslice can retain an entire large backing array. Copy the needed elements into a new array-backed slice, then let every reference to the original array become unreachable. A smaller length or capacity alone does not release that array."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-817c-a9da-d550ddd33afe",
            "type": "code",
            "richText": [
                [
                    "func prefix() []byte {\n    big := make([]byte, 10<<20) // 10 MiB backing array\n    view := big[:10]\n    small := make([]byte, len(view))\n    copy(small, view)\n    return small // the large array can be collected when otherwise unreachable\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H13-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "M09",
                    [
                        [
                            "a",
                            "#go-note-question-M09"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H14",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H14 — Do substring operations on strings copy data? What is the retention pitfall?"
                ]
            ]
        },
        {
            "id": "question-H14-answer",
            "type": "text",
            "richText": [
                [
                    "In the standard Go implementation, a substring can share its original byte storage and retain a large string. The language guarantees the resulting contents rather than a particular allocation strategy. strings.Clone provides independent storage for a non-empty substring when retention matters."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-816d-998a-c84c7907f8ff",
            "type": "code",
            "richText": [
                [
                    "func smallSubstring(s string, start, end int) string {\n    return strings.Clone(s[start:end]) // Go 1.18+\n}\n// The original string can be collected once no references to it remain."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H14-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "H13",
                    [
                        [
                            "a",
                            "#go-note-question-H13"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H15",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H15 — What is the internal shape of an interface value, and why can interfaces allocate?"
                ]
            ]
        },
        {
            "id": "question-H15-answer",
            "type": "text",
            "richText": [
                [
                    "An interface has a dynamic type and value. The standard runtime represents these using type or method metadata and data storage, but that layout is not a language guarantee. Conversion may need storage for the value. Escape analysis, compiler optimization and usage determine whether that storage requires a heap allocation."
                ]
            ]
        },
        {
            "id": "question-H15-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Interfaces",
                    [
                        [
                            "a",
                            "#/notes/go/interfaces"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H16",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H16 — What’s the difference between a method value and a method expression?"
                ]
            ]
        },
        {
            "id": "question-H16-answer",
            "type": "text",
            "richText": [
                [
                    "A method value such as t.M evaluates and saves a receiver, yielding a function that accepts the remaining arguments. A method expression such as T.M takes the receiver explicitly as its first argument. Saving a pointer receiver preserves a pointer to the original; saving a value receiver copies the value. A saved receiver that escapes may require allocation, depending on compiler optimization and use."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8131-b67e-f74356d9a511",
            "type": "code",
            "richText": [
                [
                    "type T struct{}\nfunc (T) M(int) {}\n\nvar t T\nf1 := t.M      // method value: func(int)\nf2 := T.M      // method expression: func(T, int)\n\nf1(1)\nf2(t, 1)"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H16-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Methods",
                    [
                        [
                            "a",
                            "#/notes/go/methods"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H17",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H17 — What are the core safety rules when using reflect to set a value?"
                ]
            ]
        },
        {
            "id": "question-H17-answer",
            "type": "text",
            "richText": [
                [
                    "Check CanSet before writing a reflect.Value. Addressable values can still be unsettable, especially unexported fields. A pointer followed by Elem commonly exposes a settable value. Use a setter compatible with its kind, or Set with an assignable value, to avoid a panic."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8137-96fa-d92536ddf753",
            "type": "code",
            "richText": [
                [
                    "x := 0\nv := reflect.ValueOf(&x).Elem()\nv.SetInt(42)"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H18",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H18 — What are the key unsafe pointer conversion rules you must not violate?"
                ]
            ]
        },
        {
            "id": "question-H18-answer",
            "type": "text",
            "richText": [
                [
                    "unsafe.Pointer can convert to and from *T. Reinterpreting types requires compatible layout, sufficient storage and alignment. uintptr is an integer: it neither keeps an object alive nor follows moved pointers. Pointer arithmetic must follow a documented valid pattern, with conversion and arithmetic together rather than storing the integer address for later."
                ]
            ]
        },
        {
            "id": "question-H18-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Pointers",
                    [
                        [
                            "a",
                            "#/notes/go/pointers"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H18-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Valid unsafe.Pointer patterns",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/unsafe#Pointer"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H19",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H19 — Explain Go’s scheduler model (G-M-P) and what GOMAXPROCS controls."
                ]
            ]
        },
        {
            "id": "question-H19-answer",
            "type": "text",
            "richText": [
                [
                    "G is a goroutine, M an OS thread, and P the runtime state required to execute Go code. GOMAXPROCS limits simultaneous execution of Go code using Ps. It does not cap goroutines or all OS threads. Queue layout and scheduling decisions are runtime implementation details."
                ]
            ]
        },
        {
            "id": "question-H19-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "GMP Model",
                    [
                        [
                            "a",
                            "#/notes/go/gmp-model"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H20",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H20 — What happens when a goroutine blocks in a syscall (e.g., disk/network) and why does it matter?"
                ]
            ]
        },
        {
            "id": "question-H20-answer",
            "type": "text",
            "richText": [
                [
                    "A blocking syscall can occupy an OS thread while the runtime makes its P available to other work. Go-managed network polling often parks a goroutine without keeping a thread blocked for the whole wait. Disk I/O and foreign calls may behave differently; avoid treating every blocking operation as one syscall path."
                ]
            ]
        },
        {
            "id": "question-H20-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "GMP Model",
                    [
                        [
                            "a",
                            "#/notes/go/gmp-model"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H21",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H21 — What are the most common causes of deadlocks in Go?"
                ]
            ]
        },
        {
            "id": "question-H21-answer",
            "type": "text",
            "richText": [
                [
                    "Common deadlock causes are an unmatched channel operation, a WaitGroup count that never reaches zero, inconsistent lock order, and a nil-channel wait without an exit path. Trace which operation each goroutine awaits and which goroutine can complete it. Buffering changes when a send blocks but cannot replace a missing consumer."
                ]
            ]
        },
        {
            "id": "question-H21-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Goroutines Blocking: Causes & Recovery",
                    [
                        [
                            "a",
                            "#/notes/go/goroutines-blocking-causes-recovery"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H22",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H22 — How does net/http server concurrency work by default?"
                ]
            ]
        },
        {
            "id": "question-H22-answer",
            "type": "text",
            "richText": [
                [
                    "net/http serves requests concurrently; handler state needs synchronization if shared. Its internal goroutine structure differs between HTTP protocols. An incoming request’s context is canceled when the client connection closes, an HTTP/2 request is canceled, or ServeHTTP returns. Pass that context into ongoing work; a one-time check is insufficient."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-815b-9221-ea68af31e144",
            "type": "code",
            "richText": [
                [
                    "func handle(w http.ResponseWriter, r *http.Request) {\n    ctx := r.Context()\n    t := time.NewTimer(100 * time.Millisecond)\n    defer t.Stop()\n    select {\n    case <-ctx.Done():\n        return\n    case <-t.C:\n        _, _ = io.WriteString(w, \"done\")\n    }\n}\n// A real database or outbound HTTP call should receive ctx too."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H22-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Request.Context contract",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/net/http#Request.Context"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H23",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H23 — What are encoding/json performance pitfalls that matter in interviews?"
                ]
            ]
        },
        {
            "id": "question-H23-answer",
            "type": "text",
            "richText": [
                [
                    "JSON processing can allocate and use reflection, so profile a representative hot path. Struct targets expose expected fields and types; map[string]any trades that knowledge for flexibility. Dynamic values can still be type-checked at runtime. omitempty affects API output, and custom marshaling must preserve required semantics."
                ]
            ]
        },
        {
            "id": "question-H24",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H24 — How does Go fuzzing work at a practical level?"
                ]
            ]
        },
        {
            "id": "question-H24-answer",
            "type": "text",
            "richText": [
                [
                    "A fuzz target starts from seed inputs and generated variations, then checks a stated property. It can find panics and property failures in parsers, encoders or state machines. Choose a property that is valid for arbitrary inputs. The example checks that valid UTF-8 survives a JSON round trip."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8105-a793-d308ce82eb31",
            "type": "code",
            "richText": [
                [
                    "func FuzzJSONRoundTrip(f *testing.F) {\n    f.Add(\"seed\")\n    f.Add(\"€\")\n    f.Fuzz(func(t *testing.T, s string) {\n        if !utf8.ValidString(s) { t.Skip() }\n        data, err := json.Marshal(s)\n        if err != nil { t.Fatal(err) }\n        var got string\n        if err := json.Unmarshal(data, &got); err != nil { t.Fatal(err) }\n        if got != s { t.Fatalf(\"got %q, want %q\", got, s) }\n    })\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-H25",
            "type": "sub_sub_header",
            "richText": [
                [
                    "H25 — How do build tags, internal packages, and go:generate help maintain real-world Go codebases?"
                ]
            ]
        },
        {
            "id": "question-H25-answer",
            "type": "text",
            "richText": [
                [
                    "Build constraints select source files for platforms or features. An internal directory restricts importers to the subtree rooted at its parent. go:generate records a command to run explicitly with go generate; go build does not run it. Reproducibility also requires pinned generators and inputs."
                ]
            ]
        },
        {
            "id": "question-H25-extra-0",
            "type": "code",
            "richText": [
                [
                    "//go:build linux\n\npackage platform\n\n//go:generate go run ./cmd/gen\n// Directives are examples. The generator must exist and be versioned."
                ]
            ],
            "language": "go"
        },
        {
            "id": "2ef24eb1-ed54-813c-8d59-d83594c42445",
            "type": "header",
            "richText": [
                [
                    "Expert"
                ]
            ]
        },
        {
            "id": "question-E01",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E01 — What is the difference between GOGC and GOMEMLIMIT, and how do they interact in production?"
                ]
            ]
        },
        {
            "id": "question-E01-answer",
            "type": "text",
            "richText": [
                [
                    "GOGC governs heap growth as described in H09. GOMEMLIMIT, available since Go 1.19, adds a soft limit on runtime-managed memory and can make collection more aggressive. It excludes some process memory, such as C allocations. Leave external-memory headroom; the runtime may exceed the limit to avoid excessive GC work."
                ]
            ]
        },
        {
            "id": "question-E01-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "H09",
                    [
                        [
                            "a",
                            "#go-note-question-H09"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E01-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Runtime memory limit",
                    [
                        [
                            "a",
                            "https://go.dev/doc/gc-guide#Memory_limit"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E02",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E02 — What is the GC write barrier, and why does it matter for performance and correctness?"
                ]
            ]
        },
        {
            "id": "question-E02-answer",
            "type": "text",
            "richText": [
                [
                    "During concurrent marking, compiler-inserted write barriers help the runtime track pointer changes so it does not miss reachable objects. That adds work to some pointer stores. The exact barrier is an implementation detail. Hiding a Go pointer from the collector can break reachability and lead to invalid access."
                ]
            ]
        },
        {
            "id": "question-E02-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "H18",
                    [
                        [
                            "a",
                            "#go-note-question-H18"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E03",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E03 — Why are finalizers (runtime.SetFinalizer) considered a last resort?"
                ]
            ]
        },
        {
            "id": "question-E03-answer",
            "type": "text",
            "richText": [
                [
                    "Finalizers have no timely-execution guarantee and may not run before process exit. They complicate ownership, can resurrect objects, and require care about when an object becomes unreachable. Use explicit Close for required cleanup and treat a finalizer as a fallback, rather than normal resource management."
                ]
            ]
        },
        {
            "id": "question-E04",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E04 — What do you need to know about sync.Mutex behavior under contention (including starvation)?"
                ]
            ]
        },
        {
            "id": "question-E04-answer",
            "type": "text",
            "richText": [
                [
                    "The standard implementation has throughput-oriented and starvation-avoidance mutex paths. Their thresholds and handoff rules are implementation details, not an API fairness guarantee. Measure lock contention with mutex and block profiles. If contention matters, shorten the protected operation or separate independent state while preserving its invariants."
                ]
            ]
        },
        {
            "id": "question-E04-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "M24",
                    [
                        [
                            "a",
                            "#go-note-question-M24"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E04-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Standard mutex implementation",
                    [
                        [
                            "a",
                            "https://go.dev/src/internal/sync/mutex.go"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E05",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E05 — How do channels work internally at a conceptual level, and what does close actually do?"
                ]
            ]
        },
        {
            "id": "question-E05-answer",
            "type": "text",
            "richText": [
                [
                    "The standard runtime channel implementation has buffer state, waiting-sender and waiting-receiver queues, a closed flag and internal locking. A send may hand off to a waiting receiver, fill available buffer space, or park. close wakes waiters: a blocked send then panics, while receives follow the normal closed-channel rules."
                ]
            ]
        },
        {
            "id": "question-E05-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "B25",
                    [
                        [
                            "a",
                            "#go-note-question-B25"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "M11",
                    [
                        [
                            "a",
                            "#go-note-question-M11"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E05-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Standard channel implementation",
                    [
                        [
                            "a",
                            "https://go.dev/src/runtime/chan.go"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E06",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E06 — Why can make(map[K]V, hint) improve performance, and what are its limits?"
                ]
            ]
        },
        {
            "id": "question-E06-answer",
            "type": "text",
            "richText": [
                [
                    "The map size argument is a hint for the initial number of elements, not a fixed capacity or a maximum. A realistic hint can reduce table growth during inserts; a large overestimate can waste memory. Actual allocation and growth depend on the Go implementation and version."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-814b-9207-cc21c49d0dbd",
            "type": "code",
            "richText": [
                [
                    "m := make(map[string]int, 10_000) // initial size hint, not a maximum\nfor i := 0; i < 10_001; i++ {\n    m[strconv.Itoa(i)] = i // the map can grow beyond the hint\n}\nfmt.Println(len(m)) // 10001"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-E06-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Maps",
                    [
                        [
                            "a",
                            "#/notes/go/maps"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E07",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E07 — When is sync.Map the right choice, and what are the tradeoffs?"
                ]
            ]
        },
        {
            "id": "question-E07-answer",
            "type": "text",
            "richText": [
                [
                    "sync.Map is specialized for entries written once and read many times, or goroutines operating on disjoint key sets. Prefer a regular map plus a lock when several entries must satisfy an invariant together. sync.Map stores any, so access needs type checks or a wrapper. Benchmark the actual workload."
                ]
            ]
        },
        {
            "id": "question-E07-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Maps",
                    [
                        [
                            "a",
                            "#/notes/go/maps"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E07-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "sync.Map workloads",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/sync#Map"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E08",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E08 — What memory-ordering guarantees do Go atomics provide, and why does it matter?"
                ]
            ]
        },
        {
            "id": "question-E08-answer",
            "type": "text",
            "richText": [
                [
                    "Go atomic operations behave as if they occur in one sequentially consistent order. If an atomic operation observes another’s effect, the latter synchronizes before it. This can publish preceding ordinary writes through an atomic pointer or flag. It does not permit subsequent unsynchronized writes to published data or make several updates one atomic transaction."
                ]
            ]
        },
        {
            "id": "question-E08-extra-1",
            "type": "code",
            "richText": [
                [
                    "type Snapshot struct { Value int }\nvar published atomic.Pointer[Snapshot]\n\nfunc publish() {\n    published.Store(&Snapshot{Value: 42})\n}\nfunc read() {\n    if s := published.Load(); s != nil {\n        fmt.Println(s.Value) // initialized before publication\n    }\n}\n// Do not mutate the published Snapshot without additional synchronization."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-E08-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Atomic ordering contract",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/sync/atomic"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E09",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E09 — What is the ABA problem in lock-free programming, and how is it typically mitigated?"
                ]
            ]
        },
        {
            "id": "question-E09-answer",
            "type": "text",
            "richText": [
                [
                    "ABA occurs when a value changes from A to B and back to A. A compare-and-swap can then succeed even though relevant state changed. A version tag can distinguish generations. In manually managed systems, hazard pointers or epoch-based reclamation delay node reuse while readers may still reference nodes. Such schemes address lifetime, but do not automatically solve every logical ABA case. Go GC does not eliminate logical ABA when an algorithm reuses a node or state."
                ]
            ]
        },
        {
            "id": "question-E10",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E10 — What are Go type sets and the ~ operator in constraints?"
                ]
            ]
        },
        {
            "id": "question-E10-answer",
            "type": "text",
            "richText": [
                [
                    "A constraint’s type set specifies permitted type arguments. ~int includes defined types whose underlying type is int, while int alone names that specific type. A union such as ~int | ~int64 accepts either family. Such interfaces with type terms can be constraints, not ordinary value types."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81cf-831e-c122d0767035",
            "type": "code",
            "richText": [
                [
                    "type IntLike interface {\n    ~int | ~int64\n}\n\nfunc Sum[T IntLike](s []T) T {\n    var total T\n    for _, v := range s { total += v }\n    return total\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-E10-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Generics",
                    [
                        [
                            "a",
                            "#/notes/go/generics"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E11",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E11 — How are Go generics implemented at runtime/compile time, and what are the performance implications?"
                ]
            ]
        },
        {
            "id": "question-E11-answer",
            "type": "text",
            "richText": [
                [
                    "The standard Go gc compiler uses representation-based code sharing (shapes) and type dictionaries for generic instantiations. This is an implementation strategy rather than a language promise. Optimization and escape analysis can change call and allocation costs. Compare a representative generic implementation with alternatives before claiming either is faster."
                ]
            ]
        },
        {
            "id": "question-E11-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Compiler implementation",
                    [
                        [
                            "a",
                            "https://go.dev/src/cmd/compile/internal/noder/reader.go"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E12",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E12 — How does the module checksum database (sumdb) protect builds, and when do GOPRIVATE / GONOSUMDB matter?"
                ]
            ]
        },
        {
            "id": "question-E12-answer",
            "type": "text",
            "richText": [
                [
                    "The checksum database provides authenticated checksums for public module versions and makes inconsistent content detectable. It does not certify that code is safe. GOPRIVATE supplies defaults for avoiding the public proxy and checksum database for matching private paths. GONOSUMDB changes the checksum-database policy specifically; local go.sum verification still matters."
                ]
            ]
        },
        {
            "id": "question-E12-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "go.sum",
                    [
                        [
                            "a",
                            "#/notes/go/go-sum"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E13",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E13 — What are the most important cgo rules and pitfalls for Go runtime correctness?"
                ]
            ]
        },
        {
            "id": "question-E13-answer",
            "type": "text",
            "richText": [
                [
                    "cgo crosses the Go/C runtime boundary, with costs that depend on the call. C may retain Go memory only while it is properly pinned under the documented pointer rules; pointer-bearing data needs additional care. runtime.Pinner and runtime/cgo.Handle serve different supported use cases. A stable OS thread alone does not make pointer passing safe."
                ]
            ]
        },
        {
            "id": "question-E13-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "E14",
                    [
                        [
                            "a",
                            "#go-note-question-E14"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E13-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "cgo pointer rules",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/cmd/cgo#hdr-Passing_pointers"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E14",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E14 — What does runtime.LockOSThread() do, and when is it justified?"
                ]
            ]
        },
        {
            "id": "question-E14-answer",
            "type": "text",
            "richText": [
                [
                    "LockOSThread binds the current goroutine to its current OS thread and keeps other goroutines off that thread until matching unlocks. Use it for APIs with thread-local state or thread affinity. Balance lock calls with unlocks when appropriate. Locking threads limits scheduling flexibility, so keep the requirement explicit."
                ]
            ]
        },
        {
            "id": "question-E15",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E15 — How does io.Copy achieve high performance, and what interfaces does it leverage?"
                ]
            ]
        },
        {
            "id": "question-E15-answer",
            "type": "text",
            "richText": [
                [
                    "io.Copy first uses src.WriteTo when the source implements io.WriterTo. Otherwise it uses dst.ReadFrom when the destination implements io.ReaderFrom. Otherwise it copies through a buffer. Those interfaces allow specialized paths, sometimes using kernel support; they do not guarantee zero-copy for every source and destination."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-818e-9ecf-c60e2d70a9c8",
            "type": "code",
            "richText": [
                [
                    "func transfer(dst io.Writer, src io.Reader) error {\n    n, err := io.Copy(dst, src)\n    if err != nil { return fmt.Errorf(\"copy after %d bytes: %w\", n, err) }\n    return nil\n}"
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-E16",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E16 — What is the “functional options” pattern, and why is it widely used in Go APIs?"
                ]
            ]
        },
        {
            "id": "question-E16-answer",
            "type": "text",
            "richText": [
                [
                    "Functional options apply configuration functions to a constructor’s private settings. The constructor supplies defaults and applies options in order. Export option helpers while keeping configuration fields private when callers should use those helpers. Validate options where the API needs it; this small example demonstrates shape and precedence only."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-81ce-b2ec-cc097296f76d",
            "type": "code",
            "richText": [
                [
                    "type config struct { timeout time.Duration }\ntype Option func(*config)\ntype Client struct { cfg config }\n\nfunc WithTimeout(d time.Duration) Option {\n    return func(c *config) { c.timeout = d }\n}\n\nfunc NewClient(opts ...Option) *Client {\n    cfg := config{timeout: time.Second}\n    for _, opt := range opts { opt(&cfg) }\n    return &Client{cfg: cfg}\n}\n// Later options win when they change the same setting."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-E17",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E17 — Why is “store context in a struct” considered a design smell?"
                ]
            ]
        },
        {
            "id": "question-E17-answer",
            "type": "text",
            "richText": [
                [
                    "A long-lived object that stores a request context can accidentally reuse a canceled deadline or retain request values. Passing ctx to each operation makes its lifetime explicit. A struct scoped to one operation can intentionally carry context, as http.Request does; the concern is mixing unrelated lifetimes."
                ]
            ]
        },
        {
            "id": "question-E17-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Context and Timeout",
                    [
                        [
                            "a",
                            "#/notes/go/context-and-timeout"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "M01",
                    [
                        [
                            "a",
                            "#go-note-question-M01"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E18",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E18 — What are best practices for designing interfaces in Go (especially for testability)?"
                ]
            ]
        },
        {
            "id": "question-E18-answer",
            "type": "text",
            "richText": [
                [
                    "Define a small interface around the behavior the consumer needs. A test double can then implement that behavior without replacing an entire concrete dependency. Returning a concrete type is often useful, but factory or abstraction requirements can justify returning an interface. Choose by the API’s purpose rather than a universal rule."
                ]
            ]
        },
        {
            "id": "question-E18-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Interfaces",
                    [
                        [
                            "a",
                            "#/notes/go/interfaces"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E19",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E19 — What is the most common misuse of errors.New sentinel errors in large systems?"
                ]
            ]
        },
        {
            "id": "question-E19-answer",
            "type": "text",
            "richText": [
                [
                    "Calling errors.New repeatedly creates distinct errors, even with equal messages. Comparing text therefore loses error identity and makes callers depend on wording. If a caller needs a stable condition, expose a documented sentinel or typed error. Wrapping exposes that condition as part of the API, so choose it deliberately."
                ]
            ]
        },
        {
            "id": "question-E19-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "Errors",
                    [
                        [
                            "a",
                            "#/notes/go/errors"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "M15",
                    [
                        [
                            "a",
                            "#go-note-question-M15"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E20",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E20 — How does the default http.Client behave, and what are the production-grade timeout rules?"
                ]
            ]
        },
        {
            "id": "question-E20-answer",
            "type": "text",
            "richText": [
                [
                    "The zero-value http.Client uses DefaultTransport and has no overall timeout. A request context or Client.Timeout can bound an operation; the client timeout includes response-body reading. Reuse transports for connection pooling and close response bodies. Creating clients that share DefaultTransport still shares its pool; creating new transports per request does not."
                ]
            ]
        },
        {
            "id": "question-E21",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E21 — What does runtime/trace show that CPU profiles don’t?"
                ]
            ]
        },
        {
            "id": "question-E21-answer",
            "type": "text",
            "richText": [
                [
                    "An execution trace records a timeline of goroutine scheduling, synchronization, syscalls and GC activity. It helps explain time spent waiting, which a CPU profile’s samples of running code may not show. Correlate events with request tasks and regions when investigating latency."
                ]
            ]
        },
        {
            "id": "question-E21-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "M24",
                    [
                        [
                            "a",
                            "#go-note-question-M24"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E22",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E22 — In heap profiling, what is the difference between “inuse” and “allocs” views?"
                ]
            ]
        },
        {
            "id": "question-E22-answer",
            "type": "text",
            "richText": [
                [
                    "The inuse views estimate live Go heap allocations at the most recent completed GC; alloc views count cumulative sampled allocations, including objects later collected. Neither is whole-process RSS: stacks, runtime metadata, reserved pages and foreign allocations differ. High retained memory and high allocation rate require different remedies."
                ]
            ]
        },
        {
            "id": "question-E22-extra-0",
            "type": "code",
            "richText": [
                [
                    "go tool pprof -inuse_space mem.out\ngo tool pprof -alloc_space mem.out"
                ]
            ],
            "language": "shell"
        },
        {
            "id": "question-E22-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "M24",
                    [
                        [
                            "a",
                            "#go-note-question-M24"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E22-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Heap and allocation profiles",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/runtime/pprof#hdr-Heap_profile"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E23",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E23 — How do you minimize struct padding and why might it matter for performance?"
                ]
            ]
        },
        {
            "id": "question-E23-answer",
            "type": "text",
            "richText": [
                [
                    "Field alignment can insert padding between fields and at the end of a struct. Reordering fields may reduce its size, but swapping only byte and int64 often keeps the same final size. The example below uses two byte fields to demonstrate a reduction on standard gc targets with 8-byte int64 alignment. Layout and performance remain target-specific."
                ]
            ]
        },
        {
            "id": "question-E23-caveat",
            "type": "text",
            "richText": [
                [
                    "Reducing padding can reduce storage for large slices of this struct. It does not remove pointers or automatically guarantee less GC scanning or better speed."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8196-9515-d607553ec9aa",
            "type": "code",
            "richText": [
                [
                    "type A struct {\n    first byte\n    count int64\n    last  byte\n}\ntype B struct {\n    count int64\n    first byte\n    last  byte\n}\n\nfunc sizes() {\n    fmt.Println(unsafe.Sizeof(A{}), unsafe.Sizeof(B{}))\n}\n// Standard gc layout with 8-byte int64 alignment: 24 16.\n// Illustrative expected sizes; check on the target architecture."
                ]
            ],
            "language": "go"
        },
        {
            "id": "question-E23-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Sizeof and padding",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/unsafe#Sizeof"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E24",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E24 — What are precise, high-impact ways to reduce GC pressure in Go services?"
                ]
            ]
        },
        {
            "id": "question-E24-answer",
            "type": "text",
            "richText": [
                [
                    "Use allocation profiles to find repeated temporary objects, then consider buffer reuse, realistic preallocation or append-style formatting APIs. Keep ownership clear when sharing buffers. Bound caches to reduce retained memory. Compare allocation rates and latency after a change; lower allocation count alone does not prove a faster service."
                ]
            ]
        },
        {
            "id": "question-E24-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "H13",
                    [
                        [
                            "a",
                            "#go-note-question-H13"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "H14",
                    [
                        [
                            "a",
                            "#go-note-question-H14"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "E22",
                    [
                        [
                            "a",
                            "#go-note-question-E22"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E25",
            "type": "sub_sub_header",
            "richText": [
                [
                    "E25 — What are “advanced standard-library traps” that experienced Go engineers watch for?"
                ]
            ]
        },
        {
            "id": "question-E25-answer",
            "type": "text",
            "richText": [
                [
                    "math/rand top-level functions are safe for concurrent use, while a Rand from NewSource normally needs synchronization when shared. The public contract does not promise a globally locked generator; current runtime-backed paths can avoid that lock. For deterministic simulations, a private generator can be useful. math/rand is unsuitable for secrets. Context-value lookup cost depends on the implementation and wrapper chain, so avoid using it as a general configuration store."
                ]
            ]
        },
        {
            "id": "question-E25-extra-0",
            "type": "text",
            "richText": [
                [
                    "Timer reuse, copied synchronization objects and context lifetimes are covered by the earlier answers linked below. Do not infer a performance improvement from a particular rand implementation without measurement."
                ]
            ]
        },
        {
            "id": "question-E25-related",
            "type": "text",
            "richText": [
                [
                    "Related: "
                ],
                [
                    "M19",
                    [
                        [
                            "a",
                            "#go-note-question-M19"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "M13",
                    [
                        [
                            "a",
                            "#go-note-question-M13"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "M01",
                    [
                        [
                            "a",
                            "#go-note-question-M01"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E25-reference",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "rand concurrency contract",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/math/rand"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Current generator implementation",
                    [
                        [
                            "a",
                            "https://go.dev/src/math/rand/rand.go"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
