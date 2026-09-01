import "../../CommonClasses/CommonClasses.css";

import ArticleLayout from "../ArticleLayout/ArticleLayout";
import { AI_OBEDIENCE_ROUTE } from "../../routing/routes";
import { sections } from "./sections";

const CONTEXT_ROT = "https://www.trychroma.com/research/context-rot";

const AiObedience = () => {
  return (
    <ArticleLayout
      title="AI (dis)obedience: why coding agents miss the request"
      route={AI_OBEDIENCE_ROUTE}
      sections={sections}
    >
      <section className="Article__section">
        <p>
          This blog post contains my learnings and knowledge around AI assisted
          development. It is about how the common failures look like, how to
          interpret them, why they happen, how to avoid them and how to handle
          when a new failure happens.
        </p>
        <p>
          There can be uncountable types/patterns of failures, the common ones
          which I came across appear as:
        </p>
        <ul className="Article__notes">
          <li>
            “Fix this everywhere” changes three occurrences while several others
            are missed.
          </li>
          <li>
            A narrow fix grows into new abstractions, renamed APIs and unrelated
            edits.
          </li>
          <li>
            The requested behaviour works, but an existing behaviour regresses.
          </li>
          <li>
            The main path is handled while edge cases and dependent code are
            ignored.
          </li>
          <li>
            The agent reports completion because the output looks plausible,
            even though part of the requirement remains open.
          </li>
          <li>
            The feature behaves correctly, but the code ignores an established
            pattern elsewhere in the repository.
          </li>
        </ul>
      </section>

      <section className="Article__section">
        <p>
          To understand the possible reasons when the outputs do not match the
          desired result, its important to understand the behaviour of the AI
          models. The experts explain the behavoiours using several analogies,
          the most common ones are explained here.
        </p>

        <h3 className="Article__subTitle">The sorcerer&apos;s apprentice</h3>
        <p>
          The apprentice wants to make the master happy. It may say yes to a
          task which is beyond its capability. It may turn notorious, take wrong
          paths, get wicked, and lie about results. Generally this would happen
          when the task is beyond its capability.
        </p>

        <h3 className="Article__subTitle">The parent and the child</h3>
        <p>
          A parent may answer a child&apos;s request with what the parent
          considers more useful. Coding agents are often tuned to be helpful,
          which can produce the same mismatch: you ask for a narrow fix and
          receive a broader redesign.
        </p>

        <h3 className="Article__subTitle">The genie</h3>
        <p>
          A genie can grant the words of a wish without meeting the need behind
          it. Ask for a bridge and you might get either a rope bridge or six
          lanes of concrete.
        </p>

        <p>
          Each behaviour in itself contains a lot more than explained here.
          Also, its important to remember that the same model in different
          scenarios can have different behaviours.
        </p>

        <p>
          The remedies to the problems introduced by these behaviours are
          discussed now.
        </p>
      </section>

      <section className="Article__section" aria-labelledby="collaborator">
        <h2 id="collaborator" className="SectionTitle">
          Treat the agent as a (junior) collaborator
        </h2>
        <p>
          At whatever position you are, apprentice, intern, junior, senior,
          expert, the AI is always a junior collaborator, not an
          alternative/replacement of yourself or anyone. Be considerate to
          listen/read to its responses but do not get blinded by its lies, when
          it may.
        </p>
        <p>
          You can keep it as an intelligent advisor, but not as the decision
          maker.
        </p>
        <p>
          The agent can make typing faster, but it does not remove the work of
          choosing the right change.
        </p>
        <p>
          After AI, we often tend to take up features, which we are not very
          familiar with, make sure to understand the task and codebase/feature
          before starting the actual task.
        </p>
        <section className="Article__section" aria-labelledby="asking-for-docs">
          <h2 id="asking-for-docs" className="SectionTitle">
            Ask for a doc
          </h2>
          <p>Docs are good, as they can be revisited, edited, and shared.</p>
          <ul className="Article__notes">
            <li>
              What do you want to know? Code level understanding or high level
              overview.
            </li>
            <li>
              What should be omitted? Should it incldue the code snippets, the
              links to the file or just the feature details on the client side.
            </li>
            <li>What is your current understanding?</li>
            <li>If you do not understand the tech, mention that.</li>
            <li>
              If you understand the tech but not the feature mention that.
            </li>
            <li>
              Generally for a high level overview, which does not mention code
              level details, comes when we say that the intended audience is
              PMs.
            </li>
            <li>
              When requiring the actual code details, we can mention that the
              intended audience is Engineers.
            </li>
          </ul>
        </section>

        <section className="Article__section" aria-labelledby="evidence">
          <h2 id="evidence" className="SectionTitle">
            Ask for the evidence
          </h2>
          <p>
            Ask the agent to distinguish four things in any investigation or
            plan:
          </p>
          <ul className="Article__notes">
            <li>
              Confirmed facts supported by source, documentation, logs or
              runtime output.
            </li>
            <li>Inferences drawn from those facts.</li>
            <li>Assumptions being used to make progress.</li>
            <li>Unknowns that still need evidence or a decision.</li>
          </ul>
          <p>
            Evidence is broader than a file and line number: it may be an API
            contract, a focused test result, a browser observation or a
            version-control history. The important part is that the claim points
            to something checkable and does not present an inference as a
            confirmed fact.
          </p>
        </section>
        <p>
          Now, lets come to which all stars need to align to get a good result.
        </p>
        <p>The quality of the result depends on:</p>
        <ul className="Article__notes">
          <li>Capability: what the selected model can reliably do.</li>
          <li>Specification: what was requested and what “done” means.</li>
          <li>
            Context: what the agent can see about the repository and the
            problem.
          </li>
          <li>
            Scope: which occurrences and behaviours the change must cover.
          </li>
          <li>
            Execution: how the work is divided and where approval is required.
          </li>
          <li>
            Tools: what the agent can use to gather evidence and validate its
            work.
          </li>
          <li>
            Verification: what a human checks before accepting the change.
          </li>
        </ul>
      </section>

      <section className="Article__section" aria-labelledby="model-capability">
        <h2 id="model-capability" className="SectionTitle">
          Model capability
        </h2>
        <p>
          Model capability sets an upper bound on the result. Better
          instructions and better context help the model approach that bound,
          but they cannot make every model equally suitable for every task.
        </p>
        <ul className="Article__notes">
          <li>
            Context handling: can it find and use the relevant detail among
            prompts, files, tool output and earlier messages?
          </li>
          <li>
            Reasoning: can it preserve constraints and dependencies across
            several steps?
          </li>
          <li>Tool use: can it use terminal, browser, mcp tools etc?</li>
        </ul>
        <p>
          What we actually use is not the model on its own, but a system built
          around it. The model is the brain. The harness around it, the tools,
          the memory, the way work is passed in and out, is the body. The rules
          the system must follow while it works are the constraints.
        </p>
        <p>
          Reasoning settings change the body and the constraints, not the brain.
          A higher reasoning setting gives the same model more resources and
          more time to think before it answers, so the same model can produce a
          better result. This is why the same model name can behave quite
          differently with two differnt reasoning settings and two different
          setups.
        </p>

        <h3 className="Article__subTitle">The chess player and the clock</h3>
        <p>
          Think of the model as a chess player. The same player finds better
          moves in a long game than in a blitz game. Time on the clock is part
          of the strength, not just the player. Taken further, a weaker player
          with relaxed time constraints can beat a stronger player who has to
          move in seconds.
        </p>

        <h3 className="Article__subTitle">The engine and the drive</h3>
        <p>
          Think of the model as a car engine. A strong engine helps, but the
          drive also depends on the steering, the brakes and the road. The
          result you feel is the whole system working together.
        </p>
        <p>
          Also, the car analogy brings us to the point, that, its necessary to
          understand how to steer well and when to stop, about which this blog
          post talks in further sections.
        </p>
        <p>
          Tip: Try to automate everything with AI, of course you know some
          limits, like not sharing passwords and all. Eventually you will
          realize that what can be automated and what cannot be. Focus your time
          on what cannot be automated.
        </p>
      </section>

      <section className="Article__section" aria-labelledby="specification">
        <h2 id="specification" className="SectionTitle">
          Specification
        </h2>
        <p>
          Requests are usually incomplete because the person writing them
          already knows the surrounding context. The agent does not. Any
          important detail left unstated becomes a decision the agent must infer
          or ask about.
        </p>
        <p>
          This matters in mature repositories, which often contain several
          patterns for similar work. If the request does not identify the
          relevant precedent, the agent may choose a common industry pattern
          instead of the local one.
        </p>
        <p>
          A useful specification does not need to be long. It should answer the
          questions that could materially change the solution:
        </p>
        <ul className="Article__notes">
          <li>What is explicitly included and excluded?</li>
          <li>Which existing behaviour must remain unchanged?</li>
          <li>Which repository pattern or contract should be followed?</li>
          <li>What evidence will demonstrate completion?</li>
          <li>Which decisions should come back for approval?</li>
        </ul>
        <p>
          When you do not know all of those answers, ask the agent to inspect
          first and identify only the gaps that would change the implementation.
          Resolve those gaps before code is edited.
        </p>
        <p>
          Add an example wherever you can. An example of the wanted output, or
          of an existing place in the repository that already does the same
          thing, tells the agent far more than a description of it.
        </p>
        <p>
          Repeated constraints do not need to be typed in every prompt. Store
          them where the tool can apply them consistently.
        </p>
      </section>

      <section className="Article__section" aria-labelledby="skills">
        <h2 id="skills" className="SectionTitle">
          Skills and rules
        </h2>
        <p>
          Skills and rules are most useful when they capture lessons from real
          work. If you have corrected the same workflow more than once, the
          repeated correction is a good candidate for reusable guidance.
        </p>
        <p>
          Start with the successful process, not an imagined universal process.
          Turn the corrected steps into a small skill, use it on another
          suitable task and refine it from what happens.
        </p>
        <p>
          "Start with a successful process", this means, that first use prompts
          and existing tools to get a desired output, and see that at which
          points AI failed or needed inputs, based on those points create a
          skill.
        </p>
        <ul className="Article__notes">
          <li>
            Give the skill a narrow purpose and a description that clearly says
            when it applies.
          </li>
          <li>
            Invoke critical workflows explicitly; do not rely only on automatic
            skill selection.
          </li>
          <li>
            Put an example in the skill. A worked case is easier to follow than
            a rule written in prose.
          </li>
        </ul>
        <p>
          Before writing a skill or a rule, read your AI tool&apos;s own
          documentation for how it expects that document to be structured. Each
          tool defines its own format, and a file that ignores it may be parsed
          incorrectly or skipped entirely.
        </p>
        <p>
          A skill or rule is not picked up just because it exists somewhere in
          the repository. Every tool has its own discovery rules: which
          directories it scans, which file names it looks for, and which of
          those files it actually loads for a given task. A well written rule
          placed in the wrong file or folder has the same effect as not writing
          it at all.
        </p>
        <p>
          These discovery rules differ from tool to tool. Confirm the rule for
          the tool you are using instead of assuming it matches another tool you
          have used before.
        </p>
        <p>
          More guidance is not always better. Overlapping instructions can
          conflict, and generic rules copied from another project may not fit
          yours. Keep broad rules short and move specialised detail into
          instructions that load only when needed.
        </p>
        <p>Review this guidance when the repository, tools or models change.</p>
      </section>

      <section className="Article__section" aria-labelledby="context">
        <h2 id="context" className="SectionTitle">
          Context
        </h2>
        <p>Context is the king.</p>
        <p>
          Specification says what to do. Context is the information available
          while the agent decides how to do it.
        </p>
        <p>
          Useful context includes entry points, related folders, local
          conventions, product requirements, previous decisions and known
          exceptions. Point the agent towards the sources of truth instead of
          making it rediscover them on every task.
        </p>
        <p>
          Exceptions need explanation, without explanations the needed
          exceptions appear like anomaly. Without it, unusual code can look
          accidental and invite an unnecessary “fix”. A short comment or
          architecture decision record can explain why the local rule differs
          from the obvious alternative.
        </p>
        <p>
          Use the form of context that best matches the task. A marked-up
          screenshot is often clearer for a visual defect; a request and
          response example is often clearer for an API problem; a failing log is
          often clearer for a runtime error.
        </p>

        <p>
          Prefer a fresh session when the previous conversation is unrelated.
          Old messages consume attention and can pull the discussion towards
          decisions that do not apply to the new task.
        </p>
        <p>
          Remember the rule, if you have reached the context limit, you have
          already reached the quality limit.
        </p>
        <p>
          We misunderstand context. We believe that more context AI would have,
          the better it would perform. But reality is quite the opposite. The
          rule is quality of response is inversely proportional to the input
          context. Larger input context leads to lower quality output. We must
          have a way to restrict the context so that the model does not pick up
          irrelevant things as the context. Do not assume that only inputs are
          part of the context, the outputs/changes also contribute to the
          context.
        </p>
        <p>
          In{" "}
          <a href={CONTEXT_ROT} className="Link">
            Chroma&apos;s context-rot evaluation
          </a>
          , performance declined as the amount of input increased, even when the
          input remained within the model&apos;s advertised context window. The
          practical lesson is to supply the most relevant evidence, not every
          available file.
        </p>
      </section>

      <section className="Article__section" aria-labelledby="scope">
        <h2 id="scope" className="SectionTitle">
          Scope
        </h2>
        <p>
          “Change this everywhere” sounds clear, but “everywhere” has not yet
          been defined. Before editing, turn it into an inventory question:
        </p>
        <ul className="Article__notes">
          <li>What counts as a relevant occurrence.</li>
          <li>How to find all of them.</li>
          <li>Which ones are excluded on purpose.</li>
          <li>What check will show that the intended set was covered.</li>
        </ul>
        <p>
          Search first to build an inventory, then inspect the matches to decide
          which ones actually belong in scope. Search again after the edit to
          detect anything that remains.
        </p>

        <p>
          Searches like find all of this and that, only work when things are
          greppable. Otherwise they do not.
        </p>

        <p>
          Scope includes what AI can read and what AI can change, use
          restrictive instructions so that it does not go and change everything
          or more than what is needed for the current task.
        </p>
      </section>

      <section className="Article__section" aria-labelledby="execution">
        <h2 id="execution" className="SectionTitle">
          Execution strategy
        </h2>
        <p>
          Execution strategy is the order of the work and the points where the
          agent must pause. It should match the risk of the task.
        </p>
        <p>
          A small, reversible change may be safe to implement directly. A change
          that spans a page, API and data model deserves separate investigation,
          design and implementation phases.
        </p>
        <p>
          Trying to do all of that in one pass makes things harder for you and
          AI both:
        </p>
        <ul className="Article__notes">
          <li>
            Context would be lost, time would be limited so AI may miss things.
          </li>
          <li>The resulting change would be too large to review carefully.</li>
          <li>
            A rejected design would force more of the implementation to be
            rewritten.
          </li>
        </ul>
        <p>For a larger or riskier task, use explicit checkpoints:</p>

        <h3 className="Article__subTitle">Analyze</h3>
        <p>
          Make it read and understand the current state of the repo, the
          requirements of the task, and let it or make it ask questions for
          clarity.
        </p>
        <p>
            Giving scope/some context here helps as that way AI would not have to read everything.
        </p>

        <h3 className="Article__subTitle">Create plan file</h3>

        <p>
          Once the AI agent has got enough understanding, then, ask it to make a
          plan, with what all files will it interact, what all APIs will it use,
          and whatever you feel like should be in the plan.
        </p>

        <h3 className="Article__subTitle">Validate plan</h3>
        <p>Review the plan, make any tweaks if required.</p>

        <h3 className="Article__subTitle">Execute</h3>
        <p>
          This is the simplest step. Ask your agent to execute the appropriate
          phase of the plan.
        </p>

        <h3 className="Article__subTitle">Verify</h3>
        <p>
          Verify (manually) if the changes made by AI are commitable or not.
          Otherwise, reiterate.
        </p>

        <p>
          While moving from one checkpoint to next, there can be multiple
          iterations, like it may take multiple iterations to come up with a
          good plan. Also, the steps I shared above are not sequential,
          generally after every execution phase, the verification happens and
          then the next phase execution happens. You are free to take a
          different approach if that suits you better.
        </p>

        <h3 className="Article__subTitle">
          Invite disagreement, retain the decision
        </h3>
        <p>
          Ask the agent to point out unclear requirements and problems with your
          proposed approach. If there are real alternatives, ask for their
          trade-offs before stating a preference. This reduces the tendency to
          simply elaborate on the first idea presented.
        </p>
        <p>
          The agent can recommend an option, but the accountable person should
          choose it. State that implementation must wait for approval and that
          any material departure from the agreed plan requires another
          discussion.
        </p>

        <p>
          At evert step give it freedom to stop and ask questions or to make
          clear if it finds a blocker. AI is very goal driven and it may go with
          work arounds, if you do not let it stop when it needs. Not giving it
          enough freedom to ask questions, would make it assume things or even
          worse which can not imagine.
        </p>
      </section>

      <section className="Article__section" aria-labelledby="verification">
        <h2 id="verification" className="SectionTitle">
          Manual verification
        </h2>
        <p>
          Treat the first response from the agent as a first draft, not the
          final output. This may sound like a no-brainer, but it is surprising
          how often we act as if the first response is the final response, and
          forget to tweak or even review it.
        </p>
        <p>
          Read the code yourself before accepting it. Good prompts, repository
          rules and automated checks reduce risk; none of them makes generated
          code certain.
        </p>
        <p>
          Behavioural verification and code review answer different questions.
          Using the feature shows whether the visible path works. Reading the
          change shows whether it fits the repository and whether the apparent
          success hides a new problem.
        </p>
        <ul className="Article__notes">
          <li>
            Was every requested case covered, including error and boundary
            cases?
          </li>
          <li>Did anything outside the agreed scope change?</li>
          <li>
            Does the implementation follow the local architecture and naming?
          </li>
          <li>Were errors handled, or merely hidden?</li>
          <li>Do the validation results support the completion claim?</li>
        </ul>
        <p>
          Accepted code becomes part of the evidence future contributors and
          agents use to infer local conventions. That makes review important
          beyond the current task: an accidental pattern can be copied later.
        </p>
        <p>
          Review while the investigation and design decisions are still fresh. A
          pull request reviewer can inspect the wider repository, but the person
          who guided the work usually has the clearest context for the
          alternatives considered and assumptions made.
        </p>
      </section>

      <section
        className="Article__section"
        aria-labelledby="improving-the-system"
      >
        <h2 id="improving-the-system" className="SectionTitle">
          Improving the system
        </h2>
        <p>
          You do not need to build an elaborate agent workflow before doing
          useful work. Start with the current process and improve it when a real
          failure reveals a repeatable weakness.
        </p>
        <p>
          When a result is wrong, classify the failure before adding another
          rule. Was the requirement unclear? Was essential context absent? Was
          the scope incomplete? Did the agent choose a poor strategy? Did a
          validation step fail to detect the problem? The answer determines the
          smallest useful correction.
        </p>
        <p>
          This methodology of improving the system gradually over by recording
          the learnings is often called Compound Engineering.
        </p>
      </section>
    </ArticleLayout>
  );
};

export default AiObedience;
