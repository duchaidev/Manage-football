import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const HeadingUser = () => {
  const [localStorageData, setLocalStorageData] = useState(null);
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    setLocalStorageData(localStorageData);
  }, []);
  const items = [
    {
      key: "0",
      label: (
        <NavLink rel="noopener noreferrer" to="/thong-tin-ca-nhan">
          Thông tin cá nhân
        </NavLink>
      ),
    },
    {
      key: "1",
      label: (
        // <a target="_blank" rel="noopener noreferrer" href="/thong-tin-ca-nhan">
        //   Thông tin cá nhân
        // </a>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/log-in";
          }}
        >
          Đăng xuất
        </button>
      ),
    },
  ];
  return (
    <div className="w-full h-[60px] flex justify-between items-center px-8 bg-green-200">
      <div className="h-full flex items-center">
        <NavLink className="h-[60px]" to={"/"}>
          <img className="object-cover h-full" src="/logo.png" alt="" />
        </NavLink>
        <span className="pl-4 text-green-600 text-xl font-semibold">
          Goal Line Arena
        </span>
      </div>
      <div className="h-full flex items-center gap-x-7">
        <div className="flex gap-x-5 text-green-600  text-xl font-semibold">
          <NavLink className="hover:text-green-400" to={"/"}>
            Trang chủ
          </NavLink>
          <NavLink className="hover:text-green-400" to={"/all"}>
            Danh sách sân
          </NavLink>
          {localStorageData?.role !== "user" && (
            <NavLink className="hover:text-green-400" to={"/admin/don-dat"}>
              Quản lý đơn đặt
            </NavLink>
          )}
        </div>
        <div className="h-full flex items-center">
          <span className="pr-4 text-green-600 text-xl font-semibold">
            Xin chào, {localStorageData?.name || "Khách"}
          </span>
          <div>
            {/* <img
              className="object-cover h-[40px] w-[40px] rounded-full"
              src="/avatar.jpg"
              alt=""
            /> */}
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                <Space>
                  <img
                    className="object-cover  h-[40px] w-[40px] rounded-full"
                    src="/avtdf.png"
                    alt=""
                  />
                  {/* <DownOutlined /> */}
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingUser;
