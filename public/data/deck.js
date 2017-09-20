const deck = [];
const cardFront = [
  './images/heart3.png',
  './images/hearta.png',
  './images/heart2.png',
  './images/diamond10.png',
  './images/black7.png'
];

for (let i = 0; i < 52; i++) {
  deck.push({
    id: i,
    cardFront: cardFront[0]
  })
}

export default deck;
