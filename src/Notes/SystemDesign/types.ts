export interface SystemDesignLink {
    text: string;
    href: string;
}

export interface SystemDesignTableCell {
    header: boolean;
    html: string;
}

export interface SystemDesignBlock {
    id: string;
    type: string;
    parent?: string;
    html?: string;
    text?: string;
    links?: SystemDesignLink[];
    tex?: string;
    src?: string;
    alt?: string;
    localImage?: string;
    rows?: SystemDesignTableCell[][];
    pageIds?: string[];
    title?: string;
}

export interface SystemDesignDocument {
    id: string;
    title: string;
    sourceUrl: string;
    blocks: SystemDesignBlock[];
}
