import { applyMiddleware, combineReducers, createStore } from "redux";
import ExJiraReducer from "./Reducers/ExJiraReducer";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./Sagas/rootSaga";
import LoadingReducer from "./Reducers/LoadingReducer";
import HistoryReducer from "./Reducers/HistoryReducer";
import UserReducer from "./Reducers/UserReducer";
const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
  ExJiraReducer,
  LoadingReducer,
  HistoryReducer,
  UserReducer,
});

const store = createStore(rootReducer, applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);
export default store;
