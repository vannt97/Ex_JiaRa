import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
const { Sider, Content } = Layout;
export default function UserLoginTemplate(props) {
  let [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth / 1.5,
  });
  let { Component, ...resParam } = props;
  useEffect(() => {
    function handlerResize() {
      setSize({ height: window.innerHeight, width: window.innerWidth / 1.5 });
    }
    window.addEventListener("resize", handlerResize);
    return () => {
      window.removeEventListener("resize", handlerResize);
    };
  }, []);
  return (
    <Route
      {...resParam}
      render={(propsRoute) => {
        return (
          <Layout>
            <Sider
              width={size.width}
              style={{
                height: size.height,
                backgroundSize: "cover",
                backgroundImage:
                  "url(https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000)",
              }}
            ></Sider>

            <Content>
              <Component />
            </Content>
          </Layout>
        );
      }}
    />
  );
}
