export interface Experience {
    companyLogo?: string;
    company: string;
    jobRole: string;
    startDate: string;
    endDate: string | null;
    tech: string[];
    workDetails: string[];
}

export interface Project {
    title: string;
    deployment?: string;
    github?: string;
    technologies: string[];
    description: string;
    projectImage?: string;
    visibility: string;
}

export interface Certificate {
    title: string;
    completionDate: Date;
    url: string;
    source: string;
}

export interface Book {
    name: string;
    author: string;
    isbn: string;
}

export interface BookCategory {
    category: string;
    booksList: Book[];
}
