/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        // heading: ["'DM Sans'", ...defaultTheme.fontFamily.sans],
        // paragraph: ['Roboto', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        accent: "#7FDBFF",
        black: "#111111",
        dark: "#505050",
        offwhite: "#eeeeee",
        gray: {
          DEFAULT: "F4F4F4",
          100: "#F8F8F8",
          200: "#EAEAEA",
          300: "#FAFAFA",
          400: "#A6A6A6",
          500: "#7F7F7F",
          600: "#525252",
          700: "#393939",
          800: "#262626",
          900: "#171717",
        },
      },
      // TODO: Since tailwind uses minimum width, and we need to add tablet and mobile, I increased the width by 1px
      screens: {
        xs: "0px",
        sm370: "390px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
      },
    },
  },
  plugins: [],
};
