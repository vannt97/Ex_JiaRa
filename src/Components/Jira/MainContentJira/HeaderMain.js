import React from "react";

export default function HeaderMain() {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">Example</li>
          <li className="breadcrumb-item active" aria-current="page">
            Example Board
          </li>
        </ol>
      </nav>
    </div>
  );
}
