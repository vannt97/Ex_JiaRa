import { takeLatest, put, call, delay, select } from "redux-saga/effects";
import exJiraService from "../../Services/ExJiraServices/ExJiraService";
import openNotificationWithIcon from "../../Util/Notification/notification";
import { STATUS_CODE } from "../../Util/SystemSetting/SystemSetting";
import { DISPLAY_LOADING, HIDE_LOADING } from "../Constants/LoadingConstant";
import {
  CREATE_PROPJECT_API,
  DELETE_PROJECT_API,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_API,
  GET_LIST_PROJECT_PART_CREATE_TASK_API,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_API,
  HIDE_MODAL_EDIT,
  REMOVE_USER_FROM_PROJECT,
  UPDATE_PROJECT_API,
} from "../Constants/ProjectConstant";

function* createProject(action) {
  yield put({ type: DISPLAY_LOADING });
  yield delay(1000);

  try {
    let res = yield call(() => {
      return exJiraService.createProject(action.project);
    });
    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/projectmanagement");
  } catch (err) {
    console.log(err);
  }
  yield put({ type: HIDE_LOADING });
}

export function* followActionCreateProject() {
  yield takeLatest(CREATE_PROPJECT_API, createProject);
}

function* getListProject(action) {
  try {
    let { data, status } = yield exJiraService.getListProject();
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_LIST_PROJECT, projectList: data.content });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActionGetListProject() {
  yield takeLatest(GET_LIST_PROJECT_API, getListProject);
}

function* getListProjectPartCreateTask(action) {
  try {
    let { data, status } = yield exJiraService.getListProjectPartCreateTask();
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_LIST_PROJECT, projectList: data.content });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActionGetListProjectPartCreateTask() {
  yield takeLatest(
    GET_LIST_PROJECT_PART_CREATE_TASK_API,
    getListProjectPartCreateTask
  );
}

////////////////////////////
function* updateProject(action) {
  yield put({ type: DISPLAY_LOADING });
  yield delay(1000);
  try {
    let { data, status } = yield call(() => {
      return exJiraService.updateProject(action.projectEdit);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_LIST_PROJECT_API });
      yield put({ type: HIDE_MODAL_EDIT });
    }
  } catch (err) {
    console.log(err);
  }
  yield put({ type: HIDE_LOADING });
}

export function* followActionUpdateProject() {
  yield takeLatest(UPDATE_PROJECT_API, updateProject);
}

//
function* deleteProject(action) {
  yield put({ type: DISPLAY_LOADING });
  yield delay(1000);
  try {
    let { data, status } = yield call(() => {
      return exJiraService.deleteProject(action.idProject);
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Delete Project Success");
    } else {
      openNotificationWithIcon("error", "Error delete project");
    }
    yield put({ type: GET_LIST_PROJECT_API });
  } catch (err) {
    console.log(err);
  }
  yield put({ type: HIDE_LOADING });
}

export function* followActionDeleteProject() {
  yield takeLatest(DELETE_PROJECT_API, deleteProject);
}

function* actionRemoveUserFromProject(action) {
  try {
    console.log(action);
    let { data, status } = yield call(() => {
      return exJiraService.removeUserFromProject(action.userProject);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_LIST_PROJECT_API });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActionRemoveUserFromProject() {
  yield takeLatest(REMOVE_USER_FROM_PROJECT, actionRemoveUserFromProject);
}

function* actionGetProjectDetail(action) {
  try {
    let { data, status } = yield call(() => {
      return exJiraService.getProjectDetail(action.id);
    });
    yield put({ type: GET_PROJECT_DETAIL, projectDetail: data.content });
  } catch (err) {
    console.log(err);
  }
}

export function* followActionGetProjectDetail() {
  yield takeLatest(GET_PROJECT_DETAIL_API, actionGetProjectDetail);
}
