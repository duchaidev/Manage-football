import { Popconfirm, Space, Table, Tag, message } from "antd";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-app/firebase-auth";

const OderList = () => {
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
          where("userId", "==", String(localStorageData.id))
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
      key: "date ",
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
          )}
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} scroll={{ x: true }} />
    </div>
  );
};

export default OderList;
