import React from "react";
import { Route } from "react-router-dom";

import MenuJiraTemplate from "../../Components/Jira/MenuJiraTemplate";
import ModalInfoJira from "../../Components/Jira/ModalJira/ModalInfoJira";
import SideBarJiraTemplate from "../../Components/Jira/SideBarJiraTemplate";
import "./JiraTemPlate.css";
export default function JiraTemPlate(props) {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <div className="jira">
            <SideBarJiraTemplate />
            <MenuJiraTemplate />
            <ModalInfoJira />
            <Component {...propsRoute} />
          </div>
        );
      }}
    ></Route>
  );
}
