import '../../CommonClasses/CommonClasses.css';

import ArticleLayout from '../ArticleLayout/ArticleLayout';
import { CONSISTENT_HASHING_ROUTE } from '../../routing/routes';
import HashRing from './HashRing';
import { sections } from './sections';

const moduloPlacement = `server = hash(key) % number_of_servers`;

const HASH_SPACE_MAX = 1000;
const HASH_SPACE_TICKS = [0, 250, 500, 750];

const serverHashes = `hash("server-A") -> 137
hash("server-B") -> 582
hash("server-C") -> 814`;

const serverNodes = [
    { id: 'server-a', label: 'Server A', value: 137 },
    { id: 'server-b', label: 'Server B', value: 582 },
    { id: 'server-c', label: 'Server C', value: 814 },
];

const clusteredServerNodes = [
    { id: 'server-a', label: 'A', value: 100 },
    { id: 'server-b', label: 'B', value: 200 },
    { id: 'server-c', label: 'C', value: 300 },
];

const afterAddingServerNodes = [
    ...serverNodes,
    { id: 'server-d', label: 'Server D', value: 400 },
];

const virtualNodeSpread = [
    { id: 'server-a-1', label: 'A1', value: 450, variant: 'virtual' as const },
    { id: 'server-a-2', label: 'A2', value: 650, variant: 'virtual' as const },
    { id: 'server-a-3', label: 'A3', value: 950, variant: 'virtual' as const },
    { id: 'server-b-1', label: 'B1', value: 50, variant: 'virtual' as const },
    { id: 'server-b-2', label: 'B2', value: 550, variant: 'virtual' as const },
    { id: 'server-b-3', label: 'B3', value: 850, variant: 'virtual' as const },
    { id: 'server-c-1', label: 'C1', value: 150, variant: 'virtual' as const },
    { id: 'server-c-2', label: 'C2', value: 350, variant: 'virtual' as const },
    { id: 'server-c-3', label: 'C3', value: 750, variant: 'virtual' as const },
];

const nodeLookupPseudocode = `sorted_node_hashes = [137, 582, 814]

function find_node(key_hash):
    index = binary_search_first_greater_than(sorted_node_hashes, key_hash)
    if index == length(sorted_node_hashes):
        index = 0
    return sorted_node_hashes[index]`;

const SYSTEM_DESIGN_INTERVIEW_BOOK = 'https://www.amazon.in/System-Design-Interview-Insiders-Colour/dp/9355427190';

