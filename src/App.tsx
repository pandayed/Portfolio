import './App.css';
import './CommonClasses/CommonClasses.css';

import { lazy, Suspense } from 'react';

import Header from './Header/Header';
import Home from './Home/Home';
import Blogs from './Blogs/Blogs';
import Notes from './Notes/Notes';
import PostgreSQLNotes from './Notes/PostgreSQLNotes';
import PostgreSQLOneShotSQL from './Notes/PostgreSQLOneShotSQL/PostgreSQLOneShotSQL';
import GoNotes from './Notes/GoNotes';
import GoNote from './Notes/GoNotes/GoNote';
import SystemDesignNotes from './Notes/SystemDesign/SystemDesignNotes';
import PythonNotes from './Notes/PythonNotes/PythonNotesIndex';
import PythonNote from './Notes/PythonNotes/PythonNote';
import JavaScriptTypeScriptNotesIndex from './Notes/JavaScriptTypeScriptNotes/JavaScriptTypeScriptNotesIndex';
import JavaScriptTypeScriptNote from './Notes/JavaScriptTypeScriptNotes/JavaScriptTypeScriptNote';
import ReactNotesIndex from './Notes/ReactNotes/ReactNotesIndex';
import ReactNote from './Notes/ReactNotes/ReactNote';
import DockerNotesIndex from './Notes/DockerNotes/DockerNotesIndex';
import DockerContainers from './Notes/DockerNotes/DockerContainers';
import DockerBuildRun from './Notes/DockerNotes/DockerBuildRun';
import DockerNetworkStorage from './Notes/DockerNotes/DockerNetworkStorage';
import DockerComposeWorkflow from './Notes/DockerNotes/DockerComposeWorkflow';
import KubernetesNotesIndex from './Notes/KubernetesNotes/KubernetesNotesIndex';
import KubernetesCluster from './Notes/KubernetesNotes/KubernetesCluster';
import KubernetesDeploymentsServices from './Notes/KubernetesNotes/KubernetesDeploymentsServices';
import KubernetesConfigurationStorage from './Notes/KubernetesNotes/KubernetesConfigurationStorage';
import KubernetesOperations from './Notes/KubernetesNotes/KubernetesOperations';
import ProgrammingDictionary from './Notes/ProgrammingDictionary/ProgrammingDictionaryPage';
import JavaNotesIndex from './Notes/JavaNotes/JavaNotesIndex';
import JavaProgramExecution from './Notes/JavaNotes/JavaProgramExecution';
import SpringBootNotesIndex from './Notes/SpringBootNotes/SpringBootNotesIndex';
import SpringBootFirstApplication from './Notes/SpringBootNotes/SpringBootFirstApplication';
import SpringBootAnnotations from './Notes/SpringBootNotes/SpringBootAnnotations';
import Drafts from './Blogs/Drafts';
import Archive from './Blogs/Archive';
import CppComplexity from './Blogs/CppComplexity/CppComplexity';
import ComplexityCases from './Blogs/ComplexityCases/ComplexityCases';
import SqlVsMySql from './Blogs/SqlVsMySql/SqlVsMySql';
import SslTls from './Blogs/SslTls/SslTls';
import AiObedience from './Blogs/AiObedience/AiObedience';
import SieveOfEratosthenes from './Blogs/SieveOfEratosthenes/SieveOfEratosthenes';
import ConsistentHashing from './Blogs/ConsistentHashing/ConsistentHashing';
import WhyReact from './Blogs/WhyReact/WhyReact';
import ChainOfThought from './Blogs/ChainOfThought/ChainOfThought';
import WritingBetterPlanNSkills from './Blogs/WritingBetterPlanNSkills/WritingBetterPlanNSkills';
import PostgreSQLGroupBy from './Notes/PostgreSQLGroupBy/PostgreSQLGroupBy';
import PostgreSQLJoins from './Notes/PostgreSQLJoins/PostgreSQLJoins';
import PostgreSQLRatios from './Notes/PostgreSQLRatios/PostgreSQLRatios';
import PostgreSQLWindowFunctions from './Notes/PostgreSQLWindowFunctions/PostgreSQLWindowFunctions';
import PostgreSQLMaths from './Notes/PostgreSQLMaths/PostgreSQLMaths';
import PostgreSQLDateTime from './Notes/PostgreSQLDateTime/PostgreSQLDateTime';
import ScalarInPostgreSQL from './Notes/ScalarInPostgreSQL/ScalarInPostgreSQL';
import ApiCommunication from './Notes/ApiCommunication/ApiCommunication';
import JavaScriptAsync from './Notes/JavaScriptAsync/JavaScriptAsync';
import JavaScriptEventLoop from './Notes/JavaScriptEventLoop/JavaScriptEventLoop';
import Projects from './Projects/Projects';
import PrivacyPolicy from './Instead/PrivacyPolicy';
import Bookshelf from './Bookshelf/Bookshelf';
import About from './About/About';
import Footer from './Footer/Footer';

