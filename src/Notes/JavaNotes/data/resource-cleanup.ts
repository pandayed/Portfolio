import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'resource-cleanup',
    title: 'Resource cleanup',
    summary: 'Close AutoCloseable resources with try-with-resources and distinguish cleanup failures from exception causes.',
    scope: 'java',
    updatedOn: '2026-10-13',
    pointwise: true,
    references: [{
        title: 'Java try-with-resources and cleanup',
        href: 'https://dev.java/learn/exceptions/catching-handling/',
    }],
    sections: [
        {
            id: 'try-with-resources',
            title: 'Try-with-resources',
            bullets: [
                'A resource such as a file reader may keep an operating-system file handle open.',
                'AutoCloseable is an interface with a close method that releases a resource.',
                'A try-with-resources statement declares resources inside parentheses after try.',
                'Java calls close when the block finishes, including when it returns or throws an exception.',
                'Multiple resources close in reverse declaration order.',
                'Resources close before any catch or finally block attached to the statement runs.',
                'Garbage collection does not guarantee prompt release of file or network resources.',
            ],
            examples: [{
                language: 'java',
                code: `public class Main {
    static class Resource implements AutoCloseable {
        @Override
        public void close() {
            System.out.println("Closed");
        }
    }

    public static void main(String[] args) {
        try (Resource resource = new Resource()) {
            System.out.println("Working");
        }
    }
}`,
                result: 'Working\nClosed',
            }],
        },
        {
            id: 'suppressed-exceptions',
            title: 'Failures while closing resources',
            bullets: [
                'If a try-with-resources body throws and close also throws, the body exception remains the main exception.',
                'Java attaches the close failure as a suppressed exception. getSuppressed returns these additional exceptions.',
                'If only close throws, its exception becomes the main failure.',
                'A suppressed exception reports an additional cleanup failure. A cause explains the failure wrapped by another exception.',
            ],
        },
    ],
};

export default note;
