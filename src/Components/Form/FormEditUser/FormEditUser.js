import React, { useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { withFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import * as Yup from "yup";
import { SET_SUBMIT_EDIT } from "../../../Redux/Constants/ProjectConstant";
import { UPDATE_USER_API } from "../../../Redux/Constants/UserJiraConstant";
function FormEditUser(props) {
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    arrProjectCategory,
    setFieldValue,
  } = props;
  let { id, email, name, phoneNumber } = values;
  useEffect(() => {
    dispatch({ type: SET_SUBMIT_EDIT, handleSumbit: handleSubmit });
  }, []);
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="ID"
            rules={[
              {
                required: true,
                message: "Please enter user name",
              },
            ]}
          >
            <Input disabled name="id" value={id} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter Email",
              },
            ]}
          >
            <Input
              disabled
              onChange={handleChange}
              name="email"
              value={email}
            />
            <span className="text-danger">{errors.email} </span>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter user name",
              },
            ]}
          >
            <Input onChange={handleChange} name="name" value={name} />
            <span className="text-danger">{errors.name} </span>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Phone"
            rules={[
              {
                required: true,
                message: "Please enter Phone number",
              },
            ]}
          >
            <Input
              type="tel"
              onChange={handleChange}
              name="phoneNumber"
              value={phoneNumber}
            />
            <span className="text-danger">{errors.phoneNumber} </span>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

const FormEditUserForMirk = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    let { userId, email, name, phoneNumber } = props.projectEdit;

    return {
      id: userId,
      email,
      name,
      phoneNumber,
      passWord: "123456",
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required").email("email is invalid"),
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
      .required("Phone Number is required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      ),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: UPDATE_USER_API, updateUser: values });
  },
  displayName: "FormEditUserModalFromirk",
})(FormEditUser);

const mapStateToProps = (state) => {
  return {
    projectEdit: state.ModalEditJiraReducer.projectEdit,
  };
};

export default connect(mapStateToProps)(FormEditUserForMirk);
