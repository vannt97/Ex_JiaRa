import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated, config } from "react-spring";
import "./Home.css";
let arr = [
  { id: 1, taskName: "task1" },
  { id: 2, taskName: "task2" },
  { id: 3, taskName: "task3" },
  { id: 4, taskName: "task4" },
  { id: 5, taskName: "task5" },
];
export default function Home(props) {
  // let userLogin = useSelector((state) => state.UserReducer.userLogin);
  let [stateArr, setState] = useState(arr);
  let dragTag = useRef({});
  let dragTagEnter = useRef({});
  let [propsSpring, api] = useSpring(() => {
    return {
      from: { bottom: 0 },
      // config: { duration: 250 },
    };
  });
  const handlerDragEnter = (e, item, index) => {
    dragTagEnter.current = item;
    api.start({
      bottom: 0,
      from: { bottom: -40 },
      config: { duration: 100 },
    });

    let arrUpdate = [...stateArr];
    let indexDragEnter = arrUpdate.findIndex((task) => task.id == item.id);
    let indexDragStart = arrUpdate.findIndex(
      (task) => task.id == dragTag.current.id
    );
    // if (indexDragEnter >= indexDragStart) {
    //   api.start({
    //     bottom: 0,
    //     from: { bottom: -40 },
    //   });
    // } else {
    //   api.start({
    //     bottom: 0,
    //     from: { bottom: 40 },
    //   });
    // }
    let temp = arrUpdate[indexDragEnter];
    arrUpdate[indexDragEnter] = arrUpdate[indexDragStart];
    arrUpdate[indexDragStart] = temp;
    setState(arrUpdate);
  };
  const handlerDragStart = (e, item, index) => {
    dragTag.current = item;
  };
  const handlerDragEnd = (e) => {
    dragTag.current = "";
    setState([...stateArr]);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          {stateArr?.map((item, index) => {
            let cssDrag = item.id == dragTag.current.id ? "dragTag" : "";
            let cssSpring =
              item.id == dragTagEnter.current.id ? propsSpring : {};

            return (
              <animated.div
                key={index}
                className={`mt-2 bg-success ${cssDrag} `}
                draggable="true"
                onDragEnter={(e) => {
                  handlerDragEnter(e, item, index);
                }}
                onDragStart={(e) => {
                  handlerDragStart(e, item, index);
                }}
                onDragEnd={handlerDragEnd}
                style={{
                  position: "relative",
                  height: "30px",
                  ...cssSpring,
                }}
              >
                {item.taskName}
              </animated.div>
            );
          })}
        </div>
        <div className="col-6">
          {stateArr?.map((item, index) => {
            return (
              <div key={index} className="mt-2 bg-success" draggable="true">
                {item.taskName}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
