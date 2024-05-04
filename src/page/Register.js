import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Spin, message } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./../firebase-app/firebase-auth";

const Register = () => {
  const [valueForm, setValueForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setValueForm({
      ...valueForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (valueForm.password !== valueForm.rePassword) {
      message.error("Mật khẩu không trùng khớp");
      return;
    }
    if (!valueForm.email) {
      message.error("Email không được để trống");
      return;
    }
    if (!valueForm.password) {
      message.error("Mật khẩu không được để trống");
      return;
    }
    if (!valueForm.name) {
      message.error("Tên không được để trống");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        valueForm.email,
        valueForm.password
      );
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        email: valueForm.email,
        name: valueForm.name,
        avatar: "/avtdf.png",
        avatardf: "/avtdf.png",
        role: "user",
      });
      message.success("Successfully!!!");
    } catch (error) {
      message.error("Email đã tồn tại");
    }
    setLoading(false);
  };
  return (
    <div className="w-full flex mt-5 items-center justify-center">
      <Spin spinning={loading}>
        <div className="flex flex-col w-[500px] bg-gray-50  items-center justify-center">
          <NavLink
            to={"/"}
            className="flex flex-col items-center justify-center"
          >
            <img src="./logo.png" alt="" />
            <span className=" text-green-600 text-2xl font-semibold">
              Goal Line Arena
            </span>
          </NavLink>
          <div className="mt-10  p-5 rounded-lg w-[400px]">
            <form action="">
              <div className="flex flex-col gap-3">
                <label
                  className="text-base text-green-600 font-medium"
                  htmlFor=""
                >
                  Tên đăng ký
                </label>
                <input
                  className="outline-none rounded-md border border-green-200 p-2"
                  type="email"
                  placeholder="Nhập tên đăng ký"
                  name="name"
                  value={valueForm.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  className="text-base text-green-600 font-medium"
                  htmlFor=""
                >
                  Email đăng ký
                </label>
                <input
                  className="outline-none rounded-md border border-green-200 p-2"
                  type="email"
                  placeholder="Nhập email đăng ký"
                  name="email"
                  value={valueForm.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  className="text-base text-green-600 font-medium"
                  htmlFor=""
                >
                  Mật khẩu
                </label>
                <input
                  className="outline-none rounded-md border border-green-200 p-2"
                  type="password"
                  placeholder="Nhập mật khẩu "
                  name="password"
                  value={valueForm.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <label
                  className="text-base text-green-600 font-medium"
                  htmlFor=""
                >
                  Mật khẩu
                </label>
                <input
                  className="outline-none rounded-md border border-green-200 p-2"
                  type="password"
                  placeholder="Nhập mật khẩu "
                  name="rePassword"
                  value={valueForm.rePassword}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-7 w-full flex flex-col gap-3">
                <button
                  className="bg-green-400 text-white text-lg px-2 py-1 rounded-lg"
                  onClick={handleSubmit}
                >
                  Đăng ký
                </button>
                <p className="">
                  Bạn đã có tài khoản?
                  <Link
                    className="cursor-pointer underline text-green-500"
                    to="/log-in"
                  >
                    {" "}
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Register;
