const EXPRESSIONS = [
  {
    search: /\n(.*\s\{)/gm,
    replace(match, key) {
      const replacement = key.startsWith(' ') ? key.replace(' ', '') : key;
      return `<details open><summary>${replacement}</summary>`;
    },
  },
  {
    search: /\n(.*\s\},?)/gm,
    replace: (match, key) => `${key}</details>`,
  },
  {
    search: /"(.*?)"/gm,
    replace: (match) => `<span class="string">${match}</span>`,
  },
  {
    search: /:\s(false|true)(?:\n|[,])/gm,
    replace: (match, key) => match.replace(key, `<span class="boolean">${key}</span>`),
  },
  {
    search: /:\s(null|undefined)(?:\n|[,])/gm,
    replace: (match, key) => match.replace(key, `<span class="nullish">${key}</span>`),
  },
  // {
  //   search: /:\s([\d|.]*)/gm,
  //   replace: (match, key) => match.replace(key, `<span class="numeric">${key}</span>`),
  // },
];

export default {
  build(subject) {
    let ret = typeof subject === 'string' ? JSON.stringify(JSON.parse(subject), null, 2) : JSON.stringify(subject, null, 2);

    EXPRESSIONS.forEach(({ search, replace }) => {
      ret = ret.replace(search, replace);
    });
    return ret;
  },
};
