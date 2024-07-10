module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'main_s': "url('src/assets/images/background_s.png')",
        'main_h': "url('src/assets/images/background_h.png')",
        'main_v': "url('src/assets/images/background_v.png')",
      },
      rotate: {
        '355': '355deg',
      },
      fontFamily: {
        'dnf':['DNFBitBitv2'],
        'dgm':['DungGeunMo']
      },
      fontSize: {
        '9xl': '9.375rem',
        '6xl': '4.375rem'
      },
      boxShadow: {
        'shadow_tr': '16.5px -10px 28.2px 0px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};