import { renderExampleText } from './renderExampleText';
import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { SPRING_BOOT_FIRST_APPLICATION_ROUTE, toHref } from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'spring-and-boot', title: 'Spring and Spring Boot' },
    { id: 'create-and-run', title: 'Project setup' },
    { id: 'application-entry-point', title: 'Application startup' },
    { id: 'http-endpoint', title: 'Running application' },
];

const SpringBootFirstApplication = () => (
    <ArticleLayout title="A first Spring Boot application" route={SPRING_BOOT_FIRST_APPLICATION_ROUTE}
        sections={sections} backRoute="/notes/spring-boot" backLabel="Back to Spring Boot notes">
        <section className="Article__section" aria-labelledby="spring-and-boot">
            <h2 id="spring-and-boot" className="SectionTitle">Spring and Spring Boot</h2>
            <ul className="Article__notes">
                <li>Spring Framework manages application objects and supplies the objects they depend on.</li>
                <li>It also provides modules for web handling, database access, and other application work.</li>
                <li>Spring Boot configures a Spring application from its libraries and settings.</li>
                <li>Boot also supplies dependency management and build support for running the application.</li>
                <li>The examples use Spring Boot 3.5, Spring Framework 6.2, and Java 17 or later.</li>
                <li>Java, build-tool basics, databases, and general web concepts are prerequisites.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="create-and-run">
            <h2 id="create-and-run" className="SectionTitle">Project setup</h2>
            <ul className="Article__notes">
                <li><a className="Link" href="https://start.spring.io/">Spring Initializr</a> generates a project with a build file, wrapper, and application class.</li>
                <li>This course uses a Java Maven project with group <code>com.example</code>, artifact <code>demo</code>, and package <code>com.example.demo</code>.</li>
                <li>The project uses a Spring Boot <code>3.5.x</code> release and the Spring Web dependency.</li>
                <li>The generated build file contains the selected concrete Boot version. The examples keep its dependency management.</li>
                <li>Spring Web includes Spring MVC for request handling and embedded Tomcat in this Boot version.</li>
                <li>The project’s JDK and the IDE’s configured JDK must match the selected Java version.</li>
                <li>The project files lesson explains the generated folders. The starters lesson explains the Spring Web dependency.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="application-entry-point">
            <h2 id="application-entry-point" className="SectionTitle">Application startup</h2>
            <ul className="Article__notes">
                <li><code>SpringApplication.run</code> starts the application using the supplied application class.</li>
                <li><code>@SpringBootApplication</code> marks that class as the application’s starting configuration.</li>
                <li>For this project, startup also starts the embedded web server.</li>
                <li>The beans and dependency injection lessons explain the objects Spring creates during startup.</li>
                <li>The application startup lesson then explains the configuration annotations inside <code>@SpringBootApplication</code>.</li>
            </ul>
            <LearningNoteExampleBlock renderText={renderExampleText} example={{
                title: 'Start the generated application', language: 'java',
                description: [
                    'The tabs contain all application source and the complete Maven build file.',
                    'The application file is `src/main/java/com/example/demo/DemoApplication.java`.',
                    'Java 17 or later and Maven must be installed.',
                    'The command runs from the directory containing `pom.xml`.',
                ],
                code: '',
                files: [
    {
        "name": "src/main/java/com/example/demo/DemoApplication.java",
        "language": "java",
        "code": "package com.example.demo;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class DemoApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(DemoApplication.class, args);\n    }\n}\n"
    },
    {
        "name": "pom.xml",
        "language": "text",
        "code": "<project xmlns=\"http://maven.apache.org/POM/4.0.0\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\n         xsi:schemaLocation=\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\">\n    <modelVersion>4.0.0</modelVersion>\n    <parent>\n        <groupId>org.springframework.boot</groupId>\n        <artifactId>spring-boot-starter-parent</artifactId>\n        <version>3.5.16</version>\n        <relativePath/>\n    </parent>\n    <groupId>com.example</groupId>\n    <artifactId>demo</artifactId>\n    <version>1.0.0</version>\n    <properties><java.version>17</java.version></properties>\n    <dependencies>\n        <dependency>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-starter-web</artifactId>\n        </dependency>\n    </dependencies>\n    <build>\n        <finalName>demo</finalName>\n        <plugins>\n            <plugin>\n                <groupId>org.springframework.boot</groupId>\n                <artifactId>spring-boot-maven-plugin</artifactId>\n            </plugin>\n        </plugins>\n    </build>\n\n</project>\n"
    }
],
                commands: 'mvn spring-boot:run',
                explanation: [
                    'Maven starts the application through the Spring Boot plugin.',
                    'The default server port is `8080`.',
                    'Startup fails if another process already uses that port.',
                    'A successful startup leaves the application running until it stops.',
                    'No application controller exists yet. A request to `/hello` therefore has no application handler.',
                ],
            }} />
        </section>
        <section className="Article__section" aria-labelledby="http-endpoint">
            <h2 id="http-endpoint" className="SectionTitle">Running application</h2>
            <ul className="Article__notes">
                <li>A running server does not mean an application request mapping has been registered.</li>
                <li>The <a className="Link" href={toHref('/notes/spring-boot/restful-web-services')}>controllers lesson</a> adds the first greeting endpoint after bean registration and injection are explained.</li>
                <li>This keeps server startup separate from controller discovery and request handling.</li>
                <li><a className="Link" href="https://docs.spring.io/spring-boot/3.5/tutorial/first-application/">Spring Boot 3.5: first application tutorial</a></li>
                <li><a className="Link" href="https://docs.spring.io/spring-boot/3.5/system-requirements.html">Spring Boot 3.5: system requirements</a></li>
            </ul>
        </section>
    </ArticleLayout>
);
export default SpringBootFirstApplication;
