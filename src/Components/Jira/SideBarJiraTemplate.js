import React from "react";
import { useDispatch } from "react-redux";
import { SHOW_MODAL_FORM_CREATE_TASK } from "../../Redux/Constants/ModalFormConstant";
import FromCreateTask from "../Form/FormCreateTask/FromCreateTask";
export default function SideBarJiraTemplate() {
  let dispatch = useDispatch();
  return (
    <div className="sideBar">
      <div className="sideBar-top">
        <div className="sideBar-icon">
          <a href="#">
            <i className="fab fa-jira" />
          </a>
        </div>
        <div
          className="sideBar-icon"
          data-toggle="modal"
          data-target="#searchModal"
          style={{ cursor: "pointer" }}
        >
          <a href="#">
            <i className="fa fa-search" />
            <span className="title">SEARCH ISSUES</span>
          </a>
        </div>
        <div
          className="sideBar-icon"
          onClick={() => {
            dispatch({
              type: SHOW_MODAL_FORM_CREATE_TASK,
              ComponentContent: <FromCreateTask />,
              title: "Create Task",
            });
          }}
        >
          <a href="#">
            <i className="fa fa-plus" />
            <span className="title">CREATE TASK</span>
          </a>
        </div>
      </div>
      <div className="sideBar-bottom">
        <div className="sideBar-icon">
          <a href="#">
            <i className="fa fa-question-circle" />
            <span className="title">ABOUT</span>
          </a>
        </div>
      </div>
    </div>
  );
}
