import deck from '../../public/data/deck';

// action types
const INIT_DECK = 'INIT_DECK';
const GET_DECK = 'GET_DECK';
const GET_MY_BOARD = 'GET_MY_BOARD';
const GET_MY_HAND = 'GET_MY_HAND';
const GET_OPPONENT_HAND = 'GET_OPPONENT_HAND';
const DRAW_TO_MY_HAND = 'DRAW_TO_MY_HAND';
const PLAY_TO_MY_BOARD = 'PLAY_TO_MY_BOARD';
const PLAY_FROM_MY_HAND = 'PLAY_FROM_MY_HAND';
const GET_CARD_DETAIL = 'GET_CARD_DETAIL';
// const GET_BOARD_HAND = 'GET_BOARD_HAND';
// const GET_NEW_CARD = 'GET_NEW_CARD';

// initial state
const initial_state = {
  // drawingCard: {},
  myHand: {
    id: null,
    handCards: []
  },
  opponentHand: {
    id: null,
    handCards: []
  },
  myBoard: {
    id: null,
    boardCards: []
  },
  cardDetail: {},
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

const drawToMyHand = drawingCard => (
  {
    type: DRAW_TO_MY_HAND,
    drawingCard
  }
)

const playToMyBoard = playingCard => (
  {
    type: PLAY_TO_MY_BOARD,
    playingCard
  }
)

const playFromMyHand = playingCard => (
  {
    type: PLAY_FROM_MY_HAND,
    playingCard
  }
)

const getMyBoard = (myBoard) => (
  {
    type: GET_MY_BOARD,
    myBoard
  }
)

const getCardDetail = (card) => (
  {
    type: GET_CARD_DETAIL,
    card
  }
)

// const getBoardHand = boardHand => (
//   {
//     type: GET_BOARD_HAND,
//     boardHand
//   }
// )

// const getNewCard = (drawingCard) => (
//   {
//     type: GET_NEW_CARD,
//     drawingCard
//   }
// )

// thunk creator
export const initDeck = (newDeck) => {
  return function thunk (dispatch) {
    dispatch(getDeck(newDeck))
  }
}

export const shuffleHand = (newDeck) => {
  const {myHand, opponentHand, myBoard, deck} = shuffle(newDeck);
  return function thunk (dispatch) {
    dispatch(getMyHand(myHand));
    dispatch(getOpponentHand(opponentHand));
    dispatch(getMyBoard(myBoard));
    dispatch(getDeck(deck));
  }
}

export const drawToHand = (deck) => {
  const {drawingCard, updatedDeck} = drawACard(deck);
  return function thunk (dispatch) {
    // dispatch(getNewCard(drawingCard));
    dispatch(drawToMyHand(drawingCard));
    dispatch(getDeck(updatedDeck));
  }
}

export const playCard = (playingCard) => {
  return function thunk (dispatch) {
    dispatch(playFromMyHand(playingCard));
    dispatch(playToMyBoard(playingCard));
  }
}

export const showCardDetail = (card) => {
  return function thunk (dispatch) {
    dispatch(getCardDetail(card));
  }
}

export const evolve = (card1, card2) => {
  return function thunk (dispatch) {

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
    case GET_MY_BOARD:
      return {
        ...state,
        myBoard: action.myBoard
      }
    case DRAW_TO_MY_HAND:
      return {
        ...state,
        myHand: {
          ...state.myHand,
          handCards: [...state.myHand.handCards, action.drawingCard]
        }
      }
    case PLAY_TO_MY_BOARD:
      return {
        ...state,
        myBoard: {
          ...state.myBoard,
          boardCards: [...state.myBoard.boardCards, action.playingCard]
        }
      }
    case PLAY_FROM_MY_HAND:
      return {
        ...state,
        myHand: {
          ...state.myHand,
          handCards: state.myHand.handCards.filter(handCard => +handCard.id !== +action.playingCard.id)
        }
      }
    case GET_CARD_DETAIL:
      return {
        ...state,
        cardDetail: action.card
      }
    default:
      return state;
  }
}

// helper functions
const shuffle = (newDeck) => {
  const deck = newDeck.slice();
  // console.log('deck--->', deck)
  const myHand = {
    id: generateKey(),
    handCards: []
  }, opponentHand = {
    id: generateKey(),
    handCards: []
  }, myBoard = {
    id: generateKey(),
    boardCards: []
  }
  let random, deckSize = deck.length, handSize = 5;
  for (let i = 0; i < handSize; i++) {
    random = randomCardIndex(deckSize--);
    // console.log('random 1--->', random)
    myHand.handCards.push(deck[random]);
    deck.splice(random, 1);
    random = randomCardIndex(deckSize--);
    // console.log('random 2--->', random)
    opponentHand.handCards.push(deck[random]);
    deck.splice(random, 1);
    // deckSize--;
  }
  // for (let j = 0; j < boardHandSize; j++) {
  //   random = randomCardIndex(deckSize--);
  //   boardHand.push(deck[random]);
  //   deck.splice(random, 1);
  // }
  return {
    myHand,
    myBoard,
    opponentHand,
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

const generateKey = () => Math.random();
