import { takeLatest, put, call } from "redux-saga/effects";
import exJiraService from "../../Services/ExJiraServices/ExJiraService";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_API,
} from "../Constants/ProjectConstant";

function* getAllProjectCategory() {
  try {
    let { data, status } = yield call(() => {
      return exJiraService.getAllProjectCategory();
    });
    yield put({
      type: GET_ALL_PROJECT_CATEGORY,
      arrProjectCategory: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* followActionGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_API, getAllProjectCategory);
}
