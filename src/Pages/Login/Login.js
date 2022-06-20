import React from "react";
// import { Prompt } from "react-router-dom";
import style from "./Login.module.css";
import {
  UserOutlined,
  LockOutlined,
  FacebookFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { Input, Button } from "antd";
import { withFormik } from "formik";
import { connect } from "react-redux";
import { signinAction } from "../../Redux/Actions/ExJiraAction";
function Login(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  // const handlerSubmit = (event) => {
  //   event.preventDefault();
  //   // if (userLogin.userName === "van" && userLogin.password === "123") {
  //   //   props.history.goBack();
  //   // }
  // };
  return (
    <form className={style.formLogin} onSubmit={handleSubmit}>
      <div className={style.formContent}>
        <h2>Login to continue</h2>
        <div className={style.groupInput}>
          <Input
            type="email"
            name="email"
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
            onChange={handleChange}
          />
        </div>
        <div className={style.groupInput}>
          <Input
            onChange={handleChange}
            name="passWord"
            type="password"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </div>
        <div className={style.checkBox_link}>
          <div className={style.checkbox}>
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              defaultValue="Bike"
            />
            <label htmlFor="vehicle1">Remeber Password</label>
          </div>
          <a href="link">Forget Password?</a>
        </div>
        <Button htmlType="submit" shape="round" style={{ width: "100%" }}>
          Login
        </Button>
        <div className={style.social}>
          <p>-OR-</p>
          <div className={style.social_icon}>
            <a href="#" style={{ color: "rgb(59,89,152)" }}>
              <FacebookFilled />
            </a>
            <a href="#">
              <TwitterCircleFilled />
            </a>
          </div>
        </div>
        {/* <Prompt
        when={true}
        message={(location) => {
          return "ban chac chu";
        }}
      /> */}
      </div>
    </form>
  );
}

const LoginWithFormik = withFormik({
  mapPropsToValues: () => {
    return { email: "", passWord: "" };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    let { email, passWord } = values;
    setSubmitting(true);
    props.dispatch(signinAction(email, passWord));
  },
  displayName: "Login",
})(Login);

export default connect()(LoginWithFormik);
