/** @type {import('tailwindcss').Config} */

export default {
    content: ['./index.html', './src**/*.{js, ts, jsx, tsx}'],

    plugins: [
        '@tailwindcss/forms',
        'prettier-plugin-tailwindcss',
        '@tailwindcss/postcss',
    ],
}
