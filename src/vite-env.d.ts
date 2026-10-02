/// <reference types="vite/client" />

declare module 'virtual:note-word-counts' {
    const wordCounts: Record<string, number>;
    export default wordCounts;
}
