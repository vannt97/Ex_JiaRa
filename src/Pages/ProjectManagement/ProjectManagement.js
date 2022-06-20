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
import { NavLink } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useSelector, useDispatch } from "react-redux";
import FormEditModal from "../../Components/Form/FormEdit/FormEditModal";
import {
  DELETE_PROJECT_API,
  GET_LIST_PROJECT_API,
  REMOVE_USER_FROM_PROJECT,
  SHOW_MODAL_EDIT_AND_COMPONENT,
} from "../../Redux/Constants/ProjectConstant";
import {
  ASSIGN_USER_PROjECT,
  GET_USER_API,
} from "../../Redux/Constants/UserJiraConstant";

const ProjectManagement = () => {
  // state ProjectManagement from redux
  let { projectList } = useSelector((state) => state.ProjectManagementReducer);
  let { listUser } = useSelector((state) => state.UserReducer);
  let searchRef = useRef(null);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_API });
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [valueAutoComplete, setValueAutoComplete] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: "20%",

      ...getColumnSearchProps("projectName"),
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      ...getColumnSearchProps("categoryName"),
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      width: "20%",
      ...getColumnSearchProps("creator"),
      render: (text, record, index) => {
        return <span key={index}>{record.creator.name}</span>;
      },
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      width: "20%",
      ...getColumnSearchProps("members"),
      render: (text, record, index) => {
        return (
          <>
            {record.members?.slice(0, 3).map((item, index_item) => {
              return (
                <Popover
                  placement="top"
                  title={"Member"}
                  content={() => {
                    const columns = [
                      {
                        title: "Id",
                        dataIndex: "userId",
                        key: "userId",
                      },
                      {
                        title: "Avatar",
                        dataIndex: "avatar",
                        key: "avatar",
                        render: () => {
                          return <Avatar src={item.avatar} />;
                        },
                      },
                      {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                      },
                      {
                        title: "Action",
                        key: "action",
                        render: (
                          text_children,
                          record_children,
                          index_children
                        ) => (
                          <Space size="middle">
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                dispatch({
                                  type: REMOVE_USER_FROM_PROJECT,
                                  userProject: {
                                    projectId: record.id,
                                    userId: record_children.userId,
                                  },
                                });
                              }}
                            >
                              <DeleteOutlined />
                            </button>
                          </Space>
                        ),
                      },
                    ];
                    return (
                      <Table
                        columns={columns}
                        dataSource={record.members}
                        rowKey={"userId"}
                      />
                    );
                  }}
                  key={index_item}
                >
                  <Avatar src={item.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            {
              <Popover
                placement="topRight"
                title={"Add member"}
                content={() => {
                  return (
                    <AutoComplete
                      options={listUser?.map((user, index) => {
                        return { label: user.name, value: String(user.userId) };
                      })}
                      onSelect={(value, option) => {
                        setValueAutoComplete(option.label);
                        dispatch({
                          type: ASSIGN_USER_PROjECT,
                          userProject: {
                            projectId: record.id,
                            userId: value,
                          },
                        });
                      }}
                      onChange={(value) => {
                        setValueAutoComplete(value);
                      }}
                      value={valueAutoComplete}
                      style={{
                        width: "100%",
                      }}
                      onSearch={(value) => {
                        if (searchRef.current) {
                          clearTimeout(searchRef.current);
                        }

                        searchRef.current = setTimeout(() => {
                          dispatch({ type: GET_USER_API, keyWord: value });
                        }, 300);
                      }}
                    />
                  );
                }}
                trigger="click"
              >
                <Button shape="circle">+</Button>
              </Popover>
            }
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            className="btn btn-primary"
            onClick={() => {
              dispatch({
                type: SHOW_MODAL_EDIT_AND_COMPONENT,
                componentContent: <FormEditModal />,
                projectEditModal: record,
                title: "Edit project",
              });
            }}
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({ type: DELETE_PROJECT_API, idProject: record.id });
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="btn btn-danger" onClick={() => {}}>
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="container-fluid">
      <h1 style={{ margin: "20px" }}>Project Management</h1>
      <Table columns={columns} rowKey={"id"} dataSource={projectList} />
    </div>
  );
};

export default ProjectManagement;
