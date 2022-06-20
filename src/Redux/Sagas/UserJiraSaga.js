import {
  ASSIGN_USER_PROjECT,
  GET_USERS,
  GET_USER_API,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_API,
} from "../Constants/UserJiraConstant";
import { call, takeLatest, put, delay, select } from "redux-saga/effects";
import userService from "../../Services/ExJiraServices/UserService";
import { GET_LIST_PROJECT_API } from "../Constants/ProjectConstant";
import { STATUS_CODE } from "../../Util/SystemSetting/SystemSetting";
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
