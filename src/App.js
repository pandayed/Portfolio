import React, { useRef } from 'react';
import './App.css';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import HomePage from './HomePage/HomePage';
import ExperiencePage from './Experience/ExperiencePage';
import SkillsPage from './SkillsPage';
import ContactPage from './Contact/ContactPage';

function App() {
  // Create refs for each section
  const homeRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll to the section when a menu item is clicked
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Header>
        <ul className="HeaderNavigation">
          <li className="HeaderNavItem">
            <button onClick={() => scrollToSection(homeRef)}>Home</button>
          </li>
          <li className="HeaderNavItem">
            <button onClick={() => scrollToSection(experienceRef)}>Experience</button>
          </li>
          <li className="HeaderNavItem">
            <button onClick={() => scrollToSection(skillsRef)}>Skills</button>
          </li>
          <li className="HeaderNavItem">
            <button onClick={() => scrollToSection(contactRef)}>Contact</button>
          </li>
        </ul>
      </Header>

      <div id="home" ref={homeRef}>
        <HomePage />
      </div>

      <div id="experience" ref={experienceRef}>
        <ExperiencePage />
      </div>

      <div id="skills" ref={skillsRef}>
        <SkillsPage />
      </div>

      <div id="contact" ref={contactRef}>
        <ContactPage />
      </div>

      <Footer />
    </div>
  );
}

export default App;