import {
    ABOUT_ROUTE,
    API_COMMUNICATION_ROUTE,
    AI_OBEDIENCE_ROUTE,
    ARCHIVE_ROUTE,
    BLOGS_ROUTE,
    BOOKSHELF_ROUTE,
    CHAIN_OF_THOUGHT_ROUTE,
    COMPLEXITY_CASES_ROUTE,
    CONSISTENT_HASHING_ROUTE,
    CPP_COMPLEXITY_ROUTE,
    DRAFTS_ROUTE,
    DOCKER_BUILD_RUN_ROUTE,
    DOCKER_COMPOSE_ROUTE,
    DOCKER_CONTAINERS_ROUTE,
    DOCKER_NETWORK_STORAGE_ROUTE,
    DOCKER_NOTES_ROUTE,
    GO_NOTES_ROUTE,
    SYSTEM_DESIGN_ROUTE,
    PYTHON_NOTES_ROUTE,
    PROGRAMMING_DICTIONARY_ROUTE,
    JAVA_NOTES_ROUTE,
    JAVA_PROGRAM_EXECUTION_ROUTE,
    SPRING_BOOT_NOTES_ROUTE,
    SPRING_BOOT_FIRST_APPLICATION_ROUTE,
    SPRING_BOOT_ANNOTATIONS_ROUTE,
    HOME_ROUTE,
    INSTEAD_PRIVACY_POLICY_ROUTE,
    JAVASCRIPT_ASYNC_ROUTE,
    JAVASCRIPT_EVENT_LOOP_ROUTE,
    JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
    KUBERNETES_CLUSTER_ROUTE,
    KUBERNETES_CONFIG_ROUTE,
    KUBERNETES_DEPLOY_ROUTE,
    KUBERNETES_NOTES_ROUTE,
    KUBERNETES_OPERATIONS_ROUTE,
    POSTGRESQL_GROUP_BY_ROUTE,
    POSTGRESQL_JOINS_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_ONE_SHOT_SQL_ROUTE,
    POSTGRESQL_RATIOS_ROUTE,
    POSTGRESQL_WINDOW_FUNCTIONS_ROUTE,
    POSTGRESQL_MATHS_ROUTE,
    POSTGRESQL_DATE_TIME_ROUTE,
    NOTES_ROUTE,
    PROJECTS_ROUTE,
    REACT_NOTES_ROUTE,
    SCALAR_IN_POSTGRESQL_ROUTE,
    SIEVE_OF_ERATOSTHENES_ROUTE,
    SQL_VS_MYSQL_ROUTE,
    SSL_TLS_ROUTE,
    WHY_REACT_ROUTE,
    WRITING_BETTER_PLANS_AND_SKILLS_ROUTE,
    type GoNoteRoute,
    type JavaScriptTypeScriptNoteRoute,
    type SystemDesignEntryRoute,
    type PythonNoteRoute,
    type ReactNoteRoute,
    type Route,
} from './routing/routes';
import { useRoute } from './routing/useRoute';

const SystemDesignEntry = lazy(() => import('./Notes/SystemDesign/SystemDesignEntry'));

