import React, { useEffect, useRef, useState } from "react";
import { Table } from "antd";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-auth";
import dayjs from "dayjs";

const RevenueManagement = () => {
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
            where("userIdOwner", "==", String(localStorageData.id)),
          where("status", "==", "success")
        );
        onSnapshot(newRef, (snapshot) => {
          const result = [];
          snapshot.forEach((san) => {
            result.push({
              id: san.id,
              ...san.data(),
            });
          });
          const totalsByDate = [];

          // Lặp qua tất cả các đối tượng trong mảng result
          result.forEach((item) => {
            // Tính toán tổng số tiền cho mỗi đối tượng
            const startTime = dayjs(item.time[0], "HH:mm A");
            const endTime = dayjs(item.time[1], "HH:mm A");
            const hours = endTime.diff(startTime, "hour", true);
            const totalAmount = hours * item.price;

            // Kiểm tra xem ngày đã có trong mảng totalsByDate chưa
            const dateIndex = totalsByDate.findIndex(
              (dateItem) => dateItem.date === item.date
            );
            if (dateIndex !== -1) {
              // Nếu ngày đã có trong mảng, cộng tổng số tiền vào tổng số tiền của ngày đó
              totalsByDate[dateIndex].total += totalAmount;
            } else {
              // Nếu ngày chưa có trong mảng, thêm một đối tượng mới vào mảng totalsByDate
              totalsByDate.push({
                date: item.date,
                total: totalAmount,
              });
            }
          });
          setDataSource(totalsByDate);
        });
      }
      fetchSans();
    }
  }, [localStorageData]);

  const columns = [
    {
      title: "Doanh thu ngày",
      dataIndex: "date",
      key: "date",
      render: (createdId) => <span className="font-semibold">{createdId}</span>,
    },

    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "total",
      key: "total ",
      render: (total) => (
        <span className="font-semibold">{total.toLocaleString()}</span>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col bg-gray-100 h-[calc(100vh-60px)] w-full p-5 ">
        <div className=" bg-white w-full h-[50px] p-10 items-center rounded-lg flex justify-between">
          <span className="text-xl font-medium text-green-600">
            Quản lý doanh thu
          </span>
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

export default RevenueManagement;
