function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".human-json {\n  --bg: #22262e;\n  --key: #81a2be;\n  --string: #b5bd68;\n  --number: #f0c674;\n  --boolean: #b294bb;\n  --null: #d8773b;\n  --border: #444;\n  --base: #efefef;\n  font-family: Monaco, monospace;\n  padding: 2rem;\n  line-height: 1.4rem;\n  background-color: var(--bg);\n  color: var(--base);\n}\n.human-json .entry {\n  position: relative;\n}\n.human-json .entry .entry {\n  margin-left: 0.3rem;\n  padding-left: 1rem;\n  border-left: 1px solid var(--border);\n}\n.human-json .entry .primitive:last-of-type {\n  padding-bottom: 0.5rem;\n}\n.human-json .entry > .entry .key:before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0px;\n  border-bottom: 1px solid var(--border);\n  width: 0.5rem;\n  height: 0.7rem;\n}\n.human-json .entry.empty > .key:after {\n  content: '{}';\n}\n.human-json .entry.empty.array > .key:after {\n  content: '[]';\n}\n.human-json .entry .key {\n  color: var(--key);\n}\n.human-json .entry .key:after {\n  color: var(--base);\n}\n.human-json .entry .value.string {\n  color: var(--string);\n}\n.human-json .entry .value.number {\n  color: var(--number);\n}\n.human-json .entry .value.value.null,\n.human-json .entry .value.undefined {\n  color: var(--null);\n}\n.human-json .entry .value.boolean {\n  color: var(--boolean);\n}\n.human-json details summary,\n.human-json details summary:active {\n  outline: none;\n  cursor: pointer;\n}\n.human-json details summary .divider,\n.human-json details summary:active .divider {\n  color: var(--base);\n}\n.human-json > .object,\n.human-json .array {\n  border: none;\n}\n.human-json .array > .entry:last-child,\n.human-json .object > .entry:last-child {\n  border: none;\n}\n.human-json .object > .entry:last-child > .key:before,\n.human-json .array > .entry:last-child > .key:before {\n  border-left: 1px solid var(--border);\n}\n";
styleInject(css_248z);

const PRIMITIVE = ['string', 'number', 'boolean', 'date', 'null', 'undefined'];

var renderer = {

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
    else if (type === 'string') displayVal = `"${displayVal}"`;

    return `<div class="primitive entry ${type}">
      <span class="key">${key}</span>:
      <span class="value ${type}">${displayVal}</span>
    </div>`;
  },

  addNonPrimitive(key, value, type) {
    const isEmpty = !Object.keys(value).length;
    return `<details class="entry non-primitive ${type} ${isEmpty ? 'empty' : ''}" ${isEmpty ? '' : 'open'}>
      <summary class="key">
        ${key}<span class="divider">:</span>
      </summary>
      ${this.entriesFromObj(value)}
    </details>`;
  },

};

var index = {
  build(target) {
    const obj = typeof target === 'string' ? JSON.parse(target) : target;
    return `<div class="human-json">${renderer.entriesFromObj(obj)}</div>`;
  },

};

export default index;
