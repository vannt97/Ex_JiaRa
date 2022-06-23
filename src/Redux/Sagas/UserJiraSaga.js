import {
  ASSIGN_USER_PROjECT,
  DELETE_USER_API,
  GET_USERS,
  GET_USER_API,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_API,
  SIGN_UP_API,
  UPDATE_USER_API,
} from "../Constants/UserJiraConstant";
import { call, takeLatest, put, delay, select } from "redux-saga/effects";
import userService from "../../Services/ExJiraServices/UserService";
import {
  GET_LIST_PROJECT_API,
  HIDE_MODAL_EDIT,
} from "../Constants/ProjectConstant";
import { STATUS_CODE } from "../../Util/SystemSetting/SystemSetting";
import openNotificationWithIcon from "../../Util/Notification/notification";
function* getUser(action) {
  try {
    // let res = yield call(() => {
    //   exJiraService.siginJira(action.userLogin);
    // });
    let { data, status } = yield call(() => {
      return userService.getUser(action.keyWord);
    });
    yield put({ type: GET_USERS, listUser: data.content });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followActionGetUser() {
  yield takeLatest(GET_USER_API, getUser);
}

function* assignUserProject(action) {
  try {
    // let res = yield call(() => {
    //   exJiraService.siginJira(action.userLogin);
    // });
    let { data, status } = yield call(() => {
      return userService.assignUserProject(action.userProject);
    });

    yield put({ type: GET_LIST_PROJECT_API });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* followActionAssignUserProject() {
  yield takeLatest(ASSIGN_USER_PROjECT, assignUserProject);
}

function* getUserByProjectIdApi(action) {
  try {
    let { data, status } = yield call(() => {
      return userService.getUserByProjectId(action.projectId);
    });
    yield put({
      type: GET_USER_BY_PROJECT_ID,
      listUserByProjectId: data.content,
    });
  } catch (err) {
    if (err.response.data.statusCode === STATUS_CODE.NOTFOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        listUserByProjectId: [],
      });
    }
  }
}

export function* followActionGetUserByProjectIdApi() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_API, getUserByProjectIdApi);
}

function* signUp(action) {
  try {
    let { status } = yield call(() => {
      return userService.signUpService(action.user);
    });
    if (status === STATUS_CODE.SUCCESS) {
      let history = yield select((state) => state.HistoryReducer.history);
      history.push("/login");
      openNotificationWithIcon("success", "ban dang ky thanh cong");
    }
  } catch (err) {
    console.log(err);
    openNotificationWithIcon("error", "tai khoan da ton tai");
  }
}

export function* followActionSignUp() {
  yield takeLatest(SIGN_UP_API, signUp);
}

function* deleteUser(action) {
  try {
    let { status } = yield call(() => {
      return userService.deleteUserService(action.id);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_USER_API, keyWord: "" });
    }
  } catch (err) {}
}

export function* followActionDeleteUser() {
  yield takeLatest(DELETE_USER_API, deleteUser);
}

function* updateUser(action) {
  try {
    let { status } = yield call(() => {
      return userService.updateUserService(action.updateUser);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_USER_API, keyWord: "" });
    }
    openNotificationWithIcon("success", "ban sua thanh cong");
    yield put({ type: HIDE_MODAL_EDIT });
  } catch (err) {
    console.log(err);
    openNotificationWithIcon("error", "that bai");
  }
}

export function* followActionUpdateUser() {
  yield takeLatest(UPDATE_USER_API, updateUser);
}
