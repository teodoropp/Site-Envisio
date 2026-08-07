/** @format */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["'Segoe UI Variable Text'", "'Segoe UI'", "sans-serif"],
                regular: ["'Segoe UI Variable Text'", "'Segoe UI'", "sans-serif"],
                semibold: ["'Segoe UI Variable Text'", "'Segoe UI'", "sans-serif"],
            },
            colors: {
                primary: {
                    DEFAULT: "#DC2626",
                    dark: "#B91C1C",
                },
            },
        },
    },
    plugins: [],
};