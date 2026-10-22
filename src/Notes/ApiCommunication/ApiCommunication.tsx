import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import { API_COMMUNICATION_ROUTE, NOTES_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const rawFetchExample = `fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9...'
  },
  credentials: 'include'
})
  .then(response => {
    if (!response.ok) throw new Error(\`HTTP\${response.status}\`);
    return response.json();
  })
  .then(data => {
    // do something with data
  })
  .catch(error => {
    // handle error
  });`;

const apiClientExample = `import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = \`Bearer\${token}\`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;`;

const serviceExample = `import apiClient from './apiClient';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface CreateUserPayload {
  name: string;
  email: string;
  role: string;
}

export const userService = {
  getAll: (): Promise<User[]> => {
    return apiClient.get('/users');
  },

  getById: (id: number): Promise<User> => {
    return apiClient.get(\`/users/\${id}\`);
  },

  create: (payload: CreateUserPayload): Promise<User> => {
    return apiClient.post('/users', payload);
  },

  delete: (id: number): Promise<void> => {
    return apiClient.delete(\`/users/\${id}\`);
  },

  search: (query: string, page: number): Promise<User[]> => {
    return apiClient.get('/users/search', {
      params: { q: query, page, limit: 20 }
    });
  }
};`;

const hooksExample = `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    staleTime: 5 * 60 * 1000, // consider data fresh for 5 minutes
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: id > 0, // do not fetch if id is invalid
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};`;

const manualFetchingExample = `function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    userService.getAll()
      .then(data => {
        if (!cancelled) {
          setUsers(data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  // render...
}`;

const queryFetchingExample = `function UserList() {
  const { data: users, isLoading, error } = useUsers();
  // render...
}`;

const componentExample = `import { useUsers, useCreateUser } from '../hooks/useUsers';

function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const createUser = useCreateUser();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
      <button
        onClick={() => createUser.mutate({
          name: 'New User',
          email: 'new@example.com',
          role: 'viewer'
        })}
        disabled={createUser.isPending}
      >
        Add User
      </button>
    </div>
  );
}`;

const completePicture = `+---------------------------------------------------+
|  Component                                        |  (React)
|  Calls hooks, renders UI                          |
+---------------------------------------------------+
                        |
+---------------------------------------------------+
|  Hook                                             |  (TanStack Query)
|  Manages cache, loading, errors, refetching       |
+---------------------------------------------------+
                        |
+---------------------------------------------------+
|  Service Function                                 |  (Your code, no library)
|  Maps business operations to endpoints            |
+---------------------------------------------------+
                        |
+---------------------------------------------------+
|  API Client                                       |  (Your code, configured Axios instance)
|  Handles transport: headers, auth, timeouts       |
+---------------------------------------------------+
                        |
+---------------------------------------------------+
|  HTTP Library                                     |  (Axios)
|  Wraps browser APIs with a convenient interface   |
+---------------------------------------------------+
                        |
+---------------------------------------------------+
|  Browser Web API                                  |  (fetch / XMLHttpRequest)
|  Actual network request execution                 |
+---------------------------------------------------+`;

const antipatternExample = `// antipattern: service logic and React hook in one file

export const getUsers = () => apiClient.get('/users');

export const useUsers = () => {
  return useQuery({ queryKey: ['users'], queryFn: getUsers });
};`;

const ApiCommunication = () => (
    <ArticleLayout
        title="API communication in React"
        route={API_COMMUNICATION_ROUTE}
        sections={sections}
        backRoute={NOTES_ROUTE}
        backLabel="Back to notes"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>The notes assume basic JavaScript and web application experience.</li>
                <li>An API request sends data to a server or reads data from it.</li>
                <li>This structure separates HTTP configuration, endpoint calls, server state, and rendering.</li>
                <li>The layers are project choices. React does not require this structure.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="browser-runtime">
            <h2 id="browser-runtime" className="SectionTitle">
                Browser runtime
            </h2>
            <ul className="Article__notes">
                <li>The browser provides APIs for HTTP requests.</li>

                <li><code>XMLHttpRequest</code> is the older browser request API.</li>
                <li><code>fetch</code> is a browser request API standardized by WHATWG.</li>

                <li>These Web APIs are provided by the browser runtime.</li>
                <li>JavaScript code calls them to send requests.</li>

                <li>This <code>fetch</code> call includes headers, credentials, status checking, and JSON parsing.</li>
            </ul>
            <CodeBlock language="typescript">{rawFetchExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Repeated request code can duplicate headers, credential settings, error checks, and JSON parsing.</li>
                <li>A shared API client keeps common request settings in one place.</li>
            </ul>

        </section>

        <section className="Article__section" aria-labelledby="http-client-library">
            <h2 id="http-client-library" className="SectionTitle">
                HTTP client library
            </h2>
            <ul className="Article__notes">
                <li>An HTTP client library provides an interface to the browser’s request APIs.</li>
                <li>Axios, <code>ky</code>, <code>wretch</code>, and <code>redaxios</code> are examples.</li>

                <li>The table compares <code>fetch</code> and Axios.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Concern</th><th scope="col">Raw <code>fetch</code></th><th scope="col">Axios</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">JSON parsing</th><td>Manual (<code>response.json()</code>)</td><td>Automatic</td></tr>
                        <tr><th scope="row">Error handling</th><td>Only network failures throw; HTTP 4xx/5xx do not</td><td>All non-2xx responses reject the promise</td></tr>
                        <tr><th scope="row">Request timeout</th><td>Not built-in</td><td>Built-in (<code>timeout</code> option)</td></tr>
                        <tr><th scope="row">Interceptors</th><td>Not available</td><td>Request and response interceptors</td></tr>
                        <tr><th scope="row">Request cancellation</th><td><code>AbortController</code> (manual)</td><td>Built-in cancellation support</td></tr>
                        <tr><th scope="row">Progress tracking</th><td>Not available on request body</td><td>Upload/download progress events</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>A configured Axios instance shares request settings across API calls.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="api-client">
            <h2 id="api-client" className="SectionTitle">API client</h2>
            <ul className="Article__notes">
                <li>An API client is a configured HTTP client instance.</li>
                <li>It handles common request settings such as headers, credentials, and timeouts.</li>
                <li>Service functions choose which endpoint to call.</li>
            </ul>
            <CodeBlock language="typescript">{apiClientExample}</CodeBlock>

            <ul className="Article__notes">
                <li>Base URL configuration</li><li>Timeout settings</li><li>Authentication header injection</li>
                <li>Credential handling (cookies, tokens)</li><li>Global error interception (e.g., redirect on 401)</li>
                <li>Request/response logging</li><li>Retry logic for transient failures</li>

                <li>Endpoint paths, operation-specific parameters, data transformations, and business rules belong in service functions in this structure.</li>
            </ul>
            <h3 className="Article__subTitle">Change triggers</h3>
            <ul className="Article__notes">
                <li>The server moves to a different domain</li><li>The authentication mechanism changes</li>
                <li>Request logging or telemetry requirements change</li><li>Timeout requirements change</li>
                <li>The project switches from Axios to <code>fetch</code> or another library</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="service-functions">
            <h2 id="service-functions" className="SectionTitle">Service functions</h2>
            <ul className="Article__notes">
                <li>A service function maps an application operation to an HTTP request.</li>
                <li>It defines the endpoint, method, parameters, request body, and response type.</li>
            </ul>
            <CodeBlock language="typescript">{serviceExample}</CodeBlock>

            <ul className="Article__notes">
                <li>Maps business operations to endpoints (<code>getAll</code> –&gt; <code>GET /users</code>)</li>
                <li>Defines TypeScript types for requests and responses</li>
                <li>Constructs query parameters and request bodies</li>
                <li>Provides typed request functions for other application code</li>

                <li>The API client sets shared headers and authentication.</li>
                <li>Hooks manage loading, error state, and cached responses.</li>
                <li>Components render the interface.</li>
            </ul>
            <h3 className="Article__subTitle">Service function reuse</h3>
            <ul className="Article__notes">
                <li>Small projects can keep endpoint calls in hooks.</li>
                <li>Separate service functions help when multiple callers need the same request.</li>

                <li>Multiple hooks can share one service function.</li>
                <li><code>useUser</code> and <code>useUserProfile</code> can both call <code>getById</code>.</li>
                <li>Plain service functions can also run outside React, including in utility code, Web Workers, and test setup.</li>
                <li>Hooks run inside React function components or other hooks.</li>
                <li>A shared service function keeps an endpoint path and its parameters in one place.</li>
            </ul>
            <h3 className="Article__subTitle">Change triggers</h3>
            <ul className="Article__notes">
                <li>An endpoint URL changes</li><li>Request or response shape changes</li>
                <li>A new API endpoint is added</li><li>Query parameter requirements change</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="hooks">
            <h2 id="hooks" className="SectionTitle">Hooks and server state</h2>
            <ul className="Article__notes">
                <li>Server state is data managed by a server and read by the application.</li>
                <li>Components also need loading, error, and freshness information.</li>
                <li>They may need to refresh data when the user returns to a page.</li>

                <li>TanStack Query, formerly React Query, and SWR manage server state.</li>
                <li>Server state management includes caching and refetching as well as sending requests.</li>

                <li>A custom hook connects a service function to React state and query settings.</li>
            </ul>
            <CodeBlock language="typescript">{hooksExample}</CodeBlock>
            <h3 className="Article__subTitle">Manual fetching and query hooks</h3>
            <ul className="Article__notes">
                <li>This component manages loading, results, errors, and cleanup with <code>useEffect</code>.</li>
            </ul>
            <CodeBlock language="typescript">{manualFetchingExample}</CodeBlock>
            <ul className="Article__notes">
                <li>The manual example does not provide caching, shared requests, background refetching, or retries.</li>

                <li>The query hook supplies the request state to the component.</li>
            </ul>
            <CodeBlock language="typescript">{queryFetchingExample}</CodeBlock>
            <ul className="Article__notes">
                <li>TanStack Query supports the features below. Their behavior depends on query settings.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Feature</th><th scope="col">Description</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Caching</th><td>Subsequent renders reuse cached data instead of re-fetching</td></tr>
                        <tr><th scope="row">Deduplication</th><td>Three components calling <code>useUsers()</code> simultaneously trigger one request</td></tr>
                        <tr><th scope="row">Background refetch</th><td>Stale data is shown immediately while fresh data loads in the background</td></tr>
                        <tr><th scope="row">Window focus refetch</th><td>Data refreshes when the user returns to the browser tab</td></tr>
                        <tr><th scope="row">Retry</th><td>Failed requests are retried automatically (configurable)</td></tr>
                        <tr><th scope="row">Garbage collection</th><td>Unused cache entries are cleaned up after a configurable period</td></tr>
                        <tr><th scope="row">Optimistic updates</th><td>UI can update before the server confirms a mutation</td></tr>
                        <tr><th scope="row">Cache invalidation</th><td>After a mutation, related queries are automatically refetched</td></tr>
                    </tbody>
                </table>
            </div>
            <h3 className="Article__subTitle">Change triggers</h3>
            <ul className="Article__notes">
                <li>Cache duration requirements change</li><li>Retry policy changes</li>
                <li>A mutation needs optimistic updates</li>
                <li>Query invalidation relationships change</li>
                <li>Polling or real-time refetch behavior is added</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="components">
            <h2 id="components" className="SectionTitle">Components</h2>
            <ul className="Article__notes">
                <li>The component calls hooks and renders their data and request state.</li>
                <li>In this structure, hooks and service functions handle requests and caching.</li>
            </ul>
            <CodeBlock language="typescript">{componentExample}</CodeBlock>

            <h3 className="Article__subTitle">Change triggers</h3>
            <ul className="Article__notes">
                <li>The UI design changes</li><li>User interaction behavior changes</li>
                <li>A new piece of data needs to be displayed</li><li>Layout or styling changes</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="complete-picture">
            <h2 id="complete-picture" className="SectionTitle">Layer dependencies</h2>
            <ul className="Article__notes">
                <li>The diagram lists the layers from the component to the browser request API.</li>
            </ul>
            <CodeBlock language="typescript">{completePicture}</CodeBlock>
            <ul className="Article__notes">
                <li>Each layer calls the layer directly below it.</li>
                <li>Stable interfaces can limit changes in callers.</li>
                <li>A changed response type or request contract can still require changes across layers.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="skip-a-layer">
            <h2 id="skip-a-layer" className="SectionTitle">Optional layers</h2>
            <ul className="Article__notes">
                <li>Small projects can combine layers when separate files do not add useful separation.</li>
            </ul>
            <h3 className="Article__subTitle">Projects without separate service functions</h3>
            <ul className="Article__notes">
                <li>The project has fewer than ten endpoints</li><li>Each API call is used by exactly one hook</li>
                <li>There is no need to call APIs outside of React components</li>
            </ul>
            <h3 className="Article__subTitle">Projects without a server state library</h3>
            <ul className="Article__notes">
                <li>The application makes very few API calls</li>
                <li>There is no need for caching, deduplication, or background refetching</li>
                <li>The data is write-heavy with minimal read operations</li>
            </ul>
            <h3 className="Article__subTitle">Projects without an HTTP client library</h3>
            <ul className="Article__notes">
                <li>The application does not need interceptors, timeout configuration, or upload progress</li>
                <li>The native <code>fetch</code> API meets the application’s requirements</li>
                <li>Bundle size is a project constraint</li>

                <li>Separate layers are useful when request code, server state rules, or callers become harder to manage.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="mixing-layers">
            <h2 id="mixing-layers" className="SectionTitle">Mixed responsibilities</h2>
            <ul className="Article__notes">
                <li>This file contains a service function and a query hook.</li>
            </ul>
            <CodeBlock language="typescript">{antipatternExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Combining the two responsibilities can cause these problems:</li>

                <li>Non-React code may need <code>getUsers</code>.</li>
                <li>Importing the shared file also imports its React and TanStack Query dependencies.</li>
                <li>A file with many service functions and hooks becomes harder to read.</li>
                <li>Editing cache behavior and endpoint code in one file can lead to changes in the wrong responsibility.</li>

                <li>Separate service files and hook files keep endpoint code independent of React and TanStack Query.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="summary">
            <h2 id="summary" className="SectionTitle">Layer responsibilities</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Layer</th><th scope="col">Provided By</th><th scope="col">Responsibility</th><th scope="col">Changes When</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Browser Web API</th><td>Browser</td><td>Execute HTTP requests</td><td>Never (from your perspective)</td></tr>
                        <tr><th scope="row">HTTP Library</th><td>Axios (package)</td><td>Convenient HTTP interface</td><td>You switch libraries</td></tr>
                        <tr><th scope="row">API Client</th><td>Your code + Axios</td><td>Transport configuration</td><td>Auth, headers, base URL change</td></tr>
                        <tr><th scope="row">Service Functions</th><td>Your code (plain TS)</td><td>Map operations to endpoints</td><td>API contract changes</td></tr>
                        <tr><th scope="row">Hooks</th><td>Your code + TanStack Query</td><td>Server state management</td><td>Cache/refetch behavior changes</td></tr>
                        <tr><th scope="row">Components</th><td>Your code + React</td><td>Render UI</td><td>Design or interaction changes</td></tr>
                    </tbody>
                </table>
            </div>

        </section>
    </ArticleLayout>
);

export default ApiCommunication;
