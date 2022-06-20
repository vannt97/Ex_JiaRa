import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
export default function DragAndDrop() {
  let [arrState, setArrState] = useState({
    todo: {
      id: "todo",
      listItem: [
        { id: "1", taskName: "task1" },
        { id: "2", taskName: "task2" },
        { id: "3", taskName: "task3" },
        { id: "4", taskName: "task4" },
      ],
    },
    done: {
      id: "done",
      listItem: [
        { id: "5", taskName: "task5" },
        { id: "6", taskName: "task6" },
        { id: "7", taskName: "task7" },
        { id: "8", taskName: "task8" },
      ],
    },
  });
  const renderItem = () => {
    let htmlContent = [];

    for (let i in arrState) {
      htmlContent.push(<div key={arrState[i].id}>{arrState[i].id}</div>);
    }
    return htmlContent;
  };
  const handlerDragEnd = (result) => {
    console.log(result);
    let { draggableId, destination, source } = result;

    if (
      destination === null ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    ) {
      return;
    }
    let arrUpdate = { ...arrState };
    let item = arrUpdate[source?.droppableId]?.listItem[source?.index];
    arrUpdate[source?.droppableId]?.listItem.splice(source?.index, 1);
    arrUpdate[destination?.droppableId]?.listItem.splice(
      destination?.index,
      0,
      item
    );
    setArrState(arrUpdate);
  };
  return (
    <div className="container">
      <DragDropContext onDragEnd={handlerDragEnd}>
        <div className="row">
          {_.map(arrState, (item, index) => {
            return (
              <Droppable droppableId={item.id} key={index}>
                {(provided) => {
                  return (
                    <div
                      className="col-6"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {item.listItem.map((task, index_chil) => {
                        return (
                          <Draggable
                            key={task.id}
                            index={index_chil}
                            draggableId={task.id}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-success mt-3"
                                >
                                  {task.taskName}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
      {/* {renderItem()} */}
    </div>
  );
}
