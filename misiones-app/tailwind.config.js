export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        bg: {
          app: "#E0E5EC",
          card: "#E0E5EC"
        },
        base: {
          white: "#FFFFFF",
          gray: {
            100: "#F0F2F5",
            200: "#E0E0E0",
            300: "#B8C2CC",
            500: "#718096",
            800: "#2D3748"
          }
        },
        brand: {
          primary: "#E0E5EC",
          accent: {
            green: "#15803d",
            greenLight: "#22c55e",
            orange: "#f97316",
            red: "#ef4444",
            blue: "#3b82f6",
            yellow: "#eab308"
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"]
      },
      boxShadow: {
        'outset-sm': '4px 4px 8px #B8C2CC, -4px -4px 8px #FFFFFF',
        'outset-md': '8px 8px 16px #B8C2CC, -8px -8px 16px #FFFFFF',
        'outset-lg': '12px 12px 24px #B8C2CC, -12px -12px 24px #FFFFFF',
        'inset-sm': 'inset 3px 3px 6px #B8C2CC, inset -3px -3px 6px #FFFFFF',
        'inset-md': 'inset 6px 6px 12px #B8C2CC, inset -6px -6px 12px #FFFFFF',
        'neumorphism': '-6px -6px 12px 0px white, 6px 6px 12px 0px rgba(0,0,0,0.15)',
        'neumorphism-green': '-6px -6px 12px 0px white, 6px 6px 20px 0px rgba(0,109,54,0.3)',
      }
    },
  },
  plugins: [],
}
