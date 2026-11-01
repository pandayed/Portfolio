// Navigation only. Existing page documents and their routes remain unchanged.
export interface SystemDesignOutlineNode {
    pageId?: string;
    title?: string;
    route?: string;
    children?: SystemDesignOutlineNode[];
}

export const architectureOutline: SystemDesignOutlineNode[] = [
    {
        title: 'Foundations',
        route: '/notes/system-design/foundations',
        children: [
            // What & Why?
            {
                pageId: '24d24eb1ed5480f296baeb029d6cf3f4',
            },
            // The Core Components of A System
            {
                pageId: '24e24eb1ed5480a3b405efa514a553ab',
            },
            // Servers
            {
                pageId: '24f24eb1ed54806a8dffdc09fbd00b29',
            },
            // Latency & Throughput
            {
                pageId: '25424eb1ed5480c9ae57fd6349829dab',
            },
            // Latency Numbers
            {
                pageId: '33324eb1ed548051a8e0e2ba13e04565',
            },
            // BoE: Back of the Envelope Estimation
            {
                pageId: '24f24eb1ed548087ad55cb058db6fbe8',
            },
            // Statefulness vs Statelessness
            {
                pageId: '29424eb1ed5480fe9face77fde2a51b4',
            },
        ],
    },
    // Distributed Systems
    {
        pageId: '26524eb1ed548063b5bee98feef734e1',
        children: [
            {
                title: 'Consistency & Trade-offs',
                route: '/notes/system-design/consistency-and-trade-offs',
                children: [
                    // Consistency: Definitions Based on Context
                    {
                        pageId: '26824eb1ed5480da91f3c623df4ea23d',
                    },
                    // Data Consistency
                    {
                        pageId: '26824eb1ed5480948347d10941fabac4',
                    },
                    // CAP Theorem
                    {
                        pageId: '24d24eb1ed5480499a2fe0f2032afd7a',
                    },
                    // PACELC Theorem
                    {
                        pageId: '26824eb1ed5480bc813bdc099fe7b892',
                    },
                    // BASE Model
                    {
                        pageId: '27a24eb1ed5480fc81c2cde652ff2938',
                    },
                ],
            },
            {
                title: 'Replication & Distributed Writes',
                route: '/notes/system-design/replication-and-distributed-writes',
                children: [
                    // Writes in a Distributed System
                    {
                        pageId: '26c24eb1ed5480938e1dd8c670d8c813',
                    },
                    // Synchronous Writes in Distributed System for Strong Consistency
                    {
                        pageId: '26c24eb1ed5480a792f7e9f0279fd609',
                    },
                ],
            },
            {
                title: 'Coordination & Agreement',
                route: '/notes/system-design/coordination-and-agreement',
                children: [
                    // Two Generals’ Problem
                    {
                        pageId: '26c24eb1ed54803ab1f7efc05646d87e',
                    },
                ],
            },
            {
                title: 'Distributed Transactions',
                route: '/notes/system-design/distributed-transactions',
                children: [
                    // Two Phase Commit (2PC)
                    {
                        pageId: '26c24eb1ed5480f1a65ecb09e8303e62',
                    },
                    // SAGA Design Pattern
                    {
                        pageId: '29024eb1ed548099a309fe43f0bc16c6',
                    },
                ],
            },
        ],
    },
    {
        title: 'Application Architecture',
        route: '/notes/system-design/application-architecture',
        children: [
            // Microservices
            {
                pageId: '29e24eb1ed54800e96ded1bdda790278',
            },
            // Architecture Patterns For Domain Heavy Systems
            {
                pageId: '30d24eb1ed54801b99e6fb8fd36bfcd9',
            },
        ],
    },
    {
        title: 'Communication & Messaging',
        route: '/notes/system-design/communication-and-messaging',
        children: [
            // API Architectural Styles
            {
                pageId: '24f24eb1ed5480598aabdf711d0761f8',
            },
            // REST
            {
                pageId: '32d24eb1ed5480a293f7e219d8d7231f',
            },
            // GraphQL
            {
                pageId: '30b24eb1ed548030bc66c7825de64981',
            },
            // Web Socket, Web Hook etc
            {
                pageId: '32f24eb1ed54807dbcacd0554f2ccf82',
            },
            // API Gateway
            {
                pageId: '27a24eb1ed54805e9270ec526332708d',
            },
            // Apache Kafka
            {
                pageId: '26524eb1ed5480988bd6d71c87e555a7',
            },
            // RabbitMQ
            {
                pageId: '2e824eb1ed5480eca2def2b63356ddac',
            },
            // RabbitMQ vs Apache Kafka
            {
                pageId: '2ec24eb1ed5480b9aaf5cf8f01b59cfa',
            },
            // fan out
            {
                pageId: '2e924eb1ed548071a752d0b44a719ae4',
            },
        ],
    },
    {
        title: 'Scaling & Performance',
        route: '/notes/system-design/scaling-and-performance',
        children: [
            // Scaling
            {
                pageId: '26f24eb1ed5480bdbd69fb1b0fe78253',
            },
            // Load Balancer
            {
                pageId: '24f24eb1ed5480de982fe549f2e323a4',
            },
            // Caches
            {
                pageId: '27c24eb1ed54800481aec012be8ff712',
            },
            // CDN
            {
                pageId: '25824eb1ed548008806bde6f10dc774b',
            },
            // Consistent Hashing
            {
                pageId: '32e24eb1ed5480f0b150f3d74858a9b5',
            },
            // Rate Limiting
            {
                pageId: '24f24eb1ed54805fbe53e3fb6c76b7f1',
            },
            // Common Algorithms
            {
                pageId: '29024eb1ed5480468a8ee50b18d8a39a',
            },
        ],
    },
    {
        title: 'Data & Storage',
        route: '/notes/system-design/data-and-storage',
        children: [
            // Databases
            {
                pageId: '24d24eb1ed548054bd55d5db65a2f091',
            },
            // Transactions & ACID Properties
            {
                pageId: '26424eb1ed54802894ffe6334761df9d',
            },
            // Persistent & Transient Data
            {
                pageId: '2e824eb1ed54801797fee17b2dc1b2d0',
            },
            // Object Storage vs File Storage vs Block Storage
            {
                pageId: '7c8d21a460fa4be1a98fe6723bd950cc',
            },
            // Redis
            {
                pageId: '2a524eb1ed548006bf00e2ba3ff4157f',
            },
            // Elastic Search
            {
                pageId: '27724eb1ed548038ae2bf2010cedaa8b',
            },
        ],
    },
    {
        title: 'Reliability & Failure Handling',
        route: '/notes/system-design/reliability-and-failure-handling',
        children: [
            // Exponential Backoff Strategy
            {
                pageId: '30624eb1ed5480a9af1ce93d818aff43',
            },
            // Dead Letter Queue
            {
                pageId: '30124eb1ed5480e999dff56c7a3fc5f4',
            },
        ],
    },
    {
        title: 'Networking & Security',
        route: '/notes/system-design/networking-and-security',
        children: [
            // DNS: Domain Name System
            {
                pageId: '33324eb1ed5480fb87fed53925654965',
            },
            // TCP
            {
                pageId: '25824eb1ed5480afaf41d09b724bcf5a',
            },
            // QUIC
            {
                pageId: '25824eb1ed5480b9ba9ee47f0aaeeda1',
            },
            // Anycast
            {
                pageId: '25e24eb1ed5480f5b3fded23fab67c82',
            },
            // Decoding URLs
            {
                pageId: '31024eb1ed5480f0979dc84675671367',
            },
            // What happens when you type https://google.com
            {
                pageId: '31024eb1ed5480fcbfc3c0b9cd02be95',
            },
            // Proxy: Forward & Reverse
            {
                pageId: '29324eb1ed548061ae33ed3068afaac4',
            },
            // Reverse Proxy VS API Gateway VS Load Balancer
            {
                pageId: '29324eb1ed54809cba1adc5094c49f46',
            },
            // nginx
            {
                pageId: '25f24eb1ed5480feaf29c47f6f10e5e6',
            },
            // TLS
            {
                pageId: '29e24eb1ed548032bc62c7db7ed9fc6d',
            },
            // Certificates
            {
                pageId: '28224eb1ed5480098d3ed3638436dfc7',
            },
            // SSO
            {
                pageId: '32024eb1ed5480eca209ee3345dd30c8',
            },
            // SAML
            {
                pageId: '32024eb1ed5480bbb1d2e887e7ed8694',
            },
        ],
    },
    {
        title: 'Design Examples',
        route: '/notes/system-design/design-examples',
        children: [
            // Designing A Notification System
            {
                pageId: '30124eb1ed548080bbeae1faffb9723c',
            },
        ],
    },
    {
        title: 'Resources & Unsorted Notes',
        route: '/notes/system-design/resources-and-unsorted-notes',
        children: [
            // Resources
            {
                pageId: '26124eb1ed54808593c6e8661e414325',
            },
            // Ungrouped
            {
                pageId: '29e24eb1ed548064ae18dd527c9d97e8',
            },
        ],
    },
];

