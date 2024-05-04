import React, { useEffect, useState } from "react";
import HeadingUser from "../../components/layout/HeadingUser";
import { Button, Flex, Menu, message } from "antd";
import {
  // AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import routers from "../../routers";
import { Route, Routes } from "react-router-dom";
import OrderList from "./OderList";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-auth";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const Infomation = () => {
  const [current, setCurrent] = useState("thong-tin-ca-nhan");
  const [infoUser, setInfoUser] = useState({});
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    setInfoUser(localStorageData);
  }, []);

  const items = [
    getItem("Thông tin cá nhân", "thong-tin-ca-nhan", <DesktopOutlined />),
    getItem("Quản lý đơn hàng", "quan-ly-don-hang", <ContainerOutlined />),
  ];
  const showContentMenu = (routes) => {
    let result = null;
    if (routes) {
      result = routes.map((item, index) => {
        return (
          <Route key={index} path={item.path} element={item.Conponent()} />
        );
      });
    }
    return result;
  };
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const handleSubmit = async () => {
    if (!infoUser?.id)
      return message.error("Vui lòng đăng nhập để cập nhật thông tin");
    if (!infoUser?.name) return message.error("Vui lòng nhập tên");
    if (!infoUser?.email) return message.error("Vui lòng nhập email");

    try {
      const colRef = doc(db, "users", infoUser?.id);
      await updateDoc(colRef, {
        ...infoUser,
      });
      message.success("Cập nhật sân thành công");
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  };

  return (
    <div>
      <HeadingUser></HeadingUser>
      <div className="my-5">
        <span className="text-2xl font-semibold text-green-400 mx-[200px] ">
          Thông tin cá nhân
        </span>
      </div>
      <div className="grid grid-cols-4 gap-10 mx-[200px]">
        <div className="col-span-1">
          <div className="">
            <Menu
              // className="max-width"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              onClick={onClick}
              items={items}
            />
            <Routes>{showContentMenu(routers)}</Routes>
          </div>
        </div>
        {current === "thong-tin-ca-nhan" ? (
          <div className="col-span-3">
            <div className="grid-cols-2 grid gap-10">
              <div className="flex-col flex w-full gap-y-3">
                <span className="max-w-full">Họ tên</span>
                <input
                  className="border w-full rounded-md outline-none py-1 px-2"
                  type="text"
                  defaultValue={infoUser?.name}
                  onChange={(e) => {
                    setInfoUser({ ...infoUser, name: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col w-full gap-y-3">
                <span className="">Email</span>
                <input
                  className="border w-full rounded-md outline-none py-1 px-2"
                  type="text"
                  defaultValue={infoUser?.email}
                  onChange={(e) => {
                    setInfoUser({ ...infoUser, email: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="grid-cols-2 grid gap-10">
              <div className="flex-col flex w-full gap-y-3">
                <span className="max-w-full">Điện thoại</span>
                <input
                  className="border w-full rounded-md outline-none py-1 px-2"
                  type="text"
                  defaultValue={infoUser?.phone}
                  onChange={(e) => {
                    setInfoUser({ ...infoUser, phone: e.target.value });
                  }}
                />
              </div>
            </div>
            <Button type="primary" className="mt-4" onClick={handleSubmit}>
              Xác nhận
            </Button>
          </div>
        ) : (
          <div className="col-span-3">
            <OrderList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Infomation;
