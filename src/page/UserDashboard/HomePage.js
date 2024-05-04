import React from "react";
import HeadingUser from "../../components/layout/HeadingUser";
import Banner from "../../components/Banner";
import Popular from "../../components/Popular";
import New from "../../components/New";
import Footer1 from "../../components/layout/Footer1";

const HomePage = () => {
  return (
    <div className="">
      <HeadingUser></HeadingUser>
      <Banner></Banner>
      {/* <Popular data={dataPopular1}></Popular> */}
      {/* <New data={dataNew} title="Sân hot trong tháng"></New>
      <New data={dataNew}></New> */}
      <div className="mx-6">
        <New title="Sân hot trong tháng"></New>
        <New></New>
      </div>
      <Footer1></Footer1>
    </div>
  );
};

export default HomePage;
