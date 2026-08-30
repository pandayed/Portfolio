import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { CHAIN_OF_THOUGHT_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const ChainOfThought = () => {
    return (
        <ArticleLayout title="Chain of thought for LLMs" route={CHAIN_OF_THOUGHT_ROUTE} sections={sections}>
            <section className="Article__section">
                <p>Coming soon.</p>
            </section>
        </ArticleLayout>
    );
};

export default ChainOfThought;
