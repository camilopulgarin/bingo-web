/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        fontFamily: {
          vintage: ['"Rubik Dirt"', 'cursive'],
        },
        colors: {
          retro: {
            bg: '#f7e8c5', // Fondo estilo Cuphead (crema cálido)
            red: '#a7312a',
            blue: '#3b5f8e',
            yellow: '#e8b647',
            brown: '#4e342e',
            cream: '#fff8e1',
          },
        },
        boxShadow: {
          cartoon: '4px 4px 0 rgba(0,0,0,0.6)',
        },
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
          },
          bounceDraw: {
            '0%': { transform: 'scale(1) rotate(0deg)' },
            '30%': { transform: 'scale(1.1) rotate(-2deg)' },
            '60%': { transform: 'scale(0.95) rotate(2deg)' },
            '100%': { transform: 'scale(1) rotate(0deg)' },
          },
        },
        animation: {
          wiggle: 'wiggle 0.5s ease-in-out infinite',
          bounceDraw: 'bounceDraw 0.8s ease-in-out infinite',
        },
        backgroundImage: {
          // Opcional, por si después quieres meter texturas
          'paper-texture': "url('/textures/paper.jpg')",
        },
      },
    },
    plugins: [],
  }
  