const pages: Partial<Record<Route, () => JSX.Element>> = {
    [HOME_ROUTE]: Home,
    [BLOGS_ROUTE]: Blogs,
    [NOTES_ROUTE]: Notes,
    [POSTGRESQL_NOTES_ROUTE]: PostgreSQLNotes,
    [POSTGRESQL_ONE_SHOT_SQL_ROUTE]: PostgreSQLOneShotSQL,
    [GO_NOTES_ROUTE]: GoNotes,
    [SYSTEM_DESIGN_ROUTE]: SystemDesignNotes,
    [PYTHON_NOTES_ROUTE]: PythonNotes,
    [JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE]: JavaScriptTypeScriptNotesIndex,
    [REACT_NOTES_ROUTE]: ReactNotesIndex,
    [DOCKER_NOTES_ROUTE]: DockerNotesIndex,
    [DOCKER_CONTAINERS_ROUTE]: DockerContainers,
    [DOCKER_BUILD_RUN_ROUTE]: DockerBuildRun,
    [DOCKER_NETWORK_STORAGE_ROUTE]: DockerNetworkStorage,
    [DOCKER_COMPOSE_ROUTE]: DockerComposeWorkflow,
    [KUBERNETES_NOTES_ROUTE]: KubernetesNotesIndex,
    [KUBERNETES_CLUSTER_ROUTE]: KubernetesCluster,
    [KUBERNETES_DEPLOY_ROUTE]: KubernetesDeploymentsServices,
    [KUBERNETES_CONFIG_ROUTE]: KubernetesConfigurationStorage,
    [KUBERNETES_OPERATIONS_ROUTE]: KubernetesOperations,
    [PROGRAMMING_DICTIONARY_ROUTE]: ProgrammingDictionary,
    [JAVA_NOTES_ROUTE]: JavaNotesIndex,
    [JAVA_PROGRAM_EXECUTION_ROUTE]: JavaProgramExecution,
    [SPRING_BOOT_NOTES_ROUTE]: SpringBootNotesIndex,
    [SPRING_BOOT_FIRST_APPLICATION_ROUTE]: SpringBootFirstApplication,
    [SPRING_BOOT_ANNOTATIONS_ROUTE]: SpringBootAnnotations,
    [DRAFTS_ROUTE]: Drafts,
    [ARCHIVE_ROUTE]: Archive,
    [CPP_COMPLEXITY_ROUTE]: CppComplexity,
    [COMPLEXITY_CASES_ROUTE]: ComplexityCases,
    [SQL_VS_MYSQL_ROUTE]: SqlVsMySql,
    [SSL_TLS_ROUTE]: SslTls,
    [AI_OBEDIENCE_ROUTE]: AiObedience,
    [SIEVE_OF_ERATOSTHENES_ROUTE]: SieveOfEratosthenes,
    [CONSISTENT_HASHING_ROUTE]: ConsistentHashing,
    [WHY_REACT_ROUTE]: WhyReact,
    [CHAIN_OF_THOUGHT_ROUTE]: ChainOfThought,
    [WRITING_BETTER_PLANS_AND_SKILLS_ROUTE]: WritingBetterPlanNSkills,
    [POSTGRESQL_GROUP_BY_ROUTE]: PostgreSQLGroupBy,
    [POSTGRESQL_JOINS_ROUTE]: PostgreSQLJoins,
    [POSTGRESQL_RATIOS_ROUTE]: PostgreSQLRatios,
    [POSTGRESQL_WINDOW_FUNCTIONS_ROUTE]: PostgreSQLWindowFunctions,
    [POSTGRESQL_MATHS_ROUTE]: PostgreSQLMaths,
    [POSTGRESQL_DATE_TIME_ROUTE]: PostgreSQLDateTime,
    [SCALAR_IN_POSTGRESQL_ROUTE]: ScalarInPostgreSQL,
    [API_COMMUNICATION_ROUTE]: ApiCommunication,
    [JAVASCRIPT_ASYNC_ROUTE]: JavaScriptAsync,
    [JAVASCRIPT_EVENT_LOOP_ROUTE]: JavaScriptEventLoop,
    [PROJECTS_ROUTE]: Projects,
    [INSTEAD_PRIVACY_POLICY_ROUTE]: PrivacyPolicy,
    [BOOKSHELF_ROUTE]: Bookshelf,
    [ABOUT_ROUTE]: About,
};

function App() {
    const route = useRoute();
    const CurrentPage = pages[route];
    const isGoNote = route.startsWith(`${GO_NOTES_ROUTE}/`);
    const isSystemDesignEntry = route.startsWith(`${SYSTEM_DESIGN_ROUTE}/`);
    const isPythonNote = route.startsWith(`${PYTHON_NOTES_ROUTE}/`);
    const isJavaScriptTypeScriptNote = route.startsWith(`${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/`);
    const isReactNote = route.startsWith(`${REACT_NOTES_ROUTE}/`);

    return (
        <div className="App">
            <Header route={route} />

            <main>
                {isGoNote ? (
                    <GoNote route={route as GoNoteRoute} />
                ) : isSystemDesignEntry ? (
                    <Suspense fallback={<p>Loading note…</p>}>
                        <SystemDesignEntry route={route as SystemDesignEntryRoute} />
                    </Suspense>
                ) : isPythonNote ? (
                    <PythonNote route={route as PythonNoteRoute} />
                ) : isJavaScriptTypeScriptNote ? (
                    <JavaScriptTypeScriptNote route={route as JavaScriptTypeScriptNoteRoute} />
                ) : isReactNote ? (
                    <ReactNote route={route as ReactNoteRoute} />
                ) : CurrentPage ? (
                    <CurrentPage />
                ) : (
                    <Home />
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;
