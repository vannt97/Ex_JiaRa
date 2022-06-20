import { USER_LOGIN } from "../../Util/SystemSetting/SystemSetting";
import { USER_LOGIN_ADD_STATE } from "../Constants/ExJiraConstant";
import {
  GET_USERS,
  GET_USER_BY_PROJECT_ID,
} from "../Constants/UserJiraConstant";

let userLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

let stateInitial = {
  userLogin,
  listUser: [],
  listUserFromCreateTask: [],
  listUserByProjectId: [],
};

const UserReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case USER_LOGIN_ADD_STATE: {
      return { ...state, userLogin: { ...action.userLogin } };
    }
    case GET_USERS: {
      return { ...state, listUser: [...action.listUser] };
    }
    case GET_USER_BY_PROJECT_ID: {
      return { ...state, listUserByProjectId: [...action.listUserByProjectId] };
    }
    default: {
      return { ...state };
    }
  }
};

export default UserReducer;
