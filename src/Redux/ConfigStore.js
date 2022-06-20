import { applyMiddleware, combineReducers, createStore } from "redux";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./Sagas/rootSaga";
import LoadingReducer from "./Reducers/LoadingReducer";
import HistoryReducer from "./Reducers/HistoryReducer";
import UserReducer from "./Reducers/UserReducer";
import ProjectCategoryReducer from "./Reducers/ProjectCategoryReducer";
import ProjectManagementReducer from "./Reducers/ProjectManagementReducer";
import ModalEditJiraReducer from "./Reducers/ModalEditJiraReducer.";
import ProjectDetailReducer from "./Reducers/ProjectDetailReducer";
import TaskReducer from "./Reducers/TaskReducer";
import PriorityReducer from "./Reducers/PriorityReducer";
const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
  LoadingReducer,
  HistoryReducer,
  UserReducer,
  ProjectCategoryReducer,
  ProjectManagementReducer,
  ModalEditJiraReducer,
  ProjectDetailReducer,
  TaskReducer,
  PriorityReducer,
});

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);
export default store;
