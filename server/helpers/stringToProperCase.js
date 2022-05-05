const drinks = [
  { name: 'martini' },
  { name: 'dry martini' },
];

drinks.forEach((drink) => drink.name.replace(/\w\S*/g, (word) => (word.replace(/^\w/, (character) => character.toUpperCase()))));
