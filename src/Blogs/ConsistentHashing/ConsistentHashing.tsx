import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { CONSISTENT_HASHING_ROUTE } from '../../routing/routes';
import { sections } from './sections';

const moduloPlacement = `server = hash(key) % number_of_servers`;

const ring = `                    0
                    |
      875           |           125
                    |
    750 ------------+------------ 250
                    |
      625           |           375
                    |
                   500`;

const serverHashes = `hash("server-A") -> 137
hash("server-B") -> 582
hash("server-C") -> 814`;

const ringWithNodes = `                    0
                    |
      814 *         |         * 137
    Server C        |        Server A
                    |
    750 ------------+------------ 250
                    |
        582 *       |
      Server B      |
                    |
                   500`;

const ConsistentHashing = () => {
    return (
        <ArticleLayout
            title="Consistent hashing"
            route={CONSISTENT_HASHING_ROUTE}
            sections={sections}
        >
            <section className="Article__section" aria-labelledby="rehashing-problem">
                <h2 id="rehashing-problem" className="SectionTitle">
                    The rehashing problem
                </h2>
                <p>
                    Horizontal scaling means the data is spread over several servers instead of
                    one. Every piece of data carries a key, often its primary key. That key decides
                    which server holds it.
                </p>
                <p>
                    The simple way to make that decision is to hash the key and take the remainder
                    after dividing by the number of servers. The remainder is the server number.
                </p>
                <pre className="Article__code">
                    <code>{moduloPlacement}</code>
                </pre>
                <p>
                    This works while the number of servers stays the same. The moment you add or
                    remove a server, the divisor changes, and the remainder changes for almost every
                    key. Five keys on four servers, with a fifth server added:
                </p>
                <div className="Article__tableWrap">
                    <table className="Article__table">
                        <thead>
                            <tr>
                                <th scope="col">Key</th>
                                <th scope="col">hash(key)</th>
                                <th scope="col">Server with 4</th>
                                <th scope="col">Server with 5</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">k1</th>
                                <td>87</td>
                                <td>3</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <th scope="row">k2</th>
                                <td>42</td>
                                <td>2</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <th scope="row">k3</th>
                                <td>130</td>
                                <td>2</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th scope="row">k4</th>
                                <td>55</td>
                                <td>3</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th scope="row">k5</th>
                                <td>91</td>
                                <td>3</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Four of the five keys moved. Only k2 stayed. Going from N servers to N + 1
                    leaves about one key in N + 1 where it was, so nearly all of the keys have to
                    move.
                </p>
                <p>
                    That is expensive. If the servers hold a cache, every moved key is a miss, and
                    the requests behind those misses hit the database at the same time. If the
                    servers hold the data itself, the data has to be copied across the cluster
                    before the new layout is correct.
                </p>
                <p>
                    Consistent hashing removes the divisor. Adding or removing a server then moves
                    only the keys that server takes over or gives up.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="hash-space">
                <h2 id="hash-space" className="SectionTitle">
                    The hash space
                </h2>
                <p>
                    A hash function has a fixed output range. Take a function that produces values
                    from 0 to 999. Every value it can produce is a position in that range, so the
                    range has 1000 positions.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="hash-ring">
                <h2 id="hash-ring" className="SectionTitle">
                    The hash ring
                </h2>
                <p>
                    Join the two ends of the range. The value after 999 is 0 again. That circular
                    range is the hash ring.
                </p>
                <pre className="Article__code">
                    <code>{ring}</code>
                </pre>
                <p>
                    The ring is not divided into pieces in advance. Its positions are the possible
                    outputs of the hash function, and nothing else.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="node-placement">
                <h2 id="node-placement" className="SectionTitle">
                    Placing nodes on the ring
                </h2>
                <p>
                    Servers sit on the same ring as the data. A piece of data has a key to hash. A
                    server does not, so you give each server an identifier and hash that instead.
                </p>
                <p>
                    Say you have three servers. Their identifiers are server-A, server-B and
                    server-C. Hashing the identifiers gives a position for each one.
                </p>
                <pre className="Article__code">
                    <code>{serverHashes}</code>
                </pre>
                <pre className="Article__code">
                    <code>{ringWithNodes}</code>
                </pre>
                <p>
                    Those positions are not picked by hand and they are not random. The same
                    identifier always hashes to the same position, so every machine in the system
                    works out the same ring.
                </p>
            </section>
        </ArticleLayout>
    );
};

export default ConsistentHashing;
