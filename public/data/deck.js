const deck = [];
const cardFront = [
  './images/cardFront/heart3.png',
  './images/cardFront/hearta.png',
  './images/cardFront/heart2.png',
  './images/cardFront/diamond10.png',
  './images/cardFront/black7.png'
];

for (let i = 0; i < 52; i++) {
  deck.push({
    id: i,
    cardFront: cardFront[0]
  })
}

export default deck;
