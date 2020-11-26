import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResizeObserver from 'resize-observer-polyfill';

Enzyme.configure({ adapter: new Adapter() });

SVGElement.prototype.getBBox = () => ({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
});

HTMLElement.prototype.scrollIntoView = () => void 0;

global.ResizeObserver = ResizeObserver;

Object.assign(global.window, {
  matchMedia: () => ({
    addEventListener: () => void 0,
    removeEventListener: () => void 0,
    matches: true,
  }),
});
