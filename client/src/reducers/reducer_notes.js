import * as types from '../actions/constant_types';

// default state for reducer
const INITIAL_STATE = { notes: [], note_viewing: {id:'', name:'Welcome', content:'<- Select a note'}, error:'' };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case types.FETCH_NOTES:
    return { ...state, notes: action.payload };
  case types.FETCH_NOTE:
    return { ...state, note_viewing: action.payload, error:'' };
  case types.ERROR_NOTE:
    return { ...state, error: action.payload };
  case types.RESET_NOTE:
    return { ...state, note_viewing: {id:'', name:'Welcome', content:'<- Select a note'}, error:'' };
  default:
    return { ...state, error:'' };
  }
}