import React from "react";
import { useDispatch } from "react-redux";
import {
  CHANGE_PROPERTY_IN_TASK,
  GET_TASK_DETAIL_API,
  UPDATA_STATUS_TASK_API,
  UPDATE_TASK_API,
} from "../../../Redux/Constants/TaskConstant";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function ContentMain(props) {
  let { lstTask } = props.projectDetail;
  console.log(props.projectDetail);
  let dispatch = useDispatch();
  let renderPriority = (priorityTask) => {
    let { priorityId, priority } = priorityTask;
    if (priorityId === 2) {
      return (
        <p key={priorityId} className="text-warning">
          {priority}
        </p>
      );
    } else if (priorityId === 1) {
      return (
        <p key={priorityId} className="text-danger">
          {priority}
        </p>
      );
    } else {
      return (
        <p key={priorityId} className="text-success">
          {priority}
        </p>
      );
    }
  };
  const handlerDragEnd = (result) => {
    console.log(result);
    let { destination, source, draggableId } = result;
    if (
      destination === null ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    ) {
      return;
    }
    dispatch({
      type: UPDATA_STATUS_TASK_API,
      updateStatus: {
        taskId: draggableId,
        statusId: destination.droppableId,
      },
      projectId: props.projectDetail.id,
    });
    // dispatch({
    //   type: UPDATE_TASK_API,
    //   actionType: CHANGE_PROPERTY_IN_TASK,
    //   value: destination.droppableId,
    //   name: "statusId",
    // });
  };
  const renderListTask = () => {
    return lstTask?.map((task, index) => {
      return (
        <Droppable droppableId={task.statusId} key={task.statusId.toString()}>
          {(provided) => {
            return (
              <div className="card" style={{ height: "auto" }} key={index}>
                <div className="card-header">{task.statusName}</div>

                <ul
                  className="list-group list-group-flush"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {task.lstTaskDeTail?.map((item, index_children) => {
                    return (
                      <Draggable
                        key={item.taskId.toString()}
                        index={index_children}
                        draggableId={item.taskId.toString()}
                      >
                        {(provided) => {
                          return (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="list-group-item"
                              data-toggle="modal"
                              data-target="#infoModal"
                              onClick={() => {
                                dispatch({
                                  type: GET_TASK_DETAIL_API,
                                  taskId: item.taskId,
                                });
                              }}
                            >
                              <p>{item.taskName}</p>
                              <div
                                className="block"
                                style={{ display: "flex" }}
                              >
                                <div className="block-left">
                                  {renderPriority(item.priorityTask)}
                                </div>
                                <div className="block-right">
                                  <div
                                    className="avatar-group"
                                    style={{ display: "flex" }}
                                  >
                                    {item.assigness?.map((mem, index) => {
                                      return (
                                        <div className="avatar" key={index}>
                                          <img src={mem.avatar} alt="anh" />
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              </div>
            );
          }}
        </Droppable>
      );
    });
  };
  return (
    <div className="content" style={{ display: "flex" }}>
      <DragDropContext onDragEnd={handlerDragEnd}>
        {renderListTask()}
      </DragDropContext>
    </div>
  );
}
{
  /* <li className="list-group-item">
  <p>Each issue has a single reporter but can have multiple assignees</p>
  <div className="block" style={{ display: "flex" }}>
    <div className="block-left">
      <i className="fa fa-check-square" />
      <i className="fa fa-arrow-up" style={{ marginLeft: "10px" }} />
    </div>
    <div className="block-right">
      <div className="avatar-group" style={{ display: "flex" }}>
        <div className="avatar">
          <img src={require("../../../assets/img/anh3.jfif")} alt="anh" />
        </div>
        <div className="avatar">
          <img src={require("../../../assets/img/anh2.jfif")} alt="anh" />
        </div>
      </div>
    </div>
  </div>
</li>; */
}
