import { put, takeLatest } from "redux-saga/effects";
import taskService from "../../Services/ExJiraServices/TaskService";
import {
  GET_TASK_TYPE,
  GET_TASK_TYPE_API,
} from "../Constants/TaskTypeConstant";

function* getTaskType(action) {
  try {
    let { data, status } = yield taskService.getTaskType();

    yield put({ type: GET_TASK_TYPE, taskType: data.content });
  } catch (err) {
    console.log(err);
  }
}

export function* followActionGetTaskType() {
  yield takeLatest(GET_TASK_TYPE_API, getTaskType);
}
