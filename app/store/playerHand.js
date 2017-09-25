import deck from '../../public/data/deck';
import evolvedCards from '../../public/data/evolvedCards';

// action types
const INIT_DECK = 'INIT_DECK';
const GET_DECK = 'GET_DECK';
const GET_MY_BOARD = 'GET_MY_BOARD';
const GET_OPPONENT_BOARD = 'GET_OPPONENT_BOARD';
const GET_MY_HAND = 'GET_MY_HAND';
const GET_OPPONENT_HAND = 'GET_OPPONENT_HAND';
const DRAW_TO_MY_HAND = 'DRAW_TO_MY_HAND';
const DRAW_TO_OPPONENT_HAND = 'DRAW_TO_OPPONENT_HAND';
const PLAY_TO_MY_BOARD = 'PLAY_TO_MY_BOARD';
const PLAY_TO_OPPONENT_BOARD = 'PLAY_TO_OPPONENT_BOARD';
const PLAY_FROM_MY_HAND = 'PLAY_FROM_MY_HAND';
const PLAY_FROM_OPPONENT_HAND = 'PLAY_FROM_OPPONENT_HAND';
const GET_CARD_DETAIL = 'GET_CARD_DETAIL';
const REMOVE_FROM_MY_BOARD = 'REMOVE_FROM_MY_BOARD';
const REMOVE_FROM_OPPONENT_BOARD = 'REMOVE_FROM_OPPONENT_BOARD';
const CLEAR_MY_BOARD = 'CLEAR_MY_BOARD';
const CLEAR_OPPONENT_BOARD = 'CLEAR_OPPONENT_BOARD';
// const GET_BOARD_HAND = 'GET_BOARD_HAND';
// const GET_NEW_CARD = 'GET_NEW_CARD';

// initial state
const initial_state = {
  // drawingCard: {},
  myHand: {
    id: Math.random(),
    handCards: []
  },
  opponentHand: {
    id: Math.random(),
    handCards: []
  },
  myBoard: {
    id: Math.random(),
    boardCards: []
  },
  opponentBoard: {
    id: Math.random(),
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

const drawToOpponentHand = drawingCard => (
  {
    type: DRAW_TO_OPPONENT_HAND,
    drawingCard
  }
)

const playToMyBoard = playingCard => (
  {
    type: PLAY_TO_MY_BOARD,
    playingCard
  }
)

const playToOpponentBoard = playingCard => (
  {
    type: PLAY_TO_OPPONENT_BOARD,
    playingCard
  }
)

const playFromMyHand = playingCard => (
  {
    type: PLAY_FROM_MY_HAND,
    playingCard
  }
)

const playFromOpponentHand = playingCard => (
  {
    type: PLAY_FROM_OPPONENT_HAND,
    playingCard
  }
)

const getMyBoard = (myBoard) => (
  {
    type: GET_MY_BOARD,
    myBoard
  }
)

const getOpponentBoard = (opponentBoard) => (
  {
    type: GET_OPPONENT_BOARD,
    opponentBoard
  }
)

const getCardDetail = (card) => (
  {
    type: GET_CARD_DETAIL,
    card
  }
)

const removeFromMyBoard= (cards) => (
  {
    type: REMOVE_FROM_MY_BOARD,
    cards
  }
)

const removeFromOpponentBoard = (cards) => (
  {
    type: REMOVE_FROM_OPPONENT_BOARD,
    cards
  }
)

const clearMyBoard = () => (
  {
    type: CLEAR_MY_BOARD
  }
)

const clearOpponentBoard = () => (
  {
    type: CLEAR_OPPONENT_BOARD
  }
)

// thunk creator
export const initDeck = (newDeck) => {
  return function thunk (dispatch) {
    dispatch(getDeck(newDeck))
  }
}

export const shuffleHand = (newDeck) => {
  const {myHand, opponentHand, myBoard, opponentBoard, deck} = shuffle(newDeck);
  return function thunk (dispatch) {
    dispatch(getMyHand(myHand));
    dispatch(getOpponentHand(opponentHand));
    dispatch(getMyBoard(myBoard));
    dispatch(getOpponentBoard(opponentBoard));
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

export const playCard = (playingCard, whosTurn) => {
  return function thunk (dispatch) {
    if (whosTurn === 'opponentturn') {
      dispatch(playFromOpponentHand(playingCard));
      dispatch(playToOpponentBoard(playingCard));

    } else {
      dispatch(playFromMyHand(playingCard));
      dispatch(playToMyBoard(playingCard));

    }
  }
}

export const showCardDetail = (card) => {
  return function thunk (dispatch) {
    dispatch(getCardDetail(card));
  }
}

export const evolve = (card1, card2, whosTurn) => {
  return function thunk (dispatch) {
    const evolvedCard = evolveToOne(card1, card2);
    // console.log('evolved card--->', evolvedCard);
    if (whosTurn === 'opponentturn') {
      dispatch(removeFromOpponentBoard([card1, card2]));
      dispatch(playToOpponentBoard(evolvedCard));
    } else {
      dispatch(removeFromMyBoard([card1, card2]));
      dispatch(playToMyBoard(evolvedCard));
    }
  }
}

export const clearBoard = () => {
  return (dispatch) => {
    dispatch(clearMyBoard());
    dispatch(clearOpponentBoard());
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
    case GET_OPPONENT_BOARD:
      return {
        ...state,
        opponentBoard: action.opponentBoard
      }
    case DRAW_TO_MY_HAND:
      return {
        ...state,
        myHand: {
          ...state.myHand,
          handCards: [...state.myHand.handCards, action.drawingCard]
        }
      }
    case DRAW_TO_OPPONENT_HAND:
      return {
        ...state,
        opponentHand: {
          ...state.opponentHand,
          handCards: [...state.opponentHand.handCards, action.drawingCard]
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
    case PLAY_TO_OPPONENT_BOARD:
      return {
        ...state,
        opponentBoard: {
          ...state.opponentBoard,
          boardCards: [...state.opponentBoard.boardCards, action.playingCard]
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
    case PLAY_FROM_OPPONENT_HAND:
      return {
        ...state,
        opponentHand: {
          ...state.opponentHand,
          handCards: state.opponentHand.handCards.filter(handCard => +handCard.id !== +action.playingCard.id)
        }
      }
    case GET_CARD_DETAIL:
      return {
        ...state,
        cardDetail: action.card
      }
    case REMOVE_FROM_MY_BOARD:
      return {
        ...state,
        myBoard: {
          ...state.myBoard,
          boardCards: state.myBoard.boardCards.filter(boardCard => +boardCard.id !== +action.cards[0].id && +boardCard.id !== +action.cards[1].id)
        }
      }
    case REMOVE_FROM_OPPONENT_BOARD:
      return {
        ...state,
        opponentBoard: {
          ...state.opponentBoard,
          boardCards: state.opponentBoard.boardCards.filter(boardCard => +boardCard.id !== +action.cards[0].id && +boardCard.id !== +action.cards[1].id)
        }
      }
    case CLEAR_MY_BOARD:
      return {
        ...state,
        myBoard: {
          ...state.myBoard,
          boardCards: []
        }
      }
    case CLEAR_OPPONENT_BOARD:
      return {
        ...state,
        opponentBoard: {
          ...state.opponentBoard,
          boardCards: []
        }
      }
    default:
      return state;
  }
}

// helper functions
const evolveToOne = (card1, card2) => {
  const type = card1.type;
  const level = card1.level + card2.level;
  return evolvedCards[type].find(card => +card.level === level)
}

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
  }, opponentBoard = {
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
    opponentBoard,
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
