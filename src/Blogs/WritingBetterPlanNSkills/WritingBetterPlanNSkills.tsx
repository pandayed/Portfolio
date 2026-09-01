import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { WRITING_BETTER_PLANS_AND_SKILLS_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const concisePdfExample = `## Extract PDF text

Use pdfplumber for text extraction:

import pdfplumber

with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()`;

const WritingBetterPlanNSkills = () => {
    return (
        <ArticleLayout
            title="Writing better plans and skills"
            route={WRITING_BETTER_PLANS_AND_SKILLS_ROUTE}
            sections={sections}
        >
            <section className="Article__section">
                <p>
                    A plan document and a skill document are both instructions you write for an AI
                    model. The same rules make both of them work: say only what the model does not
                    already know, match how much freedom you give it to how fragile the task is, and
                    build in a way to check the work.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="good-plan-docs">
                <h2 id="good-plan-docs" className="SectionTitle">
                    Good plan docs
                </h2>
                <p>
                    A plan should divide the work into phases. Not too many, not too few. Unit tests
                    generally belong in the last phase, after the feature itself is built.
                </p>
                <p>
                    Each phase needs two checklists: one for the work in that phase, and one for
                    verifying it by hand. The model can check the first list itself. The person reviewing
                    checks the second.
                </p>
                <p>
                    A good plan lets each phase start in a new chat session. If a phase depends on
                    context that only lives in the previous conversation, the plan has not written that
                    context down.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="assume-the-model-is-smart">
                <h2 id="assume-the-model-is-smart" className="SectionTitle">
                    Assume the model is smart
                </h2>
                <p>
                    Start from the assumption that the model already knows most things. Only add context
                    it does not have. Before adding a paragraph, ask three questions:
                </p>
                <ul className="Article__notes">
                    <li>Does the model really need this explanation?</li>
                    <li>Can I assume the model already knows this?</li>
                    <li>Does this paragraph earn back the tokens it costs?</li>
                </ul>
                <p>A short instruction that assumes prior knowledge:</p>
                <pre className="Article__code">
                    <code>{concisePdfExample}</code>
                </pre>
                <p>
                    A longer version that explains what a PDF is and why pdfplumber is a reasonable
                    choice adds nothing the model did not already know. It costs three times the tokens
                    and teaches nothing new.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="match-freedom-to-the-task">
                <h2 id="match-freedom-to-the-task" className="SectionTitle">
                    Match freedom to the task
                </h2>
                <p>
                    How specific an instruction should be depends on how fragile the task is and how
                    much the right answer varies by context.
                </p>
                <div className="Article__tableWrap">
                    <table className="Article__table">
                        <thead>
                            <tr>
                                <th scope="col">Freedom</th>
                                <th scope="col">Use when</th>
                                <th scope="col">Instruction takes the form of</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">High</th>
                                <td>Multiple approaches work, decisions depend on context</td>
                                <td>Plain text guidance and heuristics</td>
                            </tr>
                            <tr>
                                <th scope="row">Medium</th>
                                <td>A preferred pattern exists but some variation is fine</td>
                                <td>Pseudocode or a script with parameters</td>
                            </tr>
                            <tr>
                                <th scope="row">Low</th>
                                <td>The task is fragile, error-prone, or must run in one exact order</td>
                                <td>A specific script with no parameters to change</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    A database migration is low freedom: there is one safe order to run it in, so give
                    an exact command and say not to change it. A code review is high freedom: context
                    decides what matters, so give general direction and let the model find the details.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="test-with-every-model">
                <h2 id="test-with-every-model" className="SectionTitle">
                    Test with every model
                </h2>
                <p>
                    A skill or plan is an addition to a model, so how well it works depends on the model
                    reading it. If you use the instructions with more than one model, test with each one.
                </p>
                <ul className="Article__notes">
                    <li>A fast, economical model: does the instruction give it enough guidance?</li>
                    <li>A balanced model: is the instruction clear and efficient?</li>
                    <li>A model built for deep reasoning: does the instruction avoid over-explaining?</li>
                </ul>
                <p>
                    What is enough detail for one model can be too little for a faster, cheaper one. Aim
                    for wording that works across all the models you plan to use.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="naming-and-descriptions">
                <h2 id="naming-and-descriptions" className="SectionTitle">
                    Naming and descriptions
                </h2>
                <p>
                    Name a skill after the activity it covers, in gerund form: <code>processing-pdfs</code>,{' '}
                    <code>writing-documentation</code>. Avoid vague names like <code>helper</code> or{' '}
                    <code>utils</code>.
                </p>
                <p>
                    Write the description in third person: &quot;Extracts text and tables from PDF
                    files&quot;, not &quot;I can help you with PDFs&quot;. State what the skill does and
                    when to use it. The description is what a model reads to decide whether to use the
                    skill at all, before it reads anything else, so it has to carry that decision on its
                    own.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="progressive-disclosure">
                <h2 id="progressive-disclosure" className="SectionTitle">
                    Progressive disclosure
                </h2>
                <p>
                    Keep the main instruction file under about 500 lines. It should read like a table of
                    contents: a quick start plus links to reference files for anything advanced. The
                    model only reads a reference file when the task needs it, so a large reference file
                    costs nothing until it is opened.
                </p>
                <ul className="Article__notes">
                    <li>Keep references one level deep. Link every reference file directly from the main file, not from another reference file.</li>
                    <li>Give a reference file over 100 lines its own table of contents at the top.</li>
                    <li>Organize reference files by domain, so a task about one topic never has to load another.</li>
                </ul>
            </section>

            <section className="Article__section" aria-labelledby="workflows-and-checklists">
                <h2 id="workflows-and-checklists" className="SectionTitle">
                    Workflows and checklists
                </h2>
                <p>
                    Break a complex operation into clear, sequential steps. For a workflow with many
                    steps, give the model a checklist it can copy into its own response and check off as
                    it goes. This keeps it from skipping a step, and gives you something to glance at to
                    see how far it got.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="feedback-loops">
                <h2 id="feedback-loops" className="SectionTitle">
                    Feedback loops
                </h2>
                <p>
                    The pattern is: run a check, fix what it finds, run the check again. The check can be
                    a script, or it can be a written checklist the model compares its own output against.
                    Either way, the instruction should say to keep looping until the check passes, not to
                    move on after one pass.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="build-evaluations-first">
                <h2 id="build-evaluations-first" className="SectionTitle">
                    Build evaluations first
                </h2>
                <p>
                    Write evaluations before writing the instructions. This keeps the instructions aimed
                    at real gaps instead of ones you imagine.
                </p>
                <ol className="Article__steps">
                    <li>Run the model on a real task without any instructions. Note where it fails or lacks context.</li>
                    <li>Turn each failure into a test scenario.</li>
                    <li>Measure how the model does without the instructions, as a baseline.</li>
                    <li>Write the smallest instructions that close those gaps.</li>
                    <li>Run the scenarios again, compare to the baseline, and adjust.</li>
                </ol>
            </section>

            <section className="Article__section" aria-labelledby="iterate-with-the-model">
                <h2 id="iterate-with-the-model" className="SectionTitle">
                    Iterate with the model
                </h2>
                <p>
                    Use one session to write the instructions and a separate, fresh session to test
                    them. The session that writes the instructions can see how they read; only a fresh
                    session shows whether a model that has not seen the background can actually follow
                    them.
                </p>
                <ol className="Article__steps">
                    <li>Do the task once without instructions, in a normal conversation. Notice what context you keep repeating.</li>
                    <li>Ask the writing session to turn that repeated context into instructions.</li>
                    <li>Check the draft for explanations the model does not need, and cut them.</li>
                    <li>Give the instructions to a fresh session and have it do a related task.</li>
                    <li>Note where the fresh session struggled or missed a rule, and take that back to the writing session to fix.</li>
                </ol>
                <p>Repeat this loop as you find new gaps. Each round should be based on something the model actually did, not a guess about what it might do.</p>
            </section>
        </ArticleLayout>
    );
};

export default WritingBetterPlanNSkills;
