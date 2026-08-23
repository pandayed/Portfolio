import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { SIEVE_OF_ERATOSTHENES_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const sieveCode = `vector<int> sieve(int n) {

    // creation of boolean array
    vector<bool> prime(n + 1, true);
    for (int p = 2; p * p <= n; p++) {
        if (prime[p] == true) {

            // marking as false
            for (int i = p * p; i <= n; i += p)
                prime[i] = false;
        }
    }

    vector<int> res;
    for (int p = 2; p <= n; p++){
        if (prime[p]){
            res.push_back(p);
        }
    }
    return res;
}`;

const SieveOfEratosthenes = () => {
    return (
        <ArticleLayout
            title="Sieve of Eratosthenes"
            route={SIEVE_OF_ERATOSTHENES_ROUTE}
            sections={sections}
        >
            <section className="Article__section">
                <p>Problem: Find all prime numbers upto N.</p>
            </section>

            <section className="Article__section" aria-labelledby="naive-approach">
                <h2 id="naive-approach" className="SectionTitle">
                    Naive approach
                </h2>
                <p>Naive approach: Pick one number at a time, check if its prime.</p>
                <p>Problem with naive approach: Too slow.</p>
            </section>

            <section className="Article__section" aria-labelledby="sieve-approach">
                <h2 id="sieve-approach" className="SectionTitle">
                    Sieve Approach
                </h2>
                <ul className="Article__notes">
                    <li>Start moving from 2, and move onwards.</li>
                    <li>
                        When we pick a number we will remove all of its multiple except itself. Mark
                        in some way so that we do not consider them while iterating.
                    </li>
                    <li>
                        Then, the next number we would pick will be prime, because it has not been
                        removed by any of smaller numbers.
                    </li>
                </ul>
                <pre className="Article__code">
                    <code>{sieveCode}</code>
                </pre>
            </section>

            <section className="Article__section" aria-labelledby="optimisation-steps">
                <h2 id="optimisation-steps" className="SectionTitle">
                    The 2 Most Important Optimisation Steps
                </h2>

                <h3 className="Article__subTitle">
                    Step 1 &mdash; Why p * p &lt;= n (only till &radic;n)
                </h3>
                <p>Think:</p>
                <ul className="Article__notes">
                    <li>Any composite number = a &times; b</li>
                    <li>At least one of them &le; &radic;n</li>
                </ul>
                <p>Example:</p>
                <ul className="Article__notes">
                    <li>36 &rarr; (2&times;18), (3&times;12), (4&times;9), (6&times;6)</li>
                    <li>Notice: one factor is always &le; &radic;36 = 6</li>
                </ul>
                <p>Key logic</p>
                <ul className="Article__notes">
                    <li>If a number had no factor &le; &radic;n</li>
                    <li>Then both factors would be &gt; &radic;n</li>
                    <li>Their product would be &gt; n &rarr; impossible</li>
                </ul>
                <p>Conclusion</p>
                <ul className="Article__notes">
                    <li>If a number is composite, it will be caught by some i &le; &radic;n</li>
                    <li>So no need to go beyond &radic;n</li>
                </ul>

                <h3 className="Article__subTitle">Step 2 &mdash; Why start from i * i, not 2 * i</h3>
                <p>This is the most important insight</p>
                <p>Take i = 5</p>
                <p>Multiples:</p>
                <ul className="Article__notes">
                    <li>2&times;5 = 10</li>
                    <li>3&times;5 = 15</li>
                    <li>4&times;5 = 20</li>
                    <li>5&times;5 = 25</li>
                </ul>
                <p>What happened earlier?</p>
                <ul className="Article__notes">
                    <li>10 &rarr; already removed by 2</li>
                    <li>15 &rarr; already removed by 3</li>
                    <li>20 &rarr; already removed by 2</li>
                </ul>
                <p>So before reaching 5:</p>
                <ul className="Article__notes">
                    <li>All multiples less than 25 are already handled</li>
                    <li>
                        The key thing is for all multiples of 5 which are less then 5x5, there would
                        be one prime which would have taken care of the multiple
                    </li>
                    <li>Multiple: ax5 &lt;25</li>
                    <li>a&lt;5</li>
                    <li>
                        Before we reach 5, we would have processed all the a&lt;5, therefore we must
                        not waste the iterations for ax5, where ax5&lt;5x5
                    </li>
                </ul>
                <p>Conclusion</p>
                <ul className="Article__notes">
                    <li>First new multiple = i * i</li>
                </ul>
            </section>
        </ArticleLayout>
    );
};

export default SieveOfEratosthenes;
