import React, { useState } from "react";
import HeadingUser from "../../components/layout/HeadingUser";
import Footer1 from "../../components/layout/Footer1";
import { Space, Table } from "antd";
import AllPitch from "../../components/all/AllPitch";

const AllPitchPage = ({ data }) => {
  return (
    <>
      <HeadingUser></HeadingUser>
      {/* <div className="mt-10 p-10 "> */}
      <AllPitch></AllPitch>
      {/* </div> */}
      <Footer1></Footer1>
    </>
  );
};

export default AllPitchPage;
