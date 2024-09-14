import React, { useState, useRef, useEffect } from 'react';
import './HomePage.css';
import '../CommonClasses/CommonClasses.css';
import '../assets/texture-background.png';



const HomePage = () => {

    const [width, setWidth] = useState(0);
    const referenceRef = useRef(null);
    const dynamicWidthRef = useRef(null);

    const [displayText, setDisplayText] = useState('');
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(50);
    const [deleteSpeed, setDeleteSpeed] = useState(35);
    const texts = [
        'console.log("Hello, my name is");',
        'cout << "Hola, mi nombre es";',
        'print("Bonjour, je m\'appelle")',
    ];

    useEffect(() => {
        const currentText = texts[loopNum % texts.length];
        let timer;

        if (isDeleting) {
            // Remove characters
            timer = setTimeout(() => {
                setDisplayText(currentText.substring(0, displayText.length - 1));
                if (displayText === '') {
                    setIsDeleting(false);
                    setLoopNum(loopNum + 1);
                }
            }, deleteSpeed);
        } else {
            // Add characters
            timer = setTimeout(() => {
                setDisplayText(currentText.substring(0, displayText.length + 1));
                if (displayText === currentText) {
                    setIsDeleting(true);
                }
            }, typingSpeed);
        }

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, typingSpeed, deleteSpeed, loopNum, texts]);

    useEffect(() => {
        if (referenceRef.current) {
            // Measure the width of the reference component
            const updateWidth = () => {
                setWidth(referenceRef.current.offsetWidth);
            };

            // Initial measurement
            updateWidth();

            // Optional: Update width on window resize
            window.addEventListener('resize', updateWidth);
            return () => window.removeEventListener('resize', updateWidth);
        }
    }, []);


    return (
        <div className="HomePage" >

            <div className='HomePageContainer'>
                <div className="IntroContent" ref={referenceRef}>
                    <div className="NameLine">{displayText}</div>
                    <div>
                        <div className="Name">Lal Bihari Pandey.</div>
                        <div className="Intro">
                            I design and develop<br />
                            for impactful experiences.
                        </div>
                    </div>
                </div>

                <div
                    ref={dynamicWidthRef}
                    style={{ width: `${width}px` }}
                    className="Description"
                >I am a versatile digital creator — continuously evolving with a passion for lifelong learning and a commitment to making a lasting impact.
                </div>

                <div
                    ref={dynamicWidthRef}
                    style={{ width: `${width}px` }}
                    className="IntroductionButtons">
                    <button
                        className="IntroButton LinkedInButton"
                        onClick={() => window.open('https://www.linkedin.com/in/pandayed', '_blank')}
                    >
                        LinkedIn
                    </button>

                    <button
                        className="IntroButton ResumeButton"
                        onClick={() => window.open('https://docs.google.com/document/d/1bDCyITLmrrbFMAPZ51MRAw-5M_O0TGIW3HOSzICOyhY', '_blank')}
                    >
                        Resume
                    </button>

                    <button
                        className="IntroButton ContactMeButton"
                        onClick={() => window.location.href = 'mailto:lalbiharipandeyg@gmail.com'}
                    >
                        E-Mail
                    </button>
                </div>
            </div>


        </div>
    );
};

export default HomePage;