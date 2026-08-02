import './App.css';
import './CommonClasses/CommonClasses.css';

import Header from './Header/Header';
import Home from './Home/Home';
import Bookshelf from './Bookshelf/Bookshelf';
import Footer from './Footer/Footer';

import { BOOKSHELF_ROUTE } from './routing/routes';
import { useRoute } from './routing/useRoute';

function App() {
    const route = useRoute();

    return (
        <div className="App">
            <Header route={route} />

            <main>{route === BOOKSHELF_ROUTE ? <Bookshelf /> : <Home />}</main>

            <Footer />
        </div>
    );
}

export default App;
