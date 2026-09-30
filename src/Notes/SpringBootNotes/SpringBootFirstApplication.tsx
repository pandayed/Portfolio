import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { SPRING_BOOT_FIRST_APPLICATION_ROUTE } from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'project-dependencies', title: 'Project dependencies' },
    { id: 'application-entry-point', title: 'Application entry point' },
    { id: 'http-endpoint', title: 'Map an HTTP endpoint' },
];

const SpringBootFirstApplication = () => (
    <ArticleLayout
        title="A first Spring Boot web application"
        route={SPRING_BOOT_FIRST_APPLICATION_ROUTE}
        sections={sections}
        backRoute="/notes/spring-boot"
        backLabel="Back to Spring Boot notes"
    >
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
    </ArticleLayout>
);

export default SpringBootFirstApplication;
