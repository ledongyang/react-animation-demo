// action types
const CHANGE_GAME_PHASE = 'CHANGE_GAME_PHASE';
const CHANGE_TURN = 'CHANGE_TURN';
const GET_ROUND = 'GET_ROUND';
const GET_MY_SCORE = 'GET_MY_SCORE';
const GET_OPPONENT_SCORE = 'GET_OPPONENT_SCORE';

// initial state
const initial_state = {
  gamePhase: 'initial',
  whosTurn: '',
  round: 1,
  myScore: 0,
  opponentScore: 0
};

// action creator
const getGamePhase = (gamePhase) => (
  {
    type: CHANGE_GAME_PHASE,
    gamePhase
  }
)

const getWhosTurn = (turn) => (
  {
    type: CHANGE_TURN,
    turn
  }
)

const getRound = (round) => (
  {
    type: GET_ROUND,
    round
  }
)

const getMyScore = (score) => (
  {
    type: GET_MY_SCORE,
    score
  }
)

const getOpponentScore = (score) => (
  {
    type: GET_OPPONENT_SCORE,
    score
  }
)

// thunk creator
export const changeGamePhase = (gamePhase) => {
  return (dispatch) => {
    dispatch(getGamePhase(gamePhase));
  }
}

export const changeTurn = (turn) => {
  return (dispatch) => {
    dispatch(getWhosTurn(turn));
  }
}

export const updateRound = (round) => {
  return (dispatch) => {
    dispatch(getRound(round))
  }
}

export const UpdateMyScore = (score) => {
  return (dispatch) => {
    dispatch(getMyScore(score));
  }
}

export const UpdateOpponentScore = (score) => {
  return (dispatch) => {
    dispatch(getOpponentScore(score));
  }
}

// reducer
export default (state = initial_state, action) => {
  switch (action.type) {
    case CHANGE_GAME_PHASE:
      return {
        ...state,
        gamePhase: action.gamePhase
      }
    case CHANGE_TURN:
      return {
        ...state,
        whosTurn: action.turn
      }
    case GET_ROUND:
      return {
        ...state,
        round: action.round
      }
    case GET_MY_SCORE:
      return {
        ...state,
        myScore: action.score
      }
    case GET_OPPONENT_SCORE:
      return {
        ...state,
        opponentScore: action.score
      }
    default:
      return state;
  }
}
