// @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions}
export default {
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindFunctions: ['twMerge', 'clsx', 'cn', 'cva'],

    experimentalTernaries: false,
    printWidth: 120,
    tabWidth: 4,
    semi: true,
    quoteProps: 'as-needed',
    singleQuote: true,
    jsxSingleQuote: true,
    bracketSpacing: true,
    trailingComma: 'es5',
    bracketSameLine: false,
    arrowParens: 'always',
};
