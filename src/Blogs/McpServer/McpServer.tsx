import ArticleLayout from '../ArticleLayout/ArticleLayout';
import type { TocEntry } from '../ArticleLayout/types';
import LearningNoteExampleBlock from '../../Notes/LearningNotes/LearningNoteExampleBlock';
import { MCP_SERVER_BLOG_ROUTE } from '../../routing/routes';

const ATLASSIAN_OVERVIEW = 'https://developer.atlassian.com/cloud/rovo-mcp/';
const ATLASSIAN_TOOLS = 'https://developer.atlassian.com/cloud/rovo-mcp/guides/supported-tools/';
const ATLASSIAN_AUTH = 'https://developer.atlassian.com/cloud/rovo-mcp/guides/authentication-and-authorization/';
const MCP_ARCHITECTURE = 'https://modelcontextprotocol.io/docs/learn/architecture';
const MCP_TOOLS = 'https://modelcontextprotocol.io/specification/2026-07-28/server/tools';
const MCP_RESOURCES = 'https://modelcontextprotocol.io/specification/2026-07-28/server/resources';
const MCP_SERVER_FEATURES = 'https://modelcontextprotocol.io/docs/learn/server-concepts';
const OPENAI_MCP_TOOLS = 'https://developers.openai.com/api/docs/guides/tools-connectors-mcp#defer-loading-tools-in-an-mcp-server';

const sections: TocEntry[] = [
    { id: 'connecting-to-jira', title: 'Giving ChatGPT access to Jira' },
    { id: 'discovering-tools', title: 'How ChatGPT knows what it can do' },
    { id: 'fetching-an-issue', title: 'Fetching the Jira issue' },
    { id: 'resources', title: 'Adding context through resources' },
    { id: 'prompts', title: 'Reusing instructions through prompts' },
    { id: 'using-them-together', title: 'How the three work together' },
    { id: 'mcp-and-apis', title: 'Where the Jira API fits' },
    { id: 'inside-the-server', title: 'What runs inside the server' },
    { id: 'building-a-server', title: 'Thinking about your own service' },
];

