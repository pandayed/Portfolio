import ArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import { JAVA_PROGRAM_EXECUTION_ROUTE } from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'jdk-and-jvm', title: 'JDK and JVM' },
    { id: 'program-structure', title: 'A first Java program' },
    { id: 'run-a-class', title: 'Compile and run a class' },
    { id: 'source-and-bytecode', title: 'Source code and bytecode' },
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
                <li>A class groups declarations.</li>
                <li>With <code>javac</code>, a public top-level class belongs in a file with the same name as the class.</li>
                <li>A method groups statements. The launcher calls <code>main</code> to start a program.</li>
                <li><code>String[] args</code> receives command-line arguments as an array of strings.</li>
                <li>Braces group the class body and method body. A method call used as a statement ends with a semicolon.</li>
                <li><code>System.out.println</code> writes a value followed by a line ending to standard output.</li>
                <li>The variable and method pages explain declarations. The object pages explain class members and access modifiers.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="run-a-class">
            <h2 id="run-a-class" className="SectionTitle">Compile and run a class</h2>
            <ul className="Article__notes">
                <li><code>javac</code> produces compiled files with the <code>.class</code> extension.</li>
                <li>Pass the class name to <code>java</code> without the <code>.class</code> extension.</li>
                <li>For the notes' examples with a public <code>Main</code> class, use <code>Main.java</code>, <code>javac Main.java</code>, and <code>java Main</code>.</li>
                <li>A method shown on its own belongs inside a surrounding class.</li>
                <li>An <code>import</code> lets an example use a short standard-library type name, such as <code>Arrays</code>, instead of <code>java.util.Arrays</code>.</li>
            </ul>
            <LearningNoteExampleBlock example={{
                title: 'Compile and run a greeting',
                description: [
                    'Print Hello, Java from a public class named Hello.',
                    'Save the source as Hello.java. Open a terminal in the directory containing that file.',
                    'Run the commands shown after the source, with the JDK available in the terminal.',
                ],
                language: 'java',
                code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}`,
                commands: `javac Hello.java
java Hello`,
                result: 'Hello, Java',
                explanation: [
                    'javac Hello.java compiles the source and writes Hello.class by default.',
                    'java Hello starts the JVM and calls Hello.main.',
                    'main calls System.out.println with Hello, Java. It prints that text followed by a line ending.',
                ],
            }} />
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

    </ArticleLayout>
);

export default JavaProgramExecution;
