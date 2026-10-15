import type { TocEntry } from '../Blogs/ArticleLayout/types';
import { MCP_SERVERS_ROUTE, NOTES_ROUTE } from '../routing/routes';
import ArticleLayout from './NoteArticleLayout';

const sections: TocEntry[] = [
    { id: 'mcp-roles', title: 'Host, client, server, and model' },
    { id: 'mcp-components', title: 'Components inside a server' },
    { id: 'mcp-primitives', title: 'Tools, resources, and prompts' },
    { id: 'mcp-flow', title: 'How an LLM application uses a server' },
    { id: 'mcp-visibility', title: 'What is exposed and what stays private' },
    { id: 'mcp-credentials', title: 'How credentials are managed' },
    { id: 'mcp-boundaries', title: 'Permissions and trust boundaries' },
    { id: 'mcp-sources', title: 'Official references' },
];

const McpServers = () => (
    <ArticleLayout title="MCP servers" route={MCP_SERVERS_ROUTE} sections={sections}
        backRoute={NOTES_ROUTE} backLabel="Back to notes">
        <section className="Article__section">
            <ul className="Article__notes">
                <li>Model Context Protocol (MCP) defines how AI applications discover and use external tools, data, and prompt templates.</li>
                <li>An MCP server is a program that exposes selected capabilities through this protocol. Its handlers run the actual operations.</li>
                <li>The model generates a tool request. The application decides whether to execute it and sends it through an MCP client.</li>
                <li>Protocol examples and method names below follow the published 2026-07-28 specification. Other protocol revisions can change connection and discovery details.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="mcp-roles">
            <h2 id="mcp-roles" className="SectionTitle">Host, client, server, and model</h2>
            <div className="Article__tableWrap"><table className="Article__table">
                <thead><tr><th>Part</th><th>Responsibility</th><th>Example</th></tr></thead>
                <tbody>
                    <tr><td>Host</td><td>Runs the AI workflow. Manages model context, connections, and approval policy.</td><td>A chat application or coding assistant.</td></tr>
                    <tr><td>MCP client</td><td>Speaks MCP to a server on behalf of the host.</td><td>A connection managed by the chat application.</td></tr>
                    <tr><td>MCP server</td><td>Publishes capabilities and handles authorized requests.</td><td>A server that searches support tickets.</td></tr>
                    <tr><td>LLM</td><td>Uses supplied context to choose tool names and arguments and interpret results.</td><td>The model answering the user.</td></tr>
                    <tr><td>Model service</td><td>Runs model inference. It may also provide a managed MCP client.</td><td>A hosted inference API.</td></tr>
                    <tr><td>Upstream service</td><td>Stores data or performs the underlying operation.</td><td>A ticket API, database, or filesystem.</td></tr>
                </tbody>
            </table></div>
            <ul className="Article__notes">
                <li>The client can run locally, in an application backend, or in a model provider’s managed infrastructure. Its location determines which system handles connection credentials.</li>
                <li>An MCP server does not need an LLM inside it. Ordinary application code can implement its handlers.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="mcp-components">
            <h2 id="mcp-components" className="SectionTitle">Components inside a server</h2>
            <ul className="Article__notes">
                <li><strong>Transport:</strong> carries messages. Standard input/output (stdio) connects a client to a local child process. Streamable HTTP supports a network endpoint.</li>
                <li><strong>Protocol layer:</strong> handles JSON-RPC requests, responses, notifications, protocol version discovery, and supported capabilities.</li>
                <li><strong>Capability definitions:</strong> describe the tools, resources, or prompts the server supports. A server does not have to implement all three.</li>
                <li><strong>Request handlers:</strong> validate inputs, run operations, and format successful results or errors.</li>
                <li><strong>Service adapters:</strong> call a database, filesystem, or external API. MCP does not prescribe the internal code structure.</li>
                <li><strong>Authorization checks:</strong> decide which user may perform an operation and which records that user may access.</li>
                <li><strong>Credential and operational support:</strong> supplies secrets, applies timeouts and limits, and records redacted diagnostic events. These are implementation responsibilities.</li>
                <li>For stdio, keep standard output for MCP messages. Send diagnostic logs to standard error.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="mcp-primitives">
            <h2 id="mcp-primitives" className="SectionTitle">Tools, resources, and prompts</h2>
            <div className="Article__tableWrap"><table className="Article__table">
                <thead><tr><th>Primitive</th><th>Exposes</th><th>Discovery and use</th></tr></thead>
                <tbody>
                    <tr><td>Tool</td><td>A callable operation, such as searching tickets. Has a name, description, and JSON Schema for input. May declare an output schema and annotations.</td><td>tools/list discovers definitions. tools/call invokes a tool with arguments.</td></tr>
                    <tr><td>Resource</td><td>Context data identified by a URI, such as a document or database schema. A resource template describes parameterized URIs.</td><td>resources/list and resources/templates/list discover entries. resources/read retrieves content.</td></tr>
                    <tr><td>Prompt</td><td>A reusable message template with optional arguments, such as a ticket review workflow.</td><td>prompts/list discovers templates. prompts/get retrieves the prepared messages.</td></tr>
                </tbody>
            </table></div>
            <ul className="Article__notes">
                <li>Tools are designed for model selection, resources for application-managed context, and prompts for user selection. The host controls the actual interface and workflow.</li>
                <li>A tool can read data, such as searching tickets, or change data, such as updating a ticket. Calling a tool is not necessarily a read-only operation.</li>
                <li>Retrieving a prompt returns prepared messages. It does not itself ask a language model to generate an answer. The host decides whether to send those messages to a model.</li>
                <li>Listing an entry does not execute its tool or retrieve all its resource content.</li>
                <li>A tool result can contain text, structured data, images, audio, resource links, or embedded resources. The host decides how to present or forward supported content.</li>
                <li>A resource URI identifies content. It does not grant unrestricted filesystem or network access.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="mcp-flow">
            <h2 id="mcp-flow" className="SectionTitle">How an LLM application uses a server</h2>
            <ol className="Article__steps">
                <li>The user asks: “Find my open support tickets.” The host connects its client to the ticket server.</li>
                <li>For the referenced revision, the client uses server/discover to learn the server’s protocol versions and capabilities. Requests carry protocol and client capability metadata. Earlier revisions use an initialization handshake.</li>
                <li>The client uses tools/list. The host selects relevant definitions and gives them to the model in the model service’s tool format.</li>
                <li>The model requests search_tickets with a status argument of open. It does not execute the server’s handler itself.</li>
                <li>The host checks its execution policy and obtains approval if required. The client sends tools/call with the tool name and arguments.</li>
                <li>The server validates the request and checks the authenticated user’s access. Its handler calls the ticket API using the server’s upstream credentials.</li>
                <li>The server returns permitted ticket fields. The host may filter or shorten the result before sending it to the model.</li>
                <li>The model uses the returned tickets to write an answer. It may request another tool call if more information is needed.</li>
            </ol>
            <ul className="Article__notes">
                <li>The same workflow can use a managed remote MCP connection instead of a client in the local application.</li>
                <li>Discovery and execution do not train the model. They provide capabilities and context for inference.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="mcp-visibility">
            <h2 id="mcp-visibility" className="SectionTitle">What is exposed and what stays private</h2>
            <div className="Article__tableWrap"><table className="Article__table">
                <thead><tr><th>Information</th><th>Client / host</th><th>Model context</th></tr></thead>
                <tbody>
                    <tr><td>Tool names, descriptions, input schemas</td><td>Receives discovered definitions.</td><td>Receives definitions selected by the host.</td></tr>
                    <tr><td>Tool arguments and returned content</td><td>Handles calls and results.</td><td>Generates arguments and receives results the host forwards.</td></tr>
                    <tr><td>Resource content and prepared prompts</td><td>Can retrieve permitted content.</td><td>Sees content included by the host.</td></tr>
                    <tr><td>Handler source code, private configuration, full database</td><td>Not delivered by capability discovery.</td><td>Not automatically exposed. Can become visible if a tool or resource returns it.</td></tr>
                    <tr><td>Connection tokens and upstream secrets</td><td>Handled by the component that needs them.</td><td>Should stay outside prompts, tool arguments, and results.</td></tr>
                    <tr><td>Full conversation and other servers’ results</td><td>Host manages the conversation.</td><td>Sees the context the host supplies. A server does not automatically receive all of it.</td></tr>
                </tbody>
            </table></div>
            <ul className="Article__notes">
                <li>“Hidden from model context” does not mean “hidden from the service operator.” A provider that runs the MCP client may process credentials in its connection infrastructure. Storage, logging, and retention depend on that product.</li>
                <li>A local server can return private file content to a cloud model. Local execution alone does not keep returned data on the device.</li>
                <li>MCP does not automatically redact secrets. A poorly designed handler can leak them through results or errors.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="mcp-credentials">
            <h2 id="mcp-credentials" className="SectionTitle">How credentials are managed</h2>
            <ul className="Article__notes">
                <li>There are separate credential boundaries: the application calling the model API, the MCP client calling the MCP server, and the MCP server calling an upstream service.</li>
                <li><strong>Local stdio:</strong> the host commonly supplies credentials through the child process environment. MCP’s HTTP authorization flow does not apply to stdio. Avoid committed configuration files containing secrets.</li>
                <li><strong>Protected HTTP server:</strong> the MCP authorization specification uses OAuth 2.1. The client discovers authorization metadata, directs the user through sign-in and consent, and obtains an access token for that MCP server. Public servers can operate without authorization.</li>
                <li>The client sends that access token in the HTTP Authorization header. The server validates the token and its intended audience. Invalid or expired tokens produce 401 responses. Insufficient permissions produce 403 responses.</li>
                <li><strong>Upstream access:</strong> the server uses a separate API key, service identity, or user-specific OAuth grant for the upstream API. Do not forward the MCP access token unchanged to another API. Token passthrough is forbidden.</li>
                <li><strong>Recommended storage:</strong> use an operating-system credential store for desktop tokens and a secret manager for backend credentials. Environment variables are a delivery mechanism, not a secret vault.</li>
                <li>Store refresh tokens securely when issued. Refresh, rotate, revoke, and delete credentials according to the provider’s lifecycle and the user’s disconnect action.</li>
                <li>Collect passwords and API keys through a secure sign-in or credential interface. Elicitation forms must not request secrets. URL-based elicitation can direct the user to an external secure flow.</li>
                <li>Keep secrets out of model-visible schemas, arguments, results, URLs, and logs. Associate requests with the authenticated user on the server. Do not trust a model-supplied user ID as proof of identity.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="mcp-boundaries">
            <h2 id="mcp-boundaries" className="SectionTitle">Permissions and trust boundaries</h2>
            <ul className="Article__notes">
                <li>Authentication identifies the caller. Authorization decides which operation and records the caller may access. Apply authorization on every operation.</li>
                <li>Tool visibility and user approval do not replace server-side access checks. A valid input schema does not prove an operation is permitted.</li>
                <li>Return only the fields needed for the task. Restrict upstream permissions and separate read operations from writes where practical.</li>
                <li>Treat tool descriptions, retrieved documents, and results as untrusted content. They can contain instructions that attempt to redirect the model. This is prompt injection.</li>
                <li>Optional client features expand the information flow. Sampling lets a server request a model generation through the client. Elicitation lets it request user input. Roots communicate relevant filesystem locations. Availability depends on declared capabilities and host policy.</li>
                <li>Roots do not enforce a filesystem sandbox. The server and operating system must enforce actual access limits.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="mcp-sources">
            <h2 id="mcp-sources" className="SectionTitle">Official references</h2>
            <ul className="Article__notes">
                {[
                    ['Architecture', 'architecture'],
                    ['Transports', 'basic/transports'],
                    ['Tools', 'server/tools'],
                    ['Resources', 'server/resources'],
                    ['Prompts', 'server/prompts'],
                    ['Authorization', 'basic/authorization'],
                    ['Security best practices', 'basic/security_best_practices'],
                    ['Elicitation', 'client/elicitation'],
                ].map(([title, path]) => (
                    <li key={path}><a className="Link" href={`https://modelcontextprotocol.io/specification/2026-07-28/${path}`} target="_blank" rel="noopener noreferrer">{title}</a></li>
                ))}
            </ul>
        </section>
    </ArticleLayout>
);

export default McpServers;
