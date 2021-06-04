const PRIMITIVE = ['string', 'number', 'boolean', 'date', 'null', 'undefined'];

export default {

  findType(item) {
    if (item === null) return 'null';
    if (item === undefined) return 'undefined';
    if (Array.isArray(item)) return 'array';
    return typeof item;
  },

  entriesFromObj(obj) {
    return Object.entries(obj).map((pair) => this.addNode(pair)).join('\n');
  },

  addNode([key, value]) {
    const type = this.findType(value);
    const isPrimitive = PRIMITIVE.includes(type);
    return (isPrimitive) ? this.addPrimitive(key, value, type) : this.addNonPrimitive(key, value, type);
  },

  addPrimitive(key, value, type) {
    let displayVal = value;
    if (value === null) displayVal = 'null';
    else if (value === undefined) displayVal = 'undefined';

    return `<div class="primitive entry ${type}">
      <span class="key">${key}</span>
      <span class="value ${type}">${displayVal}</span>
    </div>`;
  },

  addNonPrimitive(key, value, type) {
    const isEmpty = !Object.keys.length;
    return `<details class="entry non-primitive ${type} ${isEmpty ? 'empty' : ''}" ${isEmpty ? '' : 'open'}>
      <summary class="key">${key}</summary>
      ${this.entriesFromObj(value)}
    </details>`;
  },

};
