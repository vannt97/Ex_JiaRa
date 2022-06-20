import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  useHistory,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import UserLoginTemplate from "./Templates/userLoginTemplate/UserLoginTemplate";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Loading from "./Components/GlobalSetting/LoadingComponent/Loading";
import Home from "./Pages/Home/Home";
import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ADD_HISTORY } from "./Redux/Constants/HistoryConstant";
import JiraTemPlate from "./Templates/JiraTemplate/JiraTemPlate";
import Jira from "./Pages/Jira/Jira";
import CreateProject from "./Pages/CreateProject/CreateProject";
import ProjectManagement from "./Pages/ProjectManagement/ProjectManagement";
import ModalEditJira from "./HOC/ModalEditJira";
import DragAndDrop from "./Pages/Home/DragAndDrop";
function App() {
  let history = useHistory();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ADD_HISTORY, history });
  }, []);
  return (
    <Fragment>
      <Loading />
      <ModalEditJira />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={Login} />
        <JiraTemPlate exact path="/jira" Component={Jira} />
        <JiraTemPlate exact path="/projectdetail/:projectId" Component={Jira} />
        <JiraTemPlate exact path="/" Component={CreateProject} />
        <JiraTemPlate exact path="/createproject" Component={CreateProject} />
        <JiraTemPlate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />
        <Route exact path="/home" component={Home} />
        <Route exact path="/draganddrop" component={DragAndDrop} />
      </Switch>
    </Fragment>
  );
}

export default App;
