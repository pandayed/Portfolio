import './NoteReadingTime.css';

import { READING_WORDS_PER_MINUTE } from './readingTime';

interface NoteReadingTimeProps {
    minutes: number;
    total?: boolean;
    wordCount?: number;
}

const NoteReadingTime = ({ minutes, total = false, wordCount }: NoteReadingTimeProps) => (
    <span
        className="NoteReadingTime"
        title={total
            ? 'Estimated total: sum of the reading times of all direct children.'
            : `Estimated at ${READING_WORDS_PER_MINUTE} words per minute, rounded up.${wordCount !== undefined ? ` ${wordCount.toLocaleString()} words.` : ''}`}
    >
        {minutes.toLocaleString()} min {total ? 'total' : 'read'}
    </span>
);

export default NoteReadingTime;
