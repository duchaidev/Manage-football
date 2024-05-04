import React, { useEffect, useState } from "react";
import {
  // AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu, message } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "../index.css";
import HeadingAd from "./layout/HeadingAd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const MenuComponent = () => {
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    const localStorageData = JSON?.parse(localStorage?.getItem("user"));
    if (localStorageData?.role === "user") {
      message.error("Bạn không có quyền truy cập vào trang này");
      navigate("/");
    } else {
      setDataUser(localStorageData);
    }
  }, []);
  const items = [
    getItem("Danh sách sân", "/admin/danh-sach-san", <PieChartOutlined />),

    getItem("Quản lý đơn đặt", "/admin/don-dat", <DesktopOutlined />),

    dataUser?.role === "admin" &&
      getItem(
        "Quản lý chủ sân",
        "/admin/quan-ly-chu-san",
        <ContainerOutlined />
      ),
    getItem(
      "Quản lý doanh thu",
      "/admin/quan-ly-doanh-thu",
      <ContainerOutlined />
    ),
  ];
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };

  return (
    <>
      <HeadingAd></HeadingAd>
      <div className="content-body">
        <Menu
          className="max-width h-[calc(100vh-60px)] bg-[#ffffff]"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          onClick={onClick}
          items={items}
        />
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default MenuComponent;
