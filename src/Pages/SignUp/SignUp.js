import {
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import style from "./SignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_API } from "../../Redux/Constants/UserJiraConstant";
export default function SignUp() {
  let dispatch = useDispatch();
  const { history } = useSelector((state) => state.HistoryReducer);
  const onFinish = (values) => {
    dispatch({ type: SIGN_UP_API, user: { ...values } });
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  return (
    <div className={style.formContent}>
      <h2 className="text-center">Sign Up</h2>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["email"]}
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item
          name="passWord"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please input your phoneNumber!",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            type="number"
            placeholder="phoneNumber"
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="name"
          />
        </Form.Item>
        <Form.Item>
          <div className="d-flex justify-content-around">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign Up
            </Button>

            <Button
              className="login-form-button"
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
