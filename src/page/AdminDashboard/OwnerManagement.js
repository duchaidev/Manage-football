import React, { useEffect, useRef, useState } from "react";
import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Col,
  Row,
  message,
  Popconfirm,
} from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-app/firebase-auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const OwnerManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [editData, setEditData] = useState();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const newRef = query(
          collection(db, "users"),
          where("role", "==", "staff")
        );
        onSnapshot(newRef, (snapshot) => {
          const result = [];
          snapshot.forEach((user) => {
            result.push({
              id: user.id,
              ...user.data(),
            });
          });
          setDataSource(result);
          console.log(result);
        });
      } catch (error) {
        console.log("Error getting document:", error);
      }
    }
    fetchUsers();
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditData(null);
  };

  const onFinish = async () => {
    const values = form.getFieldsValue();
    console.log(values);
    if (!values.name || !values.phone || !values.email) {
      message.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      if (editData) {
        const colRef = doc(db, "users", editData);
        await updateDoc(colRef, {
          name: values.name,
          phone: values.phone,
          email: values.email,
        });
        message.success("Cập nhật chủ sân thành công");
      } else {
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          email: values.email,
          name: values.name,
          phone: values.phone,
          avatar: "/avtdf.png",
          avatardf: "/avtdf.png",
          role: "staff",
        });
        message.success("Tạo mới chủ sân thành công");
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error("Tạo mới chủ sân thất bại");
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "createdId",
      key: "createdId",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên chủ sân",
      dataIndex: "name",
      key: "name ",
      render: (code) => <span className="font-semibold">{code}</span>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone ",
      render: (phone) => <span className="font-semibold">{phone}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email ",
      render: (email) => <span className="font-semibold">{email}</span>,
    },

    {
      title: "Thao tác",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              form.setFieldsValue({
                name: record.name,
                phone: record.phone,
                email: record.email,
              });
              setEditData(record?.id);
              setIsModalOpen(true);
            }}
          >
            <EditOutlined className="text-[#263a29] text-2xl" />
          </button>
          <Popconfirm
            title="Xóa sân"
            description="Bạn có chắc chắn muốn xóa sân?"
            onConfirm={async () => {
              const singleDoc = doc(db, "users", record.id);
              await deleteDoc(singleDoc);
              message.success("Xóa chủ sân thành công");
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="text-red-500 text-2xl" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [pagination, setPagination] = useState({ pageIndex: 1, pageSize: 10 });
  const onTableChange = async (paginations) => {
    const { current, pageSize } = paginations;
    const paging = { ...pagination, pageIndex: current, pageSize };
    setPagination(paging);
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col h-[calc(100vh-60px)] bg-gray-100 w-full p-5 ">
        <div className="bg-white p-5 flex flex-col gap-5 rounded-lg">
          <div className="  w-full h-[50px] items-center flex justify-between">
            <span className="text-xl font-medium text-green-600">
              Danh sách chủ sân
            </span>
            <div className="flex gap-x-3">
              {/* <input
                className="outline-none px-2 py-1 border rounded-lg border-green-300"
                type="text"
                placeholder="Tìm kiếm"
              /> */}
              <button
                onClick={showModal}
                className="bg-green-600 text-white p-2 font-medium rounded-md hover:bg-green-300"
              >
                Thêm mới chủ sân
              </button>
            </div>
          </div>
          <div className=" w-full">
            <Table
              columns={columns}
              dataSource={dataSource}
              pageIndex={pagination.pageIndex}
              pagination={{
                current: pagination.pageIndex,
                // total: listData?.result?.total,
                pageSize: pagination.pageSize,
              }}
              onChange={onTableChange}
              scroll={{ x: true }}
            />
          </div>
        </div>
      </div>

      <div className="modal">
        <Modal
          className="headerModal"
          title="Tạo mới sân"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              ĐÓNG
            </Button>,
            <Button
              type="primary"
              onClick={() => {
                onFinish();
              }}
              loading={loading}
              form="form"
              name="form"
            >
              {editData ? "Cập nhật" : "Tạo mới"}
            </Button>,
          ]}
        >
          <div className="ant_body">
            <Form
              layout="vertical"
              form={form}
              name="form"
              onFinish={onFinish}
              initialValues={{
                name: "",
                phone: "",
                email: "",
                password: "",
              }}
            >
              <Row>
                <Col span={24}>
                  <Form.Item name="id" hidden>
                    <Input hidden />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Tên chủ sân" name="name">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Email" name="email">
                    <Input />
                  </Form.Item>
                </Col>
                {!editData && (
                  <Col span={24}>
                    <Form.Item label="Mật khẩu" name="password">
                      <Input.Password />
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default OwnerManagement;
