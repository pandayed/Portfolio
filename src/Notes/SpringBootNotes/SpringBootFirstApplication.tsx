import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { SPRING_BOOT_FIRST_APPLICATION_ROUTE, toHref } from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'create-and-run', title: 'Create and run the project' },
    { id: 'project-dependencies', title: 'Project dependencies' },
    { id: 'application-entry-point', title: 'Application entry point' },
    { id: 'http-endpoint', title: 'Map an HTTP endpoint' },
    { id: 'setup-related-lessons', title: 'Sources and related lessons' },
];

const SpringBootFirstApplication = () => (
    <ArticleLayout
        title="A first Spring Boot web application"
        route={SPRING_BOOT_FIRST_APPLICATION_ROUTE}
        sections={sections}
        backRoute="/notes/spring-boot"
        backLabel="Back to Spring Boot notes"
    >
        <section className="Article__section" aria-labelledby="create-and-run">
            <h2 id="create-and-run" className="SectionTitle">Create and run the project</h2>
            <ol className="Article__steps">
                <li>Install a JDK supported by the Spring Boot release you select. Confirm the IDE and build tool use that JDK.</li>
                <li>Generate a Maven Java project with Spring Initializr and select Spring Web. Extract the project and open its build file in the IDE.</li>
                <li>Keep the generated Maven wrapper and Spring Boot dependency management. They make the build configuration explicit.</li>
                <li>For the added examples in these notes, use Spring Boot 3 with Java 17 or later. The external API examples using RestClient need Boot 3.2 or later.</li>
                <li>The course source uses Boot 2.7 and Java 8. Newer releases have different Java requirements and some different APIs; check the version label near an example.</li>
            </ol>
            <CodeBlock language="text">{`java -version
./mvnw spring-boot:run`}</CodeBlock>
            <p>
                On Windows, use <code>mvnw.cmd spring-boot:run</code>. After startup, a request to
                <code> http://localhost:8080/hello</code> returns <code>Hello, Spring Boot</code>
                when the controller below is present and the port has not been changed.
            </p>
            <p>
                Follow the folders and request path in{' '}
                <a className="Link" href={toHref('/notes/spring-boot/project-structure')}>project structure and request flow</a>.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="project-dependencies">
            <h2 id="project-dependencies" className="SectionTitle">Project dependencies</h2>
            <p>
                A Spring Boot project starts with a build file that declares its dependencies.
                For a web application, the Spring Web starter brings in the web stack. Spring Boot
                uses the dependencies on the classpath to choose suitable auto-configuration.
            </p>
            <p>
                Create the project with Spring Initializr or use the official tutorial. Select a
                build tool and a Java version supported by the Spring Boot release you choose.
                The exact build file and command depend on those selections.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="application-entry-point">
            <h2 id="application-entry-point" className="SectionTitle">Application entry point</h2>
            <p>
                Put the main application class in a named package. The
                <code> @SpringBootApplication</code> annotation combines application configuration,
                auto-configuration, and component scanning. The <code>main</code> method asks
                Spring Boot to start the application.
            </p>
            <CodeBlock language="java">{`package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}`}</CodeBlock>
            <p>
                Component scanning starts from the package containing this application class and
                includes its subpackages by default. Place application components under that
                package so Spring can find them.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="http-endpoint">
            <h2 id="http-endpoint" className="SectionTitle">Map an HTTP endpoint</h2>
            <p>
                Add a controller in the same package tree. <code>@RestController</code> makes the
                class a web controller whose return values are written to the response body.
                <code> @GetMapping</code> maps a GET request for <code>/hello</code> to the method.
            </p>
            <CodeBlock language="java">{`package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot";
    }
}`}</CodeBlock>
            <p>
                With the web starter on the classpath, Spring Boot configures a web application
                and an embedded server. Start the application with the command for its build tool,
                then send a GET request to <code>/hello</code> on the configured local port.
            </p>
            <p>
                Reference: <a className="Link" href="https://docs.spring.io/spring-boot/tutorial/first-application/" target="_blank" rel="noreferrer">Developing Your First Spring Boot Application</a> in the official Spring Boot tutorial.
            </p>
        </section>
        <section className="Article__section" aria-labelledby="setup-related-lessons">
            <h2 id="setup-related-lessons" className="SectionTitle">Sources and related lessons</h2>
            <ul className="Article__notes">
                <li><a className="Link" href="https://www.youtube.com/watch?v=1993zSY5UBI&list=PLA3GkZPtsafacdBLdd3p1DyRd5FGfr3Ue">Engineering Digest: What is Spring Boot?</a></li>
                <li><a className="Link" href="https://www.youtube.com/watch?v=QZWCbxm9G28&list=PLA3GkZPtsafacdBLdd3p1DyRd5FGfr3Ue">Engineering Digest: Java and IntelliJ setup</a></li>
                <li><a className="Link" href="https://www.youtube.com/watch?v=vW-DTk--qEM&list=PLA3GkZPtsafacdBLdd3p1DyRd5FGfr3Ue">Engineering Digest: opening the project archive</a></li>
                <li><a className="Link" href="https://www.youtube.com/watch?v=d4dcV7Kt3SI&list=PLA3GkZPtsafacdBLdd3p1DyRd5FGfr3Ue">Engineering Digest: Spring Initializr</a></li>
                <li><a className="Link" href="https://www.youtube.com/watch?v=jJ5qrkMQ6r8&list=PLA3GkZPtsafacdBLdd3p1DyRd5FGfr3Ue">Engineering Digest: version differences</a></li>
                <li><a className="Link" href="https://docs.spring.io/spring-boot/3.5/system-requirements.html">Spring Boot 3: system requirements</a></li>
                <li><a className="Link" href="https://start.spring.io/">Spring Initializr</a></li>
            </ul>
        </section>
    </ArticleLayout>
);

export default SpringBootFirstApplication;
