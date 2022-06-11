import { ADD_HISTORY } from "../Constants/HistoryConstant";

let stateInitial = {
  history: {},
};

const HistoryReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case ADD_HISTORY: {
      state.history = action.history;
      return { ...state, history: { ...action.history } };
    }
    default: {
      return { ...state };
    }
  }
};

export default HistoryReducer;
