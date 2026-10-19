import type { GoNote } from '../types';

const note = {
    notionId: "go-gin-server",
    slug: "gin-server",
    title: "Gin: server configuration",
    updatedOn: "2026-10-19",
    blocks: [
        {"id": "gin-server-ownership", "type": "sub_header", "richText": [["Gin engine and HTTP server"]]},
        {"id": "gin-server-handler", "type": "bulleted_list", "richText": [["The Gin engine matches routes and runs their handlers. Go’s "], ["http.Server", [["c"]]], [" accepts network connections and passes incoming requests to that engine."]]},
        {"id": "gs-interface", "type": "bulleted_list", "richText": [["http.Handler", [["c"]]], [" is Go’s interface for an object that can handle an HTTP request. "], ["*gin.Engine", [["c"]]], [" implements its required "], ["ServeHTTP", [["c"]]], [" method, so an engine can be assigned to the server’s "], ["Handler", [["c"]]], [" field."]]},
        {"id": "gin-server-run", "type": "bulleted_list", "richText": [["router.Run(address)", [["c"]]], [" starts a server through Gin’s convenience method. Creating an explicit "], ["http.Server", [["c"]]], [" exposes settings such as timeouts, header limits, and shutdown."]]},
        {"id": "gin-server-errors", "type": "bulleted_list", "richText": [["server.ListenAndServe()", [["c"]]], [" starts the listener and blocks the calling goroutine until serving stops. Its returned error reports startup failures too, such as an occupied port."]]},
        { id: "gs-base-server", type: 'example', example: {
            title: "Gin engine assigned to http.Server",
            language: "go",
            description: ["The program is saved as main.go in a new directory. The commands create its module and start the server.", "The curl command runs in another terminal. The selected timeout values are local example settings, not universal production defaults."],
            code: `package main

import (
    "log"
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
)

func buildRouter() *gin.Engine {
    router := gin.Default()
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "pong"})
    })
    return router
}

func main() {
    router := buildRouter()
    server := &http.Server{
        Addr:              "127.0.0.1:8080",
        Handler:           router,
        ReadHeaderTimeout: 5 * time.Second,
        ReadTimeout:       10 * time.Second,
        WriteTimeout:      15 * time.Second,
        IdleTimeout:       60 * time.Second,
        MaxHeaderBytes:    1 << 20,
    }
    if err := server.ListenAndServe(); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "go mod init example.com/gin-server\ngo get github.com/gin-gonic/gin\ngo run .\n\n# In another terminal:\ncurl -i http://127.0.0.1:8080/ping",
            result: "Status: 200\nBody: {\"message\":\"pong\"}",
            explanation: ["buildRouter is an application helper. Its return type *gin.Engine means it returns a pointer to the configured Gin engine.", "server := &http.Server{...} creates a Go server struct and stores its address in server. Addr, Handler, and the timeout names are struct fields.", "Handler: router connects the two objects. When a request arrives, the Go server passes it to Gin, and Gin runs the matching /ping handler.", "Addr selects the IP address and port. 127.0.0.1 restricts this listener to the local machine. :8080 would listen on available interfaces.", "time.Second is a Go duration. 5 * time.Second supplies five seconds to ReadHeaderTimeout.", "1 << 20 is 1,048,576 bytes, or 1 MiB. The << operator shifts an integer’s bits left.", "There is no router.Run call here. ListenAndServe starts this configured server instead.", "This first program has no graceful shutdown logic. The later shutdown example adds it."],
        } },
        {"id": "gin-server-timeouts", "type": "sub_header", "richText": [["Timeouts and header limits"]]},
        {"id": "gin-server-read-header", "type": "bulleted_list", "richText": [["ReadHeaderTimeout", [["c"]]], [" limits how long the server spends reading request headers. It does not cover reading the full request body."]]},
        {"id": "gin-server-read", "type": "bulleted_list", "richText": [["ReadTimeout", [["c"]]], [" limits reading the whole request, including its body. A short value can interrupt legitimate slow uploads."]]},
        {"id": "gin-server-write", "type": "bulleted_list", "richText": [["WriteTimeout", [["c"]]], [" limits response writes. It does not forcibly stop handler computation or automatically send a JSON timeout response."]]},
        {"id": "gin-server-idle", "type": "bulleted_list", "richText": [["IdleTimeout", [["c"]]], [" limits waiting for the next request on a connection kept open for reuse. It is not the time allowed for an active handler."]]},
        {"id": "gin-server-headers", "type": "bulleted_list", "richText": [["MaxHeaderBytes", [["c"]]], [" limits parsed headers and the request line. It does not limit the body. Upload body limits are applied separately with "], ["http.MaxBytesReader", [["c"]]], ["."]]},
        {"id": "gin-server-mode-heading", "type": "sub_header", "richText": [["Mode and request logging"]]},
        {"id": "gin-server-release", "type": "bulleted_list", "richText": [["gin.SetMode(gin.ReleaseMode)", [["c"]]], [" selects Gin’s release mode before the engine is created. It disables debug output, but registered logging middleware still runs."]]},
        {"id": "gin-server-logger-config", "type": "bulleted_list", "richText": [["gin.LoggerWithConfig(config)", [["c"]]], [" returns request-logging middleware. "], ["gin.LoggerConfig{SkipQueryString: true}", [["c"]]], [" creates its configuration and excludes query strings from its access log."]]},
        { id: "gs-logging-example", type: 'example', example: {
            title: "Release mode and configured access logger",
            language: "go",
            description: ["This function replaces buildRouter in the first program. main and its http.Server configuration stay the same.", "The existing imports are sufficient. After restarting, the command sends a query value to show what the logger omits."],
            code: `func buildRouter() *gin.Engine {
    gin.SetMode(gin.ReleaseMode)
    router := gin.New()
    router.Use(gin.LoggerWithConfig(gin.LoggerConfig{
        SkipQueryString: true,
    }))
    router.Use(gin.Recovery())
    if err := router.SetTrustedProxies(nil); err != nil {
        log.Fatal(err)
    }
    router.GET("/ping", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "pong"})
    })
    return router
}`,
            commands: "curl -s 'http://127.0.0.1:8080/ping?label=notes'",
            result: "Body: {\"message\":\"pong\"}\nThe access log contains /ping without ?label=notes.",
            explanation: ["gin.New starts without built-in middleware. router.Use explicitly registers the configured logger and recovery middleware.", "LoggerWithConfig receives a struct value. SkipQueryString is its boolean field.", "ReleaseMode does not remove the logger. This request is still logged, but its query string is omitted.", "The setting changes this Gin access log only. It does not remove values from c.Request or from separately written application logs.", "Paths still appear in the access log. Middleware factories and registration are explained in Gin: middleware."],
        } },
        {"id": "gin-server-proxy", "type": "sub_header", "richText": [["Trusted proxies and client IP"]]},
        {"id": "gs-proxy-definition", "type": "bulleted_list", "richText": [["A reverse proxy accepts the client’s connection and forwards a request to the Go server. The server then sees the proxy as its direct network peer."]]},
        {"id": "gin-server-trust", "type": "bulleted_list", "richText": [["router.SetTrustedProxies(addresses)", [["c"]]], [" configures which peers Gin may trust to supply forwarded client IP headers. "], ["c.ClientIP()", [["c"]]], [" uses that configuration to calculate an address for the request."]]},
        {"id": "gin-server-no-proxy", "type": "bulleted_list", "richText": [["router.SetTrustedProxies(nil)", [["c"]]], [" disables forwarded IP trust. ClientIP then uses the direct connection address rather than a claimed address in a forwarding header."]]},
        {"id": "gin-server-proxy-list", "type": "bulleted_list", "richText": [["The method accepts a string slice of IP addresses or CIDR networks and returns an error for an invalid entry. A CIDR string describes a network range, such as "], ["192.0.2.0/24", [["c"]]], [". Gin trusts all proxies by default, so examples configure this explicitly."]]},
        { id: "gin-server-proxy-example", type: 'example', example: {
            title: "Trusted loopback peer and forwarded address",
            language: "go",
            description: ["This function replaces buildRouter in the first program. main and the HTTP server settings stay the same.", "curl connects from 127.0.0.1 and acts as a proxy for this demonstration. The documentation address 203.0.113.9 is its claimed client address."],
            code: `func buildRouter() *gin.Engine {
    router := gin.Default()
    if err := router.SetTrustedProxies([]string{"127.0.0.1"}); err != nil {
        log.Fatal(err)
    }
    router.GET("/client-ip", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"clientIp": c.ClientIP()})
    })
    return router
}`,
            commands: "curl -s http://127.0.0.1:8080/client-ip -H 'X-Forwarded-For: 203.0.113.9'",
            result: "{\"clientIp\":\"203.0.113.9\"}",
            explanation: ["[]string{\"127.0.0.1\"} creates a one-item slice containing the trusted peer address.", "The connection comes from that peer, so ClientIP can use its X-Forwarded-For header.", "Restoring SetTrustedProxies(nil) and restarting makes the same request return {\"clientIp\":\"127.0.0.1\"}. The header is then ignored.", "This example trusts local processes to claim client addresses. A deployed proxy setup uses the actual proxy addresses and a proxy that sanitizes incoming forwarding headers.", "The result is an IP address, not a verified user identity. This replacement router only registers /client-ip."],
        } },
        {"id": "gin-server-shutdown", "type": "sub_header", "richText": [["Graceful shutdown"]]},
        {"id": "gin-server-drain", "type": "bulleted_list", "richText": [["server.Shutdown(ctx)", [["c"]]], [" stops accepting new connections, closes idle connections, and waits for active HTTP connections to become idle. This lets an in-progress request finish."]]},
        {"id": "gin-server-shutdown-context", "type": "bulleted_list", "richText": [["The ctx argument limits how long Shutdown waits. It uses a fresh context because the context that received the termination signal is already canceled."]]},
        {"id": "gin-server-close", "type": "bulleted_list", "richText": [["If Shutdown reaches its deadline, it returns an error. "], ["server.Close()", [["c"]]], [" can then force active connections closed. It does not forcibly kill Go goroutines."]]},
        {"id": "gin-server-serve-return", "type": "bulleted_list", "richText": [["During shutdown, ListenAndServe returns "], ["http.ErrServerClosed", [["c"]]], [". That return happens before Shutdown necessarily finishes. main must wait for Shutdown before exiting."]]},
        {"id": "gin-server-workers", "type": "bulleted_list", "richText": [["Shutdown does not wait for detached workers or close hijacked connections such as WebSockets. Application-owned workers and those connections need separate stop and wait logic."]]},
        { id: "gin-server-managed-example", type: 'example', example: {
            title: "Server limits and shutdown",
            language: "go",
            description: ["This main function replaces main in the first program. buildRouter stays in main.go. The original version of buildRouter supplies /ping.", "The imports also include context, errors, os, os/signal, and syscall. The existing log, net/http, time, and Gin imports remain.", "The command starts a three-second request in another terminal. Once the server logs slow request started, Ctrl+C in the server terminal triggers shutdown while that request is active."],
            code: `func main() {
    router := buildRouter()
    router.GET("/slow", func(c *gin.Context) {
        log.Print("slow request started")
        timer := time.NewTimer(3 * time.Second)
        defer timer.Stop()
        select {
        case <-timer.C:
            c.JSON(http.StatusOK, gin.H{"finished": true})
        case <-c.Request.Context().Done():
            return
        }
    })

    server := &http.Server{
        Addr:              "127.0.0.1:8080",
        Handler:           router,
        ReadHeaderTimeout: 5 * time.Second,
        ReadTimeout:       10 * time.Second,
        WriteTimeout:      15 * time.Second,
        IdleTimeout:       60 * time.Second,
        MaxHeaderBytes:    1 << 20,
    }

    signalCtx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
    defer stop()
    serveErr := make(chan error, 1)
    go func() {
        serveErr <- server.ListenAndServe()
    }()

    select {
    case err := <-serveErr:
        if !errors.Is(err, http.ErrServerClosed) {
            log.Printf("server failed: %v", err)
        }
        return
    case <-signalCtx.Done():
        stop()
    }

    log.Print("shutdown started")
    shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    if err := server.Shutdown(shutdownCtx); err != nil {
        log.Printf("graceful shutdown failed: %v", err)
        if err := server.Close(); err != nil {
            log.Printf("forced close failed: %v", err)
        }
    }
    if err := <-serveErr; !errors.Is(err, http.ErrServerClosed) {
        log.Printf("server stopped: %v", err)
    }
    log.Print("server stopped")
}`,
            commands: "go run .\n\n# In another terminal:\ncurl -i http://127.0.0.1:8080/slow",
            result: "If interrupted while /slow is active and the client stays connected:\nThe response finishes with status 200 and body {\"finished\":true}.\nServer messages include: shutdown started, then server stopped.\nNew connections are no longer accepted during the shutdown wait.",
            explanation: ["signal.NotifyContext returns a context and a stop function. The context is canceled when the process receives os.Interrupt, such as Ctrl+C, or syscall.SIGTERM.", "context.Background() supplies the application-level parent. defer stop() releases signal notification resources when main returns.", "make(chan error, 1) creates a buffered channel with space for one error. The serving goroutine sends ListenAndServe’s result into serveErr.", "go func() { ... }() starts serving concurrently. main can then wait in select for either a serving error or the signal context’s Done channel.", "If serving fails before a signal, main reads the error and returns. After a signal, stop() restores normal signal handling so another interrupt can terminate the process.", "context.WithTimeout creates a fresh ten-second shutdown context. Using signalCtx here would cancel the wait immediately.", "Shutdown waits while /slow finishes. Its timer simulates active work without detaching it from the request handler.", "If the ten-second wait fails, Close forces connections closed. Context-aware request work can then observe cancellation.", "The serving goroutine can report ErrServerClosed into the buffered channel while main waits inside Shutdown. The final receive collects that result.", "The program waits for Shutdown before returning from main. Response completion and goroutine lifetime are separate from the listener stopping."],
        } },
        {"id": "gin-server-tls", "type": "sub_header", "richText": [["TLS listener and certificate files"]]},
        {"id": "gin-server-tls-direct", "type": "bulleted_list", "richText": [["server.ListenAndServeTLS(certFile, keyFile)", [["c"]]], [" starts an HTTPS listener using the configured Gin handler. Its arguments are paths to a PEM certificate file and its private-key file."]]},
        {"id": "gs-tls-config", "type": "bulleted_list", "richText": [["server.TLSConfig", [["c"]]], [" points to a "], ["tls.Config", [["c"]]], [" struct. Its "], ["MinVersion", [["c"]]], [" field selects the oldest TLS protocol version the listener accepts."]]},
        {"id": "gin-server-address", "type": "bulleted_list", "richText": [["The server address still controls the network interface and port. "], ["127.0.0.1:8443", [["c"]]], [" uses loopback port 8443. HTTPS does not require using port 443."]]},
        { id: "gin-server-tls-example", type: 'example', example: {
            title: "HTTPS with certificate verification",
            language: "go",
            description: ["This main function replaces main in the first program, using the original buildRouter that supplies /ping. Its imports also include crypto/tls and os.", "TLS_CERT_FILE and TLS_KEY_FILE identify existing PEM files. The certificate is valid for localhost. Certificate issuance and renewal are external prerequisites.", "TLS_CA_FILE identifies the issuing CA certificate for curl. Its variable is configured in the client terminal. This example only starts TLS; it does not include the preceding shutdown flow."],
            code: `func main() {
    certFile := os.Getenv("TLS_CERT_FILE")
    keyFile := os.Getenv("TLS_KEY_FILE")
    if certFile == "" || keyFile == "" {
        log.Fatal("TLS_CERT_FILE and TLS_KEY_FILE are required")
    }
    server := &http.Server{
        Addr:              "127.0.0.1:8443",
        Handler:           buildRouter(),
        ReadHeaderTimeout: 5 * time.Second,
        ReadTimeout:       10 * time.Second,
        WriteTimeout:      15 * time.Second,
        IdleTimeout:       60 * time.Second,
        MaxHeaderBytes:    1 << 20,
        TLSConfig: &tls.Config{
            MinVersion: tls.VersionTLS13,
        },
    }
    if err := server.ListenAndServeTLS(certFile, keyFile); err != nil {
        log.Fatal(err)
    }
}`,
            commands: "# With TLS_CERT_FILE and TLS_KEY_FILE configured:\ngo run .\n\n# In another terminal with TLS_CA_FILE configured:\ncurl --cacert \"$TLS_CA_FILE\" --resolve localhost:8443:127.0.0.1 https://localhost:8443/ping",
            result: "{\"message\":\"pong\"}",
            explanation: ["os.Getenv reads the certificate paths from process configuration. Missing paths stop startup. Invalid files or a mismatched certificate and key produce a serving error.", "&tls.Config{...} creates the TLS configuration and supplies its pointer to the server. tls.VersionTLS13 selects TLS 1.3 as the minimum.", "Handler: buildRouter() calls the router-building function and assigns the returned engine directly.", "ListenAndServeTLS replaces ListenAndServe. Both methods are called on server, not on the Gin context or a route handler.", "curl --cacert trusts the supplied CA. --resolve connects localhost:8443 to 127.0.0.1 while keeping localhost for certificate-name verification.", "Certificate verification remains enabled. Certificate paths are configured, while private-key contents stay outside source code.", "To combine TLS with the earlier managed shutdown, its serving goroutine calls server.ListenAndServeTLS(certFile, keyFile) instead of ListenAndServe, after TLS configuration is prepared. Shutdown and Close apply to that same server."],
        } },
        {"id": "gin-server-references", "type": "sub_header", "richText": [["References"]]},
        {"id": "gin-server-doc-http", "type": "bulleted_list", "richText": [["Go HTTP server fields and shutdown", [["a", "https://pkg.go.dev/net/http#Server"]]]]},
        {"id": "gin-server-doc-config", "type": "bulleted_list", "richText": [["Gin custom HTTP configuration", [["a", "https://gin-gonic.com/en/docs/server-config/custom-http-config/"]]]]},
        {"id": "gin-server-doc-stop", "type": "bulleted_list", "richText": [["Gin graceful shutdown", [["a", "https://gin-gonic.com/en/docs/server-config/graceful-restart-or-stop/"]]]]},
        {"id": "gin-server-doc-proxy", "type": "bulleted_list", "richText": [["Gin trusted proxies", [["a", "https://gin-gonic.com/en/docs/server-config/trusted-proxies/"]]]]},
        {"id": "gin-server-doc-signals", "type": "bulleted_list", "richText": [["Signal notification contexts", [["a", "https://pkg.go.dev/os/signal#NotifyContext"]]]]},
    ],
} as const satisfies GoNote;

export default note;
