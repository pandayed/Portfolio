import type { Project } from '../types';

import PortfolioImage from '../assets/project-images/portfolio.png';

export const projects: Project[] = [
    {
        title: 'Portfolio',
        deployment: 'https://pandayed.github.io/Portfolio/',
        github: 'https://github.com/pandayed/Portfolio',
        technologies: ['React', 'TypeScript', 'Vite'],
        description: 'An Open Source Portfolio built with React, TypeScript and Vite.',
        projectImage: PortfolioImage,
        visibility: 'Public',
    },
];
