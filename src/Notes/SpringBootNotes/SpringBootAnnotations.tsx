import ArticleLayout from '../NoteArticleLayout';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    SPRING_BOOT_ANNOTATIONS_ROUTE,
    SPRING_BOOT_FIRST_APPLICATION_ROUTE,
    SPRING_BOOT_NOTES_ROUTE,
    toHref,
} from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'application-and-beans', title: 'Application and beans' },
    { id: 'http-requests', title: 'HTTP requests and responses' },
    { id: 'validation-and-data', title: 'Validation and data' },
];

type AnnotationRow = {
    annotation: string;
    where: string;
    purpose: string;
};

const beanAnnotations: AnnotationRow[] = [
    { annotation: '@SpringBootApplication', where: 'Main class', purpose: 'Enables Boot auto-configuration, component scanning, and application configuration.' },
    { annotation: '@Component', where: 'Class', purpose: 'Marks a general class for Spring to find and manage as a bean.' },
    { annotation: '@Service', where: 'Class', purpose: 'Marks a service-layer bean. It is a specialized @Component.' },
    { annotation: '@Repository', where: 'Class', purpose: 'Marks a data-access bean. It is a specialized @Component and supports exception translation.' },
    { annotation: '@Configuration', where: 'Class', purpose: 'Marks a class that defines Spring beans.' },
    { annotation: '@Bean', where: 'Method', purpose: 'Registers the object returned by the method as a Spring bean.' },
    { annotation: '@Autowired', where: 'Constructor, method, or field', purpose: 'Asks Spring to supply a dependency. A class with one constructor does not need it on that constructor.' },
    { annotation: '@Value("${app.name}")', where: 'Field, parameter, or method', purpose: 'Injects one configured value into a Spring bean.' },
    { annotation: '@ConfigurationProperties', where: 'Class', purpose: 'Binds a group of external properties to an object. Register the class for binding.' },
];

const webAnnotations: AnnotationRow[] = [
    { annotation: '@RestController', where: 'Class', purpose: 'Marks a web controller whose methods write return values to the response body.' },
    { annotation: '@Controller', where: 'Class', purpose: 'Marks a web controller, often used when returning view names.' },
    { annotation: '@RequestMapping', where: 'Class or method', purpose: 'Maps a URL path and optional request conditions. At class level, it can set a shared path prefix.' },
    { annotation: '@GetMapping, @PostMapping, @PutMapping, @PatchMapping, @DeleteMapping', where: 'Method', purpose: 'Maps a method to the matching HTTP request method and path.' },
    { annotation: '@PathVariable', where: 'Method parameter', purpose: 'Reads a value from a path such as /items/{id}.' },
    { annotation: '@RequestParam', where: 'Method parameter', purpose: 'Reads a request parameter, such as ?page=2. It is required by default.' },
    { annotation: '@RequestBody', where: 'Method parameter', purpose: 'Reads and converts the HTTP request body into the parameter type.' },
    { annotation: '@ResponseStatus', where: 'Method or exception class', purpose: 'Sets the HTTP response status.' },
    { annotation: '@RestControllerAdvice', where: 'Class', purpose: 'Shares response-body exception handling across controllers.' },
    { annotation: '@ExceptionHandler', where: 'Method', purpose: 'Handles a specified exception from a controller.' },
];

const dataAnnotations: AnnotationRow[] = [
    { annotation: '@Valid', where: 'Controller parameter', purpose: 'Runs Jakarta Bean Validation on an incoming object when validation support is present.' },
    { annotation: '@NotBlank', where: 'Text field', purpose: 'Requires a non-null string with at least one non-whitespace character.' },
    { annotation: '@Entity', where: 'Class', purpose: 'Marks a Jakarta Persistence entity when JPA support is present.' },
    { annotation: '@Id', where: 'Entity field or property', purpose: 'Marks the primary key of an entity.' },
    { annotation: '@GeneratedValue', where: 'Entity ID field or property', purpose: 'Asks the persistence provider to generate the primary key.' },
    { annotation: '@Transactional', where: 'Spring bean class or method', purpose: 'Sets a transaction boundary when transaction management is configured.' },
];

