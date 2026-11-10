import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { IS_AI_REALLY_TO_BLAME_ROUTE } from '../../routing/routes';

const IsAiReallyToBlame = () => (
    <ArticleLayout title="Is AI Really to Blame?" route={IS_AI_REALLY_TO_BLAME_ROUTE} sections={[]}>
        <section className="Article__section">
                <p>{"I use AI a lot to build projects, sometimes on my own, sometimes with others. And there's one frustration I keep coming back to: it doesn't build what I wanted. It assumes things I never said, skips questions I wish it had asked, and produces code that looks reasonable until I actually go through it."}</p>
                <p>{"I usually blame the tool. So do people I work with. A lot of conversations around AI-assisted development sound much the same: the model isn't good enough, it doesn't understand the codebase, it needs too much supervision. I've written about these problems myself, and I still run into them."}</p>
                <p>{"When I learnt more, I really do not wish to leave the conversation there. "}</p>
                <p>{"When I look at what I asked for, I sometimes find that I hadn't thought it through either. I knew what I wanted in a broad sense. But, the details that would decide whether the implementation was right were not even clear to me, rather I did not spend time thinking the details even in my head."}</p>
                <p>{"I expected the tool to figure it out. But when I saw the result, I realised it wasn’t what I wanted. Honestly, I hadn’t known I didn’t want it until I saw it."}</p>
                <p>{"It also produced more code than I could properly review, and more than I needed. Undoing the extra work felt like more effort than writing the code myself."}</p>
                <p>{"That’s the part I think we aren’t paying enough attention to. AI makes it easy to turn an idea into an implementation before we’ve answered some basic questions: who needs this feature, what should it do, does it fit the existing system, and would people actually use it?"}</p>
                <p>{"Those questions don't disappear because code has been generated. They come back while we're reviewing it. Now we're correcting assumptions, undoing changes we didn't need, debugging behaviour we never asked for, and explaining the requirement again. Sometimes a task that could have taken an hour ends up taking the whole day."}</p>
                <p>{"We need to understand that having an idea is not same as having a solution to a problem. Somewhere between idea and solution, there are steps which answer those questions, which cannot be found, unless one thinks. And that is the real core problem."}</p>
                <p><strong>{"We are delegating the thinking to AI."}</strong></p>
                <p>{"It goes further than unclear requirements. Sometimes, the problem itself isn’t clear to us, yet we’re already asking AI to implement a solution. Its nothing but fixing something before understanding what needs fixing."}</p>
                <p>{"And somehow, during all this, we can still feel productive."}</p>
                <p>{"I think this is why we need to be careful. Writing the code is one part of the work. If we save time there but spend it all reviewing and fixing the result, we haven't necessarily finished anything sooner."}</p>
                <p>{"A "}<a href="https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/" className="Link">{"METR study using early-2025 AI tools"}</a>{" experimented with sixteen experienced open-source developers, who worked on 246 tasks in repositories they knew well. They expected AI to speed them up. Instead, the tasks took 19 percent longer with AI, and even afterward, the developers believed it had saved them time."}</p>
                <p>{"That gap matters because it can encourage us to keep working the same way. If producing code feels like progress, spending time on requirements starts to feel unnecessary. We can always ask AI for another version. But every version still needs someone to understand it and decide whether it's right."}</p>
                <p>{"Now, as we have AI to blame, we usually say, the tool did this. But, we've had unclear requirements, premature implementation, and assumption-driven development for years. You might have already heard of jokes that how PMs/clients hand over immature requirements to engineers. Now, there is someone who does not come with questions or argues back and implements quickly, and therefore, the old problems have a much quicker way to become code."}</p>
                <p><a href="https://dora.dev/research/2025/dora-report/" className="Link">{"Google's 2025 DORA research"}</a>{" is worth reading for this."}</p>
                <p>{"Next comes the responsibility. It's fair to expect AI to ask better questions and make fewer mistakes. But when we're the ones building the software, we still have to answer for the decisions. Saying the tool misunderstood doesn't resolve a requirement we hadn't settled ourselves. We still need to know what we're accepting and why."}</p>
                <p>{"There's a line by René Descartes that I keep coming back to: “I think, therefore I am.” It wasn't about software, of course. But when I hear us wondering what humans will contribute as AI writes more of the code, I think about how casually we're giving up the thinking that the work still needs."}</p>
        </section>
    </ArticleLayout>
);

export default IsAiReallyToBlame;

