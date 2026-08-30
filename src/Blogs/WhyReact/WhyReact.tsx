import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { WHY_REACT_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const domTree = `flowchart TD
  A((A))
  A --> B((B))
  A --> C((C))
  B --> D((D))
  B --> E((E))
  C --> F((F))
  E --> G((G))`;

const WhyReact = () => {
    return (
        <ArticleLayout title="Why React?" route={WHY_REACT_ROUTE} sections={sections}>
            <section className="Article__section">
                <p>
                    Almost every technology has an alternative, in this I have considered the ones
                    which fit the best and/or are used the most.
                </p>
                <p>
                    Every teach, along with the core features which are designed to solve some
                    problem, is equipped with more related and helpful features. We will be
                    considering core features.
                </p>
                <p>
                    If you want to build websites you need to learn what browsers understand,
                    HTML, CSS and JavaScript.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="html">
                <h2 id="html" className="SectionTitle">
                    HTML
                </h2>
                <p>Hyper Text Markup Language.</p>
                <p>Hyper Text: A text that contains hyperlink.</p>
                <p>Hyperlink: Link to any resource (document, video etc).</p>
                <p>
                    Markup: Symbols used to provide structure (rather structural hierarchy) to raw
                    text.
                </p>
                <p>
                    HTML is a language that provides symbols (markup) to structure and add links
                    (hyperlinks) to raw text.
                </p>
                <p>Browsers have an rendering engine that converts HTML files to DOM.</p>
                <p>DOM: Document Object Model.</p>
                <p>
                    DOM is a tree-structured representation of an HTML document that the browser
                    builds and maintains after reading your HTML file.
                </p>
                <pre className="Article__code">
                    <code>{domTree}</code>
                </pre>
                <p>What you see above is a tree structure in programming.</p>
                <p>Every circle here is called a node.</p>
                <p>DOM, being a tree, follows the same structure.</p>
                <p>Each node in the DOM is called DOM Object.</p>
                <p>A is parent of B.</p>
                <p>B is child of A.</p>
                <p>B and C are siblings.</p>
                <p>
                    Similarly, ancestors and descendants are also used to describe relations
                    between nodes.
                </p>
                <p>Node and its descendants make a subtree.</p>
                <p>
                    Right click in browser → Click Inspect → Select the Elements tab of the
                    browser, what you see is DOM.
                </p>
                <p>
                    The Elements panel shows a live view of the DOM. It&apos;s displayed in an
                    HTML-like outline for convenience.
                </p>
                <p>If you try to skip HTML, you may face hardships while debugging.</p>
            </section>

            <section className="Article__section" aria-labelledby="css">
                <h2 id="css" className="SectionTitle">
                    CSS
                </h2>
                <p>HTML (like everything else in the universe) has limitations.</p>
                <p>
                    Styling (think of it as makeup for the content) is limited (rather minimal)
                    and painful in HTML.
                </p>
                <p>CSS, cascading style sheet solves that.</p>
            </section>

            <section className="Article__section" aria-labelledby="rendering">
                <h2 id="rendering" className="SectionTitle">
                    Rendering
                </h2>
                <p>
                    The browser takes your HTML, parses it, and builds the DOM (Document Object
                    Model) — a structured tree of all elements.
                </p>
                <p>
                    If present, It then fetches and parses the CSS, building the CSSOM (CSS Object
                    Model) — a map of all styles.
                </p>
                <p>
                    Then it combines the two (DOM + CSSOM) to form the Render Tree — which contains
                    only the visible elements with their final, computed styles.
                </p>
                <p>
                    Since, it may confuse, but what you see in the browser&apos;s inspect tab, is
                    actually DOM (as told before too) and not the render tree.
                </p>
                <p>Finally, it paints (draws) pixels on the screen based on that layout and styling.</p>
                <p>
                    Once the browser gets the code, whatever steps it takes to display things on
                    screen, this whole process is called rendering. (We will add more steps to
                    rendering later).
                </p>
            </section>

            <section className="Article__section" aria-labelledby="javascript">
                <h2 id="javascript" className="SectionTitle">
                    JavaScript
                </h2>
                <p>
                    Still the website would not be much interactive (though it will have minimal
                    interaction capabilities, provided by HTML).
                </p>
                <p>To make the website fully interactive you would have to update DOM at runtime.</p>
                <p>
                    Runtime is referred to the time when the code has reached the environment where
                    it has to run and has started running.
                </p>
                <p>
                    To update the DOM at runtime, you will have to write code that will be executed
                    in the browser on some interaction, and will update the DOM.
                </p>
                <p>That is done using javascript, which is a programming language.</p>
            </section>

            <section className="Article__section" aria-labelledby="state">
                <h2 id="state" className="SectionTitle">
                    State
                </h2>
                <p>The components of the website may have some data to use.</p>
                <p>The current data that the page has, is called the state of the component.</p>
                <p>The data can change over time, that is, the state of component may change.</p>
                <p>
                    Let us say, a component uses (rather reads) a counter variable and displays it
                    on screen.
                </p>
                <p>Updating the data, in the code is not enough to see it updated on the screen.</p>
                <p>If you did not get this. Here is a simple explanation.</p>
                <p>
                    Let us say you have a variable (variables are containers of data), a button and
                    a display component. The value of the variable (refers to the value stored in
                    the container), is 10. And, the button, on pressing, increments the value, (10 →
                    Button Press → 11).
                </p>
                <p>The display component reads the data and displays it on the screen.</p>
                <p>
                    Now, when the code runs, and the button is pressed, the data stored in the
                    container is updated, but it would not be reflected on the screen.
                </p>
                <p>So, the problem is, the state got updated, but the UI did not.</p>
                <p>This is because, the data would be updated in the code, but the DOM would not know.</p>
                <p>
                    Recall how does browser displays things. It reads the code, creates a DOM, and
                    that DOM is used to paint things on the screen.
                </p>
                <p>
                    To reflect the updated data (rather state), some more code would be required,
                    that will actually trigger the DOM update too.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="dom-update-pipeline">
                <h2 id="dom-update-pipeline" className="SectionTitle">
                    The DOM update pipeline
                </h2>
                <p>When the DOM update is triggered:</p>
                <p>
                    The browser runs a pipeline (pipeline refers to a sequence of some predefined
                    steps) to display the content on the display.
                </p>
                <p>
                    Although, not all of the steps of the pipeline run on every DOM updation
                    trigger, because the browser itself tries its best to optimise things.
                </p>
                <p>
                    But, the DOM updation trigger starts a pipeline, that would use some resources
                    for sure, and may be expensive too.
                </p>
                <p>
                    This must make one thing very clear, that the browser has the capability of
                    optimising things. Many writings do not make it clear that the browser also has
                    the capability of the optimising things.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="problems">
                <h2 id="problems" className="SectionTitle">
                    Problems with manual DOM updates
                </h2>
                <p>But, there are some major issues with this.</p>

                <h3 className="Article__subTitle">Keeping track of DOM updates manually</h3>
                <p>
                    In plain JavaScript, the developer must track which DOM element depends on
                    which data value. One state update may require updation of multiple DOM
                    Objects.
                </p>
                <p>
                    If tracking is lost or incorrect, the UI becomes inconsistent with the
                    underlying data.
                </p>

                <h3 className="Article__subTitle">Writing minimal DOM update statements</h3>
                <p>Since the DOM updates can trigger expensive operations.</p>
                <p>So, to be efficient, minimal DOM updation statements must be written.</p>
                <p>
                    At developer level, it could be confusing (and difficult too) to update the UI
                    with minimal DOM update statements. Because, its not only about what statements
                    should be written, but also about in what sequence they should be written.
                </p>

                <p>Two big problems.</p>
                <p>Manual updation of DOM is required.</p>
                <p>Even one state variable, can cause expensive operations.</p>
                <p>React solves these. (Discussed ahead)</p>
            </section>

            <section className="Article__section" aria-labelledby="react">
                <h2 id="react" className="SectionTitle">
                    React
                </h2>
                <p>React is a library (not a framework), built on JavaScript.</p>
                <p>But browsers do not understand React.</p>
                <p>So, when app code is written in React, the app needs to be build.</p>
                <p>
                    Building a project is a multi step process. The input for this is code written
                    by developer and output is a code ready to run in the browser.
                </p>
                <p>
                    The output code contains both the library code (so that the library can do its
                    magic in the browser) and the app code.
                </p>
                <p>
                    React solves the problem of manual DOM updation by letting us define the UI as
                    a function of state, UI = f(state) .
                </p>
                <p>React provides tools for this, called hooks.</p>
                <p>
                    React solves the issue of finding minimal DOM updates required, by creating a
                    virtual DOM.
                </p>
                <p>
                    React creates a DOM like structure for itself similar to that of browser,
                    called virtual DOM.
                </p>
                <p>Whenever a state change happens, based on the updated state, it creates a new virtual DOM.</p>
                <p>
                    React compares the previous virtual DOM tree with the newly generated one to
                    determine exactly which parts of the UI changed.
                </p>
                <p>
                    React produces a minimal set of real DOM operations based on those differences
                    and applies those operations to the browser&apos;s actual DOM.
                </p>
            </section>
        </ArticleLayout>
    );
};

export default WhyReact;
