export interface PythonExample {
    title?: string;
    language?: 'python' | 'text';
    code: string;
    result?: string;
}

export interface PythonNoteSection {
    id: string;
    title: string;
    paragraphs?: readonly (string | readonly (string | PythonInlineLink)[])[];
    bullets?: readonly string[];
    examples?: readonly PythonExample[];
    exceptions?: readonly string[];
}

export interface PythonInlineLink {
    text: string;
    href: string;
}

export interface PythonNote {
    slug: string;
    title: string;
    summary: string;
    updatedOn: string;
    sections: readonly PythonNoteSection[];
}

export interface PythonChapter {
    title: string;
    summary: string;
    notes: readonly PythonNote[];
}
