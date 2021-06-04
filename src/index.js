import './index.stylus';
import renderer from './renderer';

export default {
  build(target) {
    const obj = typeof target === 'string' ? JSON.parse(target) : target;
    return `<div class="human-json">${renderer.entriesFromObj(obj)}</div>`;
  },

};
