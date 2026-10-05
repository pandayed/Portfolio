import type { GoNote } from '../types';

const note = {
    "notionId": "2ef24eb1-ed54-809e-8b5d-f92ac35da6cc",
    "slug": "go-by-questions",
    "title": "Go by Questions",
    "updatedOn": "2026-10-05",
    "blocks": [
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A package groups related Go files under one name."
                ]
            ]
        },
        {
            "id": "question-B01-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A runnable program needs "
                ],
                [
                    "package main",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B01-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "It also needs "
                ],
                [
                    "func main()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " with no parameters or return values."
                ]
            ]
        },
        {
            "id": "question-B01-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A name that starts with an uppercase letter is exported. Other packages can use it."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A normal import uses the imported package’s name."
                ]
            ]
        },
        {
            "id": "question-B02-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "An import alias gives that package a different name in the current file."
                ]
            ]
        },
        {
            "id": "question-B02-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A dot import puts exported names directly into the current file’s scope."
                ]
            ]
        },
        {
            "id": "question-B02-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A blank import, written with "
                ],
                [
                    "_",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", runs package initialization without giving you a name to call."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "var",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " at package level or inside a function."
                ]
            ]
        },
        {
            "id": "question-B03-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "var",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can declare a variable without an initial value. It then gets its type’s zero value."
                ]
            ]
        },
        {
            "id": "question-B03-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    ":=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " inside a function. Go gets the types from the values on the right."
                ]
            ]
        },
        {
            "id": "question-B03-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "In the same block, "
                ],
                [
                    ":=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " needs at least one new name other than "
                ],
                [
                    "_",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B03-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "It can also update existing variables in that block, but their types must stay the same."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " declares a value that cannot change."
                ]
            ]
        },
        {
            "id": "question-B04-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " starts at 0 in each "
                ],
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " declaration."
                ]
            ]
        },
        {
            "id": "question-B04-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "It increases for each constant specification, including skipped entries. It does not count physical lines."
                ]
            ]
        },
        {
            "id": "question-B04-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "An untyped numeric constant can fit several numeric types. Its value must fit the chosen type."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Numeric types start at "
                ],
                [
                    "0",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B05-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "bool",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " starts at "
                ],
                [
                    "false",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B05-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "string",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " starts at "
                ],
                [
                    "\"\"",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", an empty string."
                ]
            ]
        },
        {
            "id": "question-B05-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pointers, slices, maps, channels, functions and interfaces start at "
                ],
                [
                    "nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B05-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Array elements and struct fields each get their own type’s zero value."
                ]
            ]
        },
        {
            "id": "question-B05-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "byte",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is another name for "
                ],
                [
                    "uint8",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". "
                ],
                [
                    "rune",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is another name for "
                ],
                [
                    "int32",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "type MyInt int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates a new type based on "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". Its underlying type is "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B06-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Convert an "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " variable explicitly with "
                ],
                [
                    "MyInt(value)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B06-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "type MyInt = int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates an alias. It is another name for the same type."
                ]
            ]
        },
        {
            "id": "question-B06-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go does not automatically convert variables between different numeric types."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "if",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can begin with a short statement. Its variables are available in the condition and branches."
                ]
            ]
        },
        {
            "id": "question-B07-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "for",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " handles counted loops, condition-only loops, infinite loops and "
                ],
                [
                    "range",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " loops."
                ]
            ]
        },
        {
            "id": "question-B07-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "switch",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " runs a matching case. It does not move into the next case automatically."
                ]
            ]
        },
        {
            "id": "question-B07-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "fallthrough",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " runs the next case’s body without checking that case’s condition."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A function can return several values, often a result and an error."
                ]
            ]
        },
        {
            "id": "question-B08-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assign those values to separate variables."
                ]
            ]
        },
        {
            "id": "question-B08-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "_",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " discards a value you do not need."
                ]
            ]
        },
        {
            "id": "question-B08-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Ignore an error only when you have a reason to do so."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Named return values are variables declared in the function’s result list."
                ]
            ]
        },
        {
            "id": "question-B09-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "They start at their zero values."
                ]
            ]
        },
        {
            "id": "question-B09-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "return",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " with no values returns their current values. This is also called a naked return."
                ]
            ]
        },
        {
            "id": "question-B09-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use explicit return values when several branches or many lines make the result hard to follow."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " runs a call when the surrounding function returns."
                ]
            ]
        },
        {
            "id": "question-B10-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It also runs while a panic returns through that function."
                ]
            ]
        },
        {
            "id": "question-B10-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The last deferred call runs first."
                ]
            ]
        },
        {
            "id": "question-B10-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go evaluates the deferred function and its arguments when it reaches the "
                ],
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " statement."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Return an error for an expected failure."
                ]
            ]
        },
        {
            "id": "question-B11-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check the error before using the result."
                ]
            ]
        },
        {
            "id": "question-B11-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Add the operation’s name or other useful context when returning an error."
                ]
            ]
        },
        {
            "id": "question-B11-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Wrap the error when callers need to check its original cause."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Returning an error lets the caller choose how to handle the failure."
                ]
            ]
        },
        {
            "id": "question-B12-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "panic",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " stops normal execution and returns through the current goroutine’s calls."
                ]
            ]
        },
        {
            "id": "question-B12-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "recover",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " must be called directly inside a deferred function in the same goroutine."
                ]
            ]
        },
        {
            "id": "question-B12-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "If that deferred call recovers, the function containing the defer returns to its caller."
                ]
            ]
        },
        {
            "id": "question-B12-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Execution does not restart at the line that panicked."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An array has a fixed length, and that length is part of its type."
                ]
            ]
        },
        {
            "id": "question-B13-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assigning an array copies its elements."
                ]
            ]
        },
        {
            "id": "question-B13-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A slice describes part of an array. That backing array holds the actual elements."
                ]
            ]
        },
        {
            "id": "question-B13-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assigning a slice copies that description. The two slices can still share the same elements."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "len(s)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " counts the elements currently visible in the slice."
                ]
            ]
        },
        {
            "id": "question-B14-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "cap(s)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " counts how many elements fit from the slice’s start to the end of its backing array."
                ]
            ]
        },
        {
            "id": "question-B14-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "make",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " sets the initial length and optional capacity."
                ]
            ]
        },
        {
            "id": "question-B14-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns the updated slice. Store that result."
                ]
            ]
        },
        {
            "id": "question-B14-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "When capacity is too small, "
                ],
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates a new backing array."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A map stores values under keys. Keys must support comparison."
                ]
            ]
        },
        {
            "id": "question-B15-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "m[k]",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns the stored value, or its zero value when the key is absent."
                ]
            ]
        },
        {
            "id": "question-B15-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "v, ok := m[k]",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " also tells you whether the key exists."
                ]
            ]
        },
        {
            "id": "question-B15-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "delete",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is safe when the key is absent or the map is nil."
                ]
            ]
        },
        {
            "id": "question-B15-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can read a nil map. Writing an entry into it panics."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A string is a sequence of bytes that cannot be changed."
                ]
            ]
        },
        {
            "id": "question-B16-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A string often contains UTF-8 text, but Go does not require valid UTF-8."
                ]
            ]
        },
        {
            "id": "question-B16-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Indexing a string gives a byte. "
                ],
                [
                    "len",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " counts bytes."
                ]
            ]
        },
        {
            "id": "question-B16-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "rune",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is another name for "
                ],
                [
                    "int32",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". It can hold a Unicode code point."
                ]
            ]
        },
        {
            "id": "question-B16-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "range",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " decodes UTF-8 and gives each rune’s byte index."
                ]
            ]
        },
        {
            "id": "question-B16-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "For invalid UTF-8, "
                ],
                [
                    "range",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " gives the replacement rune and moves forward one byte."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A struct groups named fields."
                ]
            ]
        },
        {
            "id": "question-B17-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A keyed literal such as "
                ],
                [
                    "User{Name: \"Ada\"}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " names the fields you set."
                ]
            ]
        },
        {
            "id": "question-B17-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Fields you omit get zero values."
                ]
            ]
        },
        {
            "id": "question-B17-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "An unkeyed literal depends on the fields’ order."
                ]
            ]
        },
        {
            "id": "question-B17-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "A field can hold a function. Declare methods separately."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "&x",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " gets the address of "
                ],
                [
                    "x",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B18-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "*p",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " accesses the value at pointer "
                ],
                [
                    "p",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B18-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "*T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " means a pointer to a value of type "
                ],
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B18-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "An uninitialized pointer is nil. Dereferencing nil panics."
                ]
            ]
        },
        {
            "id": "question-B18-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Ordinary Go pointers do not support pointer arithmetic."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A method is a function with a receiver, such as "
                ],
                [
                    "func (c *Counter) Inc()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B19-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The receiver base type must be defined in the same package."
                ]
            ]
        },
        {
            "id": "question-B19-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "That base type cannot itself be a pointer or an interface."
                ]
            ]
        },
        {
            "id": "question-B19-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Choosing "
                ],
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or "
                ],
                [
                    "*T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " affects which methods a type has and whether the method can change the original value."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An interface used as a value lists the methods it needs."
                ]
            ]
        },
        {
            "id": "question-B20-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type implements that interface by having those methods. No "
                ],
                [
                    "implements",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " declaration is needed."
                ]
            ]
        },
        {
            "id": "question-B20-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "any",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is an alias for "
                ],
                [
                    "interface{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". It can hold any value."
                ]
            ]
        },
        {
            "id": "question-B20-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Some interfaces also list allowed types for generics. This list is called a type set."
                ]
            ]
        },
        {
            "id": "question-B20-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "These interfaces restrict generic type parameters. You cannot use them as ordinary value types."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "x.(T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " checks an interface value against type "
                ],
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B21-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "v, ok := x.(T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " reports failure without panicking."
                ]
            ]
        },
        {
            "id": "question-B21-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can be a concrete type or another interface."
                ]
            ]
        },
        {
            "id": "question-B21-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type switch chooses a branch using the actual type stored in the interface."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Embedding adds a field without writing a separate field name."
                ]
            ]
        },
        {
            "id": "question-B22-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Its fields and methods can be promoted. You can then use their names through the outer value."
                ]
            ]
        },
        {
            "id": "question-B22-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The outer type does not become a subtype of the embedded type."
                ]
            ]
        },
        {
            "id": "question-B22-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Access rules, duplicate names and method sets still decide which promoted names you can use."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "new(T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns a "
                ],
                [
                    "*T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " pointing to a zero-initialized value."
                ]
            ]
        },
        {
            "id": "question-B23-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "make",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates a slice, map or channel with the size or capacity you request."
                ]
            ]
        },
        {
            "id": "question-B23-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "new(map[string]int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " points to a nil map."
                ]
            ]
        },
        {
            "id": "question-B23-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "make(map[string]int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates a map that accepts entries."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A goroutine runs a function concurrently with other work."
                ]
            ]
        },
        {
            "id": "question-B24-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The Go runtime chooses when goroutines run."
                ]
            ]
        },
        {
            "id": "question-B24-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Protect shared data when goroutines access it and at least one access writes it."
                ]
            ]
        },
        {
            "id": "question-B24-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sharing data only for reading does not itself cause a race."
                ]
            ]
        },
        {
            "id": "question-B24-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Starting a goroutine does not wait for it to finish."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An unbuffered send waits for a receiver."
                ]
            ]
        },
        {
            "id": "question-B25-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A buffered send waits when the buffer is full."
                ]
            ]
        },
        {
            "id": "question-B25-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A receive waits while an open channel is empty."
                ]
            ]
        },
        {
            "id": "question-B25-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "close",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " means no more values will be sent."
                ]
            ]
        },
        {
            "id": "question-B25-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receivers can still read buffered values. After that, a receive gives the zero value and "
                ],
                [
                    "ok == false",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-B25-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sending after close or closing twice panics."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Context carries cancellation, deadlines and values for the current request across API calls."
                ]
            ]
        },
        {
            "id": "question-M01-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass "
                ],
                [
                    "ctx",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " explicitly, usually as the first argument."
                ]
            ]
        },
        {
            "id": "question-M01-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Call the cancel function returned when you create a child context."
                ]
            ]
        },
        {
            "id": "question-M01-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cancellation is cooperative. Work must check the context or call an operation that checks it."
                ]
            ]
        },
        {
            "id": "question-M01-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a private key type for context values."
                ]
            ]
        },
        {
            "id": "question-M01-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use normal parameters for general options."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Imported packages initialize before the package that imports them."
                ]
            ]
        },
        {
            "id": "question-M02-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Within a package, variables initialize before "
                ],
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " functions."
                ]
            ]
        },
        {
            "id": "question-M02-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A variable initializes after the variables it depends on."
                ]
            ]
        },
        {
            "id": "question-M02-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each "
                ],
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " function then runs in source order."
                ]
            ]
        },
        {
            "id": "question-M02-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Across files, order follows how files are passed to the compiler. Build systems are encouraged to use sorted file-name order."
                ]
            ]
        },
        {
            "id": "question-M02-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "main",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " starts after package initialization finishes."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Minimal Version Selection compares the versions required by your app and its dependencies."
                ]
            ]
        },
        {
            "id": "question-M03-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "For each module path, it chooses the highest required version."
                ]
            ]
        },
        {
            "id": "question-M03-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not automatically choose the newest published version."
                ]
            ]
        },
        {
            "id": "question-M03-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "replace",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " substitutes another version or a local directory."
                ]
            ]
        },
        {
            "id": "question-M03-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "replace",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does not add a dependency requirement."
                ]
            ]
        },
        {
            "id": "question-M03-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "A dependency’s "
                ],
                [
                    "replace",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " directives do not control the main module’s build."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Shadowing means declaring a new variable with the same name as an outer variable."
                ]
            ]
        },
        {
            "id": "question-M04-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    ":=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " inside an "
                ],
                [
                    "if",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or loop can create that new variable."
                ]
            ]
        },
        {
            "id": "question-M04-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The outer variable then stays unchanged."
                ]
            ]
        },
        {
            "id": "question-M04-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Shadowing is valid Go. It becomes a bug when later code uses the outer value by mistake."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A value receiver gets a copy of the value."
                ]
            ]
        },
        {
            "id": "question-M05-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A pointer receiver gets a pointer and can change the original value."
                ]
            ]
        },
        {
            "id": "question-M05-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A copied struct can still refer to the same slice or map data."
                ]
            ]
        },
        {
            "id": "question-M05-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A value receiver can therefore change shared slice elements or map entries."
                ]
            ]
        },
        {
            "id": "question-M05-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not copy synchronization values after use."
                ]
            ]
        },
        {
            "id": "question-M05-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure copying costs before choosing a receiver only for speed."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A method set is the list of methods a type has."
                ]
            ]
        },
        {
            "id": "question-M06-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "For a defined non-interface type "
                ],
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", the set contains its value-receiver methods."
                ]
            ]
        },
        {
            "id": "question-M06-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "For "
                ],
                [
                    "*T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", the set contains both value- and pointer-receiver methods."
                ]
            ]
        },
        {
            "id": "question-M06-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "If a value has an address you can take, Go can take it automatically for a pointer-method call."
                ]
            ]
        },
        {
            "id": "question-M06-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "That call shortcut does not add the pointer method to "
                ],
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when assigning to an interface."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An interface is nil only when it has no actual type or value."
                ]
            ]
        },
        {
            "id": "question-M07-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A nil "
                ],
                [
                    "*MyErr",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " still has a type when stored in an interface."
                ]
            ]
        },
        {
            "id": "question-M07-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The interface is then non-nil, even though the stored pointer is nil."
                ]
            ]
        },
        {
            "id": "question-M07-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Return a plain nil error on success. Do not return a typed nil pointer as an error."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Nil and non-nil empty slices both have length zero."
                ]
            ]
        },
        {
            "id": "question-M08-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Both support "
                ],
                [
                    "range",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M08-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only a nil slice compares equal to nil."
                ]
            ]
        },
        {
            "id": "question-M08-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A non-nil empty slice can still have spare capacity."
                ]
            ]
        },
        {
            "id": "question-M08-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "For "
                ],
                [
                    "[]int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " with "
                ],
                [
                    "encoding/json",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and no omission tags, nil becomes "
                ],
                [
                    "null",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and a non-nil empty slice becomes "
                ],
                [
                    "[]",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "When capacity is available, "
                ],
                [
                    "append",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " writes into the existing backing array."
                ]
            ]
        },
        {
            "id": "question-M09-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Another slice that covers those positions sees the changed values."
                ]
            ]
        },
        {
            "id": "question-M09-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "base[:2:2]",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " limits the new slice’s capacity to 2. Its next append must use a new backing array."
                ]
            ]
        },
        {
            "id": "question-M09-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copy the elements when you need separate storage."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "copy(dst, src)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " copies as many elements as fit in both slices."
                ]
            ]
        },
        {
            "id": "question-M10-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "That count is "
                ],
                [
                    "min(len(dst), len(src))",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M10-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "It handles overlapping source and destination correctly."
                ]
            ]
        },
        {
            "id": "question-M10-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "copy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does not allocate a new destination. The slices may still share storage."
                ]
            ]
        },
        {
            "id": "question-M10-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copying a pointer copies the address. It does not copy the pointed-to object."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The owner of sending should close the channel after all sends finish."
                ]
            ]
        },
        {
            "id": "question-M11-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "With several senders, one coordinator waits for all of them and then closes it."
                ]
            ]
        },
        {
            "id": "question-M11-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A receiver usually cannot know whether every sender is finished."
                ]
            ]
        },
        {
            "id": "question-M11-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Close signals completion. A channel does not need closing just to release its memory."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "select",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " runs one ready send or receive case."
                ]
            ]
        },
        {
            "id": "question-M12-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "If several cases are ready, it chooses pseudo-randomly. Each ready case has the same chance."
                ]
            ]
        },
        {
            "id": "question-M12-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "If none is ready, "
                ],
                [
                    "default",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " runs immediately when present."
                ]
            ]
        },
        {
            "id": "question-M12-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Without a ready case or "
                ],
                [
                    "default",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "select",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " waits."
                ]
            ]
        },
        {
            "id": "question-M12-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Case order does not set priority. A case is not guaranteed to get its turn within a fixed time."
                ]
            ]
        },
        {
            "id": "question-M12-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "A loop with "
                ],
                [
                    "default",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can keep running and use CPU without waiting."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Call "
                ],
                [
                    "Add",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " before starting the work and before "
                ],
                [
                    "Wait",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can see a zero counter."
                ]
            ]
        },
        {
            "id": "question-M13-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Match every added task with one "
                ],
                [
                    "Done",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M13-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not copy a WaitGroup after first use."
                ]
            ]
        },
        {
            "id": "question-M13-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Let an earlier "
                ],
                [
                    "Wait",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " finish before reusing the group for a new batch."
                ]
            ]
        },
        {
            "id": "question-M13-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "A WaitGroup waits for completion. It does not protect other shared data from concurrent changes."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A Mutex lets one goroutine hold the lock at a time."
                ]
            ]
        },
        {
            "id": "question-M14-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "An RWMutex allows several readers together, but a writer needs exclusive access."
                ]
            ]
        },
        {
            "id": "question-M14-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "When a writer is waiting, new readers must wait."
                ]
            ]
        },
        {
            "id": "question-M14-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Taking "
                ],
                [
                    "RLock",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " again while already holding it can deadlock if a writer is waiting."
                ]
            ]
        },
        {
            "id": "question-M14-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Start with the simpler lock. Benchmark your workload before assuming RWMutex is faster."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "%w",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " wraps an error and keeps its original cause available."
                ]
            ]
        },
        {
            "id": "question-M15-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "errors.Is",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " looks for a matching error through the wrapped errors."
                ]
            ]
        },
        {
            "id": "question-M15-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "errors.As",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " looks for an error that fits the requested type."
                ]
            ]
        },
        {
            "id": "question-M15-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "An error can customize those checks with "
                ],
                [
                    "Is",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or "
                ],
                [
                    "As",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " methods."
                ]
            ]
        },
        {
            "id": "question-M15-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "The search can include several branches, not just the outer error."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A custom error type needs an "
                ],
                [
                    "Error() string",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " method."
                ]
            ]
        },
        {
            "id": "question-M16-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unwrap() error",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns its original cause."
                ]
            ]
        },
        {
            "id": "question-M16-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "errors.Is",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "errors.As",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can then inspect that cause."
                ]
            ]
        },
        {
            "id": "question-M16-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Construct the pointer type used in the example with "
                ],
                [
                    "&OpError{...}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M16-caveat",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass a non-nil cause to this "
                ],
                [
                    "OpError",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". Its "
                ],
                [
                    "Error",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " method calls the cause’s "
                ],
                [
                    "Error",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " method."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A defer inside a loop runs when the surrounding function returns."
                ]
            ]
        },
        {
            "id": "question-M17-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Open files can therefore stay open across many loop iterations."
                ]
            ]
        },
        {
            "id": "question-M17-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Move one iteration into a helper. Its deferred cleanup runs when that helper returns."
                ]
            ]
        },
        {
            "id": "question-M17-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "The cost of defer depends on the compiler and code."
                ]
            ]
        },
        {
            "id": "question-M17-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure a frequently run path before removing defer for speed."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "With pre-Go 1.22 loop rules, closures could share one variable declared by the loop."
                ]
            ]
        },
        {
            "id": "question-M18-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A closure is a function that uses variables from the surrounding code."
                ]
            ]
        },
        {
            "id": "question-M18-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "With Go 1.22 or later language rules, "
                ],
                [
                    ":=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " in the loop declaration gives each iteration a fresh variable."
                ]
            ]
        },
        {
            "id": "question-M18-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Using "
                ],
                [
                    "=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to assign an existing variable still reuses that variable."
                ]
            ]
        },
        {
            "id": "question-M18-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Passing the value as a goroutine argument works across versions."
                ]
            ]
        },
        {
            "id": "question-M18-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "The goroutines can still print their results in any order."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "time.After",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " gives you the timer’s channel."
                ]
            ]
        },
        {
            "id": "question-M19-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "time.NewTimer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " also lets you call "
                ],
                [
                    "Stop",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "Reset",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M19-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reusing one timer can avoid creating a new timer for each wait."
                ]
            ]
        },
        {
            "id": "question-M19-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "With Go 1.23 timer rules, "
                ],
                [
                    "Reset",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "Stop",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " prevent old timer values from arriving afterward."
                ]
            ]
        },
        {
            "id": "question-M19-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Those rules also let the GC collect timers that the program no longer references."
                ]
            ]
        },
        {
            "id": "question-M19-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "The main module’s "
                ],
                [
                    "go",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " version must be at least 1.23. Do not enable the old behavior with "
                ],
                [
                    "GODEBUG=asynctimerchan=1",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M19-caveat",
            "type": "bulleted_list",
            "richText": [
                [
                    "With older timer behavior, stop an active timer and drain any pending value before "
                ],
                [
                    "Reset",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M19-caveat-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "One goroutine should manage the timer and its channel receives."
                ]
            ]
        },
        {
            "id": "question-M19-caveat-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "This example uses the Go 1.23 timer behavior."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Start a fixed number of workers that read from a jobs channel."
                ]
            ]
        },
        {
            "id": "question-M20-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The producer closes the channel after sending all jobs."
                ]
            ]
        },
        {
            "id": "question-M20-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The workers finish their "
                ],
                [
                    "range",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " loops when the channel is drained and closed."
                ]
            ]
        },
        {
            "id": "question-M20-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A WaitGroup waits for the workers to finish."
                ]
            ]
        },
        {
            "id": "question-M20-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "The example processes each integer once. The workers and results can run in any order."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Table-driven tests store inputs and expected results in a slice."
                ]
            ]
        },
        {
            "id": "question-M21-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Run the same check for each case."
                ]
            ]
        },
        {
            "id": "question-M21-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Subtests give each case a name and its own failure report."
                ]
            ]
        },
        {
            "id": "question-M21-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Include boundary values and error cases."
                ]
            ]
        },
        {
            "id": "question-M21-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check what the function should do, rather than copying its implementation into the test."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The benchmark repeats the operation "
                ],
                [
                    "b.N",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " times."
                ]
            ]
        },
        {
            "id": "question-M22-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Call "
                ],
                [
                    "ResetTimer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " after setup so setup time is not counted."
                ]
            ]
        },
        {
            "id": "question-M22-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keep the result in a place the compiler cannot discard as unused."
                ]
            ]
        },
        {
            "id": "question-M22-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "ReportAllocs",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to report memory allocations."
                ]
            ]
        },
        {
            "id": "question-M22-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Newer Go versions also have "
                ],
                [
                    "b.Loop",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". This example uses the older "
                ],
                [
                    "b.N",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " form."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The race detector watches memory accesses while the program runs."
                ]
            ]
        },
        {
            "id": "question-M23-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It reports conflicting accesses that lack the required synchronization."
                ]
            ]
        },
        {
            "id": "question-M23-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "It can inspect only code paths and execution orders that actually run."
                ]
            ]
        },
        {
            "id": "question-M23-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A clean result does not prove there are no races, deadlocks or other logic errors."
                ]
            ]
        },
        {
            "id": "question-M23-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "The detector also changes timing and uses extra CPU and memory."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Profile one package at a time. Keep its test binary with the profile."
                ]
            ]
        },
        {
            "id": "question-M24-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A CPU profile samples code that is running."
                ]
            ]
        },
        {
            "id": "question-M24-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A memory profile samples memory allocations."
                ]
            ]
        },
        {
            "id": "question-M24-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Replace "
                ],
                [
                    "./mypkg",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " with the package you want to inspect."
                ]
            ]
        },
        {
            "id": "question-M24-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "For a running service, "
                ],
                [
                    "net/http/pprof",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can provide a local profiling server."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Registering pprof handlers does not start a server."
                ]
            ]
        },
        {
            "id": "question-M24-extra-0-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "This example starts a profiling server on localhost, so it listens on this computer."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Generics let a function or type work with different types."
                ]
            ]
        },
        {
            "id": "question-M25-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type parameter stands for a type chosen when that function or type is used."
                ]
            ]
        },
        {
            "id": "question-M25-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A constraint is a rule for which types a parameter accepts."
                ]
            ]
        },
        {
            "id": "question-M25-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "any",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " accepts any type. "
                ],
                [
                    "comparable",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " allows equality checks."
                ]
            ]
        },
        {
            "id": "question-M25-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Since Go 1.20, an interface type such as "
                ],
                [
                    "any",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can satisfy "
                ],
                [
                    "comparable",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-M25-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Comparing interface values can still panic if they hold values such as slices that cannot be compared."
                ]
            ]
        },
        {
            "id": "question-M25-answer-7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Type inference means Go can work out a type argument from the values passed to a call."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The memory model describes when one goroutine can see another goroutine’s writes."
                ]
            ]
        },
        {
            "id": "question-H01-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A happens-before relationship orders two operations so the later one can see the earlier work."
                ]
            ]
        },
        {
            "id": "question-H01-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Locks, channels and atomics can establish that relationship between goroutines."
                ]
            ]
        },
        {
            "id": "question-H01-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A program without data races behaves as if its operations run in a single order that respects each goroutine’s own order."
                ]
            ]
        },
        {
            "id": "question-H01-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "This guarantee is called sequential consistency."
                ]
            ]
        },
        {
            "id": "question-H01-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Shared conflicting accesses need ordering. Data used only for reading does not itself need it."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A data race involves two goroutines accessing the same memory location without the required ordering."
                ]
            ]
        },
        {
            "id": "question-H02-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "At least one access writes, and at least one access is non-atomic."
                ]
            ]
        },
        {
            "id": "question-H02-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A non-atomic access is an ordinary read or write without an atomic operation."
                ]
            ]
        },
        {
            "id": "question-H02-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Synchronization orders the accesses and prevents this race."
                ]
            ]
        },
        {
            "id": "question-H02-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "For values stored in several machine words, a race can expose parts from different updates."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An atomic operation reads or updates a value as one indivisible operation."
                ]
            ]
        },
        {
            "id": "question-H03-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use atomics for simple shared counters, flags or pointers when the whole update fits that operation."
                ]
            ]
        },
        {
            "id": "question-H03-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a mutex when several related fields must change together."
                ]
            ]
        },
        {
            "id": "question-H03-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Several atomic operations do not make one atomic transaction. Another goroutine can run between them."
                ]
            ]
        },
        {
            "id": "question-H03-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Access the shared location consistently with atomic operations."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A send happens-before its matching receive finishes. Writes before the send are then visible after the receive."
                ]
            ]
        },
        {
            "id": "question-H04-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Closing happens-before a receive that returns the zero value because the channel is closed."
                ]
            ]
        },
        {
            "id": "question-H04-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "For an unbuffered channel, the receive also happens-before the send finishes."
                ]
            ]
        },
        {
            "id": "question-H04-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "These rules make earlier writes visible. They do not protect later writes that lack synchronization."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A nil channel disables its send or receive case in "
                ],
                [
                    "select",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H05-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "After an input channel is closed and drained, set it to nil to disable its case."
                ]
            ]
        },
        {
            "id": "question-H05-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Otherwise, that closed input stays ready even while you still need another input."
                ]
            ]
        },
        {
            "id": "question-H05-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "If all channels are nil and there is no "
                ],
                [
                    "default",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "select",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " waits forever."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A goroutine can stay blocked after its caller stops waiting for it."
                ]
            ]
        },
        {
            "id": "question-H06-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "At a channel wait, also select on "
                ],
                [
                    "ctx.Done()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H06-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check whether the input channel is closed."
                ]
            ]
        },
        {
            "id": "question-H06-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass "
                ],
                [
                    "ctx",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to work that supports cancellation."
                ]
            ]
        },
        {
            "id": "question-H06-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "A context cannot interrupt arbitrary CPU work or a call that does not support cancellation."
                ]
            ]
        },
        {
            "id": "question-H06-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "The example exits when cancellation arrives or the input closes."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Escape analysis checks whether a value can stay in a goroutine’s stack memory."
                ]
            ]
        },
        {
            "id": "question-H07-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A stack holds function-call data. The heap holds memory managed separately by the runtime."
                ]
            ]
        },
        {
            "id": "question-H07-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A returned pointer must remain valid after its function returns."
                ]
            ]
        },
        {
            "id": "question-H07-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler can inline a function, putting its work into the caller. That can avoid a separate heap allocation."
                ]
            ]
        },
        {
            "id": "question-H07-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Using a pointer, "
                ],
                [
                    "new",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or a closure does not always allocate on the heap."
                ]
            ]
        },
        {
            "id": "question-H07-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check the compiler’s messages for the actual build."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "In the standard runtime, each goroutine’s stack starts small."
                ]
            ]
        },
        {
            "id": "question-H08-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime can copy the stack into a larger space when it grows. It can also shrink it later."
                ]
            ]
        },
        {
            "id": "question-H08-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime updates ordinary Go pointers during a stack move."
                ]
            ]
        },
        {
            "id": "question-H08-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "An address stored as an integer does not get the same pointer handling."
                ]
            ]
        },
        {
            "id": "question-H08-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Too many nested calls can still reach the stack limit."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The garbage collector, or GC, finds objects the program can still reach through its stacks and globals."
                ]
            ]
        },
        {
            "id": "question-H09-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It marks those objects and later frees memory from unreachable objects."
                ]
            ]
        },
        {
            "id": "question-H09-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Most of this work runs alongside the program. Brief stop-the-world phases pause the program."
                ]
            ]
        },
        {
            "id": "question-H09-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "GOGC",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " sets a target for memory growth between collections."
                ]
            ]
        },
        {
            "id": "question-H09-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "A higher value usually allows more heap memory and less collection work."
                ]
            ]
        },
        {
            "id": "question-H09-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "A lower value usually means more collection work and less heap growth."
                ]
            ]
        },
        {
            "id": "question-H09-answer-7",
            "type": "bulleted_list",
            "richText": [
                [
                    "GOGC",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a target, not a fixed memory limit."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "sync.Pool",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " holds temporary objects for reuse."
                ]
            ]
        },
        {
            "id": "question-H10-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Get",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " may ignore stored objects and use "
                ],
                [
                    "New",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", or return nil if "
                ],
                [
                    "New",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is unset."
                ]
            ]
        },
        {
            "id": "question-H10-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "An item can disappear at any time without notification."
                ]
            ]
        },
        {
            "id": "question-H10-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "After "
                ],
                [
                    "Put",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", stop using that object until you get it again."
                ]
            ]
        },
        {
            "id": "question-H10-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not rely on a pool for a lasting cache or for resources that must be closed."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Several goroutines can read a map that nobody changes."
                ]
            ]
        },
        {
            "id": "question-H11-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A read, iteration or write that races with a write needs synchronization."
                ]
            ]
        },
        {
            "id": "question-H11-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime’s map checks do not detect every race."
                ]
            ]
        },
        {
            "id": "question-H11-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a lock to protect a normal map and any rules its values must satisfy together."
                ]
            ]
        },
        {
            "id": "question-H11-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "sync.Map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when its supported workload fits your case."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Go does not promise a map iteration order."
                ]
            ]
        },
        {
            "id": "question-H12-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The next iteration can use a different order."
                ]
            ]
        },
        {
            "id": "question-H12-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "For repeatable output, copy the keys, sort them and then read values in that order."
                ]
            ]
        },
        {
            "id": "question-H12-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "If writers share the map, protect the copy and reads too. Sorting alone does not make access safe."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A small subslice can keep a large backing array alive."
                ]
            ]
        },
        {
            "id": "question-H13-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copy the needed elements into a slice with its own backing array."
                ]
            ]
        },
        {
            "id": "question-H13-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The old array can be collected only when no references to it remain."
                ]
            ]
        },
        {
            "id": "question-H13-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reducing the slice’s length or capacity does not free that array."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "In the standard Go implementation, a substring can share the original string’s bytes."
                ]
            ]
        },
        {
            "id": "question-H14-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A small substring can therefore keep a large original string alive."
                ]
            ]
        },
        {
            "id": "question-H14-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The language promises the contents, not a particular storage layout."
                ]
            ]
        },
        {
            "id": "question-H14-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "strings.Clone",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " gives a non-empty substring its own storage."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An interface stores a dynamic type and value: the actual type and value assigned to it."
                ]
            ]
        },
        {
            "id": "question-H15-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The standard runtime uses type or method information together with data storage."
                ]
            ]
        },
        {
            "id": "question-H15-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "That internal layout is not a Go language guarantee."
                ]
            ]
        },
        {
            "id": "question-H15-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Putting a value in an interface may need extra storage for that value."
                ]
            ]
        },
        {
            "id": "question-H15-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler and the way you use the value decide whether that storage must be on the heap."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A method value such as "
                ],
                [
                    "t.M",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " saves a receiver and creates a callable function."
                ]
            ]
        },
        {
            "id": "question-H16-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A method expression such as "
                ],
                [
                    "T.M",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " takes the receiver as its first argument instead."
                ]
            ]
        },
        {
            "id": "question-H16-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Saving a pointer receiver keeps a pointer to the original value."
                ]
            ]
        },
        {
            "id": "question-H16-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Saving a value receiver copies the value."
                ]
            ]
        },
        {
            "id": "question-H16-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "A saved receiver may need heap memory if it must live beyond the current call. Compiler optimization can change this."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Reflection lets code inspect and change values using "
                ],
                [
                    "reflect.Value",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H17-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check "
                ],
                [
                    "CanSet",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " before changing a value."
                ]
            ]
        },
        {
            "id": "question-H17-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Having an address is not enough. An unexported field may still be unsettable."
                ]
            ]
        },
        {
            "id": "question-H17-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "ValueOf(&x).Elem()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " commonly gets a settable value for "
                ],
                [
                    "x",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H17-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a setter that matches its kind, such as integer or string."
                ]
            ]
        },
        {
            "id": "question-H17-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "With "
                ],
                [
                    "Set",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", the new value’s type must be assignable to the target’s type. A wrong setter or type can panic."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Convert "
                ],
                [
                    "unsafe.Pointer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to or from "
                ],
                [
                    "*T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", not an ordinary value of type "
                ],
                [
                    "T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H18-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Changing the pointer type requires matching memory layout, enough space and correct alignment."
                ]
            ]
        },
        {
            "id": "question-H18-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Alignment means the address meets the target type’s memory requirements."
                ]
            ]
        },
        {
            "id": "question-H18-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "uintptr",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " stores an integer address. It does not keep the object alive or follow a moved pointer."
                ]
            ]
        },
        {
            "id": "question-H18-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use only documented pointer-arithmetic patterns. Keep the conversions and arithmetic in one expression."
                ]
            ]
        },
        {
            "id": "question-H18-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not save the integer address and convert it back later."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "G means goroutine."
                ]
            ]
        },
        {
            "id": "question-H19-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "M means operating-system thread."
                ]
            ]
        },
        {
            "id": "question-H19-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "P holds the runtime state needed to run Go code."
                ]
            ]
        },
        {
            "id": "question-H19-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "GOMAXPROCS",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " limits how many Ps can run Go code at the same time."
                ]
            ]
        },
        {
            "id": "question-H19-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not limit the total goroutines or all operating-system threads."
                ]
            ]
        },
        {
            "id": "question-H19-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime can change its queue layout and scheduling details between versions."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A syscall asks the operating system to do work. A blocking syscall can keep an OS thread waiting."
                ]
            ]
        },
        {
            "id": "question-H20-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime can make that thread’s P available so another thread runs Go work."
                ]
            ]
        },
        {
            "id": "question-H20-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go’s network polling often pauses only the waiting goroutine, without keeping a thread blocked for the whole wait."
                ]
            ]
        },
        {
            "id": "question-H20-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Disk I/O and calls into C or other non-Go code can behave differently."
                ]
            ]
        },
        {
            "id": "question-H20-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not assume every waiting operation follows the same syscall path."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A deadlock means work cannot continue because needed operations are waiting on each other or cannot finish."
                ]
            ]
        },
        {
            "id": "question-H21-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A channel operation may have no matching sender or receiver."
                ]
            ]
        },
        {
            "id": "question-H21-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A WaitGroup may never reach zero."
                ]
            ]
        },
        {
            "id": "question-H21-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Two goroutines may take locks in opposite orders and then wait on each other."
                ]
            ]
        },
        {
            "id": "question-H21-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "A nil-channel wait may have no way to exit."
                ]
            ]
        },
        {
            "id": "question-H21-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "For each wait, find which goroutine can complete it."
                ]
            ]
        },
        {
            "id": "question-H21-answer-7",
            "type": "bulleted_list",
            "richText": [
                [
                    "A buffer cannot fix a missing consumer. It only delays when the send blocks."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "net/http",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can handle several requests at the same time."
                ]
            ]
        },
        {
            "id": "question-H22-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Protect handler data when requests share it and at least one request changes it."
                ]
            ]
        },
        {
            "id": "question-H22-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The internal goroutine arrangement depends on the HTTP protocol."
                ]
            ]
        },
        {
            "id": "question-H22-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A request’s context is canceled when the client connection closes, the HTTP/2 request is canceled, or "
                ],
                [
                    "ServeHTTP",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns."
                ]
            ]
        },
        {
            "id": "question-H22-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass the request context into ongoing work. Checking it only once does not make later work cancellable."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "JSON encoding and decoding can allocate memory and inspect types through reflection."
                ]
            ]
        },
        {
            "id": "question-H23-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Profile code that processes many JSON values before changing it for speed."
                ]
            ]
        },
        {
            "id": "question-H23-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A struct declares the fields and types you expect."
                ]
            ]
        },
        {
            "id": "question-H23-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "map[string]any",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " allows mixed values, but you may need runtime type checks."
                ]
            ]
        },
        {
            "id": "question-H23-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "omitempty",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " changes which fields appear in the output. Check that this matches the API’s meaning."
                ]
            ]
        },
        {
            "id": "question-H23-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Custom marshaling must keep the required encoding and decoding behavior."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A fuzz test runs code with starting inputs, then with generated variations."
                ]
            ]
        },
        {
            "id": "question-H24-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It checks a property: something that should remain true for every supported input."
                ]
            ]
        },
        {
            "id": "question-H24-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "It can find panics or failed checks in parsers, encoders and state-handling code."
                ]
            ]
        },
        {
            "id": "question-H24-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Choose a property that still makes sense for generated inputs."
                ]
            ]
        },
        {
            "id": "question-H24-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "The example checks that valid UTF-8 text stays unchanged after JSON encoding and decoding."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Build tags choose which source files are included for a platform or feature."
                ]
            ]
        },
        {
            "id": "question-H25-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "An "
                ],
                [
                    "internal",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " package can be imported only from within the directory tree rooted at its parent."
                ]
            ]
        },
        {
            "id": "question-H25-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "go:generate",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " records a command to run with "
                ],
                [
                    "go generate",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-H25-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "go build",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does not run that command."
                ]
            ]
        },
        {
            "id": "question-H25-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use fixed generator versions and inputs when you need the same generated output each time."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "GOGC",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " controls the heap-growth target described in H09."
                ]
            ]
        },
        {
            "id": "question-E01-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Since Go 1.19, "
                ],
                [
                    "GOMEMLIMIT",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " sets a soft limit on memory managed by the Go runtime."
                ]
            ]
        },
        {
            "id": "question-E01-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Near that limit, the runtime can collect more often."
                ]
            ]
        },
        {
            "id": "question-E01-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "The limit does not include every part of process memory, such as memory allocated by C."
                ]
            ]
        },
        {
            "id": "question-E01-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Leave room for that extra memory when choosing the limit."
                ]
            ]
        },
        {
            "id": "question-E01-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime may exceed the limit to avoid spending too much time collecting."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "During GC marking, the program can still change pointers."
                ]
            ]
        },
        {
            "id": "question-E02-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A write barrier is extra code that records pointer changes for the GC."
                ]
            ]
        },
        {
            "id": "question-E02-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "It helps the GC avoid missing objects that the program can still reach."
                ]
            ]
        },
        {
            "id": "question-E02-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "This adds work to some pointer writes."
                ]
            ]
        },
        {
            "id": "question-E02-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "The exact barrier can change between runtime versions."
                ]
            ]
        },
        {
            "id": "question-E02-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Hiding a Go pointer from the GC can let it free memory that your code still tries to use."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A finalizer runs after an object becomes unreachable, but its timing is not guaranteed."
                ]
            ]
        },
        {
            "id": "question-E03-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It may not run before the program exits."
                ]
            ]
        },
        {
            "id": "question-E03-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "It can make the object reachable again. This is called resurrection."
                ]
            ]
        },
        {
            "id": "question-E03-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Finalizers make resource ownership and object lifetime harder to follow."
                ]
            ]
        },
        {
            "id": "question-E03-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use explicit "
                ],
                [
                    "Close",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " calls for required cleanup."
                ]
            ]
        },
        {
            "id": "question-E03-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Treat a finalizer as a fallback, not normal cleanup."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Lock contention means several goroutines are trying to take the same lock."
                ]
            ]
        },
        {
            "id": "question-E04-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The standard mutex implementation has a normal mode and a mode that helps long-waiting goroutines acquire it."
                ]
            ]
        },
        {
            "id": "question-E04-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Starvation means a goroutine keeps waiting while others continue getting the lock."
                ]
            ]
        },
        {
            "id": "question-E04-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "The mode-switch rules are runtime details. The API does not promise strict fairness."
                ]
            ]
        },
        {
            "id": "question-E04-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure waiting with mutex and block profiles."
                ]
            ]
        },
        {
            "id": "question-E04-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Shorten the locked work or separate independent data while keeping related values consistent."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The standard runtime keeps the buffer, waiting senders, waiting receivers and a closed flag inside a channel."
                ]
            ]
        },
        {
            "id": "question-E05-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "An internal lock protects that channel state."
                ]
            ]
        },
        {
            "id": "question-E05-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A send can give a value to a waiting receiver, put it in the buffer, or pause the sender."
                ]
            ]
        },
        {
            "id": "question-E05-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "close",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " wakes waiting goroutines."
                ]
            ]
        },
        {
            "id": "question-E05-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "A blocked sender then panics. Receivers follow the usual closed-channel rules."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The number in "
                ],
                [
                    "make(map[K]V, hint)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " suggests how many entries the map will initially hold."
                ]
            ]
        },
        {
            "id": "question-E06-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It is not a fixed capacity or a maximum."
                ]
            ]
        },
        {
            "id": "question-E06-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A useful estimate can reduce growth work while entries are added."
                ]
            ]
        },
        {
            "id": "question-E06-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "An estimate that is too large can waste memory."
                ]
            ]
        },
        {
            "id": "question-E06-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "The actual allocation and growth rules depend on the Go implementation and version."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "sync.Map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " suits entries written once and read many times."
                ]
            ]
        },
        {
            "id": "question-E07-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It also suits goroutines working on separate sets of keys."
                ]
            ]
        },
        {
            "id": "question-E07-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a normal map with a lock when several entries must stay consistent together."
                ]
            ]
        },
        {
            "id": "question-E07-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "sync.Map",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " stores "
                ],
                [
                    "any",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", so check the actual type or provide a typed wrapper."
                ]
            ]
        },
        {
            "id": "question-E07-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Benchmark your real workload before choosing it for speed."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Go atomics are sequentially consistent. They behave as if all atomic operations run one at a time in a single order."
                ]
            ]
        },
        {
            "id": "question-E08-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "When an atomic operation sees another’s effect, the earlier operation synchronizes before the later one."
                ]
            ]
        },
        {
            "id": "question-E08-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Publishing means making initialized data available to other goroutines."
                ]
            ]
        },
        {
            "id": "question-E08-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Initialize the data first. Then store its pointer or ready flag atomically."
                ]
            ]
        },
        {
            "id": "question-E08-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "A reader that observes that atomic store can see the preceding writes."
                ]
            ]
        },
        {
            "id": "question-E08-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not change published data later without more synchronization."
                ]
            ]
        },
        {
            "id": "question-E08-answer-7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Several atomic updates do not become one atomic transaction."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "ABA means a value changes from A to B and then back to A."
                ]
            ]
        },
        {
            "id": "question-E09-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Compare-and-swap can see A again and succeed, even though other relevant state changed."
                ]
            ]
        },
        {
            "id": "question-E09-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A version tag records which update produced the value. It can distinguish the two A values."
                ]
            ]
        },
        {
            "id": "question-E09-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "In manually managed systems, hazard pointers or epoch-based reclamation delay reusing nodes while readers may still use them."
                ]
            ]
        },
        {
            "id": "question-E09-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "These memory-reclamation schemes protect node lifetime. They do not solve every logical ABA case."
                ]
            ]
        },
        {
            "id": "question-E09-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go GC does not prevent logical ABA when code reuses a node or state."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A type set is the set of types allowed by a constraint."
                ]
            ]
        },
        {
            "id": "question-E10-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " alone allows that specific type."
                ]
            ]
        },
        {
            "id": "question-E10-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "~int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " also allows defined types whose underlying type is "
                ],
                [
                    "int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E10-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "~int | ~int64",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " accepts either family of types."
                ]
            ]
        },
        {
            "id": "question-E10-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "An interface with these type terms can be a constraint, but not an ordinary value type."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The standard Go compiler can share generic machine code between some types with similar memory layouts."
                ]
            ]
        },
        {
            "id": "question-E11-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It puts such type arguments into groups called shapes."
                ]
            ]
        },
        {
            "id": "question-E11-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type dictionary supplies extra information about the actual type and its methods."
                ]
            ]
        },
        {
            "id": "question-E11-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "This is a compiler strategy, not a language guarantee."
                ]
            ]
        },
        {
            "id": "question-E11-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Compiler optimization and escape analysis can change call and memory-allocation costs."
                ]
            ]
        },
        {
            "id": "question-E11-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Benchmark the generic code and alternatives before claiming which is faster."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A checksum is a value used to check whether downloaded content matches the expected content."
                ]
            ]
        },
        {
            "id": "question-E12-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The checksum database provides authenticated checksums for public module versions."
                ]
            ]
        },
        {
            "id": "question-E12-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "It helps detect different content published under the same module version. It does not prove the code is safe."
                ]
            ]
        },
        {
            "id": "question-E12-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "GOPRIVATE",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " sets defaults that avoid the public proxy and checksum database for matching private modules."
                ]
            ]
        },
        {
            "id": "question-E12-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "GONOSUMDB",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " controls which module paths skip the checksum database."
                ]
            ]
        },
        {
            "id": "question-E12-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Local "
                ],
                [
                    "go.sum",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " checks still matter when the public database is skipped."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "cgo lets Go call C code. Each call crosses the two runtimes, and its cost depends on the call."
                ]
            ]
        },
        {
            "id": "question-E13-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "C can keep a Go pointer only while the pointed-to memory is properly pinned under the cgo rules."
                ]
            ]
        },
        {
            "id": "question-E13-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pinning keeps the memory in place. Data containing other Go pointers needs extra care."
                ]
            ]
        },
        {
            "id": "question-E13-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "runtime.Pinner",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " manages supported memory pinning."
                ]
            ]
        },
        {
            "id": "question-E13-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "runtime/cgo.Handle",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " gives C an integer handle through which Go can recover a Go value."
                ]
            ]
        },
        {
            "id": "question-E13-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keeping one OS thread does not by itself make passing pointers safe."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "LockOSThread",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " keeps the current goroutine on its current OS thread."
                ]
            ]
        },
        {
            "id": "question-E14-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It also keeps other goroutines off that thread until matching unlocks."
                ]
            ]
        },
        {
            "id": "question-E14-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Thread affinity means an API must keep using the same OS thread."
                ]
            ]
        },
        {
            "id": "question-E14-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use this for APIs with thread affinity or state stored per thread."
                ]
            ]
        },
        {
            "id": "question-E14-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Balance locks with unlocks when the thread no longer needs to stay locked."
                ]
            ]
        },
        {
            "id": "question-E14-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Locked threads give the scheduler less freedom to move work."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "io.Copy",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " first checks whether the source implements "
                ],
                [
                    "io.WriterTo",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and can copy with "
                ],
                [
                    "WriteTo",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E15-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Otherwise, it checks whether the destination implements "
                ],
                [
                    "io.ReaderFrom",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and can copy with "
                ],
                [
                    "ReadFrom",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "question-E15-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "If neither applies, it copies through a buffer."
                ]
            ]
        },
        {
            "id": "question-E15-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "These methods can use faster transfers, sometimes with operating-system support."
                ]
            ]
        },
        {
            "id": "question-E15-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "They do not guarantee zero-copy, where data transfers avoid the usual extra copy through your program."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Functional options are functions that change a constructor’s settings."
                ]
            ]
        },
        {
            "id": "question-E16-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The constructor starts with defaults, then applies the options in order."
                ]
            ]
        },
        {
            "id": "question-E16-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Export option helpers when callers should configure settings through those helpers."
                ]
            ]
        },
        {
            "id": "question-E16-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "The configuration fields can stay private."
                ]
            ]
        },
        {
            "id": "question-E16-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Validate option values when the API needs it."
                ]
            ]
        },
        {
            "id": "question-E16-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "In this example, later options win when they change the same setting."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An object kept for a long time may accidentally reuse an old canceled request context."
                ]
            ]
        },
        {
            "id": "question-E17-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It may also keep request values alive longer than needed."
                ]
            ]
        },
        {
            "id": "question-E17-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass "
                ],
                [
                    "ctx",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " into each operation to make that operation’s lifetime clear."
                ]
            ]
        },
        {
            "id": "question-E17-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "A struct used for just one operation can intentionally hold its context, as "
                ],
                [
                    "http.Request",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does."
                ]
            ]
        },
        {
            "id": "question-E17-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid mixing the lifetimes of unrelated requests."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Define a small interface with only the behavior the caller needs."
                ]
            ]
        },
        {
            "id": "question-E18-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A test double is a small replacement used during a test. It can implement that interface."
                ]
            ]
        },
        {
            "id": "question-E18-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "This avoids replacing the whole concrete dependency."
                ]
            ]
        },
        {
            "id": "question-E18-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Returning a concrete type is often useful."
                ]
            ]
        },
        {
            "id": "question-E18-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Returning an interface can help when callers should not depend on one implementation."
                ]
            ]
        },
        {
            "id": "question-E18-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Choose based on what the API needs, rather than one rule for every function."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Each call to "
                ],
                [
                    "errors.New",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates a different error, even when the messages match."
                ]
            ]
        },
        {
            "id": "question-E19-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Comparing error text makes callers depend on wording."
                ]
            ]
        },
        {
            "id": "question-E19-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A sentinel is one shared error value that callers can recognize."
                ]
            ]
        },
        {
            "id": "question-E19-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Expose a documented sentinel or typed error when callers need to recognize a condition."
                ]
            ]
        },
        {
            "id": "question-E19-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Wrapping preserves that condition for callers. It becomes part of your API’s behavior."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The zero-value "
                ],
                [
                    "http.Client",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " uses "
                ],
                [
                    "DefaultTransport",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and has no overall timeout."
                ]
            ]
        },
        {
            "id": "question-E20-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A request context or "
                ],
                [
                    "Client.Timeout",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can limit how long an operation takes."
                ]
            ]
        },
        {
            "id": "question-E20-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Client.Timeout",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " also includes time spent reading the response body."
                ]
            ]
        },
        {
            "id": "question-E20-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reuse transports so requests can reuse connections."
                ]
            ]
        },
        {
            "id": "question-E20-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Close response bodies when done."
                ]
            ]
        },
        {
            "id": "question-E20-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Clients sharing "
                ],
                [
                    "DefaultTransport",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " share its connection pool."
                ]
            ]
        },
        {
            "id": "question-E20-answer-7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Creating a new transport for every request loses that reuse."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An execution trace records when goroutines run, wait, call the OS and take part in GC work."
                ]
            ]
        },
        {
            "id": "question-E21-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A CPU profile mainly samples running code. It may miss time spent waiting."
                ]
            ]
        },
        {
            "id": "question-E21-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A trace can show how that waiting adds to request latency."
                ]
            ]
        },
        {
            "id": "question-E21-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Trace tasks and regions label related events or parts of work. Use them to connect runtime events to a request."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The inuse views estimate live Go heap allocations as of the most recent completed GC."
                ]
            ]
        },
        {
            "id": "question-E22-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "The alloc views count sampled allocations since the program started, including objects already collected."
                ]
            ]
        },
        {
            "id": "question-E22-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "RSS is the memory the operating system reports as resident for the whole process."
                ]
            ]
        },
        {
            "id": "question-E22-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Neither heap view equals RSS. Stacks, runtime data, memory pages and memory allocated outside Go affect the difference."
                ]
            ]
        },
        {
            "id": "question-E22-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "For large inuse values, look for objects kept alive too long."
                ]
            ]
        },
        {
            "id": "question-E22-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "For large alloc values, look for repeated temporary allocations."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Alignment rules require fields to start at suitable memory addresses."
                ]
            ]
        },
        {
            "id": "question-E23-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Padding is unused space added between fields or at the end to meet those rules."
                ]
            ]
        },
        {
            "id": "question-E23-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reordering fields can reduce a struct’s size."
                ]
            ]
        },
        {
            "id": "question-E23-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Swapping only a byte and an int64 often leaves the final size unchanged."
                ]
            ]
        },
        {
            "id": "question-E23-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "The example uses two byte fields and assumes the standard compiler aligns int64 to 8 bytes."
                ]
            ]
        },
        {
            "id": "question-E23-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Its expected sizes depend on the target."
                ]
            ]
        },
        {
            "id": "question-E23-caveat",
            "type": "bulleted_list",
            "richText": [
                [
                    "A smaller struct can save memory in a large slice of those structs."
                ]
            ]
        },
        {
            "id": "question-E23-caveat-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reordering fields does not remove pointers or guarantee less GC scanning or better speed."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use allocation profiles to find temporary objects created repeatedly."
                ]
            ]
        },
        {
            "id": "question-E24-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Consider reusing buffers or reserving the space you expect to need."
                ]
            ]
        },
        {
            "id": "question-E24-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Append-style formatting APIs can write into an existing buffer instead of creating a new string."
                ]
            ]
        },
        {
            "id": "question-E24-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keep clear ownership of reused buffers so goroutines do not change the same data unsafely."
                ]
            ]
        },
        {
            "id": "question-E24-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Limit cache size so cached objects do not keep growing in memory."
                ]
            ]
        },
        {
            "id": "question-E24-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure allocation rate and latency after a change."
                ]
            ]
        },
        {
            "id": "question-E24-answer-7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Fewer allocations alone do not prove the service is faster."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The top-level "
                ],
                [
                    "math/rand",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " functions are safe to call from several goroutines."
                ]
            ]
        },
        {
            "id": "question-E25-answer-2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "Rand",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " created from "
                ],
                [
                    "NewSource",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " normally needs synchronization when shared."
                ]
            ]
        },
        {
            "id": "question-E25-answer-3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The API does not promise a globally locked generator. Current runtime-backed paths can avoid that lock."
                ]
            ]
        },
        {
            "id": "question-E25-answer-4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a private generator when you need a repeatable random sequence for a simulation."
                ]
            ]
        },
        {
            "id": "question-E25-answer-5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not use "
                ],
                [
                    "math/rand",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for secrets."
                ]
            ]
        },
        {
            "id": "question-E25-answer-6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Context-value lookup cost depends on the implementation and the chain of wrapped contexts."
                ]
            ]
        },
        {
            "id": "question-E25-answer-7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use normal parameters for general configuration instead of context values."
                ]
            ]
        },
        {
            "id": "question-E25-extra-0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure performance before assuming a private random generator is faster."
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
