import { collection, limit, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-app/firebase-auth";
import { NavLink } from "react-router-dom";
import { Spin } from "antd";

const New = ({ data, title }) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSans() {
      setLoading(true);
      // const colRef = collection(db, "listsan");
      const newRef = query(collection(db, "listsan"), limit(4));
      onSnapshot(newRef, (snapshot) => {
        const result = [];
        snapshot.forEach((san) => {
          result.push({
            id: san.id,
            ...san.data(),
          });
        });
        setDataSource(result);
        console.log(result);
      });
      setLoading(false);
    }
    fetchSans();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="my-10 w-full flex flex-col">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="border-t-2 border-orange-600 ">
            <span className="text-orange-500 font-semibold text-3xl">
              {title || "Sân mới trong tháng"}
            </span>
          </div>
        </div>
        <div className=" my-5 grid grid-cols-4 gap-2">
          {dataSource?.map((item, index) => (
            <ItemTour
              key={index}
              slug={item?.slug}
              img={item?.image}
              name={item?.name}
              price={item?.price}
            ></ItemTour>
          ))}
        </div>
      </div>
    </Spin>
  );
};

function ItemTour({ img, name, price, slug }) {
  return (
    <div className=" relative aspect-video pr-4 mb-5">
      <div className="w-full  h-full ">
        <img
          className="w-full h-full object-cover rounded-md "
          src={img}
          alt=""
        />
      </div>
      <div className="absolute  left-4 bottom-4 text-white">
        <h2 className="text-xl">{name}</h2>
        <h3>{price.toLocaleString()}/h VNĐ</h3>
        <NavLink to={`/chi-tiet/${slug}`}>
          <button className="border rounded-xl px-2 py-1 text-white hover:bg-yellow-400 hover:border-transparent">
            Chi tiết
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default New;
