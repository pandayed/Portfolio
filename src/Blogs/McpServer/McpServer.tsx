import ArticleLayout from '../ArticleLayout/ArticleLayout';
import type { TocEntry } from '../ArticleLayout/types';
import { MCP_SERVER_BLOG_ROUTE } from '../../routing/routes';

const sections: TocEntry[] = [
    {
        "id": "introduction-why-do-we-even-need-mcp",
        "title": "Introduction: Why do we even need MCP?"
    },
    {
        "id": "what-is-mcp",
        "title": "What is MCP?"
    },
    {
        "id": "understanding-the-architecture",
        "title": "Understanding the architecture"
    },
    {
        "id": "the-three-major-mcp-components",
        "title": "The three major MCP components"
    },
    {
        "id": "1-tools-give-the-ai-the-ability-to-do-things",
        "title": "1. Tools: Give the AI the ability to do things"
    },
    {
        "id": "2-resources-give-the-ai-access-to-information",
        "title": "2. Resources: Give the AI access to information"
    },
    {
        "id": "3-prompts-give-the-ai-reusable-instructions-for-a-task",
        "title": "3. Prompts: Give the AI reusable instructions for a task"
    },
    {
        "id": "putting-everything-together-an-ai-agent-that-fixes-a-bug",
        "title": "Putting everything together: An AI agent that fixes a bug"
    },
    {
        "id": "what-happens-technically-when-a-tool-is-called",
        "title": "What happens technically when a tool is called?"
    },
    {
        "id": "common-misunderstandings-to-avoid",
        "title": "Common misunderstandings to avoid"
    },
    {
        "id": "final-mental-model",
        "title": "Final mental model"
    }
];

