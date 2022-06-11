import { call, takeLatest, put, delay, select } from "redux-saga/effects";
import exJiraService from "../../Services/ExJiraServices/ExJiraService";
import { TOKEN, USER_LOGIN } from "../../Util/SystemSetting/SystemSetting";
import {
  USER_SIGNIN_API,
  USER_LOGIN_ADD_STATE,
} from "../Constants/ExJiraConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../Constants/LoadingConstant";

// import { push } from "react-router-redux";
function* singinSaga(action) {
  yield put({ type: DISPLAY_LOADING });

  try {
    // let res = yield call(() => {
    //   exJiraService.siginJira(action.userLogin);
    // });
    yield delay(1000);

    let { data, status } = yield exJiraService.siginJira(action.userLogin);
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    ///

    yield put({ type: USER_LOGIN_ADD_STATE, userLogin: data.content });

    ///
    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/home");
  } catch (err) {
    console.log(err.response.data);
  }
  yield put({ type: HIDE_LOADING });
}

export function* theoDoiActionSingin() {
  yield takeLatest(USER_SIGNIN_API, singinSaga);
}
