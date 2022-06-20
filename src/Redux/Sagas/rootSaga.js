import { all } from "redux-saga/effects";
import * as ExJiraSaga from "./ExJiraSaga";
import * as ProjectCategory from "./ProjectCategorySaga";
import * as Project from "./ProjectSaga";
import * as User from "./UserJiraSaga";
import * as TaskType from "./TaskTypeSaga";
import * as Priority from "./PrioritySaga";
import * as Task from "./TaskSaga";
export function* rootSaga() {
  yield all([
    ExJiraSaga.theoDoiActionSingin(),
    ProjectCategory.followActionGetAllProjectCategory(),
    Project.followActionCreateProject(),
    Project.followActionGetListProject(),
    Project.followActionUpdateProject(),
    Project.followActionDeleteProject(),
    User.followActionGetUser(),
    User.followActionAssignUserProject(),
    User.followActionGetUserByProjectIdApi(),
    Project.followActionRemoveUserFromProject(),
    Project.followActionGetProjectDetail(),
    Project.followActionGetListProjectPartCreateTask(),
    TaskType.followActionGetTaskType(),
    Priority.followActionGetListPriority(),
    Task.followActionCreateTask(),
    Task.followActionGetAllStatus(),
    Task.followActionGetTaskDetail(),
    Task.followActionUpdateStatusTask(),
    Task.followActionUpdateTask(),
  ]);
}
