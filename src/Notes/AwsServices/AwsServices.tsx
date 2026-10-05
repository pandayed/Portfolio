import ArticleLayout from '../NoteArticleLayout';
import { AWS_SERVICES_ROUTE, NOTES_ROUTE } from '../../routing/routes';

interface AwsService {
    id: string;
    name: string;
    type: string;
    href: string;
    points: readonly [string, string, string];
}

const services: readonly AwsService[] = [
    {
        id: 's3', name: 'Amazon S3', type: 'Object storage', href: 'https://aws.amazon.com/s3/',
        points: [
            'Stores files as objects, such as images, backups, and logs.',
            'A bucket is a named container for objects.',
            'Apps upload and download objects through an API.',
        ],
    },
    {
        id: 'ec2', name: 'Amazon EC2', type: 'Virtual servers', href: 'https://aws.amazon.com/ec2/',
        points: [
            'Provides virtual servers called instances.',
            'Use it to run websites, APIs, or other software.',
            'You choose the operating system, CPU, and memory. You manage the software on the server.',
        ],
    },
    {
        id: 'iam', name: 'AWS IAM', type: 'Access control', href: 'https://aws.amazon.com/iam/',
        points: [
            'Identity and Access Management controls who can access AWS resources.',
            'A policy lists the actions an identity may perform on resources.',
            'A person or app can use a role to get temporary credentials, which let it access permitted resources.',
        ],
    },
    {
        id: 'vpc', name: 'Amazon VPC', type: 'Virtual network', href: 'https://aws.amazon.com/vpc/',
        points: [
            'A Virtual Private Cloud is an isolated network for your AWS resources.',
            'You choose IP address ranges and subnets. A subnet is a smaller part of the network.',
            'Routes and security rules control how resources communicate with each other and the internet.',
        ],
    },
    {
        id: 'lambda', name: 'AWS Lambda', type: 'Serverless functions', href: 'https://aws.amazon.com/lambda/',
        points: [
            'Runs functions without making you manage servers. This approach is called serverless.',
            'A request or event can start a function, such as an API call or an S3 upload.',
            'Use it for API handlers, file processing, and short background tasks.',
        ],
    },
    {
        id: 'rds', name: 'Amazon RDS', type: 'Relational database service', href: 'https://aws.amazon.com/rds/',
        points: [
            'Runs relational databases, which store data in tables with rows and columns.',
            'Supports engines such as PostgreSQL and MySQL. Apps query them with SQL.',
            'AWS manages database server tasks such as setup, backups, and software patching.',
        ],
    },
    {
        id: 'cloudwatch', name: 'Amazon CloudWatch', type: 'Monitoring', href: 'https://aws.amazon.com/cloudwatch/',
        points: [
            'Collects logs and metrics. A metric is a measurement, such as CPU usage or request count.',
            'Use dashboards to view application and resource health.',
            'Alarms can notify you or trigger an action when a measurement crosses a threshold.',
        ],
    },
    {
        id: 'dynamodb', name: 'Amazon DynamoDB', type: 'NoSQL database', href: 'https://aws.amazon.com/dynamodb/',
        points: [
            'Stores key-value and document data. A key identifies an item, and a document holds named fields.',
            'Use it for application data such as user profiles, shopping carts, or game state.',
            'AWS manages the database infrastructure. You design keys around how the app reads data.',
        ],
    },
    {
        id: 'elb', name: 'Elastic Load Balancing (ELB)', type: 'Load balancing', href: 'https://aws.amazon.com/elasticloadbalancing/',
        points: [
            'Distributes incoming traffic across multiple servers or other targets.',
            'Health checks let it send traffic to healthy targets.',
            'An Application Load Balancer handles HTTP requests. A Network Load Balancer handles network connections.',
        ],
    },
    {
        id: 'route-53', name: 'Amazon Route 53', type: 'DNS', href: 'https://aws.amazon.com/route53/',
        points: [
            'Provides DNS, the system that connects domain names to addresses and services.',
            'Use it to direct a domain such as example.com to your application.',
            'Also supports domain registration and health checks.',
        ],
    },
    {
        id: 'cloudfront', name: 'Amazon CloudFront', type: 'Content delivery network', href: 'https://aws.amazon.com/cloudfront/',
        points: [
            'A content delivery network serves content from locations closer to users.',
            'Caches content such as images, scripts, and videos to reduce repeated requests to your server.',
            'Can serve content from S3, a load balancer, or another web server.',
        ],
    },
    {
        id: 'sqs', name: 'Amazon SQS', type: 'Message queue', href: 'https://aws.amazon.com/sqs/',
        points: [
            'Simple Queue Service stores messages until an application reads and processes them.',
            'Use it for background work, such as processing an order after an API accepts it.',
            'Standard queues can deliver a message more than once. Write workers that handle repeat messages safely.',
        ],
    },
    {
        id: 'sns', name: 'Amazon SNS', type: 'Publish/subscribe messaging', href: 'https://aws.amazon.com/sns/',
        points: [
            'Simple Notification Service sends a published message to subscribers of a topic.',
            'Use it when several services need the same notification, such as an order-created message.',
            'Subscribers can include SQS queues, Lambda functions, and email addresses.',
        ],
    },
    {
        id: 'ecs', name: 'Amazon ECS', type: 'Container orchestration', href: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html',
        points: [
            'Elastic Container Service deploys and manages containers. A container runs an app with its dependencies.',
            'Use it for container applications and background jobs.',
            'Run containers on EC2 servers or use Fargate to avoid managing servers.',
        ],
    },
    {
        id: 'fargate', name: 'AWS Fargate', type: 'Serverless container compute', href: 'https://aws.amazon.com/fargate/features/',
        points: [
            'Provides compute resources for containers without making you manage servers.',
            'Works with ECS and EKS.',
            'You specify CPU and memory needs. AWS manages the servers that run the containers.',
        ],
    },
    {
        id: 'ecr', name: 'Amazon ECR', type: 'Container image registry', href: 'https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html',
        points: [
            'Elastic Container Registry stores container images, the packages used to create containers.',
            'A deployment downloads an image from the registry before running it.',
            'IAM permissions control access to private image repositories.',
        ],
    },
    {
        id: 'eks', name: 'Amazon EKS', type: 'Managed Kubernetes', href: 'https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html',
        points: [
            'Elastic Kubernetes Service runs Kubernetes, a system that deploys and manages containers.',
            'Use it for applications that need Kubernetes tools and APIs.',
            'AWS manages the control plane, which coordinates the cluster. Server management depends on your compute option.',
        ],
    },
    {
        id: 'ebs', name: 'Amazon EBS', type: 'Block storage', href: 'https://aws.amazon.com/ebs/',
        points: [
            'Elastic Block Store provides storage volumes that EC2 servers use as disks.',
            'Use it for operating systems, installed software, and database files.',
            'Snapshots save a copy of a volume so you can restore it later.',
        ],
    },
    {
        id: 'efs', name: 'Amazon EFS', type: 'Shared file storage', href: 'https://aws.amazon.com/efs/',
        points: [
            'Elastic File System provides a shared file system for Linux workloads.',
            'Several servers or containers can access the same files.',
            'Storage grows and shrinks as you add and remove files.',
        ],
    },
    {
        id: 'aurora', name: 'Amazon Aurora', type: 'Relational database', href: 'https://aws.amazon.com/rds/aurora/',
        points: [
            'An AWS-built database engine compatible with MySQL or PostgreSQL.',
            'Runs under RDS and uses SQL to store and query application data.',
            'Separates database compute from shared storage that copies data across multiple data center zones.',
        ],
    },
    {
        id: 'elasticache', name: 'Amazon ElastiCache', type: 'In-memory cache', href: 'https://aws.amazon.com/elasticache/',
        points: [
            'Stores data in memory for fast access. A cache keeps data that an app may need again.',
            'Use it for session data, frequently read results, or counters.',
            'Caching results can reduce repeated reads from your main database.',
        ],
    },
    {
        id: 'api-gateway', name: 'Amazon API Gateway', type: 'API management', href: 'https://aws.amazon.com/api-gateway/',
        points: [
            'Creates API endpoints that clients call to reach your backend.',
            'Can pass requests to Lambda functions or HTTP services.',
            'Supports access checks, request limits, and monitoring.',
        ],
    },
    {
        id: 'eventbridge', name: 'Amazon EventBridge', type: 'Event routing', href: 'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html',
        points: [
            'Routes events between applications and services. An event reports something that happened.',
            'Filters select events and send them to targets such as Lambda or SQS.',
            'Use it to react to application events or changes in AWS resources.',
        ],
    },
    {
        id: 'cloudtrail', name: 'AWS CloudTrail', type: 'Activity auditing', href: 'https://aws.amazon.com/cloudtrail/',
        points: [
            'Records activity in your AWS account, including many API calls.',
            'Shows details such as who made a call, when it happened, and which resource it affected.',
            'Use it to investigate access and resource changes. CloudWatch focuses on logs, metrics, and operational health.',
        ],
    },
    {
        id: 'kms', name: 'AWS KMS', type: 'Encryption key management', href: 'https://aws.amazon.com/kms/',
        points: [
            'Key Management Service creates and controls encryption keys used to protect data.',
            'AWS services such as S3 and RDS can use these keys to encrypt stored data.',
            'Permissions control who can use or manage a key.',
        ],
    },
    {
        id: 'secrets-manager', name: 'AWS Secrets Manager', type: 'Secret storage', href: 'https://aws.amazon.com/secrets-manager/',
        points: [
            'Stores secrets such as database passwords and API keys.',
            'An application retrieves a secret when it needs it instead of putting it in source code.',
            'Can rotate secrets, which means replacing them with new values, when rotation is configured.',
        ],
    },
    {
        id: 'cloudformation', name: 'AWS CloudFormation', type: 'Infrastructure as code', href: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-overview.html',
        points: [
            'Creates and manages AWS resources described in a file. This is called infrastructure as code.',
            'A JSON or YAML template describes resources such as servers, databases, and queues.',
            'Manages related resources together as a stack so you can create or update them together.',
        ],
    },
    {
        id: 'cognito', name: 'Amazon Cognito', type: 'Application user identity', href: 'https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html',
        points: [
            'Adds user sign-up and sign-in to web and mobile applications.',
            'User pools manage application users and their sign-in.',
            'Identity pools can give users temporary credentials to access permitted AWS resources.',
        ],
    },
    {
        id: 'step-functions', name: 'AWS Step Functions', type: 'Workflow coordination', href: 'https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html',
        points: [
            'Connects tasks into a workflow, a sequence of work with decisions and waits.',
            'Coordinates Lambda functions, AWS services, and data processing jobs.',
            'A state machine describes the steps and what happens when each step succeeds or fails.',
        ],
    },
    {
        id: 'athena', name: 'Amazon Athena', type: 'SQL query service', href: 'https://docs.aws.amazon.com/athena/latest/ug/what-is.html',
        points: [
            'Runs SQL queries on data such as files stored in S3.',
            'Use it to analyze logs or CSV files without loading them into a separate database first.',
            'AWS manages the query infrastructure. You do not create a database server.',
        ],
    },
    {
        id: 'glue', name: 'AWS Glue', type: 'Data integration', href: 'https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html',
        points: [
            'Moves and prepares data for analysis.',
            'Runs ETL jobs. ETL means extract data, transform it, and load it into a destination.',
            'Its Data Catalog stores dataset information, such as columns and data types, for tools such as Athena.',
        ],
    },
    {
        id: 'redshift', name: 'Amazon Redshift', type: 'Data warehouse', href: 'https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html',
        points: [
            'A data warehouse stores data for analysis and reporting.',
            'Use SQL to analyze large datasets, such as sales records collected from several systems.',
            'Choose a provisioned cluster, where you select compute capacity, or Redshift Serverless.',
        ],
    },
    {
        id: 'kinesis', name: 'Amazon Kinesis Data Streams', type: 'Data streaming', href: 'https://docs.aws.amazon.com/streams/latest/dev/introduction.html',
        points: [
            'Collects a continuous stream of data, such as website clicks, logs, or sensor readings.',
            'Applications read and process records as they arrive.',
            'Several applications can read the same stream independently.',
        ],
    },
    {
        id: 'bedrock', name: 'Amazon Bedrock', type: 'Generative AI', href: 'https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html',
        points: [
            'Provides access to foundation models through APIs. These AI models are trained on large datasets.',
            'Use it for applications that generate text, answer questions, or summarize documents.',
            'AWS hosts the models. You can build an application without training a model from the start.',
        ],
    },
    {
        id: 'sagemaker-ai', name: 'Amazon SageMaker AI', type: 'Machine learning', href: 'https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html',
        points: [
            'Provides tools to build, train, and deploy machine learning models.',
            'Use it when you need to train or customize a model with your own data.',
            'AWS manages the infrastructure for training jobs and hosted model deployment.',
        ],
    },
];

const sections = services.map(({ id, name }, index) => ({
    id: `aws-service-${id}`,
    title: `${index + 1}. ${name}`,
}));

const AwsServices = () => (
    <ArticleLayout
        title="AWS services"
        route={AWS_SERVICES_ROUTE}
        sections={sections}
        backRoute={NOTES_ROUTE}
        backLabel="Back to notes"
    >
        <section className="Article__section">
            <p>
                Ordered roughly by common use and discussion in application development, with
                broadly used services first. This is an approximate order, not a measured usage ranking.
                Service names link to official AWS information.
            </p>
        </section>
        {services.map((service, index) => (
            <section className="Article__section" aria-labelledby={`aws-service-${service.id}`} key={service.id}>
                <h2 id={`aws-service-${service.id}`} className="SectionTitle">
                    {index + 1}. <a className="Link" href={service.href}>{service.name}</a> ({service.type})
                </h2>
                <ul className="Article__notes">
                    {service.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
            </section>
        ))}
    </ArticleLayout>
);

export default AwsServices;
