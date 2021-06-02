const PRIMITIVE = ['string', 'number', 'boolean', 'date', 'null', 'undefined'];

export default {

  build($container, item) {
    const obj = typeof item === 'object' ? item : JSON.parse(item);

    const $el = document.createElement('div');
    $el.classList.add('human-js');

    Object.entries(obj).forEach((pair) => this.addNode($el, pair));
    $container.append($el);
  },

  findType(item) {
    if (item === null) return 'null';
    if (item === undefined) return 'undefined';
    if (Array.isArray(item)) return 'array';
    return typeof item;
  },

  addNode($parent, [key, value]) {
    const type = this.findType(value);
    const isPrimitive = PRIMITIVE.includes(type);

    if (isPrimitive) {
      $parent.append(this.addPrimitive(key, value, type));
    } else {
      $parent.append(this.addNonPrimitive(key, value, type));
    }
  },

  addPrimitive(key, value, type) {
    const $container = document.createElement('div');
    $container.classList.add('primitive', 'entry', type);

    this.addKey($container, key);

    const $value = document.createElement('span');
    $value.innerHTML = value === null ? 'null' : value;
    $value.classList.add('value', type);
    $container.append($value);
    return $container;
  },

  addNonPrimitive(key, value, type) {
    const $container = document.createElement('details');
    $container.classList.add('entry', 'non-primitive', type);

    if (Object.keys(value).length) $container.setAttribute('open', true);
    else $container.classList.add('empty');
    this.addKey($container, key, 'summary');

    Object.entries(value).forEach((pair) => this.addNode($container, pair));
    return $container;
  },

  addKey($parent, key, nodeType = 'span') {
    const $key = document.createElement(nodeType);
    $key.innerHTML = key;
    $key.classList.add('key');
    $parent.append($key);
  },
};
