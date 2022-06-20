import React, { useEffect, useRef, useState } from "react";
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
  Slider,
  InputNumber,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  GET_LIST_PROJECT_PART_CREATE_TASK_API,
  SET_SUBMIT_EDIT,
} from "../../../Redux/Constants/ProjectConstant";
import { GET_TASK_TYPE_API } from "../../../Redux/Constants/TaskTypeConstant";
import { GET_LIST_PRIORITY_API } from "../../../Redux/Constants/PriorityContant";
import {
  GET_USER_API,
  GET_USER_BY_PROJECT_ID_API,
} from "../../../Redux/Constants/UserJiraConstant";
import { withFormik } from "formik";
import { CREATE_TASK_API } from "../../../Redux/Constants/TaskConstant";
import { GET_ALL_STATUS_API } from "../../../Redux/Constants/StatusConstant";
const { Option } = Select;

function FromCreateTask(props) {
  const { projectList } = useSelector(
    (state) => state.ProjectManagementReducer
  );
  const { listTaskType, listStatus } = useSelector(
    (state) => state.TaskReducer
  );
  const { listPriority } = useSelector((state) => state.PriorityReducer);
  const { listUserByProjectId } = useSelector((state) => state.UserReducer);

  let userOption = listUserByProjectId?.map((user, index) => ({
    label: user.name,
    value: user.userId,
  }));
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const [size, setSize] = useState("middle");
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
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
  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_PART_CREATE_TASK_API });
    dispatch({ type: GET_TASK_TYPE_API });
    dispatch({ type: GET_LIST_PRIORITY_API });
    dispatch({ type: SET_SUBMIT_EDIT, handleSumbit: handleSubmit });
    dispatch({ type: GET_ALL_STATUS_API });
  }, []);
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Project "
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <Select
              name="projectId"
              onChange={(value) => {
                dispatch({
                  type: GET_USER_BY_PROJECT_ID_API,
                  projectId: value,
                });
                setFieldValue("projectId", value);
              }}
            >
              {projectList.map((project, index) => {
                return (
                  <Option key={index} value={project.id}>
                    {project.projectName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Priority"
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <Select
              name="priorityId"
              onChange={(value) => {
                setFieldValue("priorityId", value);
              }}
            >
              {listPriority.map((priority, index) => {
                return (
                  <Option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Task Type"
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <Select
              name="typeId"
              onChange={(value) => {
                setFieldValue("typeId", value);
              }}
            >
              {listTaskType.map((task, index) => {
                return (
                  <Option key={index} value={task.id}>
                    {task.taskType}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Assignees"
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <Select
              name="listUserAsign"
              mode="multiple"
              size={size}
              options={userOption}
              placeholder="Please select"
              optionFilterProp="label"
              onChange={(value) => {
                return setFieldValue("listUserAsign", value);
              }}
              style={{
                width: "100%",
              }}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      {/*  */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Time Tracking"
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <Slider
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
            />

            <div style={{ display: "inline-block", marginRight: "20px" }}>
              <p>Time Spent</p>
              <InputNumber
                min={0}
                defaultValue={0}
                name="timeTrackingSpent"
                onChange={(value) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingSpent: value,
                  });
                  setFieldValue("timeTrackingSpent", value);
                }}
              />
            </div>
            <div style={{ display: "inline-block" }}>
              <p>Time Remaining</p>
              <InputNumber
                min={0}
                defaultValue={0}
                name="timeTrackingRemaining"
                onChange={(value) => {
                  setTimeTracking({
                    ...timeTracking,
                    timeTrackingRemaining: value,
                  });
                  setFieldValue("timeTrackingRemaining", value);
                }}
              />
            </div>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Original Estimate"
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <InputNumber
              name="originalEstimate"
              min={0}
              onChange={(value) => {
                setFieldValue("originalEstimate", value);
              }}
              defaultValue={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Task Name"
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <Input name="taskName" onChange={handleChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <Select
              onChange={(value) => {
                setFieldValue("statusId", value);
              }}
            >
              {listStatus.map((status, index) => {
                return (
                  <Option key={index} value={status.statusId}>
                    {status.statusName}
                  </Option>
                );
              })}
            </Select>
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
              initialValue={""}
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

const FromCreateTaskWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      listUserAsign: [],
      description: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: 0,
      typeId: 0,
      priorityId: 0,
      taskName: "",
      statusId: "",
    };
  },
  // validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch({ type: CREATE_TASK_API, taskObject: values });
  },
  displayName: "FromCreateTaskWithFormik",
})(FromCreateTask);

export default connect()(FromCreateTaskWithFormik);
