import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MenuComponent from "./components/MenuComponent";
import LogInPage from "./page/LogInPage";
import Register from "./page/Register";
import HomePage from "./page/UserDashboard/HomePage";
import About from "./page/UserDashboard/About";
import Pitch from "./page/UserDashboard/Pitch";
import DetailPage from "./page/UserDashboard/DetailPage";
import PricePage from "./page/UserDashboard/PricePage";
import Infomation from "./page/UserDashboard/Infomation";
import { Button, ConfigProvider, Modal } from "antd";

// import LogInPage from "./page/LogInPage";
// import ListSan from "./page/AdminDashboard/ListSan";
import OderList from "./page/UserDashboard/OderList";
import AllPitchPage from "./page/UserDashboard/AllPitchPage";
import ListSan from "./page/AdminDashboard/ListSan";
import OderManagement from "./page/AdminDashboard/OderManagement";
import OwnerManagement from "./page/AdminDashboard/OwnerManagement";
import RevenueManagement from "./page/AdminDashboard/RevenueManagement";
import { useEffect, useState } from "react";

const theme = {
  token: {
    fontSize: 14,
    colorPrimary: "#16a34a",
    colorBorder: "#D9D9D9",
    colorLink: "#16a34a",
  },
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Kiểm tra sessionStorage để xem popup đã được hiển thị trong phiên hiện tại hay chưa
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");

    if (!hasSeenPopup) {
      setIsModalOpen(true);
    }
  }, []);

  const handleClosePopup = () => {
    // Đóng popup và lưu trạng thái vào sessionStorage
    setIsModalOpen(false);
    sessionStorage.setItem("hasSeenPopup", "true");
  };

  return (
    <BrowserRouter>
      <ConfigProvider theme={theme}>
        <Modal
          title="Quy tắc đặt sân"
          open={isModalOpen}
          onOk={handleClosePopup}
          onCancel={handleClosePopup}
          footer={[<Button onClick={handleClosePopup}>Đóng</Button>]}
        >
          <p>
            Bạn cần tạo tài khoản để có thể đặt sân. Chọn sân, thời gian bắt đầu
            và thời gian kết thúc mong muốn. Bạn sẽ thanh toán và đợi thông báo
            sớm nhất từ chủ sân.{" "}
            <p className="font-semibold mt-2"> Quy tắc Hủy đặt sân:</p> Có thể
            hủy sân trước thời gian đã đặt. Thời hạn có thể hủy sân là{" "}
            <span className="text-red-500">3 ngày </span>
            trước khi lịch đặt. Khi hủy{" "}
            <span className="text-red-500">khách hàng sẽ chịu phí</span> hủy
            sân.
          </p>
        </Modal>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/san" element={<Pitch />} /> */}
          <Route path="/chi-tiet/:id" element={<DetailPage />} />
          {/* <Route path="/bang-gia" element={<PricePage />} /> */}
          <Route path="/thong-tin-ca-nhan" element={<Infomation />} />
          <Route path="/all" element={<AllPitchPage />} />

          <Route path="/log-in" element={<LogInPage />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/*" element={<MenuComponent />} /> */}

          <Route path="/admin" element={<MenuComponent />}>
            <Route path="danh-sach-san" element={<ListSan />} />
            <Route path="don-dat" element={<OderManagement />} />
            <Route path="quan-ly-chu-san" element={<OwnerManagement />} />
            <Route path="quan-ly-doanh-thu" element={<RevenueManagement />} />
          </Route>
          <Route
            path="/*"
            element={
              <div className="flex items-center justify-center flex-col gap-3 h-screen">
                <span className="font-bold text-9xl text-green-600">404</span>
                <span className="font-medium text-xl">
                  Trang không tồn tại!
                </span>
                <a href="/" className="text-blue-500 hover:underline">
                  Quay lại trang chủ
                </a>
              </div>
            }
          />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
