import React, { useState } from "react";
import HeadingUser from "../../components/layout/HeadingUser";
import Footer1 from "../../components/layout/Footer1";
import { Space, Table } from "antd";
import AllPitch from "../../components/all/AllPitch";

const dataAll = [
  {
    img: "/san2.jpg",
    title: "Đà Nẵng-Thành phố Đà Nẵng",
    price: "1.000.000",
    link: "/chi-tiet",
  },

  {
    img: "/san4.jpg",
    title: "Đà Nẵng-Thành phố Đà Nẵng",
    price: "1.000.000",
    link: "/chi-tiet",
  },

  {
    img: "/san7.jpg",
    title: "Đà Nẵng-Thành phố Đà Nẵng",
    price: "1.000.000",
    link: "/chi-tiet",
  },
  {
    img: "/san2.jpg",
    title: "Đà Nẵng-Thành phố Đà Nẵng",
    price: "1.000.000",
    link: "/chi-tiet",
  },

  {
    img: "/san4.jpg",
    title: "Đà Nẵng-Thành phố Đà Nẵng",
    price: "1.000.000",
    link: "/chi-tiet",
  },

  {
    img: "/san7.jpg",
    title: "Đà Nẵng-Thành phố Đà Nẵng",
    price: "1.000.000",
    link: "/chi-tiet",
  },
  {
    img: "/san2.jpg",
    title: "Đà Nẵng-Thành phố Đà Nẵng",
    price: "1.000.000",
    link: "/chi-tiet",
  },

  {
    img: "/san4.jpg",
    title: "Đà Nẵng-Thành phố Đà Nẵng",
    price: "1.000.000",
    link: "/chi-tiet",
  },

  {
    img: "/san7.jpg",
    title: "Đà Nẵng-Thành phố Đà Nẵng",
    price: "1.000.000",
    link: "/chi-tiet",
  },
];

const AllPitchPage = ({ data }) => {
  return (
    <>
      <HeadingUser></HeadingUser>
      {/* <div className="mt-10 p-10 "> */}
      <AllPitch data={dataAll}></AllPitch>
      {/* </div> */}
      <Footer1></Footer1>
    </>
  );
};

export default AllPitchPage;
