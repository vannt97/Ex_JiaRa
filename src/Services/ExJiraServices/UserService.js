import baseServices from "../BaseServices";

class UserService extends baseServices {
  constructor() {
    super();
  }
  getUser = (keyWord) => {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  };
  assignUserProject = (userProject) => {
    return this.post("Project/assignUserProject", userProject);
  };
  getUserByProjectId = (id) => {
    return this.get(`Users/getUserByProjectId?idProject=${id}`);
  };
}

let userService = new UserService();

export default userService;
