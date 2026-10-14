import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { SPRING_BOOT_FIRST_APPLICATION_ROUTE } from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'spring-and-boot', title: 'Spring and Spring Boot' },
    { id: 'create-and-run', title: 'Create a project' },
    { id: 'application-entry-point', title: 'Start the application' },
    { id: 'http-endpoint', title: 'Handle a GET request' },
];

const SpringBootFirstApplication = () => (
    <ArticleLayout title="A first Spring Boot application" route={SPRING_BOOT_FIRST_APPLICATION_ROUTE}
        sections={sections} backRoute="/notes/spring-boot" backLabel="Back to Spring Boot notes">
        <section className="Article__section" aria-labelledby="spring-and-boot">
            <h2 id="spring-and-boot" className="SectionTitle">Spring and Spring Boot</h2>
            <ul className="Article__notes">
                <li>Spring is a Java framework. It can create application objects, supply the objects they depend on, and handle web requests.</li>
                <li>Spring Boot adds dependency bundles, conditional configuration, and tools for running Spring applications.</li>
                <li>A web application receives HTTP requests and sends HTTP responses. An endpoint is a request method and path that the application handles.</li>
                <li>These notes use Spring Boot 3 and Java 17 or later. Examples using RestClient require Boot 3.2 or later.</li>
                <li>The linked course uses Boot 2.7 and Java 8. Its older APIs and javax imports are not the baseline for these examples.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="create-and-run">
            <h2 id="create-and-run" className="SectionTitle">Create a project</h2>
            <ol className="Article__steps">
                <li>Install a JDK compatible with the selected Spring Boot version.</li>
                <li>Open <a className="Link" href="https://start.spring.io/">Spring Initializr</a>. Select Java, Maven, a Spring Boot 3 release, and Spring Web.</li>
                <li>Generate and extract the project. Open pom.xml as a project in the IDE.</li>
                <li>Keep the generated Maven wrapper and dependency management. Configure the IDE to use the selected JDK.</li>
            </ol>
            <ul className="Article__notes">
                <li>pom.xml declares libraries and build plugins. src/main/java contains Java source. src/main/resources contains configuration files.</li>
                <li>Spring Web supplies the libraries for handling HTTP requests. For Boot 3, it includes an embedded Tomcat server by default.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="application-entry-point">
            <h2 id="application-entry-point" className="SectionTitle">Start the application</h2>
            <ul className="Article__notes">
                <li>The Java runtime calls main. SpringApplication.run starts the Spring application.</li>
                <li>@SpringBootApplication enables application configuration, component scanning, and auto-configuration. Later lessons explain each one separately.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: 'Run the generated application', language: 'java',
                description: ['Use this application class in src/main/java/com/example/demo/DemoApplication.java.', 'Run the command from the generated project directory.'],
                code: `package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}`,
                commands: './mvnw spring-boot:run',
                explanation: ['On Windows, use mvnw.cmd spring-boot:run.', 'Spring initializes the application and starts its embedded web server.', 'The default HTTP port is 8080. Startup fails if another process already uses that port.', 'No /hello endpoint exists until the controller in the next example is added.'],
            }} />
        </section>
        <section className="Article__section" aria-labelledby="http-endpoint">
            <h2 id="http-endpoint" className="SectionTitle">Handle a GET request</h2>
            <ul className="Article__notes">
                <li>A controller contains methods that handle web requests.</li>
                <li>@RestController tells Spring to write the methods’ return values to the response body.</li>
                <li>@GetMapping selects the method to call for a GET request to the specified path.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: 'Return a greeting from /hello', language: 'java',
                description: ['Create HelloController.java in the same package as DemoApplication.', 'Restart the application after adding the controller.'],
                code: `package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot";
    }
}`,
                commands: 'curl http://localhost:8080/hello', result: 'Hello, Spring Boot',
                explanation: ['Spring discovers the controller in the application package.', 'GET /hello calls hello().', 'The returned string becomes the HTTP response body. The successful response has status 200.', 'This response is text. Returning a Java object can produce JSON when a suitable message converter is configured.'],
            }} />
            <ul className="Article__notes">
                <li><a className="Link" href="https://docs.spring.io/spring-boot/3.5/tutorial/first-application/">Spring Boot 3: first application</a></li>
                <li><a className="Link" href="https://docs.spring.io/spring-boot/3.5/system-requirements.html">Spring Boot 3: system requirements</a></li>
            </ul>
        </section>
    </ArticleLayout>
);
export default SpringBootFirstApplication;
