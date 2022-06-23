import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { GET_ALL_STATUS_API } from "../../../Redux/Constants/StatusConstant";
import { GET_LIST_PRIORITY_API } from "../../../Redux/Constants/PriorityContant";
import {
  CHANGE_ASSIGNESS,
  CHANGE_PROPERTY_IN_TASK,
  CHANGE_UPDATE_STATUS,
  REMOVE_USER_ASSIGNESS,
  UPDATA_STATUS_TASK_API,
  UPDATE_TASK_API,
} from "../../../Redux/Constants/TaskConstant";
import { Input, Popconfirm, Select } from "antd";
import { GET_TASK_TYPE_API } from "../../../Redux/Constants/TaskTypeConstant";
import { withFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import {
  DELETE_COMMENT_API,
  INSERT_COMMENT_API,
  UPDATE_COMMENT_API,
} from "../../../Redux/Constants/CommentConstant";
import "./ModalInfoJira.css";
import { useRef } from "react";
const { Option } = Select;

function ModalInfoJira(props) {
  let { taskDetailModal, listStatus, listTaskType } = useSelector(
    (state) => state.TaskReducer
  );
  let { projectDetail } = useSelector((state) => state.ProjectDetailReducer);

  const { listPriority } = useSelector((state) => state.PriorityReducer);
  let dispatch = useDispatch();
  let [visibleDescription, setVisibleDescription] = useState(false);
  let [visibleComment, setVisibleComment] = useState(false);
  let [visibleEditComment, setVisibleEditComment] = useState(false);
  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_API });
    dispatch({ type: GET_LIST_PRIORITY_API });
    dispatch({ type: GET_TASK_TYPE_API });
  }, []);
  const {
    values,

    handleChange,
    handleBlur,
    handleSubmit,
    arrProjectCategory,
    setFieldValue,
  } = props;
  const {
    assigness,
    description,
    originalEstimate,
    priorityId,
    statusId,
    taskName,
    timeTrackingRemaining,
    timeTrackingSpent,
    typeId,
    taskId,
    projectId,
  } = values;
  let [historyDes, setHistoryDes] = useState(description);
  let [contentDes, setContenDes] = useState(description);
  let [contentComment, setContentComment] = useState("");
  let [contentEditComment, setContentEditComment] = useState("");

  let [idComment, setIdComment] = useState("");

  const handleEditorChange = (content, value) => {
    // setFieldValue("description", content);
    setContenDes(content);
  };
  const handleEditorChangeComment = (content, value) => {
    // setFieldValue("description", content);
    setContentComment(content);
  };
  const handleEditorChangeEditComent = (content, value) => {
    setContentEditComment(content);
  };
  const parserComment = (content, classActive) => {
    let jsxContent = ReactHtmlParser(content);
    return <div className={`parserComment ${classActive}`}>{jsxContent}</div>;
  };
  const renderDescription = () => {
    return (
      <div>
        {visibleDescription ? (
          <div>
            <Editor
              name="description"
              value={contentDes}
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
            <div className="mt-2">
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  dispatch({
                    type: UPDATE_TASK_API,
                    actionType: CHANGE_PROPERTY_IN_TASK,
                    value: contentDes,
                    name: "description",
                  });
                  setVisibleDescription(false);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  // setFieldValue("description", historyDes);
                  setContenDes(historyDes);
                  setVisibleDescription(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setContenDes(description);
              setVisibleDescription(true);
            }}
          >
            {ReactHtmlParser(description)}
          </div>
        )}
      </div>
    );
  };
  const renderIconTaskType = (id) => {
    if (id === 1) {
      return <i className="fa fa-bug" style={{ color: "red" }}></i>;
    } else {
      return <i className="fa fa-bookmark" />;
    }
  };
  const renderTimeTracking = () => {
    let max = Number(timeTrackingRemaining) + Number(timeTrackingSpent);
    let percent = Math.round((Number(timeTrackingSpent) / max) * 100);
    return (
      <div style={{ display: "flex" }}>
        <i className="fa fa-clock" />
        <div style={{ width: "100%" }}>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={Number(timeTrackingSpent)}
              aria-valuemin={Number(timeTrackingRemaining)}
              aria-valuemax={max}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p className="logged">{`${timeTrackingSpent}h logged`}</p>

            <p className="estimate-time">{`${timeTrackingRemaining}h remaining`}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              name="timeTrackingSpent"
              onChange={handleChange}
              style={{ width: "23%" }}
            />
            <Input
              name="timeTrackingRemaining"
              onChange={handleChange}
              style={{ width: "23%" }}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              {/* <i className="fa fa-bookmark" />
              <span>{taskDetailModal.taskName}</span> */}
              <Select
                name="taskType"
                style={{ width: "auto" }}
                value={typeId}
                onChange={(value, option) => {
                  dispatch({
                    type: UPDATE_TASK_API,
                    actionType: CHANGE_PROPERTY_IN_TASK,
                    value,
                    name: "typeId",
                  });
                }}
              >
                {listTaskType?.map((task, index) => {
                  return (
                    <Option key={index} value={task.id}>
                      {renderIconTaskType(task.id)}
                      <span>{taskName}</span>
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20, marginLeft: "5px" }}>
                  Give feedback
                </span>
              </div>
              <div>
                <i className="fa fa-link" style={{ marginRight: "5px" }} />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i
                className="fa fa-trash-alt"
                style={{ cursor: "pointer", position: "relative", top: "4px" }}
              />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue" style={{ margin: 0 }}>
                    Description
                  </p>
                  <div className="description" style={{ marginBottom: "50px" }}>
                    {renderDescription()}
                  </div>

                  <div className="comment">
                    <h6 className="mb-4">Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/anh3.jfif")}
                          alt="anh"
                        />
                      </div>
                      <div className="input-comment">
                        {visibleComment ? (
                          <div>
                            <Editor
                              name="inputCommet"
                              init={{
                                height: 100,
                                menubar: false,
                                hidden_input: false,
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
                              onEditorChange={handleEditorChangeComment}
                            />
                            <div className="mt-2">
                              <button
                                className="btn btn-primary mr-2"
                                onClick={() => {
                                  dispatch({
                                    type: INSERT_COMMENT_API,
                                    taskId,
                                    contentComment,
                                  });
                                  setVisibleComment(false);
                                }}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={() => {
                                  // setFieldValue("description", historyDes);
                                  setVisibleComment(false);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <input
                            type="text"
                            placeholder="Add a comment ..."
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setVisibleComment(true);
                            }}
                          />
                        )}
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                                margin: "0px 5px",
                              }}
                            >
                              M
                            </span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        {taskDetailModal.lstComment?.map((comment, index) => {
                          let classActive =
                            idComment == comment.id ? "active" : "hide";
                          let classActiveComment =
                            idComment == comment.id ? "hide" : "active";
                          let classActiveUser =
                            comment.name === projectDetail.creator.name
                              ? "active"
                              : "hide";
                          return (
                            <div
                              className="display-comment"
                              style={{ display: "flex" }}
                              key={index}
                            >
                              <div className="avatar">
                                <img src={comment.avatar} alt="anh" />
                              </div>
                              <div>
                                <p style={{ marginBottom: 5 }}>
                                  {comment.name} <span> - a month ago</span>
                                </p>
                                {parserComment(
                                  comment.commentContent,
                                  classActiveComment
                                )}
                                <div className={classActive}>
                                  <Editor
                                    name={comment.id}
                                    value={contentEditComment}
                                    init={{
                                      height: 100,
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
                                    onEditorChange={
                                      handleEditorChangeEditComent
                                    }
                                  />
                                  <div className="mt-2">
                                    <button
                                      className="btn btn-primary mr-2"
                                      onClick={() => {
                                        dispatch({
                                          type: UPDATE_COMMENT_API,
                                          updateComment: {
                                            id: comment.id,
                                            contentComment: contentEditComment,
                                          },
                                          taskId,
                                        });
                                        setIdComment("");
                                      }}
                                    >
                                      Save
                                    </button>

                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        setIdComment("");
                                      }}
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                                <div className={classActiveUser}>
                                  <span
                                    className="comment_function"
                                    style={{ color: "#929398" }}
                                    onClick={() => {
                                      setContentEditComment(
                                        comment.commentContent
                                      );
                                      setIdComment(comment.id);
                                    }}
                                  >
                                    Edit
                                  </span>
                                  <span style={{ margin: "0 10px" }}>•</span>
                                  <Popconfirm
                                    title="Are you sure to delete this comment?"
                                    onConfirm={() => {
                                      dispatch({
                                        type: DELETE_COMMENT_API,
                                        idComment: comment.id,
                                        taskId,
                                      });
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <span
                                      className="comment_function"
                                      style={{ color: "#929398" }}
                                    >
                                      Delete
                                    </span>
                                  </Popconfirm>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      className="custom-select"
                      defaultValue={statusId}
                      onChange={(e) => {
                        let { value } = e.target;

                        dispatch({
                          type: UPDATE_TASK_API,
                          actionType: CHANGE_PROPERTY_IN_TASK,
                          value: value,
                          name: "statusId",
                        });
                      }}
                    >
                      {listStatus?.map((status, index) => {
                        return (
                          <option key={index} value={status.statusId}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {assigness?.map((user, index) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              marginBottom: 10,
                              flexBasis: "auto",
                            }}
                            className="item"
                            key={index}
                          >
                            <div
                              className="avatar"
                              style={{
                                marginRight: "5px",
                              }}
                            >
                              <img src={user.avatar} alt="anh" />
                            </div>
                            <p
                              className="name"
                              style={{
                                position: "relative",
                                top: "3px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                dispatch({
                                  type: UPDATE_TASK_API,
                                  actionType: REMOVE_USER_ASSIGNESS,
                                  userId: user.id,
                                });
                              }}
                            >
                              {user.name}
                              <i
                                className="fa fa-times"
                                style={{ marginLeft: 5 }}
                              />
                            </p>
                          </div>
                        );
                      })}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Select
                          style={{ width: "auto" }}
                          value="+ Add more"
                          onSelect={(value) => {
                            let userSelect = projectDetail.members.find(
                              (user) => user.userId == value
                            );
                            userSelect = {
                              ...userSelect,
                              id: userSelect.userId,
                            };

                            // dispatch({ type: CHANGE_ASSIGNESS, userSelect });
                            dispatch({
                              type: UPDATE_TASK_API,
                              actionType: CHANGE_ASSIGNESS,
                              userSelect,
                            });
                          }}
                        >
                          {projectDetail.members
                            ?.filter((mem) => {
                              let index = assigness?.findIndex(
                                (us) => us.id == mem.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((user, index) => {
                              return (
                                <Option value={user.userId} key={index}>
                                  {user.name}
                                </Option>
                              );
                            })}
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div
                    className="priority"
                    style={{ marginBottom: 20, marginTop: 20 }}
                  >
                    <h6>PRIORITY</h6>
                    <select
                      className="custom-select"
                      value={priorityId}
                      onChange={(e) => {
                        let { value } = e.target;
                        dispatch({
                          type: UPDATE_TASK_API,
                          actionType: CHANGE_PROPERTY_IN_TASK,
                          value: value,
                          name: "priorityId",
                        });
                      }}
                    >
                      {listPriority.map((priority, index) => {
                        return (
                          <option key={index} value={priority.priorityId}>
                            {priority.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      type="text"
                      className="estimate-hours"
                      defaultValue={originalEstimate}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ModalInfoJiraWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    let {
      assigness,
      description,
      originalEstimate,
      priorityId,
      statusId,
      taskName,
      timeTrackingRemaining,
      timeTrackingSpent,
      typeId,
      taskId,
      projectId,
    } = props.taskDetailModal;
    return {
      assigness,
      description,
      originalEstimate,
      priorityId,
      statusId,
      taskName,
      timeTrackingRemaining,
      timeTrackingSpent,
      typeId,
      taskId,
      projectId,
    };
  },
  // validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {},
  displayName: "ModalInfoJiraWithFormik",
})(ModalInfoJira);

const mapStateToProps = (state) => {
  return { taskDetailModal: state.TaskReducer.taskDetailModal };
};

export default connect(mapStateToProps)(ModalInfoJiraWithFormik);
