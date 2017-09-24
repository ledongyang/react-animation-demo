// action types
const CHANGE_GAME_PHASE = 'CHANGE_GAME_PHASE';
const CHANGE_TURN = 'CHANGE_TURN';

// initial state
const initial_state = {
  gamePhase: 'initial',
  whosTurn: ''
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
    default:
      return state;
  }
}
