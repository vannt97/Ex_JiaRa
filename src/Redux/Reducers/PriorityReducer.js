import { GET_LIST_PRIORITY } from "../Constants/PriorityContant";

const initialState = {
  listPriority: [],
};

const PriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PRIORITY: {
      return { ...state, listPriority: [...action.listPriority] };
    }
    default:
      return { ...state };
  }
};

export default PriorityReducer;
