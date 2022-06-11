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
function App() {
  let history = useHistory();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ADD_HISTORY, history });
  }, []);
  return (
    <Fragment>
      <Loading />
      <Switch>
        <UserLoginTemplate exact path="/login" Component={Login} />
        <JiraTemPlate exact path="/jira" />
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Fragment>
  );
}

export default App;
