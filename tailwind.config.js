module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xls: "240px",
        xs: "320px",
      },
    },
  },
  plugins: [],
};
