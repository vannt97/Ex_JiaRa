import React, { useRef, useState } from "react";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Popconfirm,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_USER_API,
  GET_USER_API,
} from "../../Redux/Constants/UserJiraConstant";
import { SHOW_MODAL_EDIT_AND_COMPONENT } from "../../Redux/Constants/ProjectConstant";
import FormEditUser from "../../Components/Form/FormEditUser/FormEditUser";

const UserManagement = () => {
  let dispatch = useDispatch();
  let searchRef = useRef(null);
  let { listUser } = useSelector((state) => state.UserReducer);
  let [userSearch, setUserSearch] = useState("");
  useEffect(() => {
    dispatch({ type: GET_USER_API, keyWord: "" });
  }, []);
  const columns = [
    {
      title: "STT",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch({
                  type: SHOW_MODAL_EDIT_AND_COMPONENT,
                  componentContent: <FormEditUser />,
                  projectEditModal: record,
                  title: "Edit User",
                });
              }}
            >
              <EditOutlined />
            </button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch({ type: DELETE_USER_API, id: record.userId });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger" onClick={() => {}}>
                <DeleteOutlined />
              </button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="container-fluid" style={{ flexGrow: 1 }}>
      <h2 className="text-center mt-4">User Management</h2>
      <div>
        <AutoComplete
          options={listUser?.map((user, index) => {
            return { label: user.name, value: String(user.userId) };
          })}
          style={{
            width: "90%",
            marginRight: "10px",
          }}
          onSelect={(value, option) => {
            setUserSearch(option.label);
            dispatch({ type: GET_USER_API, keyWord: option.label });
          }}
          value={userSearch}
          onSearch={(value) => {
            setUserSearch(value);
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setTimeout(() => {
              dispatch({ type: GET_USER_API, keyWord: value });
            }, 300);
          }}
          placeholder="Search Email"
        ></AutoComplete>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch({ type: GET_USER_API, keyWord: userSearch });
          }}
        >
          Search
        </button>
      </div>
      <br />
      <br />
      <Table
        columns={columns}
        bordered="true"
        dataSource={listUser}
        rowKey="userId"
      />
    </div>
  );
};

export default UserManagement;
