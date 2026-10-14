import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "classes",
    title: "Classes, constructors, and inheritance",
    summary: "Create instances, inherit methods, and control field access.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes"
        }
    ],
    sections: [
        {
            id: "class-syntax",
            title: "new runs the constructor and connects the instance prototype",
            bullets: [
                "A class defines how to create instances with shared methods. An instance is an object created from that class.",
                "new ClassName(...) creates an instance and runs its constructor. The constructor initializes its own properties.",
                "Inside the constructor, this refers to the new instance.",
                "Regular methods in the class body belong to the class prototype. Instances share those methods.",
                "Class bodies use strict mode. Class declarations cannot be used before initialization."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "class Counter {\n    constructor(start = 0) {\n        this.value = start;\n    }\n    increment() {\n        this.value += 1;\n        return this.value;\n    }\n}\n\nconst first = new Counter(4);\nconst second = new Counter();\nconsole.log(first.value, second.value); // 4 0\nconsole.log(first.increment());         // 5\nconsole.log(second.value);              // 0\nconsole.log(Object.hasOwn(first, \"value\"));     // true\nconsole.log(Object.hasOwn(first, \"increment\")); // false\nconsole.log(first.increment === second.increment); // true\nconsole.log(Object.getPrototypeOf(first) === Counter.prototype); // true",
                    result: "4 0\n5\n0\ntrue\nfalse\ntrue\ntrue",
                    title: "new runs the constructor and connects the instance prototype",
                    description: [
                        "Create two counters and compare their own data with their shared method."
                    ],
                    explanation: [
                        "Each constructor call creates its own value property.",
                        "Both instances inherit the same increment method from Counter.prototype."
                    ]
                }
            ]
        },
        {
            id: "inheritance-and-composition",
            title: "extends inherits class methods; super calls parent code",
            bullets: [
                "A class declared with extends is a subclass. The class after extends is its parent class. This relationship is called inheritance.",
                "Instances of the subclass can call methods inherited from the parent class.",
                "A subclass method with the same name overrides the inherited method. super.method() calls the parent version.",
                "A derived constructor is a constructor in a subclass. super(...) calls the parent constructor and initializes this for the new instance.",
                "Reading this before super(...) throws a ReferenceError. Use this only after that call returns.",
                "If the subclass has no constructor, JavaScript supplies one that forwards its arguments to the parent constructor."
            ],
            examples: [
                {
                    title: "A subclass with an explicit constructor",
                    language: "javascript",
                    code: "class Animal {\n    constructor(name) { this.name = name; }\n    describe() { return this.name; }\n    eat() { return \"eating\"; }\n}\nclass Dog extends Animal {\n    constructor(name) {\n        super(name);\n        this.sound = \"barks\";\n    }\n    describe() {\n        return `${super.describe()} ${this.sound}`;\n    }\n}\nconst dog = new Dog(\"Pip\");\nconsole.log(dog.describe()); // \"Pip barks\"\nconsole.log(dog.eat());      // \"eating\" (inherited)\n\nclass Cat extends Animal {} // No explicit constructor.\nconsole.log(new Cat(\"Milo\").describe()); // \"Milo\"",
                    result: "Pip barks\neating\nMilo",
                    description: [
                        "Create a subclass that initializes its parent and overrides one method."
                    ],
                    explanation: [
                        "Dog calls the parent constructor before using this.",
                        "Its describe overrides the inherited method and calls super.describe for the parent result.",
                        "Cat uses the default constructor to forward its argument."
                    ]
                },
                {
                    title: "Read this only after super",
                    description: [
                        "The class can be defined, but its broken constructor fails when an instance is created."
                    ],
                    language: "javascript",
                    code: "class Parent {}\nclass Broken extends Parent {\n    constructor() {\n        this.name = \"Pip\";\n        super();\n    }\n}\n// new Broken(); // Would throw ReferenceError before super runs.",
                    explanation: [
                        "The commented call enters the constructor and fails at this.name.",
                        "Move super() before the first this access to initialize the derived instance."
                    ]
                }
            ]
        },
        {
            id: "fields-and-privacy",
            title: "Public fields belong to instances; static fields belong to the class",
            bullets: [
                "A public field stores data on each instance. A static field or method belongs to the class object.",
                "get name() defines a getter. Reading instance.name calls that getter without parentheses.",
                "A #private field is accessible only inside the class body that declares it. It is not an ordinary string-keyed property.",
                "Outside access such as instance.#field is a syntax error. Inside the class, a receiver without the declared private field causes a TypeError."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "class Account {\n    owner = \"unnamed\";\n    #balance = 0;\n    static created = 0;\n    constructor(owner) {\n        this.owner = owner;\n        Account.created += 1;\n    }\n    deposit(amount) { this.#balance += amount; }\n    get balance() { return this.#balance; }\n    balanceOf(other) { return other.#balance; }\n    static count() { return Account.created; }\n}\nconst first = new Account(\"Mia\");\nconst second = new Account(\"Noah\");\nfirst.owner = \"Ava\"; // Public assignment is allowed.\nfirst.deposit(10);\nconsole.log(first.owner, second.owner); // \"Ava\" \"Noah\"\nconsole.log(first.balance, second.balance); // 10 0\nconsole.log(Account.created, Account.count()); // 2 2\nconsole.log(first.created);    // undefined\nconsole.log(first[\"#balance\"]); // undefined\n// first.#balance; // Intentional syntax error if uncommented.\nconsole.log(first.balanceOf(second)); // 0: second is an Account.\n// first.balanceOf({}); // Would throw TypeError: private field is absent.",
                    result: "Ava Noah\n10 0\n2 2\nundefined\nundefined\n0",
                    explanation: [
                        "Public fields are separate on first and second. Static created counts both instances.",
                        "The getter exposes balance while its #balance storage stays private.",
                        "first.balanceOf(second) is valid because second carries that private field. The commented balanceOf({}) would fail at runtime.",
                        "Uncommenting first.#balance fails while parsing because that access is outside the declaring class body."
                    ],
                    title: "Public fields belong to instances; static fields belong to the class",
                    description: [
                        "Create two accounts and compare public, private, and static state."
                    ]
                }
            ]
        },
        {
            id: "constructor-functions",
            title: "Regular functions can also be constructors",
            bullets: [
                "Some regular functions can be called with new to create instances. Arrow functions cannot be constructors.",
                "new.target identifies the constructor used for a new call. It is undefined in an ordinary call.",
                "An arrow inside a constructor reads the enclosing new.target."
            ],
            examples: [
                {
                    title: "Read the constructor target through an arrow",
                    description: [
                        "Call one regular function both with and without new."
                    ],
                    language: "javascript",
                    code: "function Maker() {\n    const readTarget = () => new.target;\n    const target = readTarget();\n    console.log(target === undefined ? \"undefined\" : target.name);\n}\nnew Maker();\nMaker();\nconst Arrow = () => {};\n// new Arrow(); // Would throw TypeError: arrows are not constructors.",
                    result: "Maker\nundefined",
                    explanation: [
                        "readTarget keeps new.target from the enclosing Maker call."
                    ]
                }
            ]
        },
        {
            id: "composition",
            title: "Composition combines separate objects and functions",
            bullets: [
                "Composition means giving an object another object or function that supplies a behavior.",
                "The object calls the supplied behavior directly. This does not require extends or a shared parent class."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "function createNotifier(send) {\n    return { notify(message) { send(message); } };\n}\nconst consoleNotifier = createNotifier((message) => {\n    console.log(`Notice: ${message}`);\n});\nconst savedMessages = [];\nconst savingNotifier = createNotifier((message) => {\n    savedMessages.push(message);\n});\n\nconsoleNotifier.notify(\"Ready\"); // \"Notice: Ready\"\nsavingNotifier.notify(\"Ready\");\nconsole.log(savedMessages); // [\"Ready\"]",
                    result: "Notice: Ready\n[\"Ready\"]",
                    title: "Composition combines separate objects and functions",
                    description: [
                        "Supply different send callbacks to two notifier objects."
                    ],
                    explanation: [
                        "Both notifiers call the function supplied at creation.",
                        "The supplied behavior determines whether a message is printed or saved."
                    ]
                }
            ],
            pitfalls: [
                "Inheritance expresses a parent-child relationship. Passing a function or object keeps a supplied behavior independently replaceable."
            ]
        }
    ]
};

export default note;
