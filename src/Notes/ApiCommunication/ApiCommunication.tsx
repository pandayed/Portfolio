import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../../Blogs/ArticleLayout/ArticleLayout';
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
        title="The Anatomy of API Communication in a React Application"
        route={API_COMMUNICATION_ROUTE}
        sections={sections}
        backRoute={NOTES_ROUTE}
        backLabel="Back to notes"
    >
        <section className="Article__section">
            <p>Not for beginners. Must have a little experience in JS and web applications.</p>
            <p>
                Every modern web application needs to talk to a server. A user clicks a button,
                the application sends a request, the server responds, and the interface updates.
                This sounds simple, but the code that makes it happen can become tangled and
                fragile if not structured deliberately.
            </p>
            <p>
                This document walks through the layered architecture that has become the standard
                approach for handling API communication in React applications. Each layer exists
                for a specific reason, solves a specific problem, and has a clear boundary. By the
                end, you will understand not just what each layer does, but why it must exist as a
                separate concern.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="browser-runtime">
            <h2 id="browser-runtime" className="SectionTitle">
                The Browser Runtime – Where It All Begins
            </h2>
            <p>
                Before any library or framework enters the picture, the browser provides two
                built-in mechanisms for making HTTP requests:
            </p>
            <ul className="Article__notes">
                <li><code>XMLHttpRequest</code> – the older API, available since the early 2000s</li>
                <li><code>fetch</code> – the modern API, standardized by WHATWG and available in all current browsers</li>
            </ul>
            <p>
                These are not JavaScript features. They are Web APIs – capabilities provided by
                the browser’s runtime environment and exposed to JavaScript code running inside it.
                JavaScript is the language you use to invoke them, but the networking capability
                belongs to the browser engine.
            </p>
            <p>A raw <code>fetch</code> call looks like this:</p>
            <pre className="Article__code"><code>{rawFetchExample}</code></pre>
            <p>
                This works. But imagine writing this for every API call in an application with
                fifty endpoints. You would repeat the headers, the credentials setting, the error
                checking, and the JSON parsing fifty times. If the authentication scheme changes,
                you edit fifty files.
            </p>
            <p>This is the problem the first layer solves.</p>
        </section>

        <section className="Article__section" aria-labelledby="http-client-library">
            <h2 id="http-client-library" className="SectionTitle">
                The HTTP Client Library – Taming the Transport
            </h2>
            <p>
                An HTTP client library wraps the browser’s raw APIs and provides a more convenient
                interface. Axios is the most widely used choice in React applications. ky, wretch,
                and redaxios are some more.
            </p>
            <p>What a library like Axios gives you over raw <code>fetch</code>:</p>
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
            <p>
                But installing Axios alone does not solve the duplication problem. You need to
                configure an instance – and that configured instance becomes your API client.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="api-client">
            <h2 id="api-client" className="SectionTitle">The API Client – One Place for Transport Configuration</h2>
            <p>
                The API client is a configured HTTP instance that encapsulates every decision
                about how to communicate with the server. It knows nothing about what data to
                request. It only knows the mechanics of transport.
            </p>
            <pre className="Article__code"><code>{apiClientExample}</code></pre>
            <p>What belongs in this layer:</p>
            <ul className="Article__notes">
                <li>Base URL configuration</li><li>Timeout settings</li><li>Authentication header injection</li>
                <li>Credential handling (cookies, tokens)</li><li>Global error interception (e.g., redirect on 401)</li>
                <li>Request/response logging</li><li>Retry logic for transient failures</li>
            </ul>
            <p>What does NOT belong here:</p>
            <ul className="Article__notes">
                <li>Endpoint URLs</li><li>Request parameters for specific API calls</li>
                <li>Response data transformation</li><li>Business logic of any kind</li>
            </ul>
            <h3 className="Article__subTitle">When would this layer change?</h3>
            <ul className="Article__notes">
                <li>The server moves to a different domain</li><li>The authentication mechanism changes</li>
                <li>You need to add request logging or telemetry</li><li>Timeout requirements change</li>
                <li>You switch from Axios to <code>fetch</code> or another library</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="service-functions">
            <h2 id="service-functions" className="SectionTitle">Service Functions – Encoding API Knowledge</h2>
            <p>
                A service function knows what to ask the server for. It maps a business operation
                to a specific HTTP request: which endpoint, which HTTP method, which parameters,
                and what the response looks like.
            </p>
            <pre className="Article__code"><code>{serviceExample}</code></pre>
            <p>Does:</p>
            <ul className="Article__notes">
                <li>Maps business operations to endpoints (<code>getAll</code> –&gt; <code>GET /users</code>)</li>
                <li>Defines TypeScript types for requests and responses</li>
                <li>Constructs query parameters and request bodies</li>
                <li>Provides a clean, typed interface for the rest of the application</li>
            </ul>
            <p>Does not:</p>
            <ul className="Article__notes">
                <li>Set headers or authentication (that is the API client’s job)</li>
                <li>Manage loading or error states (that is the hook’s job)</li>
                <li>Cache responses (that is the hook’s job)</li>
                <li>Render anything (that is the component’s job)</li>
            </ul>
            <h3 className="Article__subTitle">Why not put this logic directly in hooks?</h3>
            <p>You could. Many small projects do. But consider these scenarios:</p>
            <ol className="Article__steps">
                <li>Multiple hooks need the same API call. A <code>useUser</code> hook and a <code>useUserProfile</code> hook might both call <code>getById</code>. Without a service function, you duplicate the endpoint URL and parameter logic.</li>
                <li>You need to call an API outside of React. A utility function, a Web Worker, or a test setup might need to fetch users. Service functions are plain functions – they work anywhere. Hooks only work inside React components.</li>
                <li>The endpoint changes. With a service layer, you change one file. Without it, you grep through every hook that hardcodes that URL.</li>
            </ol>
            <h3 className="Article__subTitle">When would this layer change?</h3>
            <ul className="Article__notes">
                <li>An endpoint URL changes</li><li>Request or response shape changes</li>
                <li>A new API endpoint is added</li><li>Query parameter requirements change</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="hooks">
            <h2 id="hooks" className="SectionTitle">Hooks – Bridging Server State and React</h2>
            <p>
                React components need more than raw data. They need to know: Is the data loading?
                Did the request fail? Is the data stale? Should it be refetched? What happens when
                the user navigates away and comes back?
            </p>
            <p>
                This is server state management, and it is a fundamentally different problem from
                making HTTP requests. Libraries like TanStack Query (formerly React Query) and SWR
                solve this problem.
            </p>
            <p>A hook wraps a service function and adds all the behavior that React components need.</p>
            <pre className="Article__code"><code>{hooksExample}</code></pre>
            <h3 className="Article__subTitle">What TanStack Query handles that you would otherwise build manually</h3>
            <p>Without TanStack Query, a component that fetches a user list looks like this:</p>
            <pre className="Article__code"><code>{manualFetchingExample}</code></pre>
            <p>
                You write this boilerplate for every data-fetching component. And you still have no
                caching, no deduplication, no background refetching, no retry logic.
            </p>
            <p>With TanStack Query:</p>
            <pre className="Article__code"><code>{queryFetchingExample}</code></pre>
            <p>One line. And you get all of the following for free:</p>
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
            <h3 className="Article__subTitle">When would this layer change?</h3>
            <ul className="Article__notes">
                <li>Cache duration requirements change</li><li>Retry policy changes</li>
                <li>You need to add optimistic updates to a mutation</li>
                <li>Query invalidation relationships change</li>
                <li>Polling or real-time refetch behavior is added</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="components">
            <h2 id="components" className="SectionTitle">Components – Pure Rendering</h2>
            <p>
                The component is the final consumer. It calls a hook, receives data and state, and
                renders UI. It knows nothing about HTTP, endpoints, caching, or Axios.
            </p>
            <pre className="Article__code"><code>{componentExample}</code></pre>
            <p>
                The component’s only job is to translate data into pixels. If you can look at a
                component and immediately understand what it renders without needing to understand
                HTTP or caching, the architecture is working.
            </p>
            <h3 className="Article__subTitle">When would this layer change?</h3>
            <ul className="Article__notes">
                <li>The UI design changes</li><li>User interaction behavior changes</li>
                <li>A new piece of data needs to be displayed</li><li>Layout or styling changes</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="complete-picture">
            <h2 id="complete-picture" className="SectionTitle">The Complete Picture</h2>
            <p>Here is the full stack, from the lowest level to the highest, with the library or provider responsible for each:</p>
            <pre className="Article__code"><code>{completePicture}</code></pre>
            <p>Each layer depends only on the one directly below it. A change in any layer does not ripple upward or downward.</p>
        </section>

        <section className="Article__section" aria-labelledby="skip-a-layer">
            <h2 id="skip-a-layer" className="SectionTitle">When to Skip a Layer</h2>
            <p>This architecture is not dogma. Smaller projects can reasonably collapse layers:</p>
            <h3 className="Article__subTitle">Skip the service function layer when:</h3>
            <ul className="Article__notes">
                <li>The project has fewer than ten endpoints</li><li>Each API call is used by exactly one hook</li>
                <li>There is no need to call APIs outside of React components</li>
            </ul>
            <h3 className="Article__subTitle">Skip TanStack Query when:</h3>
            <ul className="Article__notes">
                <li>The application makes very few API calls</li>
                <li>There is no need for caching, deduplication, or background refetching</li>
                <li>The data is write-heavy with minimal read operations</li>
            </ul>
            <h3 className="Article__subTitle">Skip Axios when:</h3>
            <ul className="Article__notes">
                <li>You do not need interceptors, timeout configuration, or upload progress</li>
                <li>The native <code>fetch</code> API meets all your requirements</li>
                <li>You want to minimize bundle size</li>
            </ul>
            <p>
                The layers exist to manage complexity. If the complexity is not there, the layers
                add overhead without benefit. But as an application grows, the absence of these
                layers becomes painful quickly – and retrofitting them is far harder than having
                them from the start.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="mixing-layers">
            <h2 id="mixing-layers" className="SectionTitle">A Common Mistake – Mixing Layers</h2>
            <p>The most frequent antipattern is combining service functions and hooks into the same file:</p>
            <pre className="Article__code"><code>{antipatternExample}</code></pre>
            <p>This appears harmless and even convenient. The problem surfaces when:</p>
            <ul className="Article__notes">
                <li>You need <code>getUsers</code> in a non-React context (a test helper, a script, a Web Worker) but importing the file pulls in React and TanStack Query dependencies.</li>
                <li>The file grows to contain dozens of service functions and dozens of hooks, becoming difficult to navigate.</li>
                <li>A developer modifying cache behavior accidentally changes the API call, or vice versa, because both concerns live in the same place.</li>
            </ul>
            <p>The fix is straightforward: service functions in one directory, hooks in another. Each file stays small, focused, and independently testable.</p>
        </section>

        <section className="Article__section" aria-labelledby="summary">
            <h2 id="summary" className="SectionTitle">Summary</h2>
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
            <p>
                The value of this architecture is not in any individual layer. It is in the
                boundaries between them. Each boundary is a contract: “I give you this, you give me
                that, and neither of us cares how the other works internally.” When those contracts
                are respected, a fifty-endpoint application is no harder to maintain than a
                five-endpoint one.
            </p>
        </section>
    </ArticleLayout>
);

export default ApiCommunication;
