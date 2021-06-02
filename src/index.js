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
    const isEmpty = isPrimitive ? false : Object.keys(value).length === 0;

    let $container;

    if (isPrimitive) {
      $container = document.createElement('div');
      $container.classList.add('primitive');

      this.addKey($container, key);

      const $value = document.createElement('span');
      $value.innerHTML = value === null ? 'null' : value;
      $value.classList.add('value', type);
      $container.append($value);
    } else {
      $container = document.createElement('details');
      if (!isEmpty) $container.setAttribute('open', true);
      else $container.classList.add('empty');

      $container.classList.add('entry', 'non-primitive', type);
      this.addKey($container, key, 'summary');
      Object.entries(value).forEach((pair) => this.addNode($container, pair));
    }

    $container.classList.add('entry', type);
    $parent.append($container);
  },

  addKey($parent, key, nodeType = 'span') {
    const $key = document.createElement(nodeType);
    $key.innerHTML = key;
    $key.classList.add('key');
    $parent.append($key);
  },
};
