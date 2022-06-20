import { put, takeLatest } from "redux-saga/effects";
import priorityService from "../../Services/ExJiraServices/PriorityService";
import {
  GET_LIST_PRIORITY,
  GET_LIST_PRIORITY_API,
} from "../Constants/PriorityContant";

function* getListPriority(action) {
  try {
    let { data, status } = yield priorityService.getLstPriority();
    yield put({ type: GET_LIST_PRIORITY, listPriority: data.content });
  } catch (err) {
    console.log(err);
  }
}

export function* followActionGetListPriority() {
  yield takeLatest(GET_LIST_PRIORITY_API, getListPriority);
}
