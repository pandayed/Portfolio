import { useState, useRef, useEffect } from 'react';

import './HomePage.css';
import textureBackground from '../assets/texture-background.png';

const TYPING_SPEED_MS = 50;
const DELETE_SPEED_MS = 35;

const texts = [
    'console.log("Hello, my name is");',
    'cout << "Hola, mi nombre es";',
    'print("Bonjour, je m\'appelle")',
];

const HomePage = () => {
    const [width, setWidth] = useState(0);
    const referenceRef = useRef<HTMLDivElement>(null);

    const [displayText, setDisplayText] = useState('');
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[loopNum % texts.length];
        let timer: ReturnType<typeof setTimeout>;

        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayText(currentText.substring(0, displayText.length - 1));
                if (displayText === '') {
                    setIsDeleting(false);
                    setLoopNum(loopNum + 1);
                }
            }, DELETE_SPEED_MS);
        } else {
            timer = setTimeout(() => {
                setDisplayText(currentText.substring(0, displayText.length + 1));
                if (displayText === currentText) {
                    setIsDeleting(true);
                }
            }, TYPING_SPEED_MS);
        }

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, loopNum]);

    // The paragraph and button row are constrained to the width of the heading block.
    useEffect(() => {
        const updateWidth = () => {
            if (referenceRef.current) {
                setWidth(referenceRef.current.offsetWidth);
            }
        };

        updateWidth();

        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return (
        <div className="HomePage" style={{ backgroundImage: `url(${textureBackground})` }}>
            <div className="HomePage__container">
                <div ref={referenceRef} className="HomePage__heading">
                    <div className="HomePage__typewriter" aria-label="Typing animation">
                        {displayText}
                    </div>

                    <div className="HomePage__title">
                        <div>Lal Bihari Pandey.</div>
                        <div className="HomePage__title--muted">I design and develop</div>
                        <div className="HomePage__title--muted">for impactful experiences.</div>
                    </div>
                </div>

                <p className="HomePage__description" style={{ width: `${width}px` }}>
                    I am a versatile digital creator — continuously evolving with a passion for
                    lifelong learning and a commitment to making a lasting impact.
                </p>

                <div className="HomePage__actions" style={{ width: `${width}px` }}>
                    <button
                        type="button"
                        className="HomePage__button HomePage__button--linkedin"
                        onClick={() => window.open('https://www.linkedin.com/in/pandayed', '_blank')}
                    >
                        LinkedIn
                    </button>

                    <button
                        type="button"
                        className="HomePage__button"
                        onClick={() =>
                            window.open(
                                'https://docs.google.com/document/d/1bDCyITLmrrbFMAPZ51MRAw-5M_O0TGIW3HOSzICOyhY',
                                '_blank'
                            )
                        }
                    >
                        Resume
                    </button>

                    <button
                        type="button"
                        className="HomePage__button"
                        onClick={() => {
                            window.location.href = 'mailto:lalbiharipandeyg@gmail.com';
                        }}
                    >
                        E-Mail
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
