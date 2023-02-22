/** @type {import('tailwindcss').Config} */

// 移动端 像素单位 转 vmin 
function pxToVmin(variable) {
  return `${variable / 7.5}vmin`
}

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
          f0: "#F0F0F0",
          f5: "#F5F5F5",
        },
        width: {
          screen: "var(--screen-width, 100vw)",
          '36': pxToVmin(36),
          '39': pxToVmin(39),
          '50': pxToVmin(50),
          '54': pxToVmin(54),
          '66': pxToVmin(66),
          '70': pxToVmin(70),
          '80': pxToVmin(80),
          '120': pxToVmin(120),
          '150': pxToVmin(150),
          '180': pxToVmin(180),
          '220': pxToVmin(220),
          '255': pxToVmin(255),
          '300': pxToVmin(300),
        },
        height: {
          screen: "var(--screen-height, 100vh)",
          '4': pxToVmin(4),
          '36': pxToVmin(36),
          '39': pxToVmin(39),
          '54': pxToVmin(54),
          '60': pxToVmin(60),
          '66': pxToVmin(66),
          '70': pxToVmin(70),
          '80': pxToVmin(80),
          '96': pxToVmin(96),
          '120': pxToVmin(120),
          '180': pxToVmin(180),
        },
        fontSize: {
          base: ["var(--text-base-size)", "var(--leading-base)"],
          xs: ["var(--text-xs-size)", "var(--leading-xs)"],
          sm: ["var(--text-sm-size)", "var(--leading-sm)"],
          lg: ["var(--text-lg-size)", "var(--leading-lg)"],
          xl: ["var(--text-xl-size)", "var(--leading-xl)"],
          '2xl': ["var(--text-2xl-size)", "var(--leading-2xl)"],
          '3xl': ["var(--text-3xl-size)", "var(--leading-3xl)"],
          '12': pxToVmin(12),
          '14': pxToVmin(14),
          '16': pxToVmin(16),
          '18': pxToVmin(18),
          '20': pxToVmin(20),
          '24': pxToVmin(24),
          '26': pxToVmin(26),
          '30': pxToVmin(30),
          '32': pxToVmin(32),
          '36': pxToVmin(36),
          '45': pxToVmin(45),
          '70': pxToVmin(70),
        },
        lineHeight: {
          '30': pxToVmin(30),
          '36': pxToVmin(36),
          '39': pxToVmin(39),
          '48': pxToVmin(48),
          '54': pxToVmin(54),
          '62': pxToVmin(62),
        },
        spacing: {
          '4': pxToVmin(4),
          '5': pxToVmin(5),
          '8': pxToVmin(8),
          '12': pxToVmin(12),
          '15': pxToVmin(15),
          '18': pxToVmin(18),
          '20': pxToVmin(20),
          '25': pxToVmin(25),
          '30': pxToVmin(30),
          '32': pxToVmin(32),
          '40': pxToVmin(40),
          '45': pxToVmin(45),
          '48': pxToVmin(48),
          '50': pxToVmin(50),
          '55': pxToVmin(55),
          '60': pxToVmin(60),
          '65': pxToVmin(65),
          '70': pxToVmin(70),
          '80': pxToVmin(80),
          '105': pxToVmin(105),
          '150': pxToVmin(150),
        },
        borderWidth: {
          '2': pxToVmin(2),
          '4': pxToVmin(4),
        },
        borderRadius: {
          '4': pxToVmin(4),
          sm: pxToVmin(8),
          DEFAULT: "var(--radius)",
          '10': pxToVmin(10),
          '20': pxToVmin(20),
          '30': pxToVmin(30),
          '60': pxToVmin(60),
        },
        backgroundImage: {
          'finished': "url('/img/finished.png')",
          'select-arrow': "url(data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAdVBMVEUAAAD+TwD/UQD9TwD+TwD8TwD9TwD9TwD9UAD9TQD/TgD9UAD9TwD+UAD9UAD+UAD9TwD+UAD+UAD9UAD9TgD8TgD+TgD/TgD/TQD9UAD9TwD+UAD9UAD9TwD9TwD9TwD9UAD/UAD/UAD/UQD/SgDyTQD9UAAKnUttAAAAJnRSTlMALQrG0rOih3QeEPr37+Xj17utmWhaTz8G+O7Kk4F7bmxWRiYYFO9je+4AAACVSURBVCjP3ZBZEoMgEERHQME1atyy73P/I6YTqkwEvYDvg+rmAVMFrYlYqYB82qLGapjz3nNXZsadx555d3PcGe4wIAQbpMvEaezIxE4tkfWf26JXgiyJRItGF6HVw1hFiB6KX8ZJ5yX5+rgK6UhTTtgrYztBk0uTMhd3BWfIp8v4S0Nz9DlU2tI8+I6soyWeJqB18gbkxQ06ti86dgAAAABJRU5ErkJggg==)"
        },
        backgroundSize: {
          '28': pxToVmin(28),
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
