import type { GoNote } from '../types';

const note = {
    notionId: "go-gin-auth",
    slug: "gin-auth",
    title: "Gin: authentication and browser access",
    updatedOn: "2026-10-19",
    blocks: [
        {"id": "auth-basic", "type": "sub_header", "richText": [["BasicAuth middleware"]]},
        {"id": "auth-basic-call", "type": "bulleted_list", "richText": [["gin.BasicAuth(accounts)", [["c"]]], [" returns middleware that checks HTTP Basic credentials. "], ["accounts", [["c"]]], [" has type "], ["gin.Accounts", [["c"]]], [", Gin’s name for a map of usernames to password strings."]]},
        {"id": "auth-basic-group", "type": "bulleted_list", "richText": [["A route group can receive this middleware when it is created. After a successful check, Gin stores the username under "], ["gin.AuthUserKey", [["c"]]], [" in the request context."]]},
        { id: "auth-basic-example", type: 'example', example: {
            title: "Protected group with Gin BasicAuth",
            language: "go",
            description: ["The program is saved as main.go in a new directory. It reads one account from environment variables instead of storing a password in source code.", "The commands require openssl to generate a temporary password. The curl commands run in another terminal. curl prompts for that password when only the username is supplied.", "The example binds to loopback for local use. Basic authentication requires HTTPS when credentials travel across a network."],
            code: `package main

import (
    "log"
    "net/http"
    "os"

    "github.com/gin-gonic/gin"
)

func currentUser(c *gin.Context) {
    value, exists := c.Get(gin.AuthUserKey)
    username, valid := value.(string)
    if !exists || !valid {
        c.AbortWithStatusJSON(http.StatusInternalServerError,
            gin.H{"error": "authenticated user missing"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"user": username})
}

func main() {
    username := os.Getenv("GIN_DEMO_USER")
    password := os.Getenv("GIN_DEMO_PASSWORD")
    if username == "" || password == "" {
        log.Fatal("GIN_DEMO_USER and GIN_DEMO_PASSWORD are required")
    }

    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    accounts := gin.Accounts{username: password}
    private := router.Group("/private", gin.BasicAuth(accounts))
    private.GET("/me", currentUser)
    if err := router.Run("127.0.0.1:8080"); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "go mod init example.com/gin-auth\ngo get github.com/gin-gonic/gin\nexport GIN_DEMO_USER=reader\nexport GIN_DEMO_PASSWORD=\"$(openssl rand -hex 24)\"\n# This local command displays the generated password for the curl prompt:\nprintf '%s\\n' \"$GIN_DEMO_PASSWORD\"\ngo run .\n\n# In another terminal:\ncurl -i http://127.0.0.1:8080/private/me\ncurl -i -u reader http://127.0.0.1:8080/private/me",
            result: "Without credentials: status 401, no body\nWith the generated password: status 200, body {\"user\":\"reader\"}",
            explanation: ["os.Getenv reads a process environment variable. The empty-string checks stop startup if the account was not configured.", "gin.Accounts{username: password} creates one map entry using the two variable values.", "gin.BasicAuth(accounts) runs during setup and returns the middleware. router.Group attaches it to /private before /me is registered.", "curl -u sends Basic credentials in the Authorization header. Gin verifies them before currentUser runs. Missing or incorrect credentials stop the chain.", "c.Get(gin.AuthUserKey) reads the username stored by BasicAuth. gin.AuthUserKey is a constant string key, not a method.", "value.(string) uses the two-result type assertion form. username contains the string when valid is true.", "This middleware uses configured password strings. It is not a registration system or a password-hash database. Its successful check does not create a session cookie."],
        } },
        {"id": "auth-middleware", "type": "sub_header", "richText": [["Application verifier middleware"]]},
        {"id": "auth-contract", "type": "bulleted_list", "richText": [["A bearer-token or session service can be connected through a Go function supplied to the router. Gin calls the middleware, and the middleware calls that verifier with "], ["c.Request", [["c"]]], ["."]]},
        {"id": "auth-failure", "type": "bulleted_list", "richText": [["The verifier returns an identity and an error. The middleware handles a credential failure separately from an unavailable verification service."]]},
        {"id": "auth-identity", "type": "bulleted_list", "richText": [["An identity can be a Go struct containing the verified user ID. The middleware stores that value with "], ["c.Set", [["c"]]], [" so the route does not need to verify the same credential again."]]},
        { id: "auth-protected-example", type: 'example', example: {
            title: "Protected group with an injected verifier",
            language: "go",
            description: ["This package is saved as authroutes/routes.go inside an application’s Go module.", "The application supplies its existing bearer-token verification function to authroutes.NewRouter. That function must match VerifyRequest.", "This is the Gin integration layer. Token parsing, signature checks, expiry checks, and credential storage belong to the supplied verifier. No token is accepted merely because it contains a user ID."],
            code: `package authroutes

import (
    "errors"
    "net/http"

    "github.com/gin-gonic/gin"
)

var ErrUnauthenticated = errors.New("unauthenticated")

type Identity struct {
    UserID string
}
type VerifyRequest func(*http.Request) (Identity, error)

func NewRouter(verify VerifyRequest) *gin.Engine {
    if verify == nil { panic("credential verifier required") }
    r := gin.Default()
    if err := r.SetTrustedProxies(nil); err != nil { panic(err) }
    private := r.Group("/private")
    private.Use(func(c *gin.Context) {
        identity, err := verify(c.Request)
        if errors.Is(err, ErrUnauthenticated) || (err == nil && identity.UserID == "") {
            c.Header("WWW-Authenticate", "Bearer")
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "authentication required"})
            return
        }
        if err != nil {
            c.AbortWithStatusJSON(http.StatusServiceUnavailable, gin.H{"error": "authentication unavailable"})
            return
        }
        c.Set("auth.identity", identity)
        c.Next()
    })
    private.GET("/me", func(c *gin.Context) {
        value, exists := c.Get("auth.identity")
        identity, valid := value.(Identity)
        if !exists || !valid {
            c.AbortWithStatusJSON(http.StatusInternalServerError,
                gin.H{"error": "identity missing"})
            return
        }
        c.JSON(http.StatusOK, gin.H{"userId": identity.UserID})
    })
    return r
}`,
            explanation: ["Identity declares a struct. UserID is its string field. VerifyRequest declares a function type that accepts *http.Request and returns Identity plus error.", "NewRouter receives a function value in verify. verify(c.Request) calls that supplied function for each protected request.", "The verifier can read the Authorization header with request.Header.Get(\"Authorization\"). It checks the bearer credential before returning an Identity.", "ErrUnauthenticated is a known Go error. errors.Is recognizes it even if the verifier wraps it. A successful result with an empty UserID is rejected too.", "c.Header(\"WWW-Authenticate\", \"Bearer\") adds this example’s bearer challenge. AbortWithStatusJSON writes the failure and stops pending handlers.", "c.Set(\"auth.identity\", identity) stores the checked struct for this request. The final handler reads that same key and checks its Go type.", "c.Next runs the rest of the protected request chain. Middleware ordering and Set/Get mechanics are covered in Gin: middleware.", "The HTTP request also carries its standard context. A verifier doing remote work can use request.Context() for cancellation.", "The displayed outcomes describe the integration contract. Running this package requires the application’s verifier and a main function that starts the returned router."],
            result: "Verifier returns Identity{UserID: \"reader\"}, nil:\nGET /private/me → status 200, body {\"userId\":\"reader\"}\n\nVerifier returns ErrUnauthenticated:\nStatus: 401, body {\"error\":\"authentication required\"}\n\nVerifier returns another error:\nStatus: 503, body {\"error\":\"authentication unavailable\"}",
        } },
        {"id": "auth-sessions", "type": "sub_header", "richText": [["Cookie methods"]]},
        {"id": "auth-cookie-api", "type": "bulleted_list", "richText": [["c.SetCookie(name, value, maxAge, path, domain, secure, httpOnly)", [["c"]]], [" adds a cookie to the response. The browser can store it and send it on a later request."]]},
        {"id": "auth-cookie-args", "type": "bulleted_list", "richText": [["maxAge", [["c"]]], [" is in seconds. "], ["path", [["c"]]], [" and "], ["domain", [["c"]]], [" define where the cookie applies. An empty domain leaves it scoped to the response’s host."]]},
        {"id": "auth-cookie-flags", "type": "bulleted_list", "richText": [["secure", [["c"]]], [" restricts the cookie to HTTPS. "], ["httpOnly", [["c"]]], [" prevents browser JavaScript from reading it through document.cookie. Neither flag verifies the cookie’s value."]]},
        {"id": "auth-samesite", "type": "bulleted_list", "richText": [["c.SetSameSite(mode)", [["c"]]], [" chooses the SameSite attribute for subsequent SetCookie calls on the same context. It is set before writing the cookie."]]},
        {"id": "auth-cookie-read-api", "type": "bulleted_list", "richText": [["c.Cookie(name)", [["c"]]], [" reads a cookie from the incoming request. It returns a decoded string and an error. Writing a response cookie does not change "], ["c.Request", [["c"]]], [" during that handler."]]},
        { id: "auth-cookie-local", type: 'example', example: {
            title: "Cookie write, later read, and deletion",
            language: "go",
            description: ["These functions are added outside main in the BasicAuth program. Inside main, registerCookieRoutes(router) runs before router.Run.", "The cookie stores a display preference, not a login credential. Secure is false only to demonstrate these methods on local HTTP.", "curl uses cookies.txt as a cookie jar: a file containing received cookies for later requests."],
            code: `func registerCookieRoutes(router *gin.Engine) {
    router.POST("/preference", func(c *gin.Context) {
        c.SetSameSite(http.SameSiteLaxMode)
        c.SetCookie("theme", "dark", 900, "/", "", false, true)
        c.Status(http.StatusNoContent)
    })
    router.GET("/preference", func(c *gin.Context) {
        theme, err := c.Cookie("theme")
        if err != nil {
            c.JSON(http.StatusOK, gin.H{"theme": "default"})
            return
        }
        c.JSON(http.StatusOK, gin.H{"theme": theme})
    })
    router.DELETE("/preference", func(c *gin.Context) {
        c.SetSameSite(http.SameSiteLaxMode)
        c.SetCookie("theme", "", -1, "/", "", false, true)
        c.Status(http.StatusNoContent)
    })
}`,
            commands: "curl -i -c cookies.txt -X POST http://127.0.0.1:8080/preference\ncurl -s -b cookies.txt http://127.0.0.1:8080/preference\ncurl -i -b cookies.txt -c cookies.txt -X DELETE http://127.0.0.1:8080/preference\ncurl -s -b cookies.txt http://127.0.0.1:8080/preference",
            result: "POST: status 204, Set-Cookie includes theme=dark, Max-Age=900, Path=/, HttpOnly, SameSite=Lax\nFirst GET: {\"theme\":\"dark\"}\nDELETE: status 204, Set-Cookie includes theme= and Max-Age=0\nSecond GET: {\"theme\":\"default\"}",
            explanation: ["The POST response tells the client to store theme=dark for 900 seconds. -c writes received cookies into cookies.txt.", "The first GET uses -b to send the stored cookie. c.Cookie(\"theme\") returns \"dark\".", "The DELETE response uses the same name, path, and domain with a negative maxAge. Go serializes this deletion instruction as Max-Age=0.", "The updated cookie jar no longer sends theme, so the final GET takes the default branch.", "In a browser, matching cookies are sent automatically according to their scope and browser policy. curl does not simulate every browser cookie rule."],
        } },
        {"id": "auth-session-scope", "type": "sub_header", "richText": [["Session cookie helpers"]]},
        {"id": "auth-session-note", "type": "bulleted_list", "richText": [["For a session cookie, the value identifies a session created by an application service. Reading that value with "], ["c.Cookie", [["c"]]], [" is followed by a lookup in that service. Gin’s cookie methods do not create or invalidate the server-side session."]]},
        { id: "auth-cookie-example", type: 'example', example: {
            title: "Session cookie write, read, and deletion",
            language: "go",
            description: ["This package requires a Go module with Gin installed. Save it as sessioncookies/cookies.go.", "The login handler supplies the session ID created by its existing session service. Authentication middleware passes ReadSessionCookie’s result to that service for verification.", "The logout handler invalidates the server session before calling ClearSessionCookie. These helpers handle only the cookie.", "This configuration requires HTTPS."],
            code: `package sessioncookies

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func WriteSessionCookie(c *gin.Context, verifiedSessionID string) {
    c.SetSameSite(http.SameSiteLaxMode)
    c.SetCookie("__Host-session", verifiedSessionID, 900, "/", "", true, true)
}

func ReadSessionCookie(c *gin.Context) (string, error) {
    return c.Cookie("__Host-session")
}

func ClearSessionCookie(c *gin.Context) {
    c.SetSameSite(http.SameSiteLaxMode)
    c.SetCookie("__Host-session", "", -1, "/", "", true, true)
}`,
            explanation: ["SetSameSite applies http.SameSiteLaxMode before each SetCookie call.", "SetCookie arguments after the value are max age in seconds, path, domain, Secure, and HttpOnly.", "The empty domain, path /, and Secure=true match the __Host-session cookie name’s requirements.", "The write helper sets Max-Age=900. The clear helper uses a negative max age to delete the same cookie scope.", "c.Cookie returns http.ErrNoCookie when the request has no matching cookie. A successful read supplies a value, not a verification result.", "Writing the response cookie does not change the cookies on c.Request. The read helper sees a cookie only when a request includes it.", "WriteSessionCookie is an application helper, not a Gin method. Its c parameter is the current handler’s Gin context, and verifiedSessionID is supplied by the application’s session service.", "A successful login calls WriteSessionCookie(c, sessionID). A later protected request calls ReadSessionCookie(c), then verifies that ID with the session service.", "Clearing the browser cookie alone does not revoke a copied session ID. The application invalidates the server-side session during logout first.", "The helpers require the application’s login and session service. They deliberately do not implement a pretend login endpoint."],
            result: "Write helper: response contains a __Host-session cookie with the supplied session ID,\nMax-Age=900, Path=/, Secure, HttpOnly, and SameSite=Lax.\n\nRead helper: returns the request cookie value, or http.ErrNoCookie.\n\nClear helper: response expires the cookie with the same name and scope.",
        } },
        {"id": "auth-cors", "type": "sub_header", "richText": [["CORS middleware"]]},
        {"id": "auth-origin", "type": "bulleted_list", "richText": [["An origin is the scheme, host, and port of a browser page, such as "], ["https://app.example.com", [["c"]]], [". A page calling an API at another origin may need that API’s CORS response headers."]]},
        {"id": "auth-preflight", "type": "bulleted_list", "richText": [["cors.New(config)", [["c"]]], [" from "], ["github.com/gin-contrib/cors", [["c"]]], [" returns Gin middleware. "], ["router.Use(...)", [["c"]]], [" registers it before protected groups so it can answer browser preflight requests first."]]},
        {"id": "auth-preflight-detail", "type": "bulleted_list", "richText": [["A preflight is an OPTIONS request sent by the browser before certain cross-origin requests. The middleware answers it using the configured origins, methods, and request headers."]]},
        {"id": "auth-cors-credentials", "type": "bulleted_list", "richText": [["AllowOrigins", [["c"]]], [", "], ["AllowMethods", [["c"]]], [", and "], ["AllowHeaders", [["c"]]], [" are fields in "], ["cors.Config", [["c"]]], [". Each accepts a string slice. "], ["AllowCredentials", [["c"]]], [" controls whether the response allows browser credentials such as cookies."]]},
        { id: "auth-cors-example", type: 'example', example: {
            title: "CORS allowlist and OPTIONS preflight",
            language: "go",
            description: ["This standalone program replaces main.go. The existing module also requires github.com/gin-contrib/cors.", "The allowed origin https://app.example.com is illustrative configuration. curl supplies it as a request header to demonstrate the response.", "The /status endpoint is public. No login or session service is required."],
            code: `package main

import (
    "log"
    "net/http"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    if err := r.SetTrustedProxies(nil); err != nil { log.Fatal(err) }
    r.Use(cors.New(cors.Config{
        AllowOrigins: []string{"https://app.example.com"},
        AllowMethods: []string{"GET", "OPTIONS"},
        AllowHeaders: []string{"Authorization", "Content-Type"},
        AllowCredentials: false,
    }))
    r.GET("/status", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"status": "available"})
    })
    if err := r.Run("127.0.0.1:8080"); err != nil { log.Fatal(err) }
}`,
            commands: "go get github.com/gin-contrib/cors\ngo run .\n\n# In another terminal:\ncurl -i -X OPTIONS http://127.0.0.1:8080/status \\\n  -H 'Origin: https://app.example.com' \\\n  -H 'Access-Control-Request-Method: GET' \\\n  -H 'Access-Control-Request-Headers: Authorization'\ncurl -i http://127.0.0.1:8080/status \\\n  -H 'Origin: https://app.example.com'\ncurl -i http://127.0.0.1:8080/status \\\n  -H 'Origin: https://other.example.com' ",
            explanation: ["cors.Config{...} creates a Go configuration struct. []string{\"GET\", \"OPTIONS\"} creates the string slice assigned to AllowMethods.", "cors.New receives that configuration and returns middleware. r.Use registers it before /status.", "The preflight asks whether this origin may send GET with an Authorization header. The middleware answers before the endpoint runs.", "AllowHeaders lists request headers accepted by the CORS policy. Including Authorization does not verify a bearer token.", "The allowed-origin GET runs the endpoint and includes the CORS origin response header. The disallowed-origin request is rejected by this middleware.", "AllowCredentials is false, so no Access-Control-Allow-Credentials header is sent. Cookie-based browser access uses true with explicit allowed origins.", "curl shows server behavior and headers. It does not enforce browser CORS restrictions."],
            result: "Allowed preflight: status 204, no body\nAccess-Control-Allow-Origin: https://app.example.com\nAccess-Control-Allow-Methods: GET,OPTIONS\nAccess-Control-Allow-Headers: Authorization,Content-Type\nNo Access-Control-Allow-Credentials header\n\nAllowed-origin GET: status 200, body {\"status\":\"available\"}\nDisallowed-origin GET: status 403",
        } },
        {"id": "auth-browser-cookies", "type": "sub_header", "richText": [["Browser fetch and cookies"]]},
        {"id": "auth-fetch-note", "type": "bulleted_list", "richText": [["For cross-origin cookie requests, browser JavaScript uses "], ["credentials: \"include\"", [["c"]]], [". The Gin CORS configuration uses "], ["AllowCredentials: true", [["c"]]], [" and an explicit origin list."]]},
        { id: "auth-fetch-example", type: 'example', example: {
            title: "Browser request with an existing session cookie",
            language: "javascript",
            description: ["This JavaScript runs on the trusted frontend origin https://app.example.com. The API address is illustrative.", "The API already provides an HTTPS /private/me route backed by session-cookie verification. The bearer-only verifier package above is an alternative, not this session implementation.", "The API CORS configuration allows this frontend origin, GET, and credentials. Browser cookie scope and SameSite rules must also allow the cookie."],
            code: `async function readCurrentUser() {
    const response = await fetch("https://api.example.com/private/me", {
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("Current-user request failed");
    }
    return response.json();
}`,
            commands: "",
            result: "With a valid session and matching CORS/cookie configuration, the returned value is the JSON object from /private/me.",
            explanation: ["credentials: \"include\" asks the browser to send eligible cookies on the cross-origin request. It does not create a session or bypass cookie rules.", "response.json() reads and parses the API response body. response.ok checks for a successful HTTP status before parsing the success result.", "Gin’s CORS middleware supplies response headers. The session verifier separately checks the request cookie before the route returns user data.", "SameSite=Lax does not generally permit cookies on cross-site fetch requests. A deployment needing cross-site cookies uses SameSite=None with Secure and a matching CSRF defense for state-changing routes.", "CORS and SameSite configuration do not replace that CSRF defense. Gin SetCookie only writes the attributes the application chooses."],
        } },
        {"id": "auth-references", "type": "sub_header", "richText": [["References"]]},
        {"id": "auth-reference-links", "type": "bulleted_list", "richText": [["Gin context methods", [["a", "https://pkg.go.dev/github.com/gin-gonic/gin#Context"]]], [" · "], ["Gin CORS middleware", [["a", "https://github.com/gin-contrib/cors"]]], [" · "], ["Go cookie fields", [["a", "https://pkg.go.dev/net/http#Cookie"]]]]},
    ],
} as const satisfies GoNote;

export default note;
