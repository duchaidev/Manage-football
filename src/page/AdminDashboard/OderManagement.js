import React, { useEffect, useState } from "react";
import { Popconfirm, Space, Table, Tag, message } from "antd";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-auth";

const OderManagement = () => {
  const [dataSource, setDataSource] = useState([]);
  const [localStorageData, setLocalStorageData] = useState(null);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    setLocalStorageData(localStorageData);
  }, []);

  useEffect(() => {
    if (localStorageData) {
      async function fetchSans() {
        // const colRef = collection(db, "listsan");
        const newRef = query(
          collection(db, "san_booking"),
          localStorageData?.id !== "staff" &&
            where("userIdOwner", "==", String(localStorageData.id))
        );
        onSnapshot(newRef, (snapshot) => {
          const result = [];
          snapshot.forEach((san) => {
            result.push({
              id: san.id,
              ...san.data(),
            });
          });
          setDataSource(result);
        });
      }
      fetchSans();
    }
  }, [localStorageData]);

  const columns = [
    {
      title: "Mã sân",
      dataIndex: "code",
      key: "code",
      render: (code) => <span className="font-semibold">{code}</span>,
    },
    {
      title: "Tên sân",
      dataIndex: "name",
      key: "name",
      render: (code) => <span className="font-semibold">{code}</span>,
    },
    {
      title: "Email/SĐT",
      dataIndex: "",
      key: "",
      render: (_, render) => (
        <span className="font-semibold">
          {render?.email} {render?.phone ? `- ${render?.phone}` : ""}
        </span>
      ),
    },
    {
      title: "Ngày thuê",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Loại sân",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Giờ thuê",
      dataIndex: "time",
      key: "time ",
      render: (text) => (
        <span>{text?.length > 0 && text?.map((item) => <p>{item}</p>)}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span>
          {status === "success" ? (
            <Tag color="green">Thành công</Tag>
          ) : (
            <Tag color="red">Đã bị hủy</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space size="middle">
          {record.status === "success" && (
            <div className="flex gap-4">
              <Popconfirm
                title="Hủy sân này?"
                description="Bạn có muốn hủy sân này?"
                okText="Đồng ý"
                cancelText="Không"
                onConfirm={async () => {
                  try {
                    const colRef = doc(db, "san_booking", record?.id);
                    await updateDoc(colRef, {
                      ...record,
                      status: "cancel",
                    });
                    message.success("Thao tác thành công");
                  } catch (error) {
                    console.log("Error updating document: ", error);
                  }
                }}
              >
                <span className="cursor-pointer font-semibold">Hủy</span>
              </Popconfirm>
            </div>
          )}
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col bg-gray-100 w-full p-5 ">
        <div className=" bg-white w-full h-[50px] p-10 items-center rounded-lg flex justify-between">
          <span className="text-xl font-medium text-green-600">
            Danh sách đơn đặt
          </span>
          {/* <div>
            <input
              className="outline-none px-2 py-1 border rounded-lg border-green-300"
              type="text"
              placeholder="Tìm kiếm"
            />
          </div> */}
        </div>
        <div className=" w-full">
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default OderManagement;
