import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-80eb-8bed-c90a4e5d795f",
    "slug": "defer",
    "title": "Defer",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "014b4781-b3d6-5000-a744-5573bd4d0595",
            "type": "text",
            "richText": [
                [
                    "A defer statement registers a function call for the current function’s exit. Deferred calls run in reverse registration order on a normal return or while a panic unwinds the function."
                ]
            ]
        },
        {
            "id": "d9215718-8cb1-53a7-8fd2-e4a0ed597b6b",
            "type": "sub_header",
            "richText": [
                [
                    "Return timing"
                ]
            ]
        },
        {
            "id": "8d94d633-27dc-5bba-9a9f-77a30991a77d",
            "type": "text",
            "richText": [
                [
                    "Complete program: the deferred call finishes before the caller receives the result."
                ]
            ]
        },
        {
            "id": "a22030b4-6651-5fe9-a915-9851fc87ab73",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc sayHello() { fmt.Println(\"Hello\") }\n\nfunc greetAndReturn() int {\n    defer fmt.Println(\"Deferred: Goodbye\")\n    fmt.Println(\"In Function: Greeting\")\n    return 42\n}\n\nfunc main() {\n    sayHello()\n    result := greetAndReturn()\n    fmt.Println(\"Returned:\", result)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "f3329694-bee4-59aa-8e16-cd1a9e0cd4e0",
            "type": "text",
            "richText": [
                [
                    "Expected output:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e9-ad9b-f5f9abf22234",
            "type": "code",
            "richText": [
                [
                    "Hello\nIn Function: Greeting\nDeferred: Goodbye\nReturned: 42"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "a8d12f23-5804-500e-b648-bd801c26412d",
            "type": "text",
            "richText": [
                [
                    "The return value is set first, then the deferred calls run, then control returns to the caller."
                ]
            ]
        },
        {
            "id": "e4edd1c3-8b34-585d-9e93-68e29b5099c0",
            "type": "sub_header",
            "richText": [
                [
                    "Last in, first out"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8003-b1cf-d7b031240ce1",
            "type": "code",
            "richText": [
                [
                    "func example() {\n    defer fmt.Println(\"first\")\n    defer fmt.Println(\"second\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "b4ed6c50-2ea6-571e-9259-eccdf337b7a6",
            "type": "text",
            "richText": [
                [
                    "Calling example prints:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8097-9cef-c01fa73bfc07",
            "type": "code",
            "richText": [
                [
                    "second\nfirst"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "0406881d-ded1-56d6-a8ed-452aac2046ff",
            "type": "sub_header",
            "richText": [
                [
                    "Immediate argument evaluation"
                ]
            ]
        },
        {
            "id": "4a3bd411-a8f0-5aeb-935d-8eb68f881521",
            "type": "text",
            "richText": [
                [
                    "The called function value and its arguments are evaluated when the defer statement is reached. The call runs later. A deferred closure can instead read a variable when the closure runs."
                ]
            ]
        },
        {
            "id": "e7c3b9b7-3c4d-5478-a59d-51377a60aa06",
            "type": "code",
            "richText": [
                [
                    "func capture() {\n    x := 10\n    defer fmt.Println(x)          // argument is saved as 10\n    defer func() { fmt.Println(x) }() // reads x at function exit\n    x = 20\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "509bc221-598c-5b1d-9bde-c2e25695f881",
            "type": "text",
            "richText": [
                [
                    "Calling capture prints:"
                ]
            ]
        },
        {
            "id": "3142b8d9-2eef-52d7-b2d5-cc3033f2005a",
            "type": "code",
            "richText": [
                [
                    "20\n10"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "99632693-52e2-5760-b95c-6a4ec02f7c08",
            "type": "sub_header",
            "richText": [
                [
                    "Named return values"
                ]
            ]
        },
        {
            "id": "fe7e7f32-adb5-5341-bd3d-29c81bc71e2b",
            "type": "text",
            "richText": [
                [
                    "A deferred closure can modify a named result after a return statement assigns it."
                ]
            ]
        },
        {
            "id": "8f120d26-b87b-5c60-9847-61187b98df58",
            "type": "code",
            "richText": [
                [
                    "func f() (result int) {\n    defer func() { result++ }()\n    return 5\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "99a9d0cf-02ff-5410-ae8e-1342526afc36",
            "type": "text",
            "richText": [
                [
                    "f() returns 6. Named results are variables in the function scope; the closure reads and changes result."
                ]
            ]
        },
        {
            "id": "cce7758d-50d7-5adf-9f17-8c386f446e69",
            "type": "sub_header",
            "richText": [
                [
                    "Resource cleanup"
                ]
            ]
        },
        {
            "id": "61e7375f-b54a-5031-863b-df9c4c9db1c7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Register cleanup after successful resource acquisition: defer file.Close() after opening a file, or defer mu.Unlock() after locking a mutex."
                ]
            ]
        },
        {
            "id": "13336a06-4ad1-5b59-9f7a-0f627d442a4a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check cleanup errors when they matter, such as a write or flush failure. A deferred call’s return value is discarded unless a closure handles it."
                ]
            ]
        },
        {
            "id": "3cd0c446-44e7-5fce-ab42-abfcdf6a058f",
            "type": "text",
            "richText": [
                [
                    "Package-scope function, using os and io: opening failure returns before cleanup is registered."
                ]
            ]
        },
        {
            "id": "01756d81-45d0-5162-939d-d9624af954fd",
            "type": "code",
            "richText": [
                [
                    "func readFile(path string) ([]byte, error) {\n    file, err := os.Open(path)\n    if err != nil {\n        return nil, err\n    }\n    defer file.Close()\n    return io.ReadAll(file)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "0ea39363-f2a0-527d-8e56-525b7277570d",
            "type": "text",
            "richText": [
                [
                    "The example reads a file. An application that needs to report a close error should handle that error explicitly."
                ]
            ]
        },
        {
            "id": "7ba6b871-84f7-59a8-8ce9-3e113ab56344",
            "type": "sub_header",
            "richText": [
                [
                    "Defer inside loops"
                ]
            ]
        },
        {
            "id": "c9b69b53-7156-5a25-9ed2-59e4b7f072c0",
            "type": "text",
            "richText": [
                [
                    "A loop iteration is not a function exit. Every deferred call waits until the enclosing function returns."
                ]
            ]
        },
        {
            "id": "1e16a84b-ab92-5fa1-8592-b495bd4a1c4c",
            "type": "code",
            "richText": [
                [
                    "func loop() {\n    for i := 0; i < 3; i++ {\n        defer fmt.Println(i)\n    }\n    fmt.Println(\"Hi there\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "cf3597e0-d512-5de1-90c6-1dd89d2d1f36",
            "type": "text",
            "richText": [
                [
                    "Calling loop prints:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-800f-816e-da1272dc4fe5",
            "type": "code",
            "richText": [
                [
                    "Hi there\n2\n1\n0"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "e159f287-e698-57aa-8a3d-e58a88f3427a",
            "type": "text",
            "richText": [
                [
                    "If each iteration owns a file or lock that must be released promptly, put that iteration’s work in a helper function or close/unlock explicitly. Deferring all cleanup until the outer function returns can keep resources open longer than intended."
                ]
            ]
        },
        {
            "id": "c1343c08-d8db-57db-8fe5-8c6bfe43c043",
            "type": "sub_header",
            "richText": [
                [
                    "Panic recovery"
                ]
            ]
        },
        {
            "id": "24f7166a-afb8-59af-b8a5-d91fab797e3b",
            "type": "text",
            "richText": [
                [
                    "A panic also runs registered defers. To recover, call recover directly from a deferred function in the same goroutine. A bare defer recover() does not provide the required recovering function body."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-800c-ba1f-d883fc4b88f4",
            "type": "text",
            "richText": [
                [
                    "Recovery flow and example: "
                ],
                [
                    "Panic & Recover",
                    [
                        [
                            "a",
                            "#/notes/go/panic-recover"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "703a9cb2-4bbc-5ecf-b5f8-f7dc417bc8a2",
            "type": "sub_header",
            "richText": [
                [
                    "Cost and function boundaries"
                ]
            ]
        },
        {
            "id": "20646300-8499-5b4b-aab5-84484356fc22",
            "type": "text",
            "richText": [
                [
                    "The cost of defer depends on the compiler and the code shape. Go 1.14 introduced cheaper defers for many common cases. Measure a relevant workload before removing cleanup for speed; resource lifetime in a long-running function is a separate concern."
                ]
            ]
        },
        {
            "id": "908f2cc3-30d7-5b39-87f0-acc55f21b211",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Go 1.14 defer improvements",
                    [
                        [
                            "a",
                            "https://go.dev/doc/go1.14#runtime"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "8f3b5e78-c857-5d48-9b03-901651528585",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Defer, panic and recover",
                    [
                        [
                            "a",
                            "https://go.dev/blog/defer-panic-and-recover"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
