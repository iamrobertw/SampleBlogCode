module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
              color: theme('colors.green.500'),
              fontWeight: '600',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
      }),
      colors: {
        colour: {
          111: '#ffffff',
        },
        blue: {
          555: '#0787b1',
        },
        orange: {
          555: '#f6a623',
        },
        purple: {
          555: '#9842f5',
        },
        green: {
          555: '#00a562',
        },
        red: {
          555: '#FF4500',
        },
      },
      zIndex: {
        '-10': '-10',
      },
      inset: {
        '21': '5.25rem',
      },
      animation: {
        categories: 'categories .5s',
      },
      keyframes: {
        categories: {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'none',
          },
        },
        goBack: {
          '0%': { background: 'white' },
          '100%': { background: '#000000' },
        }
      },
      fontFamily: {
        lato: ['Lato'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [''],
  plugins: [require('@tailwindcss/typography')],
};
