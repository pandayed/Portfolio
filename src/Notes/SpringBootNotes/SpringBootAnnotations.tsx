import ArticleLayout from '../NoteArticleLayout';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { SPRING_BOOT_ANNOTATIONS_ROUTE, SPRING_BOOT_NOTES_ROUTE, toHref, type SpringBootRoute } from '../../routing/routes';

interface AnnotationRow {
    annotation: string;
    purpose: string;
    route: SpringBootRoute;
}

interface AnnotationGroup {
    id: string;
    title: string;
    rows: readonly AnnotationRow[];
}

const annotationGroups: readonly AnnotationGroup[] = [
    {
        id: "application-and-beans",
        title: "Application and beans",
        rows: [
            { annotation: "@SpringBootApplication", purpose: "Enables application configuration, component scanning, and auto-configuration.", route: "/notes/spring-boot/spring-boot-application" },
            { annotation: "@Component", purpose: "Registers a general class as a Spring-managed bean through scanning.", route: "/notes/spring-boot/beans" },
            { annotation: "@Service", purpose: "Marks a component that performs application operations.", route: "/notes/spring-boot/beans" },
            { annotation: "@Repository", purpose: "Marks a data-access component and supports persistence-exception translation.", route: "/notes/spring-boot/beans" },
            { annotation: "@Configuration", purpose: "Marks a class containing Spring bean definitions.", route: "/notes/spring-boot/beans" },
            { annotation: "@Bean", purpose: "Registers the object returned by a method as a Spring bean.", route: "/notes/spring-boot/beans" },
            { annotation: "@Autowired", purpose: "Asks Spring to supply a dependency at an injection point.", route: "/notes/spring-boot/dependency-injection" },
            { annotation: "@Qualifier", purpose: "Selects a matching bean using a qualifier.", route: "/notes/spring-boot/dependency-injection" },
            { annotation: "@Primary", purpose: "Makes a bean the preferred candidate when several beans match a single dependency.", route: "/notes/spring-boot/dependency-injection" },
            { annotation: "@SpringBootConfiguration", purpose: "Identifies the application\u2019s configuration class.", route: "/notes/spring-boot/spring-boot-application" },
            { annotation: "@ComponentScan", purpose: "Selects packages to search for component classes.", route: "/notes/spring-boot/spring-boot-application" },
            { annotation: "@EnableAutoConfiguration", purpose: "Enables conditional configuration supplied by Spring Boot.", route: "/notes/spring-boot/auto-configuration" },
            { annotation: "@PostConstruct", purpose: "Marks an initialization method called after dependency injection.", route: "/notes/spring-boot/bean-lifecycle" },
            { annotation: "@PreDestroy", purpose: "Marks a cleanup method called during normal managed bean destruction.", route: "/notes/spring-boot/bean-lifecycle" },
        ],
    },
    {
        id: "configuration",
        title: "Configuration",
        rows: [
            { annotation: "@Profile", purpose: "Registers a bean or configuration only when the specified profiles match.", route: "/notes/spring-boot/profiles-configuration-management" },
            { annotation: "@Value", purpose: "Supplies a configured value to a Spring bean.", route: "/notes/spring-boot/configuration-binding" },
            { annotation: "@ConfigurationProperties", purpose: "Binds related configuration values to a Java object.", route: "/notes/spring-boot/configuration-binding" },
            { annotation: "@EnableConfigurationProperties", purpose: "Registers selected classes for configuration-property binding.", route: "/notes/spring-boot/configuration-binding" },
            { annotation: "@ConfigurationPropertiesScan", purpose: "Finds configuration-property classes in selected packages and registers them.", route: "/notes/spring-boot/configuration-binding" },
            { annotation: "@Validated", purpose: "Enables validation of bound settings when used on a configuration-property class.", route: "/notes/spring-boot/configuration-binding" },
        ],
    },
    {
        id: "http-requests",
        title: "HTTP requests and responses",
        rows: [
            { annotation: "@RestController", purpose: "Marks a controller whose return values are written to the response body.", route: "/notes/spring-boot/restful-web-services" },
            { annotation: "@RequestMapping", purpose: "Maps request paths and optional conditions to a controller or method.", route: "/notes/spring-boot/restful-web-services" },
            { annotation: "@Controller", purpose: "Marks a web controller that can return view names.", route: "/notes/spring-boot/restful-web-services" },
            { annotation: "@GetMapping", purpose: "Maps a GET request to a controller method.", route: "/notes/spring-boot/http-methods" },
            { annotation: "@PostMapping", purpose: "Maps a POST request to a controller method.", route: "/notes/spring-boot/http-methods" },
            { annotation: "@PutMapping", purpose: "Maps a PUT request to a controller method.", route: "/notes/spring-boot/http-methods" },
            { annotation: "@PatchMapping", purpose: "Maps a PATCH request to a controller method.", route: "/notes/spring-boot/http-methods" },
            { annotation: "@DeleteMapping", purpose: "Maps a DELETE request to a controller method.", route: "/notes/spring-boot/http-methods" },
            { annotation: "@PathVariable", purpose: "Reads a value captured from a mapped URL path.", route: "/notes/spring-boot/rest/request-parameters" },
            { annotation: "@RequestParam", purpose: "Reads a query or form parameter.", route: "/notes/spring-boot/rest/request-parameters" },
            { annotation: "@RequestBody", purpose: "Converts the HTTP request body into a Java method argument.", route: "/notes/spring-boot/request-response-body" },
            { annotation: "@ResponseBody", purpose: "Writes a method\u2019s return value to the HTTP response body.", route: "/notes/spring-boot/request-response-body" },
            { annotation: "@ResponseStatus", purpose: "Sets the HTTP response status for a handler or exception.", route: "/notes/spring-boot/http-methods" },
        ],
    },
    {
        id: "validation",
        title: "Validation and exception handling",
        rows: [
            { annotation: "@Valid", purpose: "Requests validation of the annotated request object, including nested objects.", route: "/notes/spring-boot/rest-api-validation" },
            { annotation: "@NotNull", purpose: "Requires a value other than null.", route: "/notes/spring-boot/rest-api-validation" },
            { annotation: "@NotEmpty", purpose: "Requires a non-null value with at least one element or character.", route: "/notes/spring-boot/rest-api-validation" },
            { annotation: "@NotBlank", purpose: "Requires a non-null string containing a non-whitespace character.", route: "/notes/spring-boot/rest-api-validation" },
            { annotation: "@Size", purpose: "Restricts the length or number of elements to a stated range.", route: "/notes/spring-boot/rest-api-validation" },
            { annotation: "@Min", purpose: "Sets the minimum allowed numeric value.", route: "/notes/spring-boot/rest-api-validation" },
            { annotation: "@Max", purpose: "Sets the maximum allowed numeric value.", route: "/notes/spring-boot/rest-api-validation" },
            { annotation: "@Email", purpose: "Checks that a non-null value has a valid email-address format.", route: "/notes/spring-boot/rest-api-validation" },
            { annotation: "@ExceptionHandler", purpose: "Handles a matching exception raised during controller request processing.", route: "/notes/spring-boot/exception-handling" },
            { annotation: "@ControllerAdvice", purpose: "Shares exception handlers and other controller advice across controllers.", route: "/notes/spring-boot/exception-handling" },
            { annotation: "@RestControllerAdvice", purpose: "Shares controller advice whose return values become response bodies.", route: "/notes/spring-boot/exception-handling" },
        ],
    },
    {
        id: "persistence",
        title: "Relational data",
        rows: [
            { annotation: "@Entity", purpose: "Marks a Java class as a JPA entity.", route: "/notes/spring-boot/entity-mapping" },
            { annotation: "@Id (JPA)", purpose: "Marks the entity field or property holding its primary key.", route: "/notes/spring-boot/entity-mapping" },
            { annotation: "@GeneratedValue", purpose: "Requests a generated entity identifier using the selected strategy.", route: "/notes/spring-boot/entity-mapping" },
            { annotation: "@Table", purpose: "Chooses the database table mapped to an entity.", route: "/notes/spring-boot/entity-mapping" },
            { annotation: "@Column", purpose: "Configures the database column mapped to an entity field or property.", route: "/notes/spring-boot/entity-mapping" },
            { annotation: "@Transient", purpose: "Excludes an entity field or property from persistence.", route: "/notes/spring-boot/entity-mapping" },
            { annotation: "@Query (JPA)", purpose: "Declares a JPQL or native SQL query on a repository method.", route: "/notes/spring-boot/jpa-queries" },
            { annotation: "@Transactional (JPA)", purpose: "Applies transaction settings to database work through a Spring-managed method.", route: "/notes/spring-boot/jpa-transactions" },
            { annotation: "@ManyToOne", purpose: "Maps many source entities to one related entity.", route: "/notes/spring-boot/jpa-relationships" },
            { annotation: "@OneToMany", purpose: "Maps an entity to a collection of related entities.", route: "/notes/spring-boot/jpa-relationships" },
            { annotation: "@JoinColumn", purpose: "Configures the foreign-key column used by a relationship.", route: "/notes/spring-boot/jpa-relationships" },
            { annotation: "@OneToOne", purpose: "Maps a relationship with one entity on each side.", route: "/notes/spring-boot/jpa-relationships" },
            { annotation: "@ManyToMany", purpose: "Maps a relationship containing collections on both sides.", route: "/notes/spring-boot/jpa-relationships" },
        ],
    },
    {
        id: "mongodb",
        title: "MongoDB data",
        rows: [
            { annotation: "@Document", purpose: "Maps a Java class to a MongoDB collection.", route: "/notes/spring-boot/mongodb/documents" },
            { annotation: "@Id (MongoDB)", purpose: "Maps a Java field to the document\u2019s _id.", route: "/notes/spring-boot/mongodb/documents" },
            { annotation: "@Field", purpose: "Chooses the stored name of a document field.", route: "/notes/spring-boot/mongodb/documents" },
            { annotation: "@Indexed", purpose: "Declares an index on a mapped document field.", route: "/notes/spring-boot/mongodb/indexes" },
            { annotation: "@DBRef", purpose: "Stores a MongoDB DBRef to a separately stored document.", route: "/notes/spring-boot/mongodb/relationships" },
            { annotation: "@DocumentReference", purpose: "Maps a reference to a separately stored document, normally by its ID.", route: "/notes/spring-boot/mongodb/relationships" },
            { annotation: "@Transactional (MongoDB)", purpose: "Groups MongoDB operations in a transaction when a transaction manager is configured.", route: "/notes/spring-boot/mongodb/transactions" },
        ],
    },
    {
        id: "security",
        title: "Security",
        rows: [
            { annotation: "@EnableMethodSecurity", purpose: "Enables authorization checks on Spring-managed method calls.", route: "/notes/spring-boot/security/authentication-authorization" },
            { annotation: "@PreAuthorize", purpose: "Checks an authorization expression before a secured method runs.", route: "/notes/spring-boot/security/authentication-authorization" },
        ],
    },
    {
        id: "lombok",
        title: "Generated methods with Lombok",
        rows: [
            { annotation: "@Getter", purpose: "Generates getter methods for the selected fields.", route: "/notes/spring-boot/lombok" },
            { annotation: "@Setter", purpose: "Generates setter methods for the selected non-final fields.", route: "/notes/spring-boot/lombok" },
            { annotation: "@NoArgsConstructor", purpose: "Generates a constructor with no arguments.", route: "/notes/spring-boot/lombok" },
            { annotation: "@RequiredArgsConstructor", purpose: "Generates a constructor for uninitialized final and required non-null fields.", route: "/notes/spring-boot/lombok" },
            { annotation: "@AllArgsConstructor", purpose: "Generates a constructor with an argument for each instance field.", route: "/notes/spring-boot/lombok" },
            { annotation: "@ToString", purpose: "Generates a toString method using the selected fields.", route: "/notes/spring-boot/lombok" },
            { annotation: "@EqualsAndHashCode", purpose: "Generates equals and hashCode methods using the selected fields.", route: "/notes/spring-boot/lombok" },
            { annotation: "@Data", purpose: "Combines getters, setters, required-argument construction, toString, equals, and hashCode.", route: "/notes/spring-boot/lombok" },
        ],
    },
    {
        id: "testing",
        title: "Testing",
        rows: [
            { annotation: "@Test", purpose: "Marks a JUnit test method.", route: "/notes/spring-boot/testing/junit" },
            { annotation: "@BeforeEach", purpose: "Runs setup before each test invocation.", route: "/notes/spring-boot/testing/junit" },
            { annotation: "@AfterEach", purpose: "Runs cleanup after each test invocation.", route: "/notes/spring-boot/testing/junit" },
            { annotation: "@BeforeAll", purpose: "Runs setup once before the tests in a class.", route: "/notes/spring-boot/testing/junit" },
            { annotation: "@AfterAll", purpose: "Runs cleanup once after the tests in a class.", route: "/notes/spring-boot/testing/junit" },
            { annotation: "@Disabled", purpose: "Prevents a test or test class from running.", route: "/notes/spring-boot/testing/junit" },
            { annotation: "@ParameterizedTest", purpose: "Runs a test with each supplied set of arguments.", route: "/notes/spring-boot/testing/parameterized-tests" },
            { annotation: "@ValueSource", purpose: "Supplies simple values to a parameterized test.", route: "/notes/spring-boot/testing/parameterized-tests" },
            { annotation: "@CsvSource", purpose: "Supplies comma-separated argument sets to a parameterized test.", route: "/notes/spring-boot/testing/parameterized-tests" },
            { annotation: "@ArgumentsSource", purpose: "Supplies arguments through a custom argument provider.", route: "/notes/spring-boot/testing/parameterized-tests" },
            { annotation: "@ExtendWith", purpose: "Registers a JUnit extension, such as MockitoExtension.", route: "/notes/spring-boot/testing/mockito" },
            { annotation: "@Mock", purpose: "Creates a Mockito mock when Mockito annotations are initialized.", route: "/notes/spring-boot/testing/mockito" },
            { annotation: "@InjectMocks", purpose: "Asks Mockito to construct a test object and supply its mock dependencies.", route: "/notes/spring-boot/testing/mockito" },
            { annotation: "@WebMvcTest", purpose: "Loads the Spring MVC test context for controller checks.", route: "/notes/spring-boot/testing/web-mvc" },
            { annotation: "@MockitoBean", purpose: "Replaces a collaborator with a Mockito mock in a Spring test context.", route: "/notes/spring-boot/testing/web-mvc" },
            { annotation: "@MockBean", purpose: "Provides the older Boot mock-bean mechanism, deprecated since Boot 3.4.", route: "/notes/spring-boot/testing/web-mvc" },
            { annotation: "@WithMockUser", purpose: "Supplies a test user for Spring Security checks without testing login.", route: "/notes/spring-boot/testing/web-mvc" },
            { annotation: "@SpringBootTest", purpose: "Loads the application context using Spring Boot configuration.", route: "/notes/spring-boot/testing/spring-boot" },
            { annotation: "@AutoConfigureMockMvc", purpose: "Configures MockMvc for HTTP checks without opening a network port.", route: "/notes/spring-boot/testing/spring-boot" },
        ],
    },
    {
        id: "background-work",
        title: "Scheduling and events",
        rows: [
            { annotation: "@EnableScheduling", purpose: "Enables Spring\u2019s scheduled-method processing.", route: "/notes/spring-boot/integrations/scheduling" },
            { annotation: "@Scheduled", purpose: "Sets a fixed-delay, fixed-rate, or cron schedule for a method.", route: "/notes/spring-boot/integrations/scheduling" },
            { annotation: "@KafkaListener", purpose: "Registers a method to receive records from Kafka topics.", route: "/notes/spring-boot/kafka" },
        ],
    },
];

