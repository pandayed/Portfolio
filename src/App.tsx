import './App.css';
import './CommonClasses/CommonClasses.css';

import Header from './Header/Header';
import Home from './Home/Home';
import Blogs from './Blogs/Blogs';
import CppComplexity from './Blogs/CppComplexity/CppComplexity';
import ComplexityCases from './Blogs/ComplexityCases/ComplexityCases';
import SqlVsMySql from './Blogs/SqlVsMySql/SqlVsMySql';
import Projects from './Projects/Projects';
import Bookshelf from './Bookshelf/Bookshelf';
import About from './About/About';
import Footer from './Footer/Footer';

import {
    ABOUT_ROUTE,
    BLOGS_ROUTE,
    BOOKSHELF_ROUTE,
    COMPLEXITY_CASES_ROUTE,
    CPP_COMPLEXITY_ROUTE,
    HOME_ROUTE,
    PROJECTS_ROUTE,
    SQL_VS_MYSQL_ROUTE,
    type Route,
} from './routing/routes';
import { useRoute } from './routing/useRoute';

const pages: Record<Route, () => JSX.Element> = {
    [HOME_ROUTE]: Home,
    [BLOGS_ROUTE]: Blogs,
    [CPP_COMPLEXITY_ROUTE]: CppComplexity,
    [COMPLEXITY_CASES_ROUTE]: ComplexityCases,
    [SQL_VS_MYSQL_ROUTE]: SqlVsMySql,
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
