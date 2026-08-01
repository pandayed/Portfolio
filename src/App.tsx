import { useRef, useState } from 'react';

import './App.css';
import './CommonClasses/CommonClasses.css';

import Header from './Header/Header';
import HeaderNavigationButton from './Header/HeaderNavigationButtons';
import Footer from './Footer/Footer';

import HomePage from './HomePage/HomePage';
import ExperiencePage from './Experience/ExperiencePage';
import { ProjectsPage } from './Projects/ProjectsPage';
import { CertificationsPage } from './Certifications/CertificationsPage';

type SectionName = 'home' | 'experience' | 'projects' | 'certifications';

function App() {
    const homeRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const certificationsRef = useRef<HTMLDivElement>(null);

    const [selectedSection, setSelectedSection] = useState<SectionName>('home');

    const scrollToSection = (
        sectionRef: React.RefObject<HTMLDivElement>,
        sectionName: SectionName
    ) => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        setSelectedSection(sectionName);
    };

    return (
        <div className="App">
            <Header>
                <HeaderNavigationButton
                    onClick={() => scrollToSection(homeRef, 'home')}
                    label="Home"
                    isSelected={selectedSection === 'home'}
                />
                <HeaderNavigationButton
                    onClick={() => scrollToSection(experienceRef, 'experience')}
                    label="Experience"
                    isSelected={selectedSection === 'experience'}
                />
                <HeaderNavigationButton
                    onClick={() => scrollToSection(projectsRef, 'projects')}
                    label="Projects"
                    isSelected={selectedSection === 'projects'}
                />
                <HeaderNavigationButton
                    onClick={() => scrollToSection(certificationsRef, 'certifications')}
                    label="Certifications"
                    isSelected={selectedSection === 'certifications'}
                />
            </Header>

            <main>
                <div id="home" ref={homeRef}>
                    <HomePage />
                </div>

                <div id="experience" ref={experienceRef}>
                    <ExperiencePage />
                </div>

                <div id="projects" ref={projectsRef}>
                    <ProjectsPage />
                </div>

                <div id="certifications" ref={certificationsRef}>
                    <CertificationsPage />
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
