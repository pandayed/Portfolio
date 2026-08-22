import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { COMPLEXITY_CASES_ROUTE, CPP_COMPLEXITY_ROUTE, toHref } from '../../routing/routes';
import { sections } from './sections';

const pushBackExample = `std::vector<int> v;              // capacity 0
for (int i = 0; i < n; ++i)
    v.push_back(i);              // reallocates at 1, 2, 4, 8, ... , n/2

// copies made in total: 1 + 2 + 4 + ... + n/2 < n
// cost per call: under 2 element copies, whatever n is`;

const hashExample = `std::unordered_map<Key, int> m;  // n keys
m.find(k);                       // O(1) if the hash spreads the keys

// every key hashing to the same bucket turns that
// into one linked list of length n, so O(n) per call`;

const ComplexityCases = () => {
    return (
        <ArticleLayout
            title="Average and amortised are not the same thing"
            route={COMPLEXITY_CASES_ROUTE}
            sections={sections}
        >
            <section className="Article__section">
                <p>
                    Best, average and worst describe one call on different inputs. Amortised
                    describes a sequence of calls on the same container. That is the whole
                    distinction, and it decides which number you may carry into a calculation.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="amortised">
                <h2 id="amortised" className="SectionTitle">
                    Amortised: a guarantee
                </h2>
                <p>
                    An amortised bound is a statement about a total. If m calls cost O(m) in total,
                    each call is amortised O(1), even though one of them was linear. It is
                    arithmetic on a worst case, so no assumption about the data is involved.
                </p>
                <pre className="Article__code">
                    <code>{pushBackExample}</code>
                </pre>
                <p>
                    A vector doubles its capacity when full, so reallocations happen at sizes 1, 2,
                    4, 8 and so on. Those sizes sum to less than n, so filling a vector with n
                    elements copies fewer than 2n elements in total. The loop is O(n), not
                    O(n&sup2;), and nothing about the input can change that.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="average">
                <h2 id="average" className="SectionTitle">
                    Average: an assumption
                </h2>
                <p>
                    An average bound is a statement about typical inputs. It holds while the data
                    behaves, and there is no total to fall back on when it does not.
                </p>
                <pre className="Article__code">
                    <code>{hashExample}</code>
                </pre>
                <p>
                    A lookup in <code>unordered_map</code> is O(1) on average because the keys land
                    in different buckets. Collide them all into one bucket and every lookup walks a
                    list of n nodes. Ten thousand of those calls cost O(n) each, not O(1) each: no
                    averaging over calls rescues it, because the bad case is not paying for
                    anything cheap that came before.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="side-by-side">
                <h2 id="side-by-side" className="SectionTitle">
                    Side by side
                </h2>
                <div className="Article__tableWrap">
                    <table className="Article__table">
                        <thead>
                            <tr>
                                <th scope="col" />
                                <th scope="col">Average</th>
                                <th scope="col">Amortised</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Taken over</th>
                                <td>possible inputs</td>
                                <td>a sequence of calls</td>
                            </tr>
                            <tr>
                                <th scope="row">Rests on</th>
                                <td>the data being ordinary</td>
                                <td>arithmetic, nothing else</td>
                            </tr>
                            <tr>
                                <th scope="row">Fails when</th>
                                <td>the input is chosen against you</td>
                                <td>never, for the total</td>
                            </tr>
                            <tr>
                                <th scope="row">Example</th>
                                <td>
                                    <code>unordered_map::find</code>
                                </td>
                                <td>
                                    <code>vector::push_back</code>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="Article__section" aria-labelledby="the-test">
                <h2 id="the-test" className="SectionTitle">
                    The test
                </h2>
                <p>
                    Ask whether the expensive call pays for the cheap calls before it. A
                    reallocation is expensive precisely because n cheap appends preceded it, so the
                    cost is already bought and the bound is amortised. A colliding lookup is
                    expensive for a reason that has nothing to do with earlier lookups, so it can
                    repeat forever and the bound is only an average.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="where-both-break">
                <h2 id="where-both-break" className="SectionTitle">
                    Where both break
                </h2>
                <ul className="Article__notes">
                    <li>
                        Per-call latency. Amortised O(1) says nothing about any one call. Under a
                        frame budget or a p99 target, the single push_back that reallocates misses
                        it. Call reserve up front and the spike is gone.
                    </li>
                    <li>
                        Untrusted input. Average assumes the data is not chosen against you. If
                        keys arrive in a request body, an attacker can pick them to collide and
                        hold every lookup at O(n).
                    </li>
                </ul>
                <p>
                    In either situation read the worst column instead. Otherwise the marked case on
                    the{' '}
                    <a href={toHref(CPP_COMPLEXITY_ROUTE)} className="Link">
                        container complexities
                    </a>{' '}
                    page is the figure to use.
                </p>
            </section>
        </ArticleLayout>
    );
};

export default ComplexityCases;
