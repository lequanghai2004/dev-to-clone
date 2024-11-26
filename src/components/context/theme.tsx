'use client';

import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';

const NextThemeProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Remove `no-transition` class from the body after theme set
        document.body.classList.remove('no-transition');
    }, []);

    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            storageKey='theme' // Consistent key for storing theme in localStorage
            enableSystem={true} // Allows system detection
        >
            {children}
        </ThemeProvider>
    );
};

export { NextThemeProvider };
