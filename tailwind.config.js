/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.html", "./**/*.js"],
    theme: {
      extend: {
        colors: {
          primary: "var(--primary-color)",
          main: "var(--text-main-color)",
          sub: "var(--text-sub-color)",
          info: "var(--text-info-color)",
          disable: "var(--text-disable-color)",
          input: "var(--input-border-color)",
          f5: "var(--bg-f5-color)",
        },
        height: {
          screen: "var(--screen-height, 100vh)",
        },
        fontSize: {
          base: ["var(--text-base-size)", "var(--leading-base)"],
          xs: ["var(--text-xs-size)", "var(--leading-xs)"],
          sm: ["var(--text-sm-size)", "var(--leading-sm)"],
          lg: ["var(--text-lg-size)", "var(--leading-lg)"],
          xl: ["var(--text-xl-size)", "var(--leading-xl)"],
          '2xl': ["var(--text-2xl-size)", "var(--leading-2xl)"],
          '3xl': ["var(--text-3xl-size)", "var(--leading-3xl)"],
          '24': "var(--text-24-size)",
          '26': "var(--text-26-size)",
        },
        lineHeight: {
          '36': "var(--leading-36)",
          '39': "var(--leading-39)",
        },
        borderRadius: {
          DEFAULT: "var(--radius)",
        }
      },
    },
    variants: {
      extend: {
        50: ''
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
    ],
};
