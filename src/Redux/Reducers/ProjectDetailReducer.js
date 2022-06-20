import { GET_PROJECT_DETAIL } from "../Constants/ProjectConstant";

const initialState = {
  projectDetail: {},
};

const ProjectDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_DETAIL: {
      return { ...state, projectDetail: { ...action.projectDetail } };
    }
    default:
      return { ...state };
  }
};

export default ProjectDetailReducer;
