import baseServices from "../BaseServices";

class TaskService extends baseServices {
  constructor() {
    super();
  }
  getTaskType = () => {
    return this.get("TaskType/getAll");
  };
  createTaskService = (value) => {
    return this.post("Project/createTask", value);
  };
  getAllStatusService = () => {
    return this.get("Status/getAll");
  };
  getTaskDetailService = (id) => {
    return this.get(`Project/getTaskDetail?taskId=${id}`);
  };
  updateStatusTask = (statusUpdate) => {
    return this.put("Project/updateStatus", statusUpdate);
  };
  updateTask = (taskUpdate) => {
    return this.post(`Project/updateTask`, taskUpdate);
  };
  insertCommentService = (comment) => {
    return this.post(`Comment/insertComment`, comment);
  };
  updateCommentService = (updateComment) => {
    return this.putOnLinkUrl(
      `Comment/updateComment?id=${updateComment.id}&contentComment=${updateComment.contentComment}`
    );
  };
  deleteCommentService = (idComment) => {
    return this.delete(`Comment/deleteComment?idComment=${idComment}`);
  };
}

let taskService = new TaskService();

export default taskService;
