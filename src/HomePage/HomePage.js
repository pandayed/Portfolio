import React, { useState, useRef, useEffect } from 'react';

const HomePage = () => {
    const [width, setWidth] = useState(0);
    const referenceRef = useRef(null);
    const dynamicWidthRef = useRef(null);

    const [displayText, setDisplayText] = useState('');
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed] = useState(50);
    const [deleteSpeed] = useState(35);
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
        <div
            className="min-h-screen bg-[#2D333B] bg-opacity-90 bg-cover bg-center flex flex-col justify-center items-center"
            style={{
                backgroundImage: `url(${require('../assets/texture-background.png')})`
            }}
        >
            <div className="max-w-4xl px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8">
                <div
                    ref={referenceRef}
                    className="text-white space-y-4"
                >
                    <div
                        className="font-['Source_Code_Pro'] text-base sm:text-lg min-h-[2em]"
                        aria-label="Typing animation"
                    >
                        {displayText}
                    </div>

                    <div className='text-4xl sm:text-5xl lg:text-6xl font-semibold flex flex-col gap-8'>
                        <div
                            className="text-white"
                        >
                            Lal Bihari Pandey.
                        </div>
                        <div
                            className="text-white text-opacity-60"
                        >
                            I design and develop</div>
                        <div className="text-white text-opacity-60">
                            for impactful experiences.
                        </div>
                    </div>
                </div>

                <div
                    ref={dynamicWidthRef}
                    style={{ width: `${width}px` }}
                    className="font-['Source_Code_Pro'] text-base sm:text-lg text-white leading-relaxed"
                >
                    I am a versatile digital creator — continuously evolving with a passion for lifelong learning and a commitment to making a lasting impact.
                </div>

                <div
                    ref={dynamicWidthRef}
                    style={{ width: `${width}px` }}
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                >
                    <button
                        className="px-6 py-3 rounded-full text-lg font-['Source_Code_Pro'] text-white bg-[#0a66c2] hover:bg-[#0e75dd] transition-colors duration-300 w-full sm:w-auto"
                        onClick={() => window.open('https://www.linkedin.com/in/pandayed', '_blank')}
                    >
                        LinkedIn
                    </button>

                    <button
                    // text-xs inline-flex items-center justify-center px-2.5 py-1 bg-white/10 rounded-md
                        className="px-6 py-3 rounded-full text-lg font-['Source_Code_Pro'] text-white bg-white/10 transition-colors duration-300 w-full sm:w-auto hover:bg-white/8"
                        onClick={() => window.open('https://docs.google.com/document/d/1bDCyITLmrrbFMAPZ51MRAw-5M_O0TGIW3HOSzICOyhY', '_blank')}
                    >
                        Resume
                    </button>

                    <button
                        className="px-6 py-3 rounded-full text-lg font-['Source_Code_Pro'] text-white bg-white/10 transition-colors duration-300 w-full sm:w-auto"
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