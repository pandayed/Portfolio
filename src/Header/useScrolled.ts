import { useEffect, useState } from 'react';

/** True once the page is scrolled past `threshold` pixels from the top. */
export const useScrolled = (threshold = 1) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const read = () => setScrolled(window.scrollY > threshold);

        read();
        window.addEventListener('scroll', read, { passive: true });

        return () => window.removeEventListener('scroll', read);
    }, [threshold]);

    return scrolled;
};
