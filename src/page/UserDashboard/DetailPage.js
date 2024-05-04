import React, { useEffect, useState } from "react";
import HeadingUser from "../../components/layout/HeadingUser";
import Footer1 from "../../components/layout/Footer1";
import { Button, Modal, QRCode, Spin, TimePicker, message } from "antd";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-auth";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const DetailPage = () => {
  const [value, setValue] = useState(null);
  const [localStorageData, setLocalStorageData] = useState(null);
  const [data, setData] = useState([]);
  const [listBooking, setListBooking] = useState([]);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await handleTimeSelect(value?.map((time) => dayjs(time).format("HH:mm A")));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeTime = (time) => {
    console.log(time);
    setValue(time);
  };

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    setLocalStorageData(localStorageData);
  }, []);

  useEffect(() => {
    async function fetchSans() {
      setLoading(true);
      if (!id) return;
      const colRef = query(
        collection(db, "listsan"),
        where("slug", "==", id),
        limit(1)
      );
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setData({
            id: doc?.id,
            ...doc?.data(),
          });
        });
      });
      setLoading(false);
    }
    fetchSans();
  }, [id]);
  useEffect(() => {
    async function fetchSans() {
      if (!id) return;

      const today = dayjs().format("DD/MM/YYYY"); // Format ngày hôm nay

      const colRef = query(
        collection(db, "san_booking"),
        // where("id_san", "==", id),
        where("date", "==", today) // Thêm điều kiện so sánh ngày với ngày hôm nay
      );

      onSnapshot(colRef, (snapshot) => {
        const sortedData = snapshot.docs
          .map((doc) => doc.data())
          .sort((a, b) => {
            // Phân tích chuỗi thời gian bằng dayjs
            const timeA = dayjs(a.time[0], "HH:mm A");
            const timeB = dayjs(b.time[0], "HH:mm A");

            return timeA - timeB; // Sắp xếp theo thời gian
          });

        setListBooking(sortedData);
      });
    }

    fetchSans();
  }, [id]);

  const handleTimeSelect = (time) => {
    const [startTime, endTime] = data.time;
    if (time[0] === time[1]) return message.error("Thời gian không hợp lệ");
    if (time?.length === 0) return message.error("Vui lòng chọn thời gian");

    // Chuyển đổi thời gian mở cửa từ dữ liệu sang định dạng dayjs
    const dbStartTime = dayjs(startTime, "HH:mm A");
    const dbEndTime = dayjs(endTime, "HH:mm A");

    // Tạo khoảng thời gian từ thời gian đã chọn
    const selectedStart = dayjs(time[0], "HH:mm A");
    const selectedEnd = dayjs(time[1], "HH:mm A");

    // Kiểm tra xem thời gian đã chọn có nằm ngoài thời gian mở cửa không
    if (selectedStart.isBefore(dbStartTime) || selectedEnd.isAfter(dbEndTime)) {
      return message.error("Thời gian đã ngoài giờ mở cửa");
    } else {
      // Kiểm tra xem thời gian đã chọn có bị trùng lặp với các lịch đặt khác hay không
      const isTimeSet = listBooking.some((item) => {
        const [startTime, endTime] = item.time;

        // Chuyển đổi thời gian trong cơ sở dữ liệu sang định dạng dayjs
        const dbStartTime = dayjs(startTime, "HH:mm A");
        const dbEndTime = dayjs(endTime, "HH:mm A");

        // Kiểm tra xem thời gian đã chọn có chồng lấn với bất kỳ khoảng thời gian nào trong cơ sở dữ liệu hay không
        return (
          selectedStart.isBefore(dbEndTime) && selectedEnd.isAfter(dbStartTime)
        );
      });
      if (isTimeSet) {
        return message.error("Thời gian đã bị trùng lặp với lịch đặt khác");
      } else {
        return handleBook();
      }
    }
  };

  const handleBook = async () => {
    try {
      const colRef = collection(db, "san_booking");
      await addDoc(colRef, {
        id_san: id,
        time: value?.map((time) => dayjs(time).format("HH:mm A")),
        date: dayjs().format("DD/MM/YYYY"),
        name: data?.name,
        price: data?.price,
        emailOwner: data?.email || "",
        userIdOwner: data?.userId || "",
        code: Math.floor(Math.random() * 1000000),
        userId: localStorageData?.id || "",
        phone: localStorageData?.phone || "",
        email: localStorageData?.email || "",
        status: "success",
      });
      message.success("Đặt sân thành công");
    } catch (e) {
      console.log(e);
      message.error("Đặt sân thất bại");
    }
  };

  return (
    <div>
      <HeadingUser></HeadingUser>
      <Modal
        title="Chuyển khoản đặt cọc sân"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button onClick={handleCancel}>Hủy</Button>,
          <Button type="primary" onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}
      >
        <div className="flex items-center flex-col my-5 justify-center gap-5">
          <QRCode value="https://ant.design/" />
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-medium">Số tiền cần chuyển khoản</span>:{" "}
              100.000 VNĐ
            </p>
            <p>
              <span className="font-medium">Tên ngân hàng</span>: Vietcombank
            </p>
            <p>
              <span className="font-medium">Số tài khoản</span>: 0123456789
            </p>
            <p>
              <span className="font-medium">Chủ tài khoản</span>: Le Van A
            </p>
          </div>
        </div>
      </Modal>
      <Spin spinning={loading}>
        <div className="my-10 w-full items-center justify-center h-full flex flex-col">
          <div className="flex gap-5 w-[50%]">
            {/* <Carousel autoplay> */}
            <div className="w-[60%] aspect-video">
              <img
                className="object-cover rounded-lg h-full w-full"
                src={data?.image}
                alt=""
              />
            </div>
            {/* </Carousel> */}
            <div className="flex flex-col gap-y-3 ">
              <div>
                <span className="mt-2 text-xl text-green-500 font-semibold">
                  {data?.name}
                </span>
              </div>
              <p>
                <strong>Giá:</strong> {data?.price ? data?.price : "0"}/h VNĐ
              </p>
              <div>
                <span className="font-semibold">
                  Thời gian mở cửa:{" "}
                  {data?.time?.length > 0 &&
                    data?.time?.map((item, index) => {
                      return (
                        <span>
                          {item} {index === 0 ? " - " : ""}
                        </span>
                      );
                    })}
                </span>
              </div>
              <div>
                <span className="font-semibold">
                  <div>Thời gian đã có người thuê: </div>
                  {listBooking?.length > 0 &&
                    listBooking?.map((item, index) => {
                      return (
                        <span className="text-red-500">
                          <span className="whitespace-nowrap">
                            {item.time[0]} - {item.time[1]}
                          </span>
                          <span className="text-black">
                            {listBooking?.length - 1 !== index ? " / " : ""}
                          </span>
                        </span>
                      );
                    })}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Chọn giờ: </span>
                <TimePicker.RangePicker
                  format={"HH:mm"}
                  className="w-full"
                  onChange={onChangeTime}
                />
              </div>
              <button
                className="bg-green-500 max-w-[100px] py-1 px-2 rounded-lg text-white font-sans text-lg hover:bg-green-400"
                onClick={() => {
                  if (!value) return message.error("Vui lòng chọn thời gian");
                  showModal();
                }}
              >
                Đặt ngay
              </button>
            </div>
          </div>
          <div className="flex w-[50%]">
            <div className="flex flex-col my-5 gap-y-3 ">
              <span>
                <strong>Địa chỉ:</strong> {data?.address}
              </span>
              <span>
                <strong>Diện tích:</strong> {data?.acr ? data?.acr : "0"} m2
              </span>
              <span>
                <strong>SĐT chủ sân:</strong>{" "}
                {data?.phone ? data?.phone : "Không có"}
              </span>

              <span>
                <strong>Giờ mở cửa:</strong>{" "}
                {data?.time?.length > 0 &&
                  data?.time?.map((item, index) => {
                    return (
                      <span>
                        {item} {index === 0 ? " - " : ""}
                      </span>
                    );
                  })}
              </span>
              <span>
                <strong>Giá:</strong> {data?.price ? data?.price : "0"}/h VNĐ
              </span>
              <span>
                <strong>Mô tả:</strong> {data?.description}
              </span>
            </div>
          </div>
        </div>
      </Spin>
      <Footer1></Footer1>
    </div>
  );
};

export default DetailPage;
