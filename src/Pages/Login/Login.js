import React from "react";
// import { Prompt } from "react-router-dom";
import style from "./Login.module.css";
import * as Yup from "yup";

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
import { NavLink } from "react-router-dom";
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
        <h2 style={{ marginBottom: "15px" }}>Login to continue</h2>
        <div className={style.groupInput}>
          <Input
            type="email"
            name="email"
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
            onChange={handleChange}
          />
          <span className="text-danger">{errors.email}</span>
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
          <span className="text-danger">{errors.passWord}</span>
        </div>
        <div className={style.checkBox_link}>
          <div className={style.checkbox}>
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              defaultValue="Bike"
            />
            <label htmlFor="vehicle1" style={{ margin: 0 }}>
              Remeber Password
            </label>
          </div>
          <a href="#">Forget Password?</a>
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
        <div className="text-center mt-5">
          <p>Or Sign Up Using</p>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    </form>
  );
}

const LoginWithFormik = withFormik({
  mapPropsToValues: () => {
    return { email: "", passWord: "" };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required").email("email is invalid"),
    passWord: Yup.string()
    .required("password is invalid!"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    let { email, passWord } = values;
    setSubmitting(true);
    props.dispatch(signinAction(email, passWord));
  },
  displayName: "Login",
})(Login);

export default connect()(LoginWithFormik);