const McpServer = () => (
    <ArticleLayout
        title="Understanding MCP servers"
        route={MCP_SERVER_BLOG_ROUTE}
        sections={sections}
        references={[
            { title: 'Atlassian Rovo MCP Server overview', href: ATLASSIAN_OVERVIEW },
            { title: 'Atlassian supported tools', href: ATLASSIAN_TOOLS },
            { title: 'Atlassian authentication and authorization', href: ATLASSIAN_AUTH },
            { title: 'MCP architecture', href: MCP_ARCHITECTURE },
            { title: 'MCP tool definitions and calls', href: MCP_TOOLS },
            { title: 'MCP resources and resource templates', href: MCP_RESOURCES },
            { title: 'MCP tools, resources, and prompts', href: MCP_SERVER_FEATURES },
            { title: 'OpenAI MCP server descriptions and deferred tool loading', href: OPENAI_MCP_TOOLS },
        ]}
    >
        <section className="Article__section">
            <p>
                Let us say you are working on a backend service. You have just started
                using ChatGPT to understand errors, discuss an API design, and write
                small pieces of code. Now you want its help with a Jira task.
            </p>
            <blockquote>
                <p>Read TASK-123 and explain what I need to change in the backend service.</p>
            </blockquote>
            <p>
                ChatGPT may know how backend services usually work. But the issue key
                alone does not tell it what your private Jira task contains. Unless
                you provide the contents or connect a way to fetch them, it has no
                basis for explaining that particular task.
            </p>
            <p>
                You could open Jira, copy the description and comments, and paste
                them into the chat. You could also give the application a way to
                fetch the issue when you ask. An MCP server can provide that access.
            </p>
            <p>
                MCP stands for{' '}
                <a href={MCP_ARCHITECTURE} className="Link">Model Context Protocol</a>.
                It defines a common way for
                AI applications to discover and use capabilities provided by other
                programs. An MCP server is a program that exposes those capabilities.
                In this case, one capability would be fetching a Jira issue.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="connecting-to-jira">
            <h2 id="connecting-to-jira" className="SectionTitle">Giving ChatGPT access to Jira</h2>
            <p>
                Atlassian provides a cloud-hosted service called the{' '}
                <a href={ATLASSIAN_OVERVIEW} className="Link">Atlassian Rovo MCP Server</a>.
                It connects compatible AI applications to Atlassian Cloud APIs.
                We will use it to understand how an application fetches a Jira issue.
            </p>
            <p>
                Assume that you have connected ChatGPT to Atlassian&apos;s MCP server.
                As part of this connection, you sign in through Atlassian and
                authorize ChatGPT to do certain things on your behalf in Jira,
                such as fetching an issue. The application manages
                the connection credentials; you do not paste your Jira password
                into the conversation.
            </p>
            <p>
                We now have a connection through which a request can be sent. The
                next part is deciding which request to send.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="discovering-tools">
            <h2 id="discovering-tools" className="SectionTitle">How ChatGPT knows what it can do</h2>
            <p>
                An MCP server exposes methods that an AI application such as
                ChatGPT can call. These methods are called <strong>tools</strong>.
                Like other methods, they accept inputs and return results.
                A tool could fetch a Jira issue using its identifier. Tools can
                also change data, but we will keep this example focused on reading.
            </p>
            <p>
                Here, the model is the part of ChatGPT that interprets your request
                and generates a response. The application around it manages the
                conversation, connections, and tool execution.
            </p>
            <p>
                A <a href={MCP_TOOLS} className="Link">tool definition</a>{' '}
                contains a name, a description of what it does,
                and an input schema describing its arguments. The developer of
                the MCP server writes these definitions and implements the methods.
                The server can then return the definitions when asked.
            </p>
            <p>
                Let us say Atlassian&apos;s server exposes <code>getJiraIssue</code>{' '}
                for fetching an issue.
            </p>
            <LearningNoteExampleBlock example={{
                title: 'A simplified definition of the fetch tool',
                description: [
                    'Let us assume the fetch tool needs only an issueKey argument. This illustrates a tool definition, not Atlassian’s complete input contract.',
                    'A real call may also need an Atlassian site identifier and other fields from the discovered schema.',
                ],
                language: 'text',
                code: `{
  "name": "getJiraIssue",
  "description": "Fetch a Jira issue by its key.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "issueKey": { "type": "string" }
    },
    "required": ["issueKey"]
  }
}`,
                explanation: [
                    'The description tells the model when this operation is useful. The schema says which input to supply and that it must be a string.',
                    'Discovering this definition does not fetch an issue. It describes an operation that can be called later.',
                    'The server’s handler code and Jira credentials are not part of this definition.',
                ],
            }} />
            <p>
                Authorization allows access. Getting the tool definitions is a
                separate step. The application sends the MCP server a request
                called <code>tools/list</code>, and the server
                returns the available tool definitions. This is called tool
                discovery. The application is asking what it can call, not yet
                asking for the contents of a Jira issue.
            </p>
            <p>
                For our example, let us assume the application discovers the tools
                after you connect and authorize access. It keeps a copy of their
                definitions so it can use them later. Another application could
                fetch them when you submit a prompt, or load more definitions
                only when needed. It can also refresh its copy when the available
                tools change. MCP does not require one discovery schedule or
                permanent storage. We are assuming this timing for our example,
                rather than describing ChatGPT&apos;s internal caching behaviour.
            </p>
            <h3 className="Article__subTitle">When several servers are connected</h3>
            <p>
                Let us say you have also connected a document server and a
                calendar server. The application keeps track of which server
                provides each tool. Assume their definitions describe these
                capabilities:
            </p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Connected server</th><th>What a tool can do</th></tr></thead>
                    <tbody>
                        <tr><td>Atlassian</td><td>Fetch a Jira issue by its key.</td></tr>
                        <tr><td>Document server</td><td>Read a document by its identifier.</td></tr>
                        <tr><td>Calendar server</td><td>List events for a date range.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Now you type “Read Jira issue TASK-123”. To ask the model for a response,
                the application sends your message, the relevant conversation
                context, and the relevant tool definitions in the model&apos;s
                supported tool format. You do not need to paste those definitions
                into the chat. The application supplies them behind the scenes.
            </p>
            <p>
                The words “Jira issue” match the description of the Atlassian
                tool. The model uses the tool names, descriptions, and conversation
                context to choose an appropriate tool. It can request{' '}
                <code>getJiraIssue</code> because that tool fetches Jira issues.
                The application already knows which server provides that tool,
                so it routes the call to Atlassian&apos;s server.
            </p>
            <p>
                With many connected servers, an application can provide a way
                to search available capabilities and load matching tool definitions
                when needed. Server names and descriptions can help with that
                search. It does not have to send every definition to the model
                for every prompt. The exact selection process depends on the
                application.
            </p>
            <p>
                If you only say “Read TASK-123”, earlier conversation may make
                Jira the likely choice. The identifier alone does not guarantee
                it. If several connected systems could contain that task, the
                assistant should ask which one you mean. Naming Jira explicitly
                makes the request clearer.
            </p>
            <p>
                Once the model has selected a tool, it prepares the arguments
                using that tool&apos;s input schema. This is what it means to give the model tool
                information during use. The definitions are part of the input
                for generating a response; the model does not need to be
                retrained to use them.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="fetching-an-issue">
            <h2 id="fetching-an-issue" className="SectionTitle">Fetching the Jira issue</h2>
            <p>
                Now return to the request to read TASK-123. The model sees that
                fetching an issue is an available operation. It selects that tool
                and supplies the issue key from your message.
            </p>
            <p>
                Selecting the tool does not execute it. The ChatGPT application
                manages execution, including any approval its policy requires.
                Its MCP client sends the tool request to Atlassian&apos;s server.
                The server handles the authorized operation against Jira and
                returns the result.
            </p>
            <p>
                These names describe different responsibilities. In MCP terminology,
                the AI application is the <strong>host</strong>. Its{' '}
                <strong>client</strong> communicates with the <strong>server</strong>.
                The model chooses an action using the information the host supplies.
                It does not itself open a connection to Jira.
            </p>
            <LearningNoteExampleBlock example={{
                title: 'A simplified fetch request and returned issue',
                description: [
                    'Assume TASK-123 exists and the signed-in user can read it. All issue data below is fictional.',
                    'This shows the tool name and arguments only. It omits the MCP message envelope, protocol metadata, authentication, and site selection. It is not a complete request to send to Atlassian.',
                ],
                language: 'text',
                code: `{
  "name": "getJiraIssue",
  "arguments": {
    "issueKey": "TASK-123"
  }
}`,
                result: `{
  "key": "TASK-123",
  "summary": "Unclear error when a backend request times out",
  "description": "Return a clear error message when a request times out.",
  "status": "To Do"
}`,
                explanation: [
                    'The result is an assumed, shortened representation of the returned issue, not Atlassian’s response schema.',
                    'The server performs the fetch. The host supplies the returned information to the model so it can explain the task.',
                ],
            }} />
            <p>
                Let us say the fetched description asks for a clearer error
                message when a request times out. ChatGPT can now explain that
                requirement and discuss how to handle the timeout with you.
                The task details came from Jira. The explanation is generated
                by the model using those details.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="resources">
            <h2 id="resources" className="SectionTitle">Adding context through resources</h2>
            <p>
                The Jira task tells you what needs changing. But your team may
                also have a guide describing how backend services should return
                errors. The model needs that guide to explain the task using
                your team&apos;s conventions.
            </p>
            <p>
                An MCP server can expose this kind of content as a{' '}
                <a href={MCP_RESOURCES} className="Link">resource</a>. A resource
                gives the application information it can include in the model&apos;s
                context. It could contain a document, an API specification, or
                a database schema.
            </p>
            <p>
                Let us assume a server exposes your team&apos;s error-handling
                guide as a resource. This resource and the prompt in the next
                section are imagined examples of MCP features. We are not
                claiming Atlassian exposes these particular items. Assume the
                application we use supports resources and prompts.
            </p>
            <p>
                The resource has a name and a URI, such as{' '}
                <code>team://guides/backend-errors</code>. A URI identifies the
                content to read. It does not have to be a web page that you can
                open in a browser.
            </p>
            <p>
                The application asks for <code>resources/list</code> to discover
                available resources and their metadata. Listing the guide does
                not load its contents. To get those, the application sends{' '}
                <code>resources/read</code> with the guide&apos;s URI.
            </p>
            <p>
                Suppose you select the guide to include with your question.
                The application reads it and supplies the relevant content to
                the model. The model can now use both the Jira task and the
                team&apos;s rules when explaining the change. An application can
                also select resources automatically. The host decides which
                content reaches the model; connecting a server does not put
                every resource into every conversation.
            </p>
            <p>
                A server can also offer resource templates for content whose
                identifier varies. For example, assume{' '}
                <code>{'team://guides/{topic}'}</code> identifies different team
                guides. The application discovers this pattern through{' '}
                <code>resources/templates/list</code>, fills in a topic, and
                reads the resulting URI. A resource template describes how to
                identify content.
            </p>
            <p>
                Fetching data through a tool and reading a resource can return
                similar information. The distinction is how the server exposes
                it: a tool is a method with arguments, while a resource is
                content identified by a URI. A read-only operation can still
                be a tool, as our Jira fetch demonstrates.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="prompts">
            <h2 id="prompts" className="SectionTitle">Reusing instructions through prompts</h2>
            <p>
                You may want the same kind of explanation for every backend task:
                what the task asks for, what behaviour should change, which team
                conventions apply, and what remains unclear. You could type those
                instructions each time. An MCP server can also provide them as
                a reusable{' '}
                <a href={`${MCP_SERVER_FEATURES}#prompts`} className="Link">prompt</a>.
            </p>
            <p>
                Here, “prompt” means a server-provided message template, not just
                any message you type into ChatGPT. Let us say the server offers
                a prompt called “Explain a backend task”, with an issue key as
                its input.
            </p>
            <p>
                The application discovers prompts through <code>prompts/list</code>.
                Assume it offers a menu where you select this prompt and enter{' '}
                <code>TASK-123</code>. It then sends <code>prompts/get</code> with
                the prompt&apos;s name and that argument. The server returns
                prepared messages, which might contain this instruction:
            </p>
            <blockquote>
                <p>
                    Read Jira issue TASK-123. Explain the requested behaviour
                    using the team&apos;s error-handling guide. Identify any
                    missing details before suggesting an implementation.
                </p>
            </blockquote>
            <p>
                Retrieving the prompt returns messages for the application to
                use. It does not itself fetch the issue or generate the model&apos;s
                answer. The application supplies those messages to the model,
                makes the relevant tools available, and includes resource
                content as needed.
            </p>
            <p>
                Prompts are designed for the user to select. The menu is only
                our assumed interface; MCP does not require a particular menu
                or slash command. A resource template fills values into a URI.
                A prompt fills values into messages intended for the model.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="using-them-together">
            <h2 id="using-them-together" className="SectionTitle">How the three work together</h2>
            <p>
                We now have three different contributions to the same task:
            </p>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th>Feature</th><th>Contribution</th><th>How it is used</th></tr></thead>
                    <tbody>
                        <tr><td>Tool</td><td>Fetches TASK-123.</td><td>The model requests a call; the application manages execution.</td></tr>
                        <tr><td>Resource</td><td>Provides the team&apos;s error-handling guide.</td><td>The application reads and includes relevant context.</td></tr>
                        <tr><td>Prompt</td><td>Provides the instructions for explaining a task.</td><td>The user selects it; the application retrieves the messages.</td></tr>
                    </tbody>
                </table>
            </div>
            <p>
                Assume you select the prompt and the guide. The application gets
                the prepared messages and reads the resource. It supplies those
                to the model along with the fetch tool&apos;s definition. The model
                requests the Jira issue, the application executes the call, and
                the result returns to the model. The model then explains the task
                using the instructions, the guide, and the fetched details.
            </p>
            <p>
                A server declares which capabilities it supports. It may expose
                tools, resources, prompts, or a combination. The application
                also needs to support the features you want to use. A server
                does not have to implement all three to be an MCP server.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="mcp-and-apis">
            <h2 id="mcp-and-apis" className="SectionTitle">Where the Jira API fits</h2>
            <p>
                Jira already has APIs for these operations. A backend service
                can call them directly. An AI application can also integrate
                those APIs through custom tools. MCP is one standard way to
                provide that integration.
            </p>
            <p>
                In our example, the client speaks MCP to Atlassian&apos;s server.
                The server connects those operations to Atlassian Cloud APIs.
                Your natural-language request is interpreted by the model; the
                tool call sent to the server has a name and structured arguments.
            </p>
            <p>
                The common part is discovering and calling capabilities. The
                Jira-specific part still belongs to the server: what an issue
                identifier means, which fields can be returned, and which service
                operation handles the request. MCP does not define a universal
                Jira schema or make every backend endpoint available automatically.
            </p>
            <p>
                This allows another compatible AI application to use the same
                server without separately implementing the Jira integration.
                It still needs to support the relevant MCP capabilities,
                authentication, and its own execution policy.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="inside-the-server">
            <h2 id="inside-the-server" className="SectionTitle">What runs inside the server</h2>
            <p>
                Tools, resources, and prompts describe what the server exposes.
                Behind them is code that receives requests and produces responses.
                A remote server can receive MCP messages over HTTP. A local server
                can communicate with an application through standard input and
                output, called <code>stdio</code>.
            </p>
            <p>
                The protocol layer understands requests such as{' '}
                <code>tools/list</code> and <code>resources/read</code> and sends
                them to the appropriate handlers. A handler implements the work:
                calling an API, reading a permitted document, or preparing prompt
                messages. An MCP SDK can handle the protocol details while you
                write these handlers.
            </p>
            <p>
                The server also validates inputs and enforces access to the
                underlying data. Its tools and resource definitions describe
                what is available; the handlers and access checks determine
                what an actual request can do.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="building-a-server">
            <h2 id="building-a-server" className="SectionTitle">Thinking about your own service</h2>
            <p>
                Now assume you want an AI application to fetch a background
                task&apos;s status from your own backend. You could expose a
                narrowly defined tool that accepts a task identifier. Its
                handler would validate the input, check the caller&apos;s access,
                call your service, and return the permitted fields.
            </p>
            <p>
                That handler can be ordinary backend code. Implementing an MCP
                server does not require putting a language model inside it.
                The application&apos;s model chooses when to request the tool;
                your server remains responsible for enforcing its contract.
            </p>
            <p>
                If the application also needs your service&apos;s API documentation,
                you could expose it as a resource. If users repeatedly ask for
                the same kind of task analysis, you could offer a prompt for
                that workflow. Choose the features that serve the actual request.
            </p>
            <p>
                Start with the specific operation you want to make available.
                For fetching a task&apos;s status, the server needs a way to read
                that status. It does not need permission to cancel the task simply
                because the same backend supports cancellation.
            </p>
        </section>
    </ArticleLayout>
);

export default McpServer;
