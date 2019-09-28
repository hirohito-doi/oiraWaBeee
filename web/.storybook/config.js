import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
configure(require.context('../react/components', true, /\.stories\.js$/), module);
