import './App.css';
import './CommonClasses/CommonClasses.css';

import Header from './Header/Header';
import Footer from './Footer/Footer';

function App() {
    return (
        <div className="App">
            <Header />

            <main>
                <p className="Intro">
                    I am Lal Bihari Pandey, a versatile digital creator — continuously evolving
                    with a passion for lifelong learning and a commitment to making a lasting
                    impact.
                </p>
            </main>

            <Footer />
        </div>
    );
}

export default App;
