import { GET_ALL_PROJECT_CATEGORY } from "../Constants/ProjectConstant";

const stateInitial = {
  arrProjectCategory: [],
};

const ProjectCategoryReducer = (state = stateInitial, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY: {
      return { ...state, arrProjectCategory: [...action.arrProjectCategory] };
    }
    default:
      return { ...state };
  }
};

export default ProjectCategoryReducer;
