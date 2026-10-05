import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80f1-9158-f4bcf0b5ae56",
    "slug": "interfaces",
    "title": "Interfaces",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "2692494b-1fa9-553d-90ac-156643cfad5a",
            "type": "bulleted_list",
            "richText": [
                [
                    "A basic interface lists the methods a value must provide."
                ]
            ]
        },
        {
            "id": "09fd37c7-6840-52c5-9e74-31f6d87f5dd0",
            "type": "bulleted_list",
            "richText": [
                [
                    "A type implements the interface when it has every listed method with the right signature."
                ]
            ]
        },
        {
            "id": "7d2ef0d9-1e59-5daf-b2be-ad0526d543e4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go checks this automatically. There is no "
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
                    " keyword."
                ]
            ]
        },
        {
            "id": "4c3a14dc-ec83-53b2-99b1-e03676eac6b9",
            "type": "bulleted_list",
            "richText": [
                [
                    "An interface with type rules such as "
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
                    " is used as a constraint."
                ]
            ]
        },
        {
            "id": "d802cdef-6e27-5c0b-84d3-547fb15d99ea",
            "type": "bulleted_list",
            "richText": [
                [
                    "A union joins type choices with "
                ],
                [
                    "|",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", such as "
                ],
                [
                    "int | float64",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ". It also belongs in a constraint."
                ]
            ]
        },
        {
            "id": "03614866-629d-5e78-b1e8-691a3787024d",
            "type": "bulleted_list",
            "richText": [
                [
                    "A constraint limits the type arguments allowed in generic code."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Both "
                ],
                [
                    "Dog",
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
                    "Cat",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " implement "
                ],
                [
                    "Speaker",
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
            "id": "cb76e558-5a0d-50f3-b1d5-5ff676a100aa",
            "type": "bulleted_list",
            "richText": [
                [
                    "makeItSpeak",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " needs only the "
                ],
                [
                    "Speak",
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Embed smaller interfaces to combine their required methods."
                ]
            ]
        },
        {
            "id": "0fe2668d-e015-5f08-b625-3c46f5095be6",
            "type": "bulleted_list",
            "richText": [
                [
                    "These "
                ],
                [
                    "Reader",
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
                    "Writer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " types differ from "
                ],
                [
                    "io.Reader",
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
                    "io.Writer",
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "Reader",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when the function only reads."
                ]
            ]
        },
        {
            "id": "4c4a0df0-98f7-50d9-bd77-7e4ebfd49847",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "ReaderWriter",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when it needs both reading and writing."
                ]
            ]
        },
        {
            "id": "40fc1881-6978-52bb-9cf1-a972db63d7da",
            "type": "bulleted_list",
            "richText": [
                [
                    "FileReader",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is valid without a "
                ],
                [
                    "Write",
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
            "id": "b323b83f-c31a-5974-bdea-a9ea9de224af",
            "type": "bulleted_list",
            "richText": [
                [
                    "It cannot be used as a "
                ],
                [
                    "ReaderWriter",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " because "
                ],
                [
                    "Write",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is missing."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Dynamic type means the actual type of the value stored in an interface."
                ]
            ]
        },
        {
            "id": "e384c630-c776-59d7-9e98-77cbb98e4e55",
            "type": "bulleted_list",
            "richText": [
                [
                    "Dynamic value means the value stored in it."
                ]
            ]
        },
        {
            "id": "73a692ce-0aa1-51fd-9a72-e1da6a10b796",
            "type": "bulleted_list",
            "richText": [
                [
                    "The static type is the interface type written in the declaration."
                ]
            ]
        },
        {
            "id": "2f8bf8a8-6c77-58b6-a34e-36e4009d687b",
            "type": "bulleted_list",
            "richText": [
                [
                    "The static type controls which methods your code can call."
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
            "type": "bulleted_list",
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
                    " has no methods. It can hold a value of any type."
                ]
            ]
        },
        {
            "id": "250f227b-c419-5d58-b935-5fd077ee5dd3",
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
                    " is another name for "
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
                    " in Go 1.18+."
                ]
            ]
        },
        {
            "id": "2a18200b-1eac-5393-bb2d-f8d6f989a527",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use it when values can have different types, such as unknown JSON fields."
                ]
            ]
        },
        {
            "id": "91844aea-7c9c-5a57-9352-5303f120cd10",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go still checks types when you use "
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
                    "."
                ]
            ]
        },
        {
            "id": "f784481b-8d4b-5b12-bdea-a78c5d34a862",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler no longer knows which concrete type is stored in that value."
                ]
            ]
        },
        {
            "id": "6aee9ef4-5085-5d38-b30f-2b589b8f5403",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a type assertion or type switch before doing work that needs a specific type."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "x.(T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when "
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
                    " is an interface value."
                ]
            ]
        },
        {
            "id": "5a7835fd-bb6b-5a05-a45b-2c3c190ad60f",
            "type": "bulleted_list",
            "richText": [
                [
                    "When "
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
                    " is a concrete type, it must match the stored dynamic type."
                ]
            ]
        },
        {
            "id": "5b3ad9c4-f39b-5b9e-bd5b-9c6fd8286d14",
            "type": "bulleted_list",
            "richText": [
                [
                    "When "
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
                    " is an interface, the stored type must implement it."
                ]
            ]
        },
        {
            "id": "9c05a58f-d642-510e-a074-8160a4c32a50",
            "type": "bulleted_list",
            "richText": [
                [
                    "The single-result form panics if the assertion fails."
                ]
            ]
        },
        {
            "id": "b4d81743-0880-560a-86de-89ca7e24f75e",
            "type": "bulleted_list",
            "richText": [
                [
                    "An assertion checks the stored value. It does not convert it to a different type."
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
            "type": "bulleted_list",
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
                    " creates a value of the target type."
                ]
            ]
        },
        {
            "id": "ff212080-9e22-515b-a340-109027591b30",
            "type": "bulleted_list",
            "richText": [
                [
                    "A conversion may do work at runtime. It is different from checking an interface’s stored type."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "PrintType(10)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " prints "
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
                    "."
                ]
            ]
        },
        {
            "id": "56731411-b2ef-52b5-8665-5badae343700",
            "type": "bulleted_list",
            "richText": [
                [
                    "PrintType(\"hi\")",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " prints "
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
                    "."
                ]
            ]
        },
        {
            "id": "bb88e55a-e792-557f-802e-3b8db54edadd",
            "type": "bulleted_list",
            "richText": [
                [
                    "default",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " handles other types and "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An interface is "
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
                    " only when it has no dynamic type and no dynamic value."
                ]
            ]
        },
        {
            "id": "7c8ed812-0623-57ba-ac9b-6aaed79d75af",
            "type": "bulleted_list",
            "richText": [
                [
                    "Assigning a typed nil pointer gives the interface a dynamic type."
                ]
            ]
        },
        {
            "id": "7e9f5e56-1c41-545e-8927-940108073d8e",
            "type": "bulleted_list",
            "richText": [
                [
                    "The interface is then not "
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
                    ", even though the pointer inside it is "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Return "
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
                    " for success. Do not return a typed nil pointer as an "
                ],
                [
                    "error",
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The consumer is the code that uses an interface. Define the interface where that code needs it."
                ]
            ]
        },
        {
            "id": "2595bc64-d951-5996-b3c2-eae53a9473d0",
            "type": "bulleted_list",
            "richText": [
                [
                    "The consumer can use a real implementation or a small fake with the same methods."
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
                    "Put only the methods the consumer uses in its interface."
                ]
            ]
        },
        {
            "id": "0c6fe1b2-5d5b-51d1-ac50-718628f91442",
            "type": "bulleted_list",
            "richText": [
                [
                    "Add an interface when the code needs to accept different implementations or work across packages."
                ]
            ]
        },
        {
            "id": "50e2d68b-03df-5d68-87b8-617601a1cee7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Accept a small interface when a function needs only its listed operations."
                ]
            ]
        },
        {
            "id": "f7060996-0687-5393-8d0b-8548346df5fc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Accept a concrete type when the function needs features of that type."
                ]
            ]
        },
        {
            "id": "f1441d78-222c-5f31-a8e5-cf015fdb54b6",
            "type": "bulleted_list",
            "richText": [
                [
                    "An implementing package usually returns a concrete type. Callers can then use its other methods too."
                ]
            ]
        },
        {
            "id": "78be0fb8-e883-5d4c-9541-070bcd270ba5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Returning an interface can be useful when an API should hide its implementation."
                ]
            ]
        },
        {
            "id": "c8ead531-5292-5e17-be61-abf11d0d6bea",
            "type": "bulleted_list",
            "richText": [
                [
                    "Choose based on what the API needs."
                ]
            ]
        },
        {
            "id": "0a98cb80-ad98-55f8-b8f7-54ac3c167312",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
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
                    " when the API needs to accept values of different types."
                ]
            ]
        },
        {
            "id": "8a5927ac-3e9a-52ea-8c26-3f456c69c715",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use generics when inputs and results need to keep the same chosen type."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "An interface call runs the method for the value stored inside it."
                ]
            ]
        },
        {
            "id": "3942941f-5870-56f5-b5ad-0b3655620fcd",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler checks that the interface allows the call."
                ]
            ]
        },
        {
            "id": "da6db444-e9fa-5427-8cf0-07fe660fb2e6",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the compiler knows the concrete type, it may simplify the call."
                ]
            ]
        },
        {
            "id": "fab1f04b-ac6c-5f46-901a-2e87a512fc3d",
            "type": "bulleted_list",
            "richText": [
                [
                    "An indirect call finds the method through the interface. It can add work."
                ]
            ]
        },
        {
            "id": "30763494-ace4-54d5-a80b-c130f725b528",
            "type": "bulleted_list",
            "richText": [
                [
                    "Indirect calls can also limit inlining. Inlining places the called function’s code directly inside the caller."
                ]
            ]
        },
        {
            "id": "74c86831-9eeb-5067-b69e-7837e80d631a",
            "type": "bulleted_list",
            "richText": [
                [
                    "The compiler can turn some interface calls into direct calls. This is called devirtualization."
                ]
            ]
        },
        {
            "id": "cb3a39da-9408-5c55-805a-7de1654c5692",
            "type": "bulleted_list",
            "richText": [
                [
                    "Profile-guided optimization uses data from a previous run to help the compiler make this choice."
                ]
            ]
        },
        {
            "id": "c0bc1e9a-b763-57cc-8c38-5f1a830f91da",
            "type": "bulleted_list",
            "richText": [
                [
                    "Call and memory-allocation costs depend on the code, compiler and settings."
                ]
            ]
        },
        {
            "id": "0cbd6bb0-edb5-5204-a4dc-8bceb975db18",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure the code you care about before choosing an API for speed."
                ]
            ]
        },
        {
            "id": "99a05595-d07b-5837-9261-ff6130768f5f",
            "type": "bulleted_list",
            "richText": [
                [
                    "A runtime may use method tables to find interface methods. This is an implementation detail."
                ]
            ]
        },
        {
            "id": "50f4c5e5-c8cc-5802-8743-abb092f56c08",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not assume every interface call performs the same number of lookups."
                ]
            ]
        },
        {
            "id": "7eec9555-51bd-5e61-9a00-096d3052399c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Interfaces and generics have different type rules. Neither is always faster."
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
