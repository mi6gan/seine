import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';

import './index.css';

configure(requireContext('../packages/', true, /\.stories.js$/), module);
