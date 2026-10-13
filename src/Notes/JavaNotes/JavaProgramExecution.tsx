import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { JAVA_PROGRAM_EXECUTION_ROUTE } from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'source-and-bytecode', title: 'Source code becomes bytecode' },
    { id: 'run-a-class', title: 'Compile and run a class' },
    { id: 'jdk-and-jvm', title: 'JDK and JVM' },
];

const JavaProgramExecution = () => (
    <ArticleLayout
        title="Java source, compilation, and the JVM"
        route={JAVA_PROGRAM_EXECUTION_ROUTE}
        sections={sections}
        backRoute="/notes/java"
        backLabel="Back to Java notes"
    >
        <section className="Article__section" aria-labelledby="source-and-bytecode">
            <h2 id="source-and-bytecode" className="SectionTitle">Source code becomes bytecode</h2>
            <ul className="Article__notes">
                <li>A Java source file contains the code you write.</li>
                <li>The Java compiler, <code>javac</code>, checks the source code and compiles it into a <code>.class</code> file.</li>
                <li>The <code>.class</code> file contains bytecode: instructions for the Java Virtual Machine (JVM).</li>
                <li>The JVM runs that bytecode.</li>
                <li>A Java runtime provides a JVM for the target operating system.</li>
                <li>The same class file can run on different systems with a compatible JVM.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="run-a-class">
            <h2 id="run-a-class" className="SectionTitle">Compile and run a class</h2>
            <ul className="Article__notes">
                <li>Save this file as <code>Hello.java</code>. The file name must match the public class name.</li>
                <li>The launcher starts the example by calling its <code>main</code> method.</li>
            </ul>
            <CodeBlock language="java">{`public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}`}</CodeBlock>
            <ol className="Article__steps">
                <li>Open the directory that contains <code>Hello.java</code>.</li>
                <li>Compile the file, then run the class:</li>
            </ol>
            <CodeBlock language="text">{`javac Hello.java
java Hello`}</CodeBlock>
            <ul className="Article__notes">
                <li><code>javac</code> writes <code>Hello.class</code> by default.</li>
                <li>Run <code>java Hello</code>. Do not include <code>.class</code> in the class name.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="jdk-and-jvm">
            <h2 id="jdk-and-jvm" className="SectionTitle">JDK and JVM</h2>
            <ul className="Article__notes">
                <li><strong>JDK:</strong> the Java Development Kit. Install a JDK to build Java programs.</li>
                <li>The JDK includes <code>javac</code> and the <code>java</code> launcher.</li>
                <li>The <code>java</code> launcher starts a JVM to run the program.</li>
                <li><strong>JVM:</strong> the virtual machine that loads and runs Java bytecode.</li>
            </ul>
            <p>
                References:{' '}
                <a className="Link" href="https://docs.oracle.com/en/java/javase/24/docs/specs/man/javac.html" target="_blank" rel="noreferrer">Oracle javac command documentation</a>{' '}and{' '}
                <a className="Link" href="https://docs.oracle.com/en/java/javase/24/docs/specs/man/java.html" target="_blank" rel="noreferrer">Oracle java command documentation</a>.
            </p>
        </section>
    </ArticleLayout>
);

export default JavaProgramExecution;
