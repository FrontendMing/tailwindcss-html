/** @type {import('tailwindcss').Config} */

// 移动端 像素单位 转 vmin 
function pxToVmin(variable) {
  return `${variable / 7.5}vmin`
}


const MAX_NUMBER = 500

const JSON = {}
for (let i = 0; i < MAX_NUMBER; i++) {
  JSON[i] = pxToVmin(i)
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
          ...JSON
        },
        height: {
          screen: "var(--screen-height, 100vh)",
          ...JSON
        },
        fontSize: {
          base: ["var(--text-base-size)", "var(--leading-base)"],
          xs: ["var(--text-xs-size)", "var(--leading-xs)"],
          sm: ["var(--text-sm-size)", "var(--leading-sm)"],
          lg: ["var(--text-lg-size)", "var(--leading-lg)"],
          xl: ["var(--text-xl-size)", "var(--leading-xl)"],
          '2xl': ["var(--text-2xl-size)", "var(--leading-2xl)"],
          '3xl': ["var(--text-3xl-size)", "var(--leading-3xl)"],
          ...JSON
        },
        lineHeight: {
          ...JSON
        },
        spacing: {
          ...JSON
        },
        borderWidth: {
          ...JSON
        },
        borderRadius: {
          sm: pxToVmin(8),
          DEFAULT: "var(--radius)",
          ...JSON
        },
        backgroundImage: {
          'choose-finished': "url(data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABXhJREFUeF7lm1tsFFUYx3/fzBYMBoUoIC8ixqixokHwBaJEEgUNwrYWo2AUSiLxwRsVFVTaJhJpUGpM1MRESjTWB0y7bfCeYCLyRDHxAkYStfoiNwPGeGt35pgznV12287unN2d7pqZZJ/2O9/5///n9p3vnCNE/KnVzHCGuVmEehRXKbhS4GJgqv/TCP7QPwWnBY4hfK8UR+w6Ppe9nIoSokThXCVZ4MIa4FbgWqDUehTwLfCpBd2S4nCl8ZYKbAwOtZKprsWDQDNwTaWB+v6OArstlzek3+s1ZX9lC6CSTHPhMeARYHrZiMI5OAO8YsHLkuJsuCLjW5UsgAJxVrFOhA5gRjkgyih7SimesvvYI6CHi/FXkgBqBZc6Nt0iLDauMYICSnHQdlgj+/jF1L2xAKqRxa5LDzDTtLKI7U9aFo3Sw0GTeowESDfQLIrXgUkmlUyg7ZASHkr0sjtsnaEEUKux3TQ7UTwe1nFV7YROK8Fm2YtTDEdRATR5laZHKVYWc1ZL/4vQLwkai4lQVACngV3/m5Yf3QJCp93LpkINU1AAf8y/WUsta4pFCRsKzQmBAviz/f4anvDCajFkWSwNWh3GFUCv826CQzW41IUlPdrupJXmxvHihDEC+BHegVoJckplPLqcFyz1cdPoiHGMAOlVrBcJv45WCuBE+FGK5kQfXbl15Qngb2yOVTG2j1qHU5bOR+RsoPIEcJK0Aa1Ro6iy/3Y75fH0vqwA/n7+5wnc0lZLhzOWy5xMPiErgJOkBXixWqiM6q2bjNzThixd5xVT+/eg3m2F9FBYN0/YKV7K6wFOkiMRZnLCAitup8k/3YvccHuererZgXp7S/HyIxZH7RT1WQH8HN5A2NJVswsg7+E5exx3/ezQ0CxYqHOM3hBwkl53KBgzh/YclWEh8iUIAOyyU7RkBPgamBcV9rL9FiOv5wGzIaAhfWOnuE503t4d5kQZqeuy+RV0EIb8lx+iXkiaTILe3GnVMUvSSe4SeC9aFiV6D0t+RwMM/2tciYImcRrYhqLduHTUBSIm78EXWsVJ8g4jpzi182nyW1LI/OWBmJTu9iW2fI7Tbj0EDgksNGKfmISs3Z4fiHQ/B8P/GLkZ1zgM+cMfoDoaS+r2uXUqGNA94CfgMhPkcn8H0vBkfpGjB3C33wl//W7iKt82DPnKtHym3kEtwGngIhPUVtevMO2SsUUGv8JtX+4FJcbfxJPXEH/TAujp0yjPHyiAdnn8B9y22+DEj+E1qA55jW+oJAG88d+0NZigDkvbl8Ggjq+KfNUjnxXAeAhg1yGbupFFTcHs/jw7Mid890WwTRjyFZrwAkB4Q8B4EvSciYVsfA1ZtjGY4NDfqJ13owb2jbWpPnmNabC0ZTCHjqx9Hml6JlgEJ416dQPqs7fO2dQGeX2e7i2DZQdCsuJRpLkTJOCYQSnUnhZUfyfUCHm/NborFgrLkvuQh7vATgT2BtXTAXOvLxzhRTvm87HpULiSmyFZcAeyeS9MnlJs7h/3fzWR5PV2UG+GKr4dvnoR1rPvw/nTjESYaPLZ7bBG6SSpbEJkzjys1o9hergUVRXIa9ojCRFfgMqnxGbNxWr9BGZfUbAnVIm8xnQuJRZZUvTCmVjbPoLL59fEmM8FkZcU9XtBNGnxKRdgbe2H+iV5IlSx5TWO/LS4L0B0ByN15yH3tiO3PODNvSUcZBhNqCGMxx6MxP5ozO8F8T0c1QLE/nhcixDrCxJeLxi5BB3fKzKeCHG+JJVZQmJ9TS4jQqwvSmZEiPVVWW8+iPtl6YwIsb0unxtXx/bBRK4IsX4yk10i4/xoKitCnJ/N5Q2JuD6cHJ10iO3T2fGyL7F8PB2Uhqr15/P/ASUblG/nyEnoAAAAAElFTkSuQmCC)",
          'select-arrow': "url(data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAdVBMVEUAAAD+TwD/UQD9TwD+TwD8TwD9TwD9TwD9UAD9TQD/TgD9UAD9TwD+UAD9UAD+UAD9TwD+UAD+UAD9UAD9TgD8TgD+TgD/TgD/TQD9UAD9TwD+UAD9UAD9TwD9TwD9TwD9UAD/UAD/UAD/UQD/SgDyTQD9UAAKnUttAAAAJnRSTlMALQrG0rOih3QeEPr37+Xj17utmWhaTz8G+O7Kk4F7bmxWRiYYFO9je+4AAACVSURBVCjP3ZBZEoMgEERHQME1atyy73P/I6YTqkwEvYDvg+rmAVMFrYlYqYB82qLGapjz3nNXZsadx555d3PcGe4wIAQbpMvEaezIxE4tkfWf26JXgiyJRItGF6HVw1hFiB6KX8ZJ5yX5+rgK6UhTTtgrYztBk0uTMhd3BWfIp8v4S0Nz9DlU2tI8+I6soyWeJqB18gbkxQ06ti86dgAAAABJRU5ErkJggg==)",
          'star': "url(data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAAAAXNSR0IArs4c6QAAA/lJREFUWEfNmEuIHFUUhv9TTldVHtNVIVnELKarByYIWUh8xAQ0ihoTyQRHELPQnSLqQnThAwmIEMTHQnGhIrrTRVBIJBGjUWFUUKNRXATEhqnqWcQsEqaqJ4+u6rF+uY0ZZnq6+1Z310y8m4Y+5/znq3O67j23BTmuhu/eruQK5XAyL1nJS0jpJIHzjfo0veiuvHRzA2xU192aMv1egRli3FYozfyQB2RugInvfEXBLgUlxAmzHN3zvwFM/OJ2ivy4EEjIHWa59tOgkLlUMA6cLwDsaYE5bnnRvVcdMJku3sxUTrYDEYPbzJHaL4NADlzBOHCPAhxvDyHHLC/cd9UAk8C5gcCpbgAC3Gh60W/9Qg5UwbhaPALKfV2TCz+zSrWJFQdMptzrafB3tatoklNS2WqOhn/0A6kTb6tJYiipOp8AyFqZw2YpelAEc71CdgQkYdQDd0QMjoHcbBBjFBkDMQZBGcBQj8nmQPgQVISspIIKRP5iKhXbC6dFkLbdCdSXjSl3J6/hdVTJyc1QIMAoAKtHiH7dYwBTIJvQoh7iH/mzMBp+16xg7Dv7Ifioj6r0C6SLU9V+2CpHh+ZbHAfu/QAPqWlJF73M9gYg+y0vPNw81xcmq1eHx4XGpyvY2tZnjSnpA3Zp9tgVw5KXpO4Xd4vIEQD2MleqVb5OcsIu175cNHS0g7gcOHcawFEAq1cI8lIK7FvlRd+25uu4zag3OzX4OYC1ywx5wUhlr3pjO24znQAawfCOFMZxAMVlgqwZSPcUvNlFs6S2xQsd/hun1O9iXc6QM2Jwt24cy3TUJYG7leAJAOtzgjwvkF2mF6qzvOvKBKgU6oHzjgBP6ASz2Am8a3vRk1l8swNWnUkhdmYR1fkQmLS96A6d35KNultAHDjn8myx5UUbcgO84K/ZWJChv7MIZvVpcO7ateWLZ3X+mVpcrzp3q7uuTqwXu7pD26Xoa11MNkDffVqEb+rEerGT8oxdDt/SxWQDDJwPBHhEJ9aLncCHthc9qovJBBgHjvqH4BbNhnUyBV5UPgbwCohtmuQ/W160fWBAEpJUnQjAcHsxngaNA1Y5VBPQ/Ip9dwKSHgRkSweIWbMUOSJgN0htBS/7rmcI/TYivghfKozUPu50n1D3msZ08SFSXgaa95hFK03FWzUaVgcCrAfFvQKZHyABnCV40DpXe19uQkPXImXnryjEG4qPCeQAgI1XYgiO215NTUwdl7aCcdV5HsSrAGZAvG5aa96WTWcuZQFr9eGZTauT+OJTEDzXHD4EL1il6LWBAOtV5z0hzpuUN6Qchv2ALQH1XTcRPkvBersUPT4QICuwZAzqWpj7yqKtbXHuVD0K/gtPqFs2sf0wxgAAAABJRU5ErkJggg==)"
        },
        backgroundSize: {
          ...JSON
        }
      },
    },
    corePlugins: {
      // preflight: false,
      aspectRatio: false,
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/line-clamp'),
    ],
};
