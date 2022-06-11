import { all } from "redux-saga/effects";
import * as ExJiraSaga from "./ExJiraSaga";
export function* rootSaga() {
  yield all([ExJiraSaga.theoDoiActionSingin()]);
}
