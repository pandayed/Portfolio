import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80f1-9158-f4bcf0b5ae56",
    "slug": "interfaces",
    "title": "Interfaces",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "2692494b-1fa9-553d-90ac-156643cfad5a",
            "type": "text",
            "richText": [
                [
                    "A basic interface specifies methods. Different types can be used through it when their method sets contain every required method with the matching signature. Satisfaction is implicit; there is no implements keyword."
                ]
            ]
        },
        {
            "id": "4c3a14dc-ec83-53b2-99b1-e03676eac6b9",
            "type": "text",
            "richText": [
                [
                    "This page covers interfaces used as values. Interfaces with type terms such as "
                ],
                [
                    "~int",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or unions are constraints; see Generics."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8000-96de-f8eccd81dee1",
            "type": "text",
            "richText": [
                [
                    "Type constraints: "
                ],
                [
                    "Generics",
                    [
                        [
                            "a",
                            "#/notes/go/generics"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "09c5bbdb-1428-5f9a-a4a0-001ce03582d8",
            "type": "sub_header",
            "richText": [
                [
                    "Using interface values"
                ]
            ]
        },
        {
            "id": "dd353c53-2f3d-5932-bb34-36a47fc0a16a",
            "type": "text",
            "richText": [
                [
                    "Dog and Cat satisfy Speaker independently. makeItSpeak needs only the Speak method."
                ]
            ]
        },
        {
            "id": "5498ed48-eb04-577f-886c-220297a3efa7",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\ntype Speaker interface {\n    Speak() string\n}\n\ntype Dog struct{}\nfunc (Dog) Speak() string { return \"Woof\" }\n\ntype Cat struct{}\nfunc (Cat) Speak() string { return \"Meow\" }\n\nfunc makeItSpeak(s Speaker) {\n    fmt.Println(s.Speak())\n}\n\nfunc main() {\n    makeItSpeak(Dog{})\n    makeItSpeak(Cat{})\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "d34cae42-f836-5db7-bbd6-1dff4165dcfc",
            "type": "text",
            "richText": [
                [
                    "Expected output:"
                ]
            ]
        },
        {
            "id": "90642f75-411c-51a6-b598-09aeb115f412",
            "type": "code",
            "richText": [
                [
                    "Woof\nMeow"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "2f324eb1-ed54-8080-85a6-f11621db4227",
            "type": "text",
            "richText": [
                [
                    "Value/pointer method sets and addressability: "
                ],
                [
                    "Methods",
                    [
                        [
                            "a",
                            "#/notes/go/methods"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "33c6b1ce-9586-5c21-b42a-0b8996cda11b",
            "type": "sub_header",
            "richText": [
                [
                    "Composing interfaces and missing methods"
                ]
            ]
        },
        {
            "id": "e51517ff-f590-51ca-8943-ec60dfd522ec",
            "type": "text",
            "richText": [
                [
                    "Embed small interfaces when a consumer needs their combined methods. These are simplified teaching signatures, distinct from the standard library’s io.Reader and io.Writer."
                ]
            ]
        },
        {
            "id": "5b908dc3-c991-51ff-ac6b-8de7ac068c1b",
            "type": "code",
            "richText": [
                [
                    "type Reader interface { Read() string }\ntype Writer interface { Write(string) }\n\ntype ReaderWriter interface {\n    Reader\n    Writer\n}\n\ntype FileReader struct{}\nfunc (FileReader) Read() string { return \"reading\" }\n\nvar _ Reader = FileReader{}\n// var _ ReaderWriter = FileReader{} // error: Write(string) is missing"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "4684dfb5-e9a2-55ab-ab9d-3284beaa6832",
            "type": "text",
            "richText": [
                [
                    "Use Reader for a function that only reads; require ReaderWriter only when both operations are needed. FileReader can exist without Write, but it cannot be assigned or passed as ReaderWriter."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-80d9-97a3-c890879e74bf",
            "type": "text",
            "richText": [
                [
                    "Struct field and method promotion: "
                ],
                [
                    "Embeddings",
                    [
                        [
                            "a",
                            "#/notes/go/embeddings"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "0668dbd3-5967-51e4-aa51-d0f54ee085d2",
            "type": "sub_header",
            "richText": [
                [
                    "Dynamic type and dynamic value"
                ]
            ]
        },
        {
            "id": "ae456fe7-c568-5a92-bda0-753db266b509",
            "type": "text",
            "richText": [
                [
                    "Conceptually, an interface value carries a concrete dynamic type and a value of that type. Its static interface type controls which methods the code may call."
                ]
            ]
        },
        {
            "id": "d97b2eb1-32d0-56d1-9636-8aaf5d696562",
            "type": "code",
            "richText": [
                [
                    "func readExample() {\n    var r Reader = FileReader{}\n    fmt.Println(r.Read()) // reading\n    // r has static type Reader and dynamic type FileReader.\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "83de5169-d57f-5805-9e4a-4b0278c6f6c0",
            "type": "sub_header",
            "richText": [
                [
                    "Empty interface and any"
                ]
            ]
        },
        {
            "id": "207de379-20b9-55f7-9bf3-46b94fe7f0c7",
            "type": "text",
            "richText": [
                [
                    "interface{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " has no methods, so any value may be assigned to it. "
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
                    " in Go 1.18+. It is useful for values whose types vary, such as unknown JSON fields."
                ]
            ]
        },
        {
            "id": "91844aea-7c9c-5a57-9352-5303f120cd10",
            "type": "text",
            "richText": [
                [
                    "Static knowledge of the concrete type is lost, but Go still checks types. Use an assertion or switch before operations that need a particular concrete type."
                ]
            ]
        },
        {
            "id": "d7800402-9808-5f40-8219-f9dedd76fb66",
            "type": "code",
            "richText": [
                [
                    "func PrintAny(val any) {\n    fmt.Println(val)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "7179b913-1861-5d72-be26-c6755e2d9b52",
            "type": "sub_header",
            "richText": [
                [
                    "Type assertions"
                ]
            ]
        },
        {
            "id": "d7f2f81a-3d3c-502f-9167-c812a82248e6",
            "type": "text",
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
                    " applies to an interface expression. A concrete T must match the dynamic type; an interface T must be implemented by the dynamic type. The assertion panics on failure. It does not convert the stored value to another type."
                ]
            ]
        },
        {
            "id": "7527fa13-dc4d-55e9-8f18-cbebdefe4315",
            "type": "code",
            "richText": [
                [
                    "var x any = 10\nv := x.(int)\nfmt.Println(v) // 10\n\ns, ok := x.(string)\nfmt.Println(s == \"\", ok) // true false: failed assertion gives string zero value\n\n// _ = x.(string) // panics\n// _ = v.(int)    // compile-time error: v is already an int, not an interface"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "e0398331-e80b-59ff-9249-8eccbc6dc0ab",
            "type": "text",
            "richText": [
                [
                    "A conversion such as "
                ],
                [
                    "float64(v)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " produces a value of the target type. It can involve runtime work and is separate from a dynamic-type assertion."
                ]
            ]
        },
        {
            "id": "1c156ca5-0091-597b-af89-851e676ae06c",
            "type": "sub_header",
            "richText": [
                [
                    "Type switches"
                ]
            ]
        },
        {
            "id": "2a560cca-9bb9-5be4-b25e-54ac168628c8",
            "type": "code",
            "richText": [
                [
                    "func PrintType(val any) {\n    switch v := val.(type) {\n    case int:\n        fmt.Println(\"int:\", v)\n    case string:\n        fmt.Println(\"string:\", v)\n    default:\n        fmt.Println(\"unknown type\")\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "988e7fe1-cf42-58ff-bb7c-82b1b0a45321",
            "type": "text",
            "richText": [
                [
                    "PrintType(10) prints "
                ],
                [
                    "int: 10",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "; PrintType(\"hi\") prints "
                ],
                [
                    "string: hi",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". The default handles other dynamic types, including nil."
                ]
            ]
        },
        {
            "id": "bcd5b54a-2079-58f3-991e-fe59e064ab06",
            "type": "sub_header",
            "richText": [
                [
                    "Nil interface values"
                ]
            ]
        },
        {
            "id": "269bf3cf-b195-5a9d-9ae8-aabd0b31f74f",
            "type": "text",
            "richText": [
                [
                    "An interface is nil only when it has neither a dynamic type nor a dynamic value. Assigning a typed nil pointer gives the interface a dynamic type, so the interface is non-nil."
                ]
            ]
        },
        {
            "id": "bcf8cc38-8e0f-5053-af1c-e80f3555f649",
            "type": "code",
            "richText": [
                [
                    "type MyError struct { Msg string }\n\nfunc (e *MyError) Error() string {\n    if e == nil { return \"nil MyError\" }\n    return e.Msg\n}\n\nfunc nilErrors() {\n    var err error\n    fmt.Println(err == nil) // true\n\n    var e *MyError\n    var err2 error = e\n    fmt.Println(err2 == nil) // false: dynamic type is *MyError\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "4f641ff4-6388-5b51-8226-161dad806eca",
            "type": "text",
            "richText": [
                [
                    "Return an explicit "
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
                    " error for success rather than a nil pointer converted to error."
                ]
            ]
        },
        {
            "id": "5e94ca0d-9b2a-5834-ac4f-be54d090532a",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Nil error FAQ",
                    [
                        [
                            "a",
                            "https://go.dev/doc/faq#nil_error"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "fe5b7b98-47db-56ad-a99a-63b720caaadc",
            "type": "sub_header",
            "richText": [
                [
                    "Designing a consumer interface"
                ]
            ]
        },
        {
            "id": "036073fa-d61c-5fea-8ed5-7f58ed4a52ef",
            "type": "text",
            "richText": [
                [
                    "Declare the behavior where it is needed. A consumer can accept a real implementation or a small fake with the same method."
                ]
            ]
        },
        {
            "id": "b8d0bd16-28b2-5413-ba33-3984587b335a",
            "type": "code",
            "richText": [
                [
                    "type Storage interface {\n    Save(string) error\n}\n\nfunc Process(s Storage) error {\n    return s.Save(\"some data\")\n}\n\ntype MemoryStorage struct { Data string }\nfunc (s *MemoryStorage) Save(data string) error {\n    s.Data = data\n    return nil\n}\n\nfunc NewMemoryStorage() *MemoryStorage {\n    return &MemoryStorage{}\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "bbcd136e-ea7c-5fd8-9ab5-0718b8d0a52e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keep an interface limited to the methods the consumer actually uses. Add it when substitution or a package boundary needs that behavior."
                ]
            ]
        },
        {
            "id": "50e2d68b-03df-5d68-87b8-617601a1cee7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Accept a small interface when a parameter needs only those operations. Accept a concrete type when the code needs its concrete features. Implementing packages usually return concrete types so callers retain those features."
                ]
            ]
        },
        {
            "id": "78be0fb8-e883-5d4c-9541-070bcd270ba5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Returning an interface can still fit an API that intentionally hides implementation choices. This is an API decision, not a universal rule."
                ]
            ]
        },
        {
            "id": "0a98cb80-ad98-55f8-b8f7-54ac3c167312",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use any only when varied dynamic types are part of the contract. Generics preserve a type relationship across parameters and results when that is the requirement."
                ]
            ]
        },
        {
            "id": "36cb1b49-5e21-5c11-b08e-cdc1409e137a",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Go interface review guidance",
                    [
                        [
                            "a",
                            "https://go.dev/wiki/CodeReviewComments#interfaces"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "788ef3d0-cc8b-5fb6-85d6-e98750807556",
            "type": "sub_header",
            "richText": [
                [
                    "Dispatch and performance"
                ]
            ]
        },
        {
            "id": "93a228a0-bd58-5dd0-87bd-1bd169c4ea9a",
            "type": "text",
            "richText": [
                [
                    "An interface method call invokes the implementation associated with the dynamic value. The compiler checks the interface contract. It may know the concrete type and optimize the call."
                ]
            ]
        },
        {
            "id": "fab1f04b-ac6c-5f46-901a-2e87a512fc3d",
            "type": "text",
            "richText": [
                [
                    "An indirect call can add work or restrict inlining. Go compilers can devirtualize some interface calls, including with profile-guided optimization. Allocation and call costs depend on the program, compiler and optimization settings; measure a relevant workload before choosing an API for speed."
                ]
            ]
        },
        {
            "id": "99a05595-d07b-5837-9261-ff6130768f5f",
            "type": "text",
            "richText": [
                [
                    "Runtime method tables are implementation details, not a guaranteed lookup count for every call. Interfaces and generics solve different type contracts; neither implies a fixed performance advantage."
                ]
            ]
        },
        {
            "id": "3854740e-e6ef-5a96-8fb4-59b76bce7853",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Go compiler devirtualization and PGO",
                    [
                        [
                            "a",
                            "https://go.dev/blog/pgo"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "5774c1e0-e688-5e54-bedc-a439a4eb6a70",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Interface types and assertions",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Interface_types"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
