import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import taskService from "../../Services/ExJiraServices/TaskService";
import openNotificationWithIcon from "../../Util/Notification/notification";
import { STATUS_CODE } from "../../Util/SystemSetting/SystemSetting";
import {
  DELETE_COMMENT_API,
  INSERT_COMMENT_API,
  UPDATE_COMMENT_API,
} from "../Constants/CommentConstant";
import { DISPLAY_LOADING, HIDE_LOADING } from "../Constants/LoadingConstant";
import {
  GET_PROJECT_DETAIL_API,
  HIDE_MODAL_EDIT,
} from "../Constants/ProjectConstant";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_API,
} from "../Constants/StatusConstant";
import {
  CHANGE_ASSIGNESS,
  CHANGE_PROPERTY_IN_TASK,
  CREATE_TASK_API,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_API,
  REMOVE_USER_ASSIGNESS,
  UPDATA_STATUS_TASK_API,
  UPDATE_TASK_API,
} from "../Constants/TaskConstant";

function* createTask(action) {
  yield put({ type: DISPLAY_LOADING });
  yield delay(1000);

  try {
    let { data, status } = yield call(() => {
      return taskService.createTaskService(action.taskObject);
    });
    yield put({ type: HIDE_MODAL_EDIT });

    openNotificationWithIcon("success", "Create Project Success");
  } catch (err) {
    console.log(err);
  }
  yield put({ type: HIDE_LOADING });
}

export function* followActionCreateTask() {
  yield takeLatest(CREATE_TASK_API, createTask);
}

function* getAllStatus() {
  try {
    let { data, status } = yield call(() => {
      return taskService.getAllStatusService();
    });
    yield put({ type: GET_ALL_STATUS, listStatus: data.content });
  } catch (err) {
    console.log(err);
  }
}

export function* followActionGetAllStatus() {
  yield takeLatest(GET_ALL_STATUS_API, getAllStatus);
}

function* getTaskDetail(action) {
  try {
    let { data, status } = yield call(() => {
      return taskService.getTaskDetailService(action.taskId);
    });
    yield put({ type: GET_TASK_DETAIL, taskDetailModal: data.content });
  } catch (err) {}
}

export function* followActionGetTaskDetail() {
  yield takeLatest(GET_TASK_DETAIL_API, getTaskDetail);
}

function* updateStatusTaskSaga(action) {
  try {
    let { data, status } = yield call(() => {
      return taskService.updateStatusTask(action.updateStatus);
    });
    yield put({ type: GET_PROJECT_DETAIL_API, id: action.projectId });
  } catch (err) {}
}

export function* followActionUpdateStatusTask() {
  yield takeLatest(UPDATA_STATUS_TASK_API, updateStatusTaskSaga);
}

function* updateTaskSaga(action) {
  let { actionType, value, name } = action;
  switch (actionType) {
    case CHANGE_PROPERTY_IN_TASK: {
      yield put({ type: actionType, value, name });
      break;
    }
    case CHANGE_ASSIGNESS: {
      yield put({ type: actionType, userSelect: action.userSelect });
      break;
    }
    case REMOVE_USER_ASSIGNESS: {
      yield put({ type: actionType, userId: action.userId });
      break;
    }
    default:
      break;
  }
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  let listUserAsign = taskDetailModal.assigness?.map((user) => {
    return user.id;
  });
  const taskUpdateApi = {
    ...taskDetailModal,
    listUserAsign,
  };

  try {
    let { data, status } = yield call(() => {
      return taskService.updateTask(taskUpdateApi);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_API,
        id: taskUpdateApi.projectId,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActionUpdateTask() {
  yield takeLatest(UPDATE_TASK_API, updateTaskSaga);
}

function* insertComment(action) {
  let { contentComment, taskId } = action;
  try {
    let { status } = yield call(() => {
      return taskService.insertCommentService({ taskId, contentComment });
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_TASK_DETAIL_API, taskId: taskId });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActionInsertComment() {
  yield takeLatest(INSERT_COMMENT_API, insertComment);
}

function* updateComment(action) {
  try {
    let { status } = yield call(() => {
      return taskService.updateCommentService(action.updateComment);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_TASK_DETAIL_API, taskId: action.taskId });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActionUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_API, updateComment);
}

function* deleteComment(action) {
  try {
    let { status } = yield call(() => {
      return taskService.deleteCommentService(action.idComment);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_TASK_DETAIL_API, taskId: action.taskId });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActionDeleteComment() {
  yield takeLatest(DELETE_COMMENT_API, deleteComment);
}
