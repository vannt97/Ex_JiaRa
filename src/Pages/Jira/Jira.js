import React, { useEffect } from "react";
import ContentMain from "../../Components/Jira/MainContentJira/ContentMain";
import HeaderMain from "../../Components/Jira/MainContentJira/HeaderMain";
import InfoMain from "../../Components/Jira/MainContentJira/InfoMain";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_API } from "../../Redux/Constants/ProjectConstant";
export default function Jira(props) {
  let dispatch = useDispatch();
  let { projectDetail } = useSelector((state) => state.ProjectDetailReducer);
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_DETAIL_API,
      id: props.match.params.projectId,
    });
  }, []);
  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <h3>{projectDetail.projectName}</h3>
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
