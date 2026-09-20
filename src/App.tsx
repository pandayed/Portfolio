import './App.css';
import './CommonClasses/CommonClasses.css';

import Header from './Header/Header';
import Home from './Home/Home';
import Blogs from './Blogs/Blogs';
import Notes from './Notes/Notes';
import MysqlNotes from './Notes/MysqlNotes';
import GoNotes from './Notes/GoNotes';
import GoNote from './Notes/GoNotes/GoNote';
import PythonNotes from './Notes/PythonNotes/PythonNotesIndex';
import PythonNote from './Notes/PythonNotes/PythonNote';
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
import MysqlGroupBy from './Blogs/MysqlGroupBy/MysqlGroupBy';
import ScalarInMysql from './Blogs/ScalarInMysql/ScalarInMysql';
import ApiCommunication from './Notes/ApiCommunication/ApiCommunication';
import JavaScriptAsync from './Notes/JavaScriptAsync/JavaScriptAsync';
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
    GO_NOTES_ROUTE,
    PYTHON_NOTES_ROUTE,
    HOME_ROUTE,
    INSTEAD_PRIVACY_POLICY_ROUTE,
    JAVASCRIPT_ASYNC_ROUTE,
    MYSQL_GROUP_BY_ROUTE,
    MYSQL_NOTES_ROUTE,
    NOTES_ROUTE,
    PROJECTS_ROUTE,
    SCALAR_IN_MYSQL_ROUTE,
    SIEVE_OF_ERATOSTHENES_ROUTE,
    SQL_VS_MYSQL_ROUTE,
    SSL_TLS_ROUTE,
    WHY_REACT_ROUTE,
    WRITING_BETTER_PLANS_AND_SKILLS_ROUTE,
    type GoNoteRoute,
    type PythonNoteRoute,
    type Route,
} from './routing/routes';
import { useRoute } from './routing/useRoute';

const pages: Partial<Record<Route, () => JSX.Element>> = {
    [HOME_ROUTE]: Home,
    [BLOGS_ROUTE]: Blogs,
    [NOTES_ROUTE]: Notes,
    [MYSQL_NOTES_ROUTE]: MysqlNotes,
    [GO_NOTES_ROUTE]: GoNotes,
    [PYTHON_NOTES_ROUTE]: PythonNotes,
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
    [MYSQL_GROUP_BY_ROUTE]: MysqlGroupBy,
    [SCALAR_IN_MYSQL_ROUTE]: ScalarInMysql,
    [API_COMMUNICATION_ROUTE]: ApiCommunication,
    [JAVASCRIPT_ASYNC_ROUTE]: JavaScriptAsync,
    [PROJECTS_ROUTE]: Projects,
    [INSTEAD_PRIVACY_POLICY_ROUTE]: PrivacyPolicy,
    [BOOKSHELF_ROUTE]: Bookshelf,
    [ABOUT_ROUTE]: About,
};

function App() {
    const route = useRoute();
    const CurrentPage = pages[route];
    const isGoNote = route.startsWith(`${GO_NOTES_ROUTE}/`);
    const isPythonNote = route.startsWith(`${PYTHON_NOTES_ROUTE}/`);

    return (
        <div className="App">
            <Header route={route} />

            <main>
                {isGoNote ? (
                    <GoNote route={route as GoNoteRoute} />
                ) : isPythonNote ? (
                    <PythonNote route={route as PythonNoteRoute} />
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
