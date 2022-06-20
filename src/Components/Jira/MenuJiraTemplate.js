import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuJiraTemplate() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/anh1.jfif")} alt="anh" />
        </div>
        <div className="account-info">
          <p>Nguyen Trong Van</p>
          <p>Developer</p>
        </div>
      </div>
      <div className="control">
        <NavLink className="control_link " to="/jira">
          <i className="fa fa-credit-card" />
          <span>Dash Board</span>
        </NavLink>

        <NavLink className="control_link" to="/createproject">
          <i className="fa fa-cog" />
          <span>Create Project </span>
        </NavLink>
        <NavLink className="control_link" to="/projectmanagement">
          <i className="fa fa-archive" aria-hidden="true"></i>
          <span>Project Management </span>
        </NavLink>
      </div>
      <hr className="dash_Menu" />
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
}
