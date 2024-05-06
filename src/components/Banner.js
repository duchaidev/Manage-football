import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative">
      <div className="w-full">
        {/* <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>
              <img
                className="object-cover h-full w-full"
                src="./san13.jpg"
                // src="./football-chromebook-wallpaper.jpg"
                alt=""
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                className="object-cover h-full w-full"
                src="./san15.jpg"
                alt=""
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                className="object-cover h-full w-full"
                src="./san12.jpg"
                alt=""
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                className="object-cover h-full w-full"
                src="./san14.jpg"
                alt=""
              />
            </h3>
          </div>
        </Carousel> */}
        <div className="m-5 h-[500px] justify-between px-[8%] flex items-center bg-gradient rounded-lg">
          <div className="max-w-[45%] flex flex-col gap-3 text-white">
            <h2 className="text-3xl font-semibold whitespace-nowrap">
              Thuê - Đặt Sân Trực Tuyến Dễ Dàng
            </h2>
            <span>
              Khám phá dịch vụ thuê sân thể thao trực tuyến tại đây! Với nền
              tảng đặt sân tiện lợi, bạn có thể dễ dàng đặt sân bóng đá với
              nhiều lựa chọn khác chỉ trong vài bước đơn giản. Đã đến lúc tham
              gia cùng bạn bè và gia đình vào những trận đấu sôi động mà không
              cần phải lo lắng về việc tìm sân!
            </span>
            <div className="w-[400px]">
              <NavLink to={"/all"}>
                <button className="gap-2 px-6 py-3 border-none text-white flex items-center justify-center rounded-lg bg-[#46b665]">
                  <p className="font-semibold -translate-y-[2px]">Đặt ngay </p>
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2768 5.46427L7.3393 9.40177C7.21601 9.52506 7.0488 9.59432 6.87445 9.59432C6.7001 9.59432 6.53289 9.52506 6.40961 9.40177C6.28633 9.27849 6.21707 9.11128 6.21707 8.93693C6.21707 8.76258 6.28633 8.59537 6.40961 8.47208L9.22656 5.65622H1.1875C1.01345 5.65622 0.846532 5.58708 0.723461 5.46401C0.60039 5.34094 0.53125 5.17402 0.53125 4.99997C0.53125 4.82593 0.60039 4.65901 0.723461 4.53593C0.846532 4.41286 1.01345 4.34372 1.1875 4.34372H9.22656L6.4107 1.52622C6.28742 1.40294 6.21816 1.23573 6.21816 1.06138C6.21816 0.88703 6.28742 0.71982 6.4107 0.596536C6.53399 0.473252 6.7012 0.403992 6.87555 0.403992C7.0499 0.403992 7.21711 0.473252 7.34039 0.596536L11.2779 4.53404C11.3391 4.59509 11.3876 4.66762 11.4207 4.74748C11.4538 4.82734 11.4707 4.91294 11.4706 4.99938C11.4705 5.08582 11.4534 5.17138 11.4201 5.25116C11.3868 5.33094 11.3381 5.40337 11.2768 5.46427Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </NavLink>
            </div>
          </div>
          <img
            className="object-cover h-[400px] rounded-lg"
            src="/cr7.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
