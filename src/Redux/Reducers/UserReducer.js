import { USER_LOGIN } from "../../Util/SystemSetting/SystemSetting";
import { USER_LOGIN_ADD_STATE } from "../Constants/ExJiraConstant";

let userLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

let stateInitial = {
  userLogin,
};

const UserReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case USER_LOGIN_ADD_STATE: {
      return { ...state, userLogin: { ...action.userLogin } };
    }
    default: {
      return { ...state };
    }
  }
};

export default UserReducer;
