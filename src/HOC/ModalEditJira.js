import { PlusOutlined } from "@ant-design/icons";
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
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HIDE_MODAL_EDIT } from "../Redux/Constants/ProjectConstant";
const ModalEditJira = (props) => {
  let { visible, ComponentContent, handleSumbit, title } = useSelector(
    (state) => state.ModalEditJiraReducer
  );
  let dispatch = useDispatch();
  return (
    <>
      {/* <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        New account
      </Button> */}
      <Drawer
        title={title}
        width={720}
        onClose={() => {
          dispatch({ type: HIDE_MODAL_EDIT });
        }}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button
              onClick={() => {
                dispatch({ type: HIDE_MODAL_EDIT });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSumbit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {ComponentContent}
      </Drawer>
    </>
  );
};

export default ModalEditJira;
