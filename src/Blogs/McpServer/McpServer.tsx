import ArticleLayout from '../ArticleLayout/ArticleLayout';
import type { TocEntry } from '../ArticleLayout/types';
import LearningNoteExampleBlock from '../../Notes/LearningNotes/LearningNoteExampleBlock';
import { MCP_SERVER_BLOG_ROUTE } from '../../routing/routes';

const ATLASSIAN_OVERVIEW = 'https://developer.atlassian.com/cloud/rovo-mcp/';
const ATLASSIAN_TOOLS = 'https://developer.atlassian.com/cloud/rovo-mcp/guides/supported-tools/';
const ATLASSIAN_AUTH = 'https://developer.atlassian.com/cloud/rovo-mcp/guides/authentication-and-authorization/';
const MCP_ARCHITECTURE = 'https://modelcontextprotocol.io/docs/learn/architecture';
const MCP_TOOLS = 'https://modelcontextprotocol.io/specification/2026-07-28/server/tools';
const OPENAI_MCP_TOOLS = 'https://developers.openai.com/api/docs/guides/tools-connectors-mcp#defer-loading-tools-in-an-mcp-server';

const sections: TocEntry[] = [
    { id: 'connecting-to-jira', title: 'Giving ChatGPT access to Jira' },
    { id: 'discovering-tools', title: 'How ChatGPT knows what it can do' },
    { id: 'fetching-an-issue', title: 'Fetching the Jira issue' },
    { id: 'updating-an-issue', title: 'Updating the same issue' },
    { id: 'mcp-and-apis', title: 'Where the Jira API fits' },
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
                Its documented capabilities include reading and updating Jira issues.
            </p>
            <p>
                Assume that you have connected ChatGPT to Atlassian&apos;s MCP server.
                As part of this connection, you sign in through Atlassian and
                authorize ChatGPT to do certain things on your behalf in Jira,
                such as fetching and updating issues. The application manages
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
                A tool could fetch a Jira issue using its identifier, or update
                its summary using the identifier and a new summary.
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
                for fetching an issue and <code>editJiraIssue</code> for updating it.
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
            <p>
                The issue does not give it access to your backend service&apos;s
                source code. It can discuss a possible approach, but explaining
                which methods in your repository need changing requires that
                code as additional context.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="updating-an-issue">
            <h2 id="updating-an-issue" className="SectionTitle">Updating the same issue</h2>
            <p>
                After discussing the task, you decide its title should describe
                the intended change more clearly. You ask:
            </p>
            <blockquote>
                <p>
                    Change only the summary of TASK-123 to “Return a clear error
                    message when a backend request times out”.
                </p>
            </blockquote>
            <p>
                This time, fetching the issue cannot complete the task. The model
                needs an editing tool. It selects the available operation and
                prepares the issue identifier and the new summary.
            </p>
            <LearningNoteExampleBlock example={{
                title: 'A simplified request to change the summary',
                description: [
                    'Assume the user can edit TASK-123 and the connection permits writes. For illustration, assume the editing tool accepts issueKey and summary directly.',
                    'These are hypothetical inputs, not Atlassian’s complete schema. The application must use the actual discovered definition. The protocol envelope and connection details are omitted.',
                ],
                language: 'text',
                code: `{
  "name": "editJiraIssue",
  "arguments": {
    "issueKey": "TASK-123",
    "summary": "Return a clear error message when a backend request times out"
  }
}`,
                explanation: [
                    'The proposed change contains only the summary. It does not request a description, assignee, or status change.',
                    'Preparing these arguments has no effect on Jira until the application sends an authorized tool call and the server successfully performs it.',
                ],
            }} />
            <p>
                Assume the application shows you the proposed edit and asks for
                confirmation. You approve it, and the client sends the call.
                This confirmation is part of our assumed application workflow.
                MCP itself does not prescribe one confirmation screen for every
                application and operation.
            </p>
            <p>
                When the operation succeeds, the summary changes in Jira. This
                is a saved change that your teammates can see. Writing a suggested
                title in the chat would only give you text to copy; executing the
                editing tool performs the change.
            </p>
            <p>
                The reply should depend on the operation&apos;s result. If the
                server rejects the edit because you lack permission, the model
                should report that failure. A sentence saying “Updated” is not
                evidence by itself. Fetching the issue again can check the saved
                value. If the write times out, checking the current value also
                helps establish whether the change went through before retrying.
            </p>
            <p>
                A request to move the task to “In Progress” would involve Jira&apos;s
                workflow rules. Atlassian documents a separate{' '}
                <code>transitionJiraIssue</code> tool for status changes. Knowing
                the desired outcome does not remove the need to use the correct
                operation.
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
                identifier means, which fields can be edited, and which service
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
                We have used tools throughout this example. MCP also supports
                resources, which expose context data, and prompts, which provide
                reusable message templates. You do not need to implement all
                three to provide a useful server.
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