const McpServer = () => (
    <ArticleLayout
        title={"Understanding MCP Servers — How AI Connects to the Real World"}
        route={MCP_SERVER_BLOG_ROUTE}
        sections={sections}
    >
        <section className="Article__section" aria-labelledby="introduction-why-do-we-even-need-mcp">
            <h2 id="introduction-why-do-we-even-need-mcp" className="SectionTitle">{"Introduction: Why do we even need MCP?"}</h2>
            <p>{"Imagine you use ChatGPT every day as a software engineer."}</p>
            <p>{"You ask it to explain code, debug errors, write functions, review algorithms, and help you understand new technologies."}</p>
            <p>{"But now imagine you want ChatGPT to do something more powerful."}</p>
            <p>{"You want it to:"}</p>
            <ul className="Article__notes">
                <li>{"Read your GitHub repository."}</li>
                <li>{"Find a bug in your code."}</li>
                <li>{"Check the relevant documentation."}</li>
                <li>{"Understand how your backend works."}</li>
                <li>{"Fix the bug."}</li>
                <li>{"Create a pull request with the fix."}</li>
            </ul>
            <p>{"Can an AI model do all this by itself?"}</p>
            <p><strong>{"No. An AI model cannot automatically access your GitHub account, read your local files, or execute operations on your database."}</strong>{" It needs access to external capabilities."}</p>
            <p>{"One solution is to build integrations that connect AI applications to these systems. But this creates another problem."}</p>
            <p>{"Suppose you have built an integration for GitHub. Now you want another AI application to use the same GitHub capabilities. You may need to build or configure another integration."}</p>
            <p>{"As the number of AI applications and external systems grows, managing all these integrations becomes difficult."}</p>
            <p>{"This is where MCP becomes useful."}</p>
        </section>
        <section className="Article__section" aria-labelledby="what-is-mcp">
            <h2 id="what-is-mcp" className="SectionTitle">{"What is MCP?"}</h2>
            <p>{"MCP stands for "}<strong>{"Model Context Protocol"}</strong>{"."}</p>
            <p>{"It is an open standard that defines how AI applications can connect to external tools and data sources."}</p>
            <p>{"Think of MCP as a common language that AI applications and external systems can use to communicate."}</p>
            <p>{"For example, you might have:"}</p>
            <ul className="Article__notes">
                <li>{"An AI application such as Claude Desktop or an AI coding agent."}</li>
                <li>{"A GitHub MCP server that exposes GitHub capabilities."}</li>
                <li>{"A database MCP server that exposes database capabilities."}</li>
                <li>{"A filesystem MCP server that exposes selected files and directories."}</li>
            </ul>
            <p>{"If an AI application supports MCP, it can communicate with compatible MCP servers without needing a completely different protocol for each one."}</p>
            <h3 className="Article__subTitle">{"A simple analogy"}</h3>
            <p>{"Imagine every country had a different electrical plug."}</p>
            <p>{"You would need a different adapter for every country."}</p>
            <p>{"Now imagine everyone agrees on a standard plug. Devices can use the same standard instead of requiring a completely different connection for each country."}</p>
            <p>{"MCP plays a similar role for AI integrations."}</p>
            <p>{"It standardizes how AI applications discover and use capabilities exposed by external systems."}</p>
            <p>{"The important point is that "}<strong>{"MCP does not make an AI model intelligent by itself. It gives the AI application a standard way to access capabilities and information that can make it more useful."}</strong></p>
            <hr />
        </section>
        <section className="Article__section" aria-labelledby="understanding-the-architecture">
            <h2 id="understanding-the-architecture" className="SectionTitle">{"Understanding the architecture"}</h2>
            <p>{"Before discussing the components of an MCP server, we need to understand how the pieces fit together."}</p>
            <p>{"Consider an AI coding agent connected to GitHub."}</p>
            <p>{"There are three important parts."}</p>
            <h3 className="Article__subTitle">{"The AI application"}</h3>
            <p>{"This is the application through which you interact with the AI."}</p>
            <p>{"Examples include an AI desktop application or a coding agent inside your development environment."}</p>
            <p>{"The application receives your request, communicates with the model, manages available integrations, and handles tool execution."}</p>
            <h3 className="Article__subTitle">{"The MCP client"}</h3>
            <p>{"The MCP client is the component that communicates with an MCP server using the MCP protocol."}</p>
            <p>{"It can discover which capabilities the server exposes and request those capabilities when needed."}</p>
            <p>{"An AI application may manage multiple MCP clients, with each client connecting to a different server."}</p>
            <h3 className="Article__subTitle">{"The MCP server"}</h3>
            <p>{"The MCP server is a program that exposes capabilities through MCP."}</p>
            <p>{"For example, a GitHub MCP server might expose operations for reading repository files, inspecting pull requests, and creating issues."}</p>
            <p>{"The server handles MCP requests and connects to the underlying system as required."}</p>
            <p>{"The word \"server\" does not necessarily mean a program running on a remote cloud machine. An MCP server can also run locally on your computer."}</p>
            <h3 className="Article__subTitle">{"Putting them together"}</h3>
            <p>{"Your architecture might look like this:"}</p>
            <pre className="Article__code"><code>{"You\n |\n v\nAI application\n |\n +---- AI model\n |\n v\nMCP client\n |\n | MCP protocol\n |\n v\nGitHub MCP server\n |\n v\nGitHub API"}</code></pre>
            <p>{"The AI model reasons about what needs to happen. The AI application coordinates the workflow. The MCP client communicates with the server. The server exposes the relevant capabilities and accesses GitHub."}</p>
            <p>{"In a real application, the model and MCP client may communicate through the AI application's orchestration layer rather than through a simple, direct sequence."}</p>
            <p>{"Now that we understand the architecture, let's look at what an MCP server actually exposes."}</p>
            <hr />
        </section>
        <section className="Article__section" aria-labelledby="the-three-major-mcp-components">
            <h2 id="the-three-major-mcp-components" className="SectionTitle">{"The three major MCP components"}</h2>
            <p>{"An MCP server can expose three major types of capabilities:"}</p>
            <ul className="Article__notes">
                <li>{"Tools"}</li>
                <li>{"Resources"}</li>
                <li>{"Prompts"}</li>
            </ul>
            <p>{"These serve different purposes."}</p>
            <p>{"The easiest way to remember them is:"}</p>
            <ul className="Article__notes">
                <li><strong>{"Tools:"}</strong>{" Do something."}</li>
                <li><strong>{"Resources:"}</strong>{" Read or access information."}</li>
                <li><strong>{"Prompts:"}</strong>{" Provide reusable instructions for a task."}</li>
            </ul>
            <p>{"A server does not have to implement all three. It can expose any combination of them."}</p>
            <p>{"Let's understand each one using a GitHub example."}</p>
        </section>
        <section className="Article__section" aria-labelledby="1-tools-give-the-ai-the-ability-to-do-things">
            <h2 id="1-tools-give-the-ai-the-ability-to-do-things" className="SectionTitle">{"1. Tools: Give the AI the ability to do things"}</h2>
            <p>{"A tool is an operation that an AI application can make available to the model."}</p>
            <p>{"If you have worked with backend development, think of a tool as a function that can be called through a defined interface."}</p>
            <p>{"For example, a GitHub MCP server might expose tools such as:"}</p>
            <pre className="Article__code"><code>{"get_pull_request(pr_number)\nget_file_contents(path)\nget_pull_request_diff(pr_number)\ncreate_pull_request(title, body, branch)"}</code></pre>
            <p>{"These are illustrative tool names. Actual names depend on the server implementation."}</p>
            <p>{"Each tool has a name, a description, and an input schema that describes the arguments it accepts."}</p>
            <p>{"For example:"}</p>
            <pre className="Article__code"><code>{"Tool: get_pull_request_diff\n\nInput:\n  pr_number: integer\n\nOutput:\n  The changes made in the pull request"}</code></pre>
            <p>{"The AI application can provide this tool's definition to the model."}</p>
            <p>{"Suppose you ask:"}</p>
            <p>{"\"Explain what changed in pull request #42.\""}</p>
            <p>{"The model may determine that it needs the pull request's diff."}</p>
            <p>{"It requests a call to:"}</p>
            <pre className="Article__code"><code>{"get_pull_request_diff(42)"}</code></pre>
            <p>{"The AI application handles the tool call through the MCP client, which sends the request to the server. The server obtains the diff and returns the result."}</p>
            <p>{"The AI can then analyze the returned information and explain the changes to you."}</p>
            <h3 className="Article__subTitle">{"Why are tools valuable?"}</h3>
            <p>{"Without an appropriate integration, the AI might ask you to paste the code manually."}</p>
            <p>{"With a tool, the AI can retrieve the required information itself, subject to the configured permissions and access."}</p>
            <p>{"Tools can also perform operations that change external systems."}</p>
            <p>{"For example, a tool might create an issue, update a record, or open a pull request."}</p>
            <p>{"This is why permissions and safeguards matter. A tool that reads data is different from one that deletes data or modifies production systems."}</p>
            <p><strong>{"Remember:"}</strong>{" A tool provides a capability. It does not guarantee that the model will use it correctly or that the requested operation will always succeed."}</p>
            <hr />
        </section>
        <section className="Article__section" aria-labelledby="2-resources-give-the-ai-access-to-information">
            <h2 id="2-resources-give-the-ai-access-to-information" className="SectionTitle">{"2. Resources: Give the AI access to information"}</h2>
            <p>{"A resource exposes information that an AI application can retrieve through MCP."}</p>
            <p>{"Think of resources as a standardized way to make relevant data available to an AI application."}</p>
            <p>{"Suppose your GitHub MCP server exposes these resources:"}</p>
            <pre className="Article__code"><code>{"github://project/architecture\ngithub://project/coding-guidelines\ngithub://project/api-documentation"}</code></pre>
            <p>{"These are illustrative resource identifiers, not necessarily real URIs supported by a particular server."}</p>
            <p>{"When retrieved, they might provide information such as:"}</p>
            <ul className="Article__notes">
                <li>{"How your application is structured."}</li>
                <li>{"Which coding conventions your team follows."}</li>
                <li>{"How your APIs are expected to behave."}</li>
                <li>{"Which authentication method your backend uses."}</li>
            </ul>
            <p>{"Imagine the AI is reviewing a pull request that changes your authentication code."}</p>
            <p>{"The code alone may not explain why a particular check exists."}</p>
            <p>{"But your architecture documentation might say that all protected API endpoints must validate a user's access token."}</p>
            <p>{"The AI can use this information to understand the intended behavior and identify a potential security problem."}</p>
            <h3 className="Article__subTitle">{"How are resources different from tools?"}</h3>
            <p>{"Consider these two examples."}</p>
            <p>{"A resource:"}</p>
            <pre className="Article__code"><code>{"Read the authentication documentation."}</code></pre>
            <p>{"A tool:"}</p>
            <pre className="Article__code"><code>{"Fetch the authentication configuration for service X."}</code></pre>
            <p>{"The resource makes information available. The tool exposes an operation."}</p>
            <p>{"This distinction is conceptual rather than absolute: a tool can also return information, and an application can provide information to the model through mechanisms other than MCP resources."}</p>
            <p>{"An MCP resource is also not automatically included in every model request. The client or application decides when and how to retrieve and provide it."}</p>
            <h3 className="Article__subTitle">{"Why are resources valuable?"}</h3>
            <p>{"Models can reason about information, but they cannot reason about information they have not received."}</p>
            <p>{"Resources help an AI application provide relevant context without requiring you to paste every document into the conversation manually."}</p>
            <p>{"This is particularly useful when working with large codebases, technical documentation, internal knowledge, and structured data."}</p>
            <p><strong>{"Remember:"}</strong>{" Resources make information available; the client determines how that information enters the AI's context."}</p>
            <hr />
        </section>
        <section className="Article__section" aria-labelledby="3-prompts-give-the-ai-reusable-instructions-for-a-task">
            <h2 id="3-prompts-give-the-ai-reusable-instructions-for-a-task" className="SectionTitle">{"3. Prompts: Give the AI reusable instructions for a task"}</h2>
            <p>{"Prompts are the most confusing of the three components, so let's examine them carefully."}</p>
            <p>{"You already know what a prompt is from using ChatGPT."}</p>
            <p>{"For example, you might type:"}</p>
            <p>{"\"Review this code for bugs, security problems, and performance issues. Explain each finding and suggest a fix.\""}</p>
            <p>{"That is an instruction to the AI."}</p>
            <p>{"Now imagine your engineering team performs this type of code review hundreds of times."}</p>
            <p>{"Your team has a standard review process. Everyone should check for the same categories of problems and follow the same reporting format."}</p>
            <p>{"Instead of asking every engineer to type the same long instruction repeatedly, your MCP server can expose a reusable prompt template."}</p>
            <p>{"For example:"}</p>
            <pre className="Article__code"><code>{"Prompt name: review_pull_request\n\nArguments:\n  pr_number\n\nInstructions:\n  Review pull request #{pr_number}.\n\n  Check for:\n  - Bugs\n  - Security vulnerabilities\n  - Performance problems\n  - Missing error handling\n\n  Explain each finding.\n  Suggest a fix for each issue.\n  Do not report purely stylistic preferences as bugs."}</code></pre>
            <p>{"This is an example of what a prompt template could contain."}</p>
            <p>{"The prompt can accept arguments. When someone selects it and supplies the pull request number, the client requests the prompt from the MCP server and obtains the resulting messages."}</p>
            <p>{"The client can then provide those messages to the model."}</p>
            <h3 className="Article__subTitle">{"Why would a server expose prompts?"}</h3>
            <p>{"The purpose is to make useful instructions discoverable and reusable."}</p>
            <p>{"Suppose your team uses three different AI applications."}</p>
            <p>{"Without a shared prompt source, you might maintain the same review instructions separately in each application."}</p>
            <p>{"With MCP prompts, compatible clients can discover the templates exposed by your server."}</p>
            <p>{"A client might display a command such as \"Review a pull request.\" The user selects it, supplies the required information, and starts the task."}</p>
            <p>{"This can help teams standardize workflows across compatible applications."}</p>
            <h3 className="Article__subTitle">{"Does the model automatically receive every prompt?"}</h3>
            <p>{"No."}</p>
            <p>{"This is the most important detail to understand about MCP prompts."}</p>
            <p>{"An MCP server can expose a prompt, but that does not mean the model automatically receives it whenever the user asks a related question."}</p>
            <p>{"Typically, the user or client selects the prompt, the client retrieves the template from the server, and the client passes the resulting messages to the model."}</p>
            <p>{"Clients can implement this experience differently."}</p>
            <p>{"Also, the prompt does not execute the task itself. It supplies instructions. The model can follow those instructions and request tools if they are available and useful."}</p>
            <h3 className="Article__subTitle">{"Can the model work without an MCP prompt?"}</h3>
            <p>{"Absolutely."}</p>
            <p>{"Suppose you ask ChatGPT:"}</p>
            <p>{"\"Review this code for security problems.\""}</p>
            <p>{"The model can perform the review using the instructions you provided, its existing capabilities, and any relevant context available to it."}</p>
            <p>{"An MCP prompt is not required."}</p>
            <p>{"It is simply a way to make a reusable task template available through a standardized interface."}</p>
            <h3 className="Article__subTitle">{"Why are prompts useful?"}</h3>
            <p>{"They can provide:"}</p>
            <ul className="Article__notes">
                <li><strong>{"Consistency:"}</strong>{" Different engineers can follow the same review methodology."}</li>
                <li><strong>{"Reusability:"}</strong>{" Common workflows do not need to be rewritten every time."}</li>
                <li><strong>{"Discoverability:"}</strong>{" Compatible AI clients can discover available task templates."}</li>
                <li><strong>{"Parameterization:"}</strong>{" Templates can accept values such as a PR number, file path, or incident ID."}</li>
            </ul>
            <p><strong>{"Remember:"}</strong>{" An MCP prompt provides reusable task instructions. It is neither a tool that executes an operation nor a requirement for every AI task."}</p>
            <hr />
        </section>
        <section className="Article__section" aria-labelledby="putting-everything-together-an-ai-agent-that-fixes-a-bug">
            <h2 id="putting-everything-together-an-ai-agent-that-fixes-a-bug" className="SectionTitle">{"Putting everything together: An AI agent that fixes a bug"}</h2>
            <p>{"Now let's see why these three components become powerful when used together."}</p>
            <p>{"Imagine you are working on a Go backend application hosted on GitHub."}</p>
            <p>{"Your application has a login endpoint. Users occasionally report that the endpoint returns an unexpected error."}</p>
            <p>{"You ask your AI coding agent:"}</p>
            <p>{"\"Investigate the login bug, fix it, and open a pull request.\""}</p>
            <p>{"Your AI application has access to a GitHub MCP server and a server that provides your project's documentation."}</p>
            <p>{"The GitHub server exposes tools. Your documentation server exposes relevant resources. A reusable debugging prompt is available through an MCP server."}</p>
            <p>{"Here is how the workflow could happen."}</p>
            <h3 className="Article__subTitle">{"Step A: The task instructions are provided"}</h3>
            <p>{"The user or AI application selects a debugging prompt."}</p>
            <p>{"The prompt instructs the model to:"}</p>
            <ul className="Article__notes">
                <li>{"Reproduce or understand the reported problem."}</li>
                <li>{"Inspect the relevant code."}</li>
                <li>{"Identify the root cause."}</li>
                <li>{"Propose a minimal fix."}</li>
                <li>{"Add or update tests."}</li>
                <li>{"Report the findings."}</li>
            </ul>
            <p>{"The client obtains the prompt messages and supplies them to the model."}</p>
            <p>{"The model now has a structured approach to the task."}</p>
            <h3 className="Article__subTitle">{"Step B: The model retrieves the relevant code"}</h3>
            <p>{"The model needs to understand how the login endpoint works."}</p>
            <p>{"It requests an appropriate tool call, such as:"}</p>
            <pre className="Article__code"><code>{"get_file_contents(\"internal/auth/login.go\")"}</code></pre>
            <p>{"The GitHub MCP server retrieves the file and returns its contents."}</p>
            <p>{"The model can now inspect the implementation."}</p>
            <h3 className="Article__subTitle">{"Step C: The model reads the documentation"}</h3>
            <p>{"The model retrieves relevant project documentation through an available resource."}</p>
            <p>{"For example, the documentation might describe how authentication errors should be handled."}</p>
            <p>{"The model compares the implementation against the documented requirements."}</p>
            <h3 className="Article__subTitle">{"Step D: The model investigates further"}</h3>
            <p>{"The model notices that a database error is being returned directly to the HTTP handler instead of being handled through the application's expected error-handling path."}</p>
            <p>{"It requests more code or tests using the available tools."}</p>
            <p>{"After examining the results, it identifies the likely cause."}</p>
            <p>{"This is an illustrative scenario. The actual cause depends on the code and the evidence returned by the tools."}</p>
            <h3 className="Article__subTitle">{"Step E: The model proposes a fix"}</h3>
            <p>{"The model develops a minimal code change and, if it has access to suitable tools, requests the necessary operations to apply the change."}</p>
            <p>{"It might update the error handling and add a test for the failing case."}</p>
            <p>{"The available capabilities determine whether it can modify files directly, execute tests, or only suggest changes."}</p>
            <h3 className="Article__subTitle">{"Step F: The model opens a pull request"}</h3>
            <p>{"If the server exposes an appropriate tool and the required permissions are available, the model can request a pull request to be created."}</p>
            <p>{"The AI application coordinates that operation through the MCP client and server."}</p>
            <p>{"You can then inspect the resulting changes and review the pull request before merging."}</p>
            <h3 className="Article__subTitle">{"What did each component contribute?"}</h3>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>{"Component"}</th><th>{"Contribution"}</th></tr></thead>
                    <tbody>
                        <tr><td>{"Prompt"}</td><td>{"Provided a reusable debugging workflow"}</td></tr>
                        <tr><td>{"Tools"}</td><td>{"Retrieved code and performed supported operations"}</td></tr>
                        <tr><td>{"Resources"}</td><td>{"Supplied project documentation and expected behavior"}</td></tr>
                        <tr><td>{"AI model"}</td><td>{"Reasoned about the evidence and decided what to investigate"}</td></tr>
                        <tr><td>{"AI application"}</td><td>{"Coordinated the interaction and managed the available integrations"}</td></tr>
                    </tbody>
                </table>
            </div>
            <p>{"Notice something important: none of the three MCP components independently fixes the bug."}</p>
            <p>{"The prompt does not investigate the code by itself. The tools do not decide what the correct fix is. The resources do not automatically analyze their own contents."}</p>
            <p><strong>{"The value comes from combining the model's reasoning with the instructions, information, and capabilities made available through the application."}</strong></p>
            <p>{"The model may still make mistakes, and the workflow may require tests, approval, or human review."}</p>
            <hr />
        </section>
        <section className="Article__section" aria-labelledby="what-happens-technically-when-a-tool-is-called">
            <h2 id="what-happens-technically-when-a-tool-is-called" className="SectionTitle">{"What happens technically when a tool is called?"}</h2>
            <p>{"Since you are a software engineer, let's briefly connect the concepts to the underlying protocol."}</p>
            <p>{"Suppose an MCP server exposes a tool named "}<code>{"get_pull_request_diff"}</code>{"."}</p>
            <p>{"A compatible client can discover available tools using the MCP tool-discovery mechanism."}</p>
            <p>{"Conceptually, the server describes the tool like this:"}</p>
            <pre className="Article__code"><code>{"{\n  \"name\": \"get_pull_request_diff\",\n  \"description\": \"Fetch the diff for a pull request\",\n  \"inputSchema\": {\n    \"type\": \"object\",\n    \"properties\": {\n      \"pr_number\": {\n        \"type\": \"integer\"\n      }\n    },\n    \"required\": [\"pr_number\"]\n  }\n}"}</code></pre>
            <p>{"This is an illustrative representation of a tool definition."}</p>
            <p>{"The AI application can provide the tool definition to the model in a form supported by its model API."}</p>
            <p>{"If the model decides to call the tool, it may produce a tool-call request with arguments such as:"}</p>
            <pre className="Article__code"><code>{"{\n  \"pr_number\": 42\n}"}</code></pre>
            <p>{"The application handles the request and uses its MCP client to invoke the server's tool."}</p>
            <p>{"The server performs the operation and returns a result."}</p>
            <p>{"The application then provides the result to the model, allowing it to continue reasoning."}</p>
            <p>{"The model does not necessarily communicate directly with the MCP server. The AI application typically manages that interaction."}</p>
            <p>{"Prompts and resources follow different MCP operations, but the same general idea applies: the client requests capabilities or information from the server and makes the relevant results available to the model."}</p>
            <hr />
        </section>
        <section className="Article__section" aria-labelledby="common-misunderstandings-to-avoid">
            <h2 id="common-misunderstandings-to-avoid" className="SectionTitle">{"Common misunderstandings to avoid"}</h2>
            <p><strong>{"\"An MCP server is an AI model.\""}</strong></p>
            <p>{"No. An MCP server exposes capabilities or information. It does not need to contain an AI model."}</p>
            <p><strong>{"\"Tools, resources, and prompts are the same thing.\""}</strong></p>
            <p>{"No. Tools expose operations, resources expose information, and prompts expose reusable message templates."}</p>
            <p><strong>{"\"Every user request automatically activates an MCP prompt.\""}</strong></p>
            <p>{"No. Prompts are made available through the server, but the client or user typically needs to select or retrieve them."}</p>
            <p><strong>{"\"The AI can use any tool exposed by any server.\""}</strong></p>
            <p>{"Not automatically. The AI application must have access to the relevant server, and the tools must be available to the model through the application's integration."}</p>
            <p><strong>{"\"An MCP server must run in the cloud.\""}</strong></p>
            <p>{"No. MCP servers can run locally or remotely, depending on the transport and deployment."}</p>
            <p><strong>{"\"MCP replaces REST APIs.\""}</strong></p>
            <p>{"No. An MCP server can use REST APIs internally. MCP standardizes how compatible AI applications discover and use the capabilities the server exposes."}</p>
            <hr />
        </section>
        <section className="Article__section" aria-labelledby="final-mental-model">
            <h2 id="final-mental-model" className="SectionTitle">{"Final mental model"}</h2>
            <p>{"When you encounter an MCP server, ask yourself three questions:"}</p>
            <ul className="Article__notes">
                <li>{"What can the AI do through this server? Look at its "}<strong>{"tools"}</strong>{"."}</li>
                <li>{"What information can the AI application obtain through this server? Look at its "}<strong>{"resources"}</strong>{"."}</li>
                <li>{"What reusable workflows or instructions does this server offer? Look at its "}<strong>{"prompts"}</strong>{"."}</li>
            </ul>
            <p>{"Then ask one more question:"}</p>
            <p><strong>{"How can the AI combine these capabilities to accomplish a real task?"}</strong></p>
            <p>{"That is where MCP becomes especially useful."}</p>
            <p>{"It provides a standard interface through which AI applications can access external capabilities and information. The model can then use its reasoning abilities, the available context, and the available tools to perform tasks that would otherwise require much more manual work."}</p>
            <p>{"MCP does not make every workflow automatic or guarantee a correct result. It provides the connection between the AI application and the systems the AI needs to work with."}</p>
            <p>{"And that is the core idea behind MCP servers."}</p>
        </section>
    </ArticleLayout>
);

export default McpServer;