export const cloudOutline: SystemDesignOutlineNode[] = [
    // Cloud Native
    {
        pageId: '33324eb1ed5480bd90f4dc0b5c030205',
    },
    // Bare Metals, Virtual Machines & Containers
    {
        pageId: '33124eb1ed5480498f70e7010ffc7c92',
    },
    // Docker
    {
        pageId: '30624eb1ed5480358019debee2687837',
    },
    // Why On-Premises?
    {
        pageId: '24f24eb1ed5480e6846efc40b7a5e198',
    },
];

export const softwareDesignOutline: SystemDesignOutlineNode[] = [
    // OOPs
    {
        pageId: '35124eb1ed548058b8c7f997cf09f08b',
    },
    // Design Principles
    {
        pageId: '26324eb1ed5480d0b07ff7cdd25a9645',
    },
    // Dependency Injection and Inversion
    {
        pageId: '31124eb1ed5480579b03c0fe7cc40927',
    },
    // Inversion Of Control
    {
        pageId: '31224eb1ed548045a677d69154f6b993',
    },
    // The 23 Design Patterns
    {
        pageId: '31524eb1ed5480f79523d2b2c9902d1d',
    },
    {
        title: 'Concurrency',
        route: '/notes/software-design/concurrency',
        children: [
            // Concurrency
            {
                pageId: '34f24eb1ed5480119e1ecc317ca13b28',
            },
            // Concurrency vs Parallelism
            {
                pageId: '25824eb1ed5480be96b5f100ebcbfea4',
            },
            // Conditional Variables
            {
                pageId: '34f24eb1ed54801990cfe7aa757be3b7',
            },
            // Blocking Queues
            {
                pageId: '34f24eb1ed5480499f98db158827527c',
            },
        ],
    },
];

const collectGroupRoutes = (nodes: SystemDesignOutlineNode[]): string[] =>
    nodes.flatMap((node) => [
        ...(node.route ? [node.route] : []),
        ...collectGroupRoutes(node.children ?? []),
    ]);

export const outlineGroupRoutes: string[] = collectGroupRoutes([
    ...architectureOutline,
    ...cloudOutline,
    ...softwareDesignOutline,
]);

const collectPageGroups = (nodes: SystemDesignOutlineNode[]): string[] =>
    nodes.flatMap((node) => [
        ...(node.pageId && node.children ? [node.pageId] : []),
        ...collectPageGroups(node.children ?? []),
    ]);

export const outlinePageGroupIds = new Set(collectPageGroups([
    ...architectureOutline,
    ...cloudOutline,
    ...softwareDesignOutline,
]));
