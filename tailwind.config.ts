import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

import colors from './src/styles/colors';

export default {
    darkMode: ['class'],
    content: ['./src/**/*.tsx'],
    theme: {
        extend: {
            colors,
            textColor: {
                DEFAULT: 'hsl(var(--foreground))',
            },
            fontFamily: {
                init: ['var(--font-geist-sans)', ...fontFamily.sans],
                sans: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                    'Apple Color Emoji',
                    'Segoe UI Emoji',
                    'Segoe UI Symbol',
                ],
            },
            fontSize: {
                base: ['1rem', '1.5rem'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            height: {
                header: 'var(--header-height)',
            },
            width: {
                sidebar: 'var(--sidebar-width)',
            },
            maxWidth: {
                display: 'var(--display-width)',
                profile: 'var(--profile-width)',
            },
            margin: {
                header: 'var(--header-height)',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
