import React from "react";
import { Route } from "react-router-dom";
import ContentMain from "../../Components/Jira/MainContentJira/ContentMain";
import HeaderMain from "../../Components/Jira/MainContentJira/HeaderMain";
import InfoMain from "../../Components/Jira/MainContentJira/InfoMain";
import MenuJiraTemplate from "../../Components/Jira/MenuJiraTemplate";
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
            <div className="main">
              <HeaderMain />
              <h3>Example Board</h3>
              <InfoMain />
              <ContentMain />
            </div>
          </div>
        );
      }}
    ></Route>
  );
}
