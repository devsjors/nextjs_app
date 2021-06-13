const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}"
    ],
    options: {
      safelist: [/^bg-/, /^text-/]
    }
  },
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        types: {
          normal: "#A8A878",
          fire: "#F08030",
          fighting: "#C03028",
          water: "#6890F0",
          flying: "#A890F0",
          grass: "#78C850",
          poison: "#A040A0",
          electric: "#F8D030",
          ground: "#E0C068",
          psychic: "#F85888",
          rock: "#B8A038",
          ice: "#98D8D8",
          bug: "#A8B820",
          dragon: "#7038F8",
          ghost: "#705898",
          dark: "#705848",
          steel: "#B8B8D0",
          fairy: "#EE99AC"
        }
      },
      fontFamily: {
        display: ["Raleway", ...defaultTheme.fontFamily.sans],
        body: ["Montserrat", ...defaultTheme.fontFamily.sans]
      },
      borderRadius: {
        100: "100%"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".container": {
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          maxWidth: theme("screens.xl"),
          "@screen md": {
            paddingLeft: "32px",
            paddingRight: "32px"
          },
          "@screen lg": {
            paddingLeft: "48px",
            paddingRight: "48px"
          },
          "@screen 2xl": {
            paddingLeft: "0px",
            paddingRight: "0px"
          }
        }
      });
    }
  ]
};
