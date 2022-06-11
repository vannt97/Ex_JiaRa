import { DISPLAY_LOADING, HIDE_LOADING } from "../Constants/LoadingConstant";

let stateInitial = {
  isLoading: false,
};

const LoadingReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      return { ...state, isLoading: true };
    }
    case HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    default: {
      return { ...state };
    }
  }
};

export default LoadingReducer;
