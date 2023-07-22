/** @type {import('tailwindcss').Config} */
module.exports = {
      content: [
            "./layout/*.liquid",
            "./sections/*.liquid",
            "./snippets/*.liquid",
            "./templates/customers/*.liquid",
            "./templates/*.liquid",
      ],
      theme: {
            extend: {
                  colors: {
                        important: "#FBBF24",
                        "link-highlight": "#ff7849",
                  },
                  height: {
                        94: "22rem",
                  },
                  fontFamily: {
                        inter: ["Inter", "sans-serif"],
                        lexend: ["Lexend", "sans-serif"],
                  },
            },
      },
      plugins: [],
};
