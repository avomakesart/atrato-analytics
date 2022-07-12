const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

module.exports = {
  presets: [require('../../tailwind-workspace-preset.js')],
  content: [
    join(
      __dirname,
      '{src,lib,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: { 950: '#99B1FF', 1000: '#3363FF', 1050: '#001866' },
        orange: {
          950: '#FEC69A',
          1000: '#FD8E35',
          1050: '#CA5B02',
        },
        gray: {
          950: '#FFFFFF',
          1000: '#F8F8F9',
          1050: '#E3E5E9',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
