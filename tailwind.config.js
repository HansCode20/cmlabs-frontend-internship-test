/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Pages/*.{html,js}",
    "./JS/**/*.{js}", // Menambahkan folder JS ke konfigurasi
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
