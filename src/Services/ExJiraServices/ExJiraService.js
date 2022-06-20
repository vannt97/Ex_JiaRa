import Axios from "axios";
import { DOMAIN, TOKEN } from "../../Util/SystemSetting/SystemSetting";
import baseServices from "../BaseServices";
class ExJiraService extends baseServices {
  constructor() {
    super();
  }
  siginJira = (userLogin) => {
    return Axios({
      url: `${DOMAIN}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  };
  getAllProjectCategory = () => {
    // console.log(this.get("ProjectCategory"));

    // return Axios({
    //   url: `${DOMAIN}/ProjectCategory`,
    //   method: "GET",
    // });
    return this.get("ProjectCategory");
  };
  createProject = (project) => {
    return Axios({
      url: `${DOMAIN}/Project/createProjectAuthorize`,
      method: "POST",
      data: project,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getListProject = () => {
    return Axios({
      url: `${DOMAIN}/Project/getAllProject`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updateProject = (projectUpdate) => {
    return Axios({
      url: `${DOMAIN}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
      data: projectUpdate,
    });
  };
  deleteProject = (id) => {
    return this.delete(`Project/deleteProject?projectId=${id}`);
  };
  removeUserFromProject = (userProject) => {
    return this.post("Project/removeUserFromProject", userProject);
  };
  getProjectDetail = (id) => {
    return this.get(`Project/getProjectDetail?id=${id}`);
  };
  getAllProject = () => {
    return this.get("Project/getAllProject?keyword=1");
  };
  getListProjectPartCreateTask = () => {
    return this.get(`Project/getAllProject`);
  };
}

const exJiraService = new ExJiraService();

export default exJiraService;