const AnnotationTable = ({ rows }: { rows: AnnotationRow[] }) => (
    <div className="Article__tableWrap">
        <table className="Article__table">
            <thead>
                <tr>
                    <th scope="col">Annotation</th>
                    <th scope="col">Where</th>
                    <th scope="col">What it does</th>
                </tr>
            </thead>
            <tbody>
                {rows.map(({ annotation, where, purpose }) => (
                    <tr key={annotation}>
                        <th scope="row"><code>{annotation}</code></th>
                        <td>{where}</td>
                        <td>{purpose}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const SpringBootAnnotations = () => (
    <ArticleLayout
        title="Common Spring Boot annotations at a glance"
        route={SPRING_BOOT_ANNOTATIONS_ROUTE}
        sections={sections}
        backRoute={SPRING_BOOT_NOTES_ROUTE}
        backLabel="Back to Spring Boot notes"
    >
        <section className="Article__section">
            <p>
                An annotation adds metadata to a Java class, method, field, or parameter. Spring
                reads many of these annotations to set up beans and handle HTTP requests. Only
                some come from Spring Boot itself; the validation and persistence annotations
                below come from Jakarta APIs.
            </p>
            <p>
                For a small working example, see{' '}
                <a className="Link" href={toHref(SPRING_BOOT_FIRST_APPLICATION_ROUTE)}>
                    a first Spring Boot web application
                </a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="application-and-beans">
            <h2 id="application-and-beans" className="SectionTitle">Application and beans</h2>
            <p>
                A bean is an object managed by Spring. Component scanning finds annotated classes
                in the application package and its subpackages by default.
            </p>
            <AnnotationTable rows={beanAnnotations} />
            <p>
                Use <code>@ConfigurationProperties</code> for related settings and register its
                class through configuration property scanning or <code>@EnableConfigurationProperties</code>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="http-requests">
            <h2 id="http-requests" className="SectionTitle">HTTP requests and responses</h2>
            <p>These are Spring MVC annotations used with the Spring Web dependency.</p>
            <AnnotationTable rows={webAnnotations} />
            <p>
                Use a method-specific mapping such as <code>@GetMapping</code> when an endpoint
                should accept one HTTP method. <code>@RequestMapping</code> without a method
                condition is not limited to one HTTP method.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="validation-and-data">
            <h2 id="validation-and-data" className="SectionTitle">Validation and data</h2>
            <p>
                Jakarta Bean Validation and Jakarta Persistence require their corresponding
                dependencies. <code>@Transactional</code> is a Spring annotation and needs
                transaction management to be active.
            </p>
            <AnnotationTable rows={dataAnnotations} />
            <p>
                References: <a className="Link" href="https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html" target="_blank" rel="noreferrer">Spring Boot application</a>,{' '}
                <a className="Link" href="https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html" target="_blank" rel="noreferrer">Spring beans</a>,{' '}
                <a className="Link" href="https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-requestmapping.html" target="_blank" rel="noreferrer">Spring MVC mappings</a>,{' '}
                <a className="Link" href="https://docs.spring.io/spring-boot/reference/features/external-config.html" target="_blank" rel="noreferrer">configuration properties</a>, and{' '}
                <a className="Link" href="https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html" target="_blank" rel="noreferrer">transactions</a>,{' '}
                <a className="Link" href="https://jakarta.ee/specifications/platform/10/apidocs/jakarta/validation/constraints/notblank" target="_blank" rel="noreferrer">Jakarta validation</a>, and{' '}
                <a className="Link" href="https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/entity" target="_blank" rel="noreferrer">Jakarta persistence</a>.
            </p>
        </section>
    </ArticleLayout>
);

export default SpringBootAnnotations;
