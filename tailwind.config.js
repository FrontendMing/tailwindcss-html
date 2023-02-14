/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "var(--primary-color)",
        },
        height: {
          screen: "var(--screen-height, 100vh)",
        },
        fontSize: {
          base: ["var(--text-base-size)", "var(leading-base)"],
          xs: ["var(--text-xs-size)", "var(leading-xs)"],
          sm: ["var(--text-sm-size)", "var(leading-sm)"],
          lg: ["var(--text-lg-size)", "var(leading-lg)"],
          xl: ["var(--text-xl-size)", "var(leading-xl)"],
          '2xl': ["var(--text-2xl-size)", "var(leading-2xl)"],
          '3xl': ["var(--text-3xl-size)", "var(leading-3xl)"],
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
};