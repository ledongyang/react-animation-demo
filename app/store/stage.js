// action types
const CHANGE_STAGE = 'CHANGE_STAGE';

// initial state
const initial_state = 'initial';

// action creator
const getStage = (stage) => (
  {
    type: CHANGE_STAGE,
    stage
  }
)

// thunk creator
export const changeStage = (stage) => {
  return (dispatch) => {
    dispatch(getStage(stage))
  }
}

// reducer
export default (state = initial_state, action) => {
  switch (action.type) {
    case CHANGE_STAGE:
      return action.stage;
    default:
      return state;
  }
}
