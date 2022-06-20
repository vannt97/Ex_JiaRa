import { GET_ALL_STATUS } from "../Constants/StatusConstant";
import {
  CHANGE_ASSIGNESS,
  CHANGE_PROPERTY_IN_TASK,
  GET_TASK_DETAIL,
  REMOVE_USER_ASSIGNESS,
} from "../Constants/TaskConstant";
import { GET_TASK_TYPE } from "../Constants/TaskTypeConstant";

const initialState = {
  listTaskType: [],
  listStatus: [],
  taskDetailModal: {},
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_TYPE: {
      return { ...state, listTaskType: [...action.taskType] };
    }
    case GET_ALL_STATUS: {
      return { ...state, listStatus: [...action.listStatus] };
    }
    case GET_TASK_DETAIL: {
      return { ...state, taskDetailModal: { ...action.taskDetailModal } };
    }

    case CHANGE_ASSIGNESS: {
      // state.taskDetailModal.assigness = [
      //   ...state.taskDetailModal.assigness,
      //   action.userSelect,
      // ];
      // console.log(state.taskDetailModal);
      return {
        ...state,
        taskDetailModal: {
          ...state.taskDetailModal,
          assigness: [...state.taskDetailModal.assigness, action.userSelect],
        },
      };
    }
    case CHANGE_PROPERTY_IN_TASK: {
      return {
        ...state,
        taskDetailModal: {
          ...state.taskDetailModal,
          [action.name]: action.value,
        },
      };
    }
    case REMOVE_USER_ASSIGNESS: {
      let arrAssigness = [
        ...state.taskDetailModal.assigness.filter(
          (user) => user.id !== action.userId
        ),
      ];
      return {
        ...state,
        taskDetailModal: {
          ...state.taskDetailModal,
          assigness: arrAssigness,
        },
      };
    }
    default:
      return { ...state };
  }
};

export default TaskReducer;