const sections: TocEntry[] = annotationGroups.map(({ id, title }) => ({ id, title }));

const SpringBootAnnotations = () => (
    <ArticleLayout
        title="Annotations at a glance"
        route={SPRING_BOOT_ANNOTATIONS_ROUTE}
        sections={sections}
        backRoute={SPRING_BOOT_NOTES_ROUTE}
        backLabel="Back to Spring Boot notes"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>Read from top to bottom: application basics, configuration, web requests, data, security, tools, testing, and background work.</li>
                <li>Within each topic, foundational annotations come first. Click an annotation to read its detailed lesson.</li>
            </ul>
        </section>
        {annotationGroups.map(({ id, title, rows }) => (
            <section className="Article__section" key={id} aria-labelledby={id}>
                <h2 id={id} className="SectionTitle">{title}</h2>
                <div className="Article__tableWrap">
                    <table className="Article__table">
                        <thead>
                            <tr><th scope="col">Annotation</th><th scope="col">What it does</th></tr>
                        </thead>
                        <tbody>
                            {rows.map(({ annotation, purpose, route }) => (
                                <tr key={annotation}>
                                    <th scope="row"><a className="Link" href={toHref(route)}><code>{annotation}</code></a></th>
                                    <td>{purpose}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        ))}
    </ArticleLayout>
);

export default SpringBootAnnotations;
