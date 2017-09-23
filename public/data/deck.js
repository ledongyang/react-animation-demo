const deck = [];
const cardFront = [
  './images/cardFront/earth-01.jpeg',
  './images/cardFront/earth-01.jpeg',
  './images/cardFront/earth-01.jpeg',
  './images/cardFront/earth-01.jpeg',
  './images/cardFront/fire-01.jpeg',
  './images/cardFront/fire-01.jpeg',
  './images/cardFront/fire-01.jpeg',
  './images/cardFront/fire-01.jpeg',
  './images/cardFront/water-01.jpeg',
  './images/cardFront/water-01.jpeg',
  './images/cardFront/water-01.jpeg',
  './images/cardFront/water-01.jpeg',
];

for (let i = 0; i < 4; i++) {
  deck.push({
    id: i,
    type: 'earth',
    level: 1,
    bp: 1000,
    cardFront: cardFront[i]
  })
}

for (let i = 4; i < 8; i++) {
  deck.push({
    id: i,
    type: 'fire',
    level: 1,
    bp: 1000,
    cardFront: cardFront[i]
  })
}

for (let i = 8; i < 12; i++) {
  deck.push({
    id: i,
    type: 'water',
    level: 1,
    bp: 1000,
    cardFront: cardFront[i]
  })
}

export default deck;
