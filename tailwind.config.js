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
                        "light-background": "#f9fafb",
                        "hard-border": "#9ca3af",
                        "light-border": "#d1d5db",
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
