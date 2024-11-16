import React, { useRef, useState } from 'react';
import './App.css';
import './CommonClasses/CommonClasses.css';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import HomePage from './HomePage/HomePage';
import ExperiencePage from './Experience/ExperiencePage';
import SkillsPage from './SkillsPage';
import ContactPage from './Contact/ContactPage';
import HeaderNavigationButton from './Header/HeaderNavigationButtons';
import { BookShelfPage } from './BookShelf/BookShelfPage';

function App() {
  // Create refs for each section
  const homeRef = useRef(null);
  const experienceRef = useRef(null);
  const bookshelfRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  // State to manage selected section
  const [selectedSection, setSelectedSection] = useState('home');

  // Scroll to the section and update selected section state
  const scrollToSection = (sectionRef, sectionName) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    setSelectedSection(sectionName);
  };

  return (
    <div className="App">
      <Header>
        <ul className="HeaderNavigation inline-div">
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
            onClick={() => scrollToSection(bookshelfRef, 'bookshelf')}
            label="Bookshelf"
            isSelected={selectedSection==='bookshelf'}
          />
          {/* <HeaderNavigationButton
            onClick={() => scrollToSection(skillsRef, 'skills')}
            label="Skills"
            isSelected={selectedSection === 'skills'}
          /> */}
          {/* <HeaderNavigationButton
            onClick={() => scrollToSection(contactRef, 'contact')}
            label="Contact"
            isSelected={selectedSection === 'contact'}
          /> */}
        </ul>
      </Header>

      <div>
        <div id="home" ref={homeRef}>
          <HomePage />
        </div>

        <div id="experience" ref={experienceRef}>
          <ExperiencePage />
        </div>

        <div id="bookshelf" ref={bookshelfRef}>
          <BookShelfPage />
        </div>

        {/* <div id="skills" ref={skillsRef}>
          <SkillsPage />
        </div> */}

        {/* <div id="contact" ref={contactRef}>
          <ContactPage />
        </div> */}

      </div>

      <Footer />
    </div>
  );
}

export default App;