import { USER_SIGNIN_API } from "../Constants/ExJiraConstant";

export const signinAction = (email, passWord) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email,
      passWord,
    },
  };
};
