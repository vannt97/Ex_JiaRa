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
  signUpService = (user) => {
    return this.post(`Users/signup`, user);
  };
  deleteUserService = (id) => {
    return this.delete(`Users/deleteUser?id=${id}`);
  };
  updateUserService = (updateUser) => {
    return this.put("Users/editUser", updateUser);
  };
}

let userService = new UserService();

export default userService;
