import deck from '../../public/data/deck';

// action types
const INIT_DECK = 'INIT_DECK';
const GET_DECK = 'GET_DECK';
const GET_MY_HAND = 'GET_MY_HAND';
const GET_OPPONENT_HAND = 'GET_OPPONENT_HAND';

// initial state
const initial_state = {
  myHand: [],
  opponentHand: [],
  deck
}

// action creator
const getDeck = deck => (
  {
    type: GET_DECK,
    deck
  }
)

const getMyHand = myHand => (
  {
    type: GET_MY_HAND,
    myHand
  }
)

const getOpponentHand = opponentHand => (
  {
    type: GET_OPPONENT_HAND,
    opponentHand
  }
)

// thunk creator
export const initDeck = (newDeck) => {
  return function thunk (dispatch) {
    dispatch(getDeck(newDeck))
  }
}

export const shuffleHand = (newDeck) => {
  const {myHand, opponentHand, deck} = shuffle(newDeck);
  return function thunk (dispatch) {
    dispatch(getMyHand(myHand));
    dispatch(getOpponentHand(opponentHand));
    dispatch(getDeck(deck));
  }
}

// reducer
export default function (state = initial_state, action) {
  switch (action.type) {
    case GET_DECK:
      return {
        ...state,
        deck: action.deck
      }
    case GET_MY_HAND:
      return {
        ...state,
        myHand: action.myHand
      }
    case GET_OPPONENT_HAND:
      return {
        ...state,
        opponentHand: action.opponentHand
      }
    default:
      return state;
  }
}

// helper functions
const shuffle = (newDeck) => {
  const deck = newDeck.slice();
  console.log('deck--->', deck)
  const myHand = [], opponentHand = [];
  let random1, random2;
  for (let i = 0; i < 2; i++) {
    random1 = randomCardIndex();
    myHand.push(deck[random1]);
    deck.splice(random1, 1);
    random2 = randomCardIndex();
    while (random2 === random1) {
      random2 = randomCardIndex();
    }
    opponentHand.push(deck[random2]);
    deck.splice(random, 1);
  }
  return {
    myHand,
    opponentHand,
    deck
  }
}

const randomCardIndex = () => Math.floor(Math.random() * 52)

