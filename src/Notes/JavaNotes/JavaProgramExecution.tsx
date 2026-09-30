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
            <p>
                A Java source file contains code people write. The Java compiler, <code>javac</code>,
                checks and compiles it into a <code>.class</code> file containing Java bytecode.
                The Java Virtual Machine (JVM) runs that bytecode.
            </p>
            <p>
                The JVM is provided by a Java runtime for the target operating system. This lets
                the same class file run on different systems that provide a compatible JVM.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="run-a-class">
            <h2 id="run-a-class" className="SectionTitle">Compile and run a class</h2>
            <p>
                Save this file as <code>Hello.java</code>. The public class name matches the file
                name. Its <code>main</code> method is the entry point used by this example.
            </p>
            <CodeBlock language="java">{`public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}`}</CodeBlock>
            <p>From the directory that contains the file, compile it and then run the class:</p>
            <CodeBlock language="text">{`javac Hello.java
java Hello`}</CodeBlock>
            <p>
                <code>javac</code> writes <code>Hello.class</code> by default. When launching a
                class by name, use <code>Hello</code>, without the <code>.class</code> suffix.
            </p>
        </section>

        <section className="Article__section" aria-labelledby="jdk-and-jvm">
            <h2 id="jdk-and-jvm" className="SectionTitle">JDK and JVM</h2>
            <ul className="Article__notes">
                <li><strong>JDK:</strong> the development kit. It includes tools such as <code>javac</code> and the <code>java</code> launcher.</li>
                <li><strong>JVM:</strong> the virtual machine that loads and runs Java bytecode.</li>
                <li><strong>Bytecode:</strong> the instructions stored in a compiled <code>.class</code> file.</li>
            </ul>
            <p>
                These names describe different parts of the toolchain. You install a JDK to build
                Java programs. The launcher starts a JVM to run a compiled class.
            </p>
            <p>
                References:{' '}
                <a className="Link" href="https://docs.oracle.com/en/java/javase/24/docs/specs/man/javac.html" target="_blank" rel="noreferrer">Oracle javac command documentation</a>{' '}and{' '}
                <a className="Link" href="https://docs.oracle.com/en/java/javase/24/docs/specs/man/java.html" target="_blank" rel="noreferrer">Oracle java command documentation</a>.
            </p>
        </section>
    </ArticleLayout>
);

export default JavaProgramExecution;
