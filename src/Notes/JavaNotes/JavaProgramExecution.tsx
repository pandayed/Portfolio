import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { JAVA_PROGRAM_EXECUTION_ROUTE } from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'jdk-and-jvm', title: 'JDK and JVM' },
    { id: 'program-structure', title: 'A first Java program' },
    { id: 'run-a-class', title: 'Compile and run a class' },
    { id: 'source-and-bytecode', title: 'Source code and bytecode' },
    { id: 'packages-and-imports', title: 'Packages and imports' },
];

const JavaProgramExecution = () => (
    <ArticleLayout
        title="Java source, compilation, and the JVM"
        route={JAVA_PROGRAM_EXECUTION_ROUTE}
        sections={sections}
        backRoute="/notes/java"
        backLabel="Back to Java notes"
    >
        <section className="Article__section" aria-labelledby="jdk-and-jvm">
            <h2 id="jdk-and-jvm" className="SectionTitle">JDK and JVM</h2>
            <ul className="Article__notes">
                <li>The Java Development Kit (JDK) provides the tools to build and run Java programs.</li>
                <li><code>javac</code> is the compiler. It checks Java source code and produces compiled files.</li>
                <li><code>java</code> is the launcher. It starts a Java Virtual Machine (JVM) to run a program.</li>
                <li>The JVM loads and executes Java bytecode: the instructions stored in compiled Java files.</li>
                <li>These notes use Java 17 or later without preview features.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="program-structure">
            <h2 id="program-structure" className="SectionTitle">A first Java program</h2>
            <ul className="Article__notes">
                <li>A source file contains the Java code you write. Its name ends with <code>.java</code>.</li>
                <li>A class groups declarations. This example declares a public class named <code>Hello</code>.</li>
                <li>With <code>javac</code>, a public top-level class belongs in a file with the same name: <code>Hello.java</code>.</li>
                <li>A method groups statements. The launcher calls <code>main</code> to start this program.</li>
                <li><code>String[] args</code> receives command-line arguments as an array of strings.</li>
                <li>Braces group the class body and method body. Statements such as the print below end with a semicolon.</li>
                <li><code>System.out.println</code> writes a value followed by a line ending to standard output.</li>
                <li>The variable and method pages explain declarations. The object pages explain class members and access modifiers.</li>
            </ul>
            <CodeBlock language="java">{`public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}`}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="run-a-class">
            <h2 id="run-a-class" className="SectionTitle">Compile and run a class</h2>
            <ol className="Article__steps">
                <li>Save the program as <code>Hello.java</code>.</li>
                <li>Open a terminal in the directory containing that file.</li>
                <li>Compile the source file, then run the compiled class:</li>
            </ol>
            <CodeBlock language="text">{`javac Hello.java
java Hello`}</CodeBlock>
            <ul className="Article__notes">
                <li><code>javac</code> writes <code>Hello.class</code> by default.</li>
                <li><code>java Hello</code> uses the class name. It does not include <code>.class</code>.</li>
                <li>For the notes' examples with a public <code>Main</code> class, use <code>Main.java</code>, <code>javac Main.java</code>, and <code>java Main</code>.</li>
                <li>A method shown on its own belongs inside a surrounding class.</li>
                <li><strong>Output:</strong> <code>Hello, Java</code>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="source-and-bytecode">
            <h2 id="source-and-bytecode" className="SectionTitle">Source code and bytecode</h2>
            <ul className="Article__notes">
                <li><code>javac</code> checks syntax and types before producing bytecode.</li>
                <li>The JVM executes that bytecode. A JVM can interpret instructions and compile frequently used code into native machine instructions.</li>
                <li>A compatible JVM can run the same class file on different operating systems.</li>
                <li>Compilation checks do not guarantee that execution succeeds. Operations such as parsing text or opening a file can fail when the program runs.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="packages-and-imports">
            <h2 id="packages-and-imports" className="SectionTitle">Packages and imports</h2>
            <ul className="Article__notes">
                <li>A package groups named types. A class named <code>Main</code> in package <code>study</code> has the qualified name <code>study.Main</code>.</li>
                <li>The package declaration comes before imports and class declarations.</li>
                <li>An import allows a short type name instead of its qualified name. It does not install a dependency.</li>
                <li>Types in <code>java.lang</code>, such as <code>String</code> and <code>System</code>, need no explicit import.</li>
                <li><code>import java.util.*</code> imports accessible types from that package, not its subpackages.</li>
                <li><code>LocalDate</code> is a standard-library type representing a date. <code>LocalDate.of(year, month, day)</code> creates one.</li>
                <li>Save the example as <code>src/study/Main.java</code>:</li>
            </ul>
            <CodeBlock language="java">{`package study;

import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        System.out.println(LocalDate.of(2026, 10, 13));
    }
}`}</CodeBlock>
            <ul className="Article__notes">
                <li>From the directory containing <code>src</code>, compile and run it:</li>
            </ul>
            <CodeBlock language="text">{`javac -d out src/study/Main.java
java -cp out study.Main`}</CodeBlock>
            <ul className="Article__notes">
                <li><code>-d out</code> writes compiled classes under <code>out</code>. <code>-cp out</code> sets the class path: where the launcher looks for classes.</li>
                <li><strong>Output:</strong> <code>2026-10-13</code>.</li>
                <li>
                    References:{' '}
                    <a className="Link" href="https://docs.oracle.com/en/java/javase/17/docs/specs/man/javac.html" target="_blank" rel="noopener noreferrer">javac command documentation</a>{' '}and{' '}
                    <a className="Link" href="https://docs.oracle.com/en/java/javase/17/docs/specs/man/java.html" target="_blank" rel="noopener noreferrer">java command documentation</a>.
                </li>
            </ul>
        </section>
    </ArticleLayout>
);

export default JavaProgramExecution;
