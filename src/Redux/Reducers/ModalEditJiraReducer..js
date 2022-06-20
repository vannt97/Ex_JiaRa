import { SHOW_MODAL_FORM_CREATE_TASK } from "../Constants/ModalFormConstant";
import {
  HIDE_MODAL_EDIT,
  SET_SUBMIT_EDIT,
  SHOW_MODAL_EDIT_AND_COMPONENT,
} from "../Constants/ProjectConstant";

let initialState = {
  visible: false,
  ComponentContent: <p>Hello world</p>,
  handleSumbit: () => {},
  title: "",
  projectEdit: {},
};

const ModalEditJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL_EDIT_AND_COMPONENT: {
      return {
        ...state,
        visible: true,
        ComponentContent: action.componentContent,
        title: action.title,
        projectEdit: { ...action.projectEditModal },
      };
    }
    case SET_SUBMIT_EDIT: {
      return { ...state, handleSumbit: action.handleSumbit };
    }
    case HIDE_MODAL_EDIT: {
      return { ...state, visible: false };
    }
    case SHOW_MODAL_FORM_CREATE_TASK: {
      return {
        ...state,
        ComponentContent: action.ComponentContent,
        title: action.title,
        visible: true,
      };
    }
    default:
      return { ...state };
  }
};

export default ModalEditJiraReducer;
