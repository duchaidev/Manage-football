import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Spin, message } from "antd";
import { auth, db } from "../firebase-app/firebase-auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

const LogInPage = () => {
  const [valueForm, setValueForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValueForm({
      ...valueForm,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (valueForm.email === "" || valueForm.password === "") {
      message.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    setLoading(true);
    try {
      const data = await signInWithEmailAndPassword(
        auth,
        valueForm.email,
        valueForm.password
      );
      const q = query(
        collection(db, "users"),
        where("email", "==", String(data?.user?.email))
      );
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          // Thêm ID của người dùng vào đối tượng dữ liệu
          userData.id = doc.id;
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          console.log("No such user document!");
        }
      });
      message.success("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      message.error("Sai tài khoản hoặc mật khẩu");
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex mt-5 items-center justify-center">
      <div className="flex flex-col w-[500px] bg-gray-50  items-center justify-center">
        <NavLink to={"/"} className="flex flex-col items-center justify-center">
          <img src="./logo.png" alt="" />
          <span className=" text-green-600 text-2xl font-semibold">
            Goal Line Arena
          </span>
        </NavLink>
        <Spin spinning={loading}>
          <div className="mt-10  p-5 rounded-lg w-[400px]">
            <form action="">
              <div className="flex flex-col gap-3">
                <label
                  className="text-base text-green-600 font-medium"
                  htmlFor=""
                >
                  Email đăng nhập
                </label>
                <input
                  className="outline-none rounded-md border border-green-200 p-2"
                  type="email"
                  placeholder="Nhập email đăng nhập"
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
                  Mật khẩu đăng nhập
                </label>
                <input
                  className="outline-none rounded-md border border-green-200 p-2"
                  type="password"
                  placeholder="Nhập mật khẩu đăng nhập"
                  name="password"
                  value={valueForm.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-7 w-full flex flex-col gap-3">
                <button
                  className="bg-green-400 text-white text-lg px-2 py-1 rounded-lg"
                  onClick={submit}
                >
                  Đăng nhập
                </button>
                <p className="">
                  Bạn chưa có tài khoản?
                  <Link
                    className="cursor-pointer underline text-green-500"
                    to="/register"
                  >
                    {" "}
                    Đăng ký
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default LogInPage;
