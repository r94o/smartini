const drinks = [
  { name: '1-900-fuk-me-up' },
  { name: 'acid' },
];

drinks.forEach((drink) => drink.name.replace(/\w\S*/g, (word) => (word.replace(/^\w/, (character) => character.toUpperCase()))));