const ConsistentHashing = () => {
    return (
        <ArticleLayout
            title="Consistent hashing"
            route={CONSISTENT_HASHING_ROUTE}
            sections={sections}
            references={[
                { title: 'System Design Interview – An Insider\'s Guide - Chapter 5', href: SYSTEM_DESIGN_INTERVIEW_BOOK },
            ]}
        >
            <section className="Article__section">

                <h2 className="SectionTitle">
                    Prerequisites
                </h2>

                <ul className="Article__notes">
                    <li>Horizontal Scaling</li>
                    <li>Hashing</li>
                    <li>Concept of keys in data (Primary key etc)</li>
                </ul>


            </section>

            <p>
                Though this concept is explained and used in context of distributing data/requests in a cluster of servers, but this concept can be applied to other cases in which we want to distribute the load, data ownership, requests etc.
            </p>

            <section className="Article__section" aria-labelledby="rehashing-problem">
                <h2 id="rehashing-problem" className="SectionTitle">
                    Simple Hash Based Distribution (brief)
                </h2>
                <p>
                    Every piece of data would have a key, and therefore every request would have the key too (as each request would be about a particular piece of data).
                </p>

                <ul className="Article__notes">
                    <li>Assign numbers from 0 to N-1 to each server, where N is the number of servers as 0, 1, 2, ..., N-1.</li>
                    <li>Choose a hash function. This funtion would remain fixed for all the requests.</li>
                    <li>The key is hashed to get a number.</li>
                    <li>The number is then divided by the number of servers and the remainder is the server number, to which the data/request belongs.</li>
                </ul>
                
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
                                <th scope="col">Cluster with 4 servers</th>
                                <th scope="col">Cluster with 5 servers</th>
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
                    The example demonstrates how adding one server to the cluster causes most of the keys to be reassigned to different servers.
                </p>
                <p>
                    The noticeable observation is a lot of keys, rather most of the keys need to be completely remapped/reassigned/copied/moved to different servers.
                </p>
                <p>
                    That is expensive, as based on the underlying infra a lot of things may require cascading updates. If the servers hold a cache, every moved key is a miss, and
                    the requests behind those misses hit the database at the same time.
                </p>
                <p>
                    By now you should be able to understand that the problem is remapping/reassignment/copying/moving a lot of keys.
                </p>
                <p>
                    This is the core issue that consistent hashing aims to address. It does not eleminate the need for remapping/reassignment/copying/moving of keys entirely, but reduces it to a great extent.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="hash-space">
                <h2 id="hash-space" className="SectionTitle">
                    The hash space
                </h2>
                <p>
                    Take a hash function. For now lets consider that we choose a hash function that produces values from 0 to 999.
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
                <HashRing
                    max={HASH_SPACE_MAX}
                    ticks={HASH_SPACE_TICKS}
                    caption="Values 0 to 999 arranged as a circle. 999 sits next to 0."
                />
                <p>
                    Each point on the ring from 0 to 999 represents a possible position for the server.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="node-placement">
                <h2 id="node-placement" className="SectionTitle">
                    Placing nodes on the ring
                </h2>
                <p>
                    Say you have three servers. Give them unique identifiers like server-A, server-B and
                    server-C. Hash the identifiers and each output value is the position of the server on the ring.
                </p>
                <pre className="Article__code">
                    <code>{serverHashes}</code>
                </pre>
                <HashRing
                    max={HASH_SPACE_MAX}
                    ticks={HASH_SPACE_TICKS}
                    nodes={serverNodes}
                    caption="Each server's identifier hashes to a position on the ring."
                />
                <p>
                    I hope you know that hashing the same identifier always gives the same ouput value.
                </p>
            </section>

            <section className="Article__section" aria-labelledby="node-lookup">
                <h2 id="node-lookup" className="SectionTitle">
                    Finding the right server for a key
                </h2>
                <p>
                    When a request comes about a piece of data, using the same hash function on the key gives a position on the ring. The server responsible for that key is the first one clockwise from that position.
                </p>
                <p>
                    For example: hash("k1") gives 87, so the first server clockwise from 87 is server A at 137. So the key "k1" is belongs to server A.
                </p>
                <p>
                    I hope that you unnderstand that there would not be any physical ring, or nodes would be physically placed in some circle. The servers are labelled and the cluster is conceptually given a topology of a ring. Its just a mental model to understand and visualise the concept of consistent hashing.
                </p>
                <p>
                    Below is some poor written code, but will give you a decent idea about how to naively implement the logic for finding the right server for a key.
                </p>
                <pre className="Article__code">
                    <code>{nodeLookupPseudocode}</code>
                </pre>

                <p>
                    If you read the code, you can understand that how easy it is to implement the consistent hashing logic for finding the right server for a key. You do not need any fancy data structure. A sorted array is enough.
                </p>
                <p>
                    There are more complex algos too for consistent hashing, which are beyond the scope of this blog post. You can search online if you are interested in learning more about them.
                </p>

                <p>
                    In consistent hashing, when a server is added or removed, only a small fraction of keys, actually k/n keys (on average) are remapped/reassigned/copied/moved, where k is the total number of keys altogether across all servers and n is the range of the hash space.
                </p>

                <p>
                    For example, if we have 1000000 keys and the hash space is 0 to 999, then on average 1000000/1000 = 1000 keys need to be remapped/reassigned/copied/moved.
                </p>
                <p>
                    Notice that n is not the number of servers, but the range of the hash space, and the k/n remapping statistic is on average. 
                </p>

                <p>
                    Take the same three servers, server A, server B and server C at 137, 582 and 814. Server B owns every key hash between server A and itself, highlighted below.
                </p>
                <HashRing
                    max={HASH_SPACE_MAX}
                    ticks={HASH_SPACE_TICKS}
                    nodes={serverNodes}
                    highlightArc={{ from: 137, to: 582 }}
                    caption="Before adding a server: server B owns every key hash from 138 to 582."
                />
                <p>
                    Now add a fourth server, server D, hashing to 400. Server D sits between server A and server B, so it only takes over the slice of server B's range that lies between 137 and 400. Server B keeps the rest of its range, and servers A and C are not affected at all.
                </p>
                <HashRing
                    max={HASH_SPACE_MAX}
                    ticks={HASH_SPACE_TICKS}
                    nodes={afterAddingServerNodes}
                    highlightArc={{ from: 137, to: 400 }}
                    caption="After adding server D at 400: only the highlighted keys, from 138 to 400, move from server B to server D."
                />
            </section>

            <section className="Article__section" aria-labelledby="uneven-distribution">
                <h2 id="uneven-distribution" className="SectionTitle">
                    Uneven distribution problem
                </h2>
                <p>
                    Hashing may place server positions close to each other on the ring. That clusters the servers instead of spreading them out, so the keys would not be distributed evenly.
                </p>
                <p>
                    For example, take the same three servers, server A, server B and server C. Let's say the hash function, with range 0 to 999, produces 100, 200 and 300 for the three servers.
                </p>
                <HashRing
                    max={HASH_SPACE_MAX}
                    ticks={HASH_SPACE_TICKS}
                    nodes={clusteredServerNodes}
                    caption="Servers clustered together at 100, 200 and 300, leaving the rest of the ring empty."
                />
                <p>
                    This is solved by using virtual nodes.
                </p>
                <p>
                    So, instead of assigning one identifier to each server, we assign multiple identifiers to each server. For server A, we can have server A1, server A2, server A3, and same for other servers.
                </p>
                <p>
                    Now, when we hash the identifiers, its more likely that the servers would be distributed more evenly.
                </p>
                <HashRing
                    max={HASH_SPACE_MAX}
                    ticks={HASH_SPACE_TICKS}
                    nodes={virtualNodeSpread}
                    caption="Servers A, B and C at 100, 200 and 300, each with three virtual nodes spread around the ring."
                />
                <p>
                    Server A now owns the key hashes for A1, A2 and A3, and the same holds for servers B and C.
                </p>
                <p>
                    The nodes which are conceptually present on the ring in multiple positions are called virtual nodes. So, A1, A2, and A3 are virtual nodes for server A.
                </p>
            </section>

        </ArticleLayout>
    );
};

export default ConsistentHashing;
