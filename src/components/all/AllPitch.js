import { collection, onSnapshot, or, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-app/firebase-auth";
import { NavLink } from "react-router-dom";
import { Input, Select } from "antd";
import dayjs from "dayjs";
const { Search } = Input;

const AllPitch = () => {
  const [dataSource, setDataSource] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const handleCheckDate = (timeOff) => {
    if (!timeOff) return false;
    const startDate = dayjs(timeOff[0], "DD/MM/YYYY");
    const endDate = dayjs(timeOff[1], "DD/MM/YYYY");

    // Ngày hiện tại
    const today = dayjs().add(3, "day");

    // Kiểm tra xem ngày hôm nay có nằm trong khoảng thời gian hay không
    const isTodayInRange =
      today.isAfter(startDate.subtract(1, "day")) &&
      today.isBefore(endDate.add(1, "day"));
    return isTodayInRange;
  };
  const onSearch = (value, _e, info) => setSearch(value);
  const handleChange = (value) => {
    setType(value);
  };

  useEffect(() => {
    if (search) {
      const result = dataSource.filter((item) => {
        return (
          item.address.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      });
      setDataSearch(result);
    } else {
      setDataSearch(dataSource);
    }
  }, [search, dataSource]);

  async function fetchSans() {
    // const colRef = collection(db, "listsan");
    const newRef = query(
      collection(db, "listsan"),
      type && where("type", "==", parseInt(type))
    );
    onSnapshot(newRef, (snapshot) => {
      const result = [];
      snapshot.forEach((san) => {
        result.push({
          id: san.id,
          ...san.data(),
        });
      });
      setDataSource(result?.filter((item) => !handleCheckDate(item?.timeOff)));
    });
  }

  useEffect(() => {
    fetchSans();
  }, [type, search]);
  return (
    <div className="m-10">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold flex items-center">
          Danh sách tất cả sân bóng
        </p>
        <p className="flex items-center gap-5">
          <Search
            placeholder="Tìm kiếm theo địa chỉ hoặc tên sân"
            onSearch={onSearch}
            style={{
              width: 300,
            }}
            allowClear
          />
          <Select
            style={{
              width: 180,
            }}
            placeholder="Chọn loại sân"
            onChange={handleChange}
            options={[
              {
                value: "",
                label: "Tất cả",
              },
              {
                value: "7",
                label: "Sân 7 người",
              },
              {
                value: "11",
                label: "Sân 11 người",
              },
            ]}
          />
        </p>
      </div>
      {dataSearch?.length > 0 ? (
        <div className="grid grid-cols-4 gap-3 w-[100%] mt-10 ">
          {dataSearch?.map((item, index) => (
            <ItemAll
              key={index}
              slug={item?.slug}
              img={item?.image}
              // title={item?.title}
              name={item?.name}
              price={item?.price}
              location={item?.address}
              type={item?.type}
              // link={item?.link}
            ></ItemAll>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full my-36">
          <p className="text-2xl text-center text-red-500">
            Không tìm thấy sân bóng theo yêu cầu của bạn
          </p>
        </div>
      )}
      <div className="flex w-full items-center justify-center mt-10">
        {/* <button className="border border-green-300 bg-green-400 hover:bg-green-300 px-2 py-1 rounded-lg text-white">
          Xem thêm
        </button> */}
      </div>
    </div>
  );
};

function ItemAll({ img, name, price, slug, type }) {
  return (
    <div className="flex flex-col border-gray-300 border p-1 w-[100%] h-[330px] rounded-lg shadow-lg">
      <div className="object-cover h-full ">
        <img
          src={img}
          alt=""
          className="w-[100%] h-[220px] boder rounded-md opacity-90 "
        />
      </div>
      <div className="  flex flex-col items-start justify-center w-full h-full">
        <h3 className="flex  items-start justify-start text-start  text-green-500 text-lg">
          {name} {type ? `- Sân ${type}` : ""}
        </h3>
        <h4 className="flex  items-start justify-start text-start  text-green-500 text-md">
          Giá: {price.toLocaleString()} VNĐ
        </h4>
        <NavLink to={`/chi-tiet/${slug}`}>
          <button className="border bg-green-400 rounded-xl px-2 py-1 text-white hover:bg-yellow-400 hover:border-transparent">
            Chi tiết
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default AllPitch;
