import React from "react";

export default function InfoMain() {
  return (
    <div className="info" style={{ display: "flex" }}>
      <div className="search-block">
        <input className="search" />
        <i className="fa fa-search" />
      </div>
      <div className="avatar-group" style={{ display: "flex" }}>
        <div className="avatar">
          <img src={require("../../../assets/img/anh1.jfif")} alt="anh" />
        </div>
        <div className="avatar">
          <img src={require("../../../assets/img/anh2.jfif")} alt="anh" />
        </div>
        <div className="avatar">
          <img src={require("../../../assets/img/anh3.jfif")} alt="anh" />
        </div>
      </div>
      <div className="text">Only My Issues</div>
      <div className="text">Recently Updated</div>
    </div>
  );
}
