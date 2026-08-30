import './App.css';
import './CommonClasses/CommonClasses.css';

import Header from './Header/Header';
import Home from './Home/Home';
import Blogs from './Blogs/Blogs';
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
import Projects from './Projects/Projects';
import Bookshelf from './Bookshelf/Bookshelf';
import About from './About/About';
import Footer from './Footer/Footer';

import {
    ABOUT_ROUTE,
    AI_OBEDIENCE_ROUTE,
    ARCHIVE_ROUTE,
    BLOGS_ROUTE,
    BOOKSHELF_ROUTE,
    COMPLEXITY_CASES_ROUTE,
    CONSISTENT_HASHING_ROUTE,
    CPP_COMPLEXITY_ROUTE,
    DRAFTS_ROUTE,
    HOME_ROUTE,
    PROJECTS_ROUTE,
    SIEVE_OF_ERATOSTHENES_ROUTE,
    SQL_VS_MYSQL_ROUTE,
    SSL_TLS_ROUTE,
    WHY_REACT_ROUTE,
    type Route,
} from './routing/routes';
import { useRoute } from './routing/useRoute';

const pages: Record<Route, () => JSX.Element> = {
    [HOME_ROUTE]: Home,
    [BLOGS_ROUTE]: Blogs,
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
    [PROJECTS_ROUTE]: Projects,
    [BOOKSHELF_ROUTE]: Bookshelf,
    [ABOUT_ROUTE]: About,
};

function App() {
    const route = useRoute();
    const CurrentPage = pages[route];

    return (
        <div className="App">
            <Header route={route} />

            <main>
                <CurrentPage />
            </main>

            <Footer />
        </div>
    );
}

export default App;
