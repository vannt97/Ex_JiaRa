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
import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch } from "react-redux";
import {
  GET_ALL_PROJECT_CATEGORY_API,
  SET_SUBMIT_EDIT,
  UPDATE_PROJECT_API,
} from "../../../Redux/Constants/ProjectConstant";
const { Option } = Select;

function FormEditModal(props) {
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
  let { id, projectName, description, categoryId } = values;

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_API });
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
            <Input disabled name="id" onChange={handleChange} value={id} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Project Name"
            rules={[
              {
                required: true,
                message: "Please enter Project Name",
              },
            ]}
          >
            <Input
              name="projectName"
              onChange={handleChange}
              value={projectName}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Category Name"
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <Select
              name="categoryId"
              onChange={(value) => {
                return setFieldValue("categoryId", value);
              }}
              value={categoryId}
            >
              {arrProjectCategory.map((item, index) => {
                return (
                  <Option key={index} value={item.id}>
                    {item.projectCategoryName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Creator"
            rules={[
              {
                required: true,
                message: "Please enter Creator",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="description"
            rules={[
              {
                required: true,
                message: "please enter url description",
              },
            ]}
          >
            <Editor
              name="description"
              initialValue={description}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
let FormEditModalFromirk = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    let { id, projectName, description, categoryId } = props.projectEdit;
    return {
      id,
      projectName,
      description,
      categoryId,
    };
  },
  // validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: UPDATE_PROJECT_API, projectEdit: values });
  },
  displayName: "FormEditModalFromirk",
})(FormEditModal);
const mapStateToProps = (state) => {
  return {
    projectEdit: state.ModalEditJiraReducer.projectEdit,
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
  };
};
export default connect(mapStateToProps)(FormEditModalFromirk);
