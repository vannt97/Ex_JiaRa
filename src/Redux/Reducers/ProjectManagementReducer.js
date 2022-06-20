import { GET_LIST_PROJECT } from "../Constants/ProjectConstant";

let stateDefault = {
  projectList: [],
};

const ProjectManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT: {
      return { ...state, projectList: [...action.projectList] };
    }
    default: {
      return { ...state };
    }
  }
};

export default ProjectManagementReducer;
