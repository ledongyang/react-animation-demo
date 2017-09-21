import deck from '../../public/data/deck';

// action types
const INIT_DECK = 'INIT_DECK';
const GET_DECK = 'GET_DECK';
const GET_MY_HAND = 'GET_MY_HAND';
const GET_OPPONENT_HAND = 'GET_OPPONENT_HAND';
const GET_BOARD_HAND = 'GET_BOARD_HAND';
const CHANGE_INITIAL_STATE = 'CHANGE_INITIAL_STATE';
const GET_NEW_CARD = 'GET_NEW_CARD';
const GET_UPDATED_DECK = 'GET_UPDATED_DECK';

// initial state
const initial_state = {
  initial: true,
  drawingCard: {},
  myHand: [],
  opponentHand: [],
  boardHand: [],
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

const getBoardHand = boardHand => (
  {
    type: GET_BOARD_HAND,
    boardHand
  }
)

const changeIntialState = () => (
  {
    type: CHANGE_INITIAL_STATE,
    initial: false
  }
)

const getNewCard = (drawingCard) => (
  {
    type: GET_NEW_CARD,
    drawingCard
  }
)

const getUpdatedDeck = (deck) => {
  {
    type: GET_UPDATED_DECK,
    deck
  }
}

// const drawToHand = () => {
//   {
//     type: DRAW_TO_HAND,
//   }
// }

// thunk creator
export const initDeck = (newDeck) => {
  return function thunk (dispatch) {
    dispatch(getDeck(newDeck))
  }
}

export const shuffleHand = (newDeck) => {
  const {initial, myHand, opponentHand, boardHand, deck} = shuffle(newDeck);
  return function thunk (dispatch) {
    dispatch(getMyHand(myHand));
    dispatch(getOpponentHand(opponentHand));
    dispatch(getBoardHand(boardHand));
    dispatch(getDeck(deck));
    dispatch(changeIntialState());
  }
}

export const drawToHand = (deck) => {
  const {drawingCard, updatedDeck} = drawACard(deck);
  return function thunk (dispatch) {
    dispatch(getNewCard(drawingCard));
    dispatch(getUpdatedDeck(updatedDeck));
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
    case GET_BOARD_HAND:
      return {
        ...state,
        boardHand: action.boardHand
      }
    case CHANGE_INITIAL_STATE:
      return {
        ...state,
        initial: action.initial
      }
    case GET_NEW_CARD:
      return {
        ...state,
        drawingCard: action.drawingCard
      }
    case GET_UPDATED_DECK:
      return {
        ...state,
        deck: action.deck
      }
    default:
      return state;
  }
}

// helper functions
const shuffle = (newDeck) => {
  const deck = newDeck.slice();
  // console.log('deck--->', deck)
  const myHand = [], opponentHand = [], boardHand = [];
  let random, deckSize = deck.length, handSize = 2, boardHandSize = 3;
  for (let i = 0; i < handSize; i++) {
    random = randomCardIndex(deckSize--);
    // console.log('random 1--->', random)
    myHand.push(deck[random]);
    deck.splice(random, 1);
    random = randomCardIndex(deckSize--);
    // console.log('random 2--->', random)
    opponentHand.push(deck[random]);
    deck.splice(random, 1);
    // deckSize--;
  }
  for (let j = 0; j < boardHandSize; j++) {
    random = randomCardIndex(deckSize--);
    boardHand.push(deck[random]);
    deck.splice(random, 1);
  }
  return {
    initial: false,
    myHand,
    opponentHand,
    boardHand,
    deck
  }
}

const drawACard = (deck) => {
  const deckSize = deck.length;
  const random = randomCardIndex(deckSize);
  const drawingCard = deck[random];
  deck.splice(random, 1);
  return {
    drawingCard,
    updatedDeck: deck
  }
}

const randomCardIndex = (numOfCards) => Math.floor(Math.random() * numOfCards);

