const faker = require('faker');
const fs = require('fs');
const path = require('path');

const children = 20;
const obj = { people: [] };

Array(children).fill().forEach(() => {
  obj.people.push({
    name: faker.random.number(),
  });
});

fs.writeFileSync(path.resolve(process.cwd(), 'examples/data.json'), JSON.stringify(obj, null, 2));
