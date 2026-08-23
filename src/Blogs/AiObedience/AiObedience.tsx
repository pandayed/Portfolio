import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { AI_OBEDIENCE_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const CONTEXT_ROT = 'https://research.trychroma.com/context-rot';

const AiObedience = () => {
    return (
        <ArticleLayout title="AI (dis)obedience" route={AI_OBEDIENCE_ROUTE} sections={sections}>
            <section className="Article__section">
                <p>While building apps with just prompts, I ran into these failures:</p>
                <ul className="Article__notes">
                    <li>
                        Fix this everywhere changed three files out of twenty, and the task was
                        reported as done.
                    </li>
                    <li>
                        A small change turned into new abstractions, renamed APIs and edits to
                        unrelated files.
                    </li>
                    <li>
                        The requested behaviour worked, and something that had worked before was
                        broken.
                    </li>
                    <li>
                        The main path was handled, and the edge cases and the dependent code were
                        not.
                    </li>
                    <li>
                        The AI stopped when the output looked plausible, and the full requirement
                        was not met.
                    </li>
                    <li>
                        The feature behaved correctly, and the internals ignored a pattern the
                        repository already used elsewhere.
                    </li>
                </ul>
            </section>

            <section className="Article__section">
                <p>
                    Different models behave differently in the same scenario. The same model
                    behaves differently across scenarios. People who work on AI describe that
                    behaviour with analogies, and three of them come up more often than the rest.
                </p>

                <h3 className="Article__subTitle">The sorcerer&apos;s apprentice</h3>
                <p>AI is more goal oriented than path oriented.</p>
                <p>
                    The apprentice knows a few things and not everything. It still goes after the
                    goal. It picks its own path. That path is often not the one the master wanted.
                    It does not stop where the master would have stopped. It then reports that the
                    work is done. The report looks like completion. The requirement is not met.
                </p>

                <h3 className="Article__subTitle">The parent and the child</h3>
                <p>
                    A child asks for one thing. The parent gives something else. The parent wants
                    to help. The parent also wants to do what they think is best for the child.
                    Both of those are true at the same time.
                </p>
                <p>
                    The intent is good. The result is still not what the child asked for. A model
                    does the same thing. You ask for a narrow fix. You get a cleaner design that
                    you did not ask for.
                </p>

                <h3 className="Article__subTitle">The genie</h3>
                <p>
                    A model today is capable. It still misses what you wanted, because your request
                    was underspecified. The genie has just come out of the bottle. It has the
                    ability. It does not have the context you hold.
                </p>
                <p>
                    Ask a genie for a bridge across the river. You may get a rope bridge. You may
                    get six lanes of concrete. Both are bridges. Only one of them is the one you
                    needed. The genie had no way to tell which.
                </p>

                <h3 className="Article__subTitle">Why the analogies are useful</h3>
                <p>
                    Each analogy names a different cause. So each one points to a different fix.
                    They also move the diagnosis away from the model. The model is usually not the
                    cause.
                </p>
                <ul className="Article__notes">
                    <li>
                        The apprentice: the goal is rewarded and the path is not. State the path
                        and the constraints. Then check the completion claim.
                    </li>
                    <li>
                        The parent: good intent still gives the wrong output. Say what you want.
                        Say that you do not want anything extra.
                    </li>
                    <li>
                        The genie: capability is not context. Specify the request. Do not assume
                        the context is shared.
                    </li>
                </ul>
            </section>

            <section className="Article__section">
                <p>These are the pieces that decide whether the output is what you want:</p>
                <ul className="Article__notes">
                    <li>Model capability. What the model can do at all.</li>
                    <li>Specification. What you asked for, and what done means.</li>
                    <li>Context. What the model can see about this repository.</li>
                    <li>
                        Scope. How many places the task covers, and whether they can be found.
                    </li>
                    <li>Execution strategy. The order of the work and where the model stops.</li>
                    <li>Manual verification. Whether you read the code, not just the feature.</li>
                </ul>
            </section>

            <section className="Article__section" aria-labelledby="model-capability">
                <h2 id="model-capability" className="SectionTitle">
                    Model capability
                </h2>
                <p>
                    Model capability sets the limit. The other things in this post help you get
                    closer to that limit. None of them take you past it.
                </p>
                <ul className="Article__notes">
                    <li>
                        Context window. How much the model can hold at one time. This includes your
                        prompt, the files it read, the tool output and everything it has already
                        said. A large window does not mean the model uses all of it. Accuracy drops
                        in the middle of a long context, so a model can hold a file and still miss
                        what is in it.
                    </li>
                    <li>
                        Reasoning. Whether it can carry a set of steps without losing the earlier
                        ones. A refactor across four files needs the model to remember the first
                        file while it edits the fourth.
                    </li>
                    <li>
                        Tool use. Whether it searches, reads and runs things before it answers, or
                        answers from memory. The first gives evidence. The second is a guess.
                    </li>
                    <li>
                        Long tasks. Whether it stays consistent across many steps. Most models get
                        worse as a task runs longer.
                    </li>
                </ul>
                <p>
                    Capability also changes within one model. The same model behaves differently
                    with a different reasoning budget, a different temperature, or a different set
                    of tools. So one failure does not prove the model cannot do the task.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="specification">
                <h2 id="specification" className="SectionTitle">
                    Specification
                </h2>
                <p>
                    Humans are underspecified by default. You know what you want. You say part of
                    it. The rest stays in your head.
                </p>
                <p>
                    A model has to fill in the rest. It always fills it in with something. What it
                    fills in is not always what you wanted.
                </p>
                <p>
                    A repository often holds more than one design pattern for the same job. The
                    model also knows the patterns the industry uses. These compete with each other.
                    When the request does not say which pattern applies, the model picks one. It
                    often picks the industry default over the one your repository already uses.
                </p>
                <p>
                    So be specific. You cannot be specific in every prompt. A prompt that carries
                    every rule gets long, and you have to type it again the next time. Use these
                    instead.
                </p>
                <ul className="Article__notes">
                    <li>
                        Skills. A skill is a named set of instructions for a recurring task, and
                        the agent loads it when the task matches. Most agents now support some form
                        of this.
                    </li>
                    <li>
                        Rules. Some tools, such as Augment, let you write rules that apply to every
                        request in the workspace.
                    </li>
                    <li>
                        AGENTS.md. Codex and several other tools read this file from the root of
                        the repository, so it holds instructions that sit above any single task.
                    </li>
                </ul>
                <p>The more specific the input, the closer the output is to what you want.</p>
            </section>

            <section className="Article__section" aria-labelledby="context">
                <h2 id="context" className="SectionTitle">
                    Context
                </h2>
                <p>
                    Specification says what to do. Context is what the model can see while it does
                    it.
                </p>
                <p>
                    Work is often spread across folders. Put those folder paths in the skill that
                    covers the task. The agent then goes to the right place instead of guessing
                    where the code is.
                </p>
                <p>
                    Context is not only code. It is also the documentation and the comments around
                    the code. Exceptions are where this matters most. A repository has places where
                    the normal pattern is not followed. If the reason is not written down, the
                    model sees code that does not match the industry standard and tries to fix it.
                    If the reason is written down, the model follows the codebase. An architecture
                    decision record is a good place to write that reason.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="scope">
                <h2 id="scope" className="SectionTitle">
                    Scope
                </h2>
                <p>Change this everywhere is a bad instruction. I gave it often and it failed.</p>
                <p>
                    Everywhere is not an instruction about how to write the code. It is a question
                    about how many places the change applies to. That question has to be answered
                    before any file is edited.
                </p>
                <ul className="Article__notes">
                    <li>What counts as a relevant occurrence.</li>
                    <li>How to find all of them.</li>
                    <li>Which ones are excluded on purpose.</li>
                    <li>How to show that none were missed.</li>
                </ul>
                <p>
                    The model cannot read the whole repository to answer that. It reads some files
                    and it chooses which ones. Files it does not open are not part of the answer.
                    It also cannot tell you what it missed, because it does not know what it did
                    not read.
                </p>
                <p>
                    Reading more files does not fix this. The opposite happens. The more the model
                    reads, the worse it gets at using any of it.{' '}
                    <a href={CONTEXT_ROT} className="Link">
                        Chroma tested eighteen models
                    </a>{' '}
                    and every one of them got worse as the input got longer, well before the
                    context window was full. A model that reads twenty files loses the first files
                    while it reads the last ones. Response quality drops as the amount of context
                    goes up.
                </p>
                <p>
                    So do not ask the model to read for coverage. Ask it to search. A search
                    returns every match at the same cost and does not lose the early results.
                </p>
                <p>
                    This works only if the thing is greppable. Make it greppable on purpose. Use
                    one name for one concept. Use a shared prefix. Use a marker constant. Use a
                    type that every case has to go through. Then the search gives you the list of
                    places, and the same search after the change shows that nothing was left.
                </p>
                <p>
                    Many things are not greppable. So, AI may try to read all the files it think would help, but since there is a context limit, its likely to fail for such tasks.
                </p>

            </section>

            <section className="Article__section" aria-labelledby="execution">
                <h2 id="execution" className="SectionTitle">
                    Execution strategy
                </h2>
                <p>
                    There is more than one way to get the same task done. The execution strategy is
                    the order of the work and the points where the model stops.
                </p>
                <p>
                    The default is one shot. You describe a feature and the model writes the page,
                    the APIs and the rest in a single pass. It usually does not finish all of it.
                    Two other things go wrong as well.
                </p>
                <ul className="Article__notes">
                    <li>
                        You cannot review it properly. The change is too large to read with care.
                    </li>
                    <li>
                        If you reject the approach, all of it has to be rewritten. The work and the
                        tokens are spent twice.
                    </li>
                </ul>
                <p>A better strategy makes the model stop.</p>
                <ol className="Article__steps">
                    <li>Ask for a plan before any code.</li>
                    <li>
                        Ask the plan to state the blast radius, which is everything the change
                        touches.
                    </li>
                    <li>
                        Ask it to list the competing options: the patterns already in the codebase,
                        the approaches available, the one it recommends, and the reason.
                    </li>
                    <li>Ask for the plan in phases.</li>
                    <li>
                        Ask each phase to carry a manual verification checklist. That is what you
                        check by hand before the next phase starts.
                    </li>
                    <li>Discuss the plan, then let it implement one phase.</li>
                    <li>
                        Ask for tests last, once you have verified the feature behaves the way you
                        want.
                    </li>
                </ol>
                <p>
                    When the model stops and discusses, you usually end up with an implementation
                    you want. When it does not stop, you get something you have to change
                    afterwards.
                </p>
                <p>
                    Ask for one more thing in the plan. Have the model mark where each statement
                    comes from. A file and a line is evidence. Everything else is inference. Ask
                    for that separation once and you will see how much of a plan is inference. Some
                    of it will be wrong.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="verification">
                <h2 id="verification" className="SectionTitle">
                    Manual verification
                </h2>
                <p>Read the code yourself at least once per change.</p>
                <p>
                    A model is probabilistic, not deterministic. The same prompt on the same
                    repository can produce a different answer twice. You can pick the right model,
                    write the skills, supply the context and stop the model at every phase, and
                    still get code you do not want. None of those steps make the output certain.
                </p>
                <p>
                    Checking the feature is not enough. You open the feature and it works. The
                    problem is in the code, and the code is not visible from the feature.
                </p>
                <ul className="Article__notes">
                    <li>Everything in one file, where the codebase would have split it.</li>
                    <li>The same string written out in six places instead of once.</li>
                    <li>A failure suppressed so the screen keeps rendering.</li>
                    <li>A value hardcoded on the client that should come from the API.</li>
                    <li>Logic in the component that belongs behind the endpoint.</li>
                </ul>
                <p>
                    None of those show up when you use the feature. The feature works and the tests
                    pass. Nothing tells you they are there.
                </p>
                <p>
                    Whatever you accept becomes the pattern. The model reads the repository to
                    decide what this codebase does. Code you accepted is part of that repository,
                    so the model copies it in the next task. The copy makes the pattern stronger.
                    The chance of the same mistake goes up with every occurrence you leave in
                    place. Fix it once, or write a rule that says not to do it, and it stops there.
                </p>
                <p>
                    Do this before the pull request. A review reads a diff. A diff does not carry
                    the repository. It does not show the helper that already existed, the folder
                    the file should have been in, or the pattern the change broke. The human
                    reviewer and the AI reviewer both lose that context at the diff. You have the
                    most context right after the change, while the work is still in your working
                    tree.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="improving-the-system">
                <h2 id="improving-the-system" className="SectionTitle">
                    Improving the system
                </h2>
                <p>
                    Doing all of this at once is a lot of work. You do not have to. Keep working the
                    way you already work, and change the system only when a result is not what you
                    wanted.
                </p>
                <p>
                    When the output is wrong, the cause is usually that the system is not being used
                    the way it is meant to be used. Something was not specified. The context was not
                    there. The scope was never fixed. The model was never stopped. Find which one it
                    was and write it down. That note is the change to the system.
                </p>
                <p>Two things tell you a change belongs in the system.</p>
                <ul className="Article__notes">
                    <li>
                        You type the same chunk of prompt again. Move it into a skill. You should
                        not have to type it a third time.
                    </li>
                    <li>
                        You wanted a behaviour and the AI did not give it. Write that behaviour into
                        a skill or a rule, so the next task starts with it.
                    </li>
                </ul>
                <p>
                    Turn each learning into reusable context, a tool, or a skill. The next task is
                    then picked up by a better system, even though the model is the same.
                </p>
                <p>
                    Every fix stays in place. So the failures you hit later are new ones, not the
                    same one again.
                </p>
            </section>
        </ArticleLayout>
    );
};

export default AiObedience;
