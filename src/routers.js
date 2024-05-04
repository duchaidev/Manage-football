import React from "react";
import ListSan from "./page/AdminDashboard/ListSan";

import OderManagement from "./page/AdminDashboard/OderManagement";
import OwnerManagement from "./page/AdminDashboard/OwnerManagement";
import RevenueManagement from "./page/AdminDashboard/RevenueManagement";
import HistoryManagement from "./page/AdminDashboard/HistoryManagement";
import Infomation from "./page/UserDashboard/Infomation";

import OderList from "./page/UserDashboard/OderList";

const routers = [
  {
    path: "/admin/danh-sach-san",
    Conponent: () => <ListSan />,
  },
  {
    path: "/admin/don-dat",
    Conponent: () => <OderManagement />,
  },
  {
    path: "/admin/quan-ly-chu-san",
    Conponent: () => <OwnerManagement />,
  },
  {
    path: "/admin/quan-ly-doanh-thu",
    Conponent: () => <RevenueManagement />,
  },
  // {
  //   path: "/lich-su-don-dat",
  //   Conponent: () => <HistoryManagement />,
  // },
  {
    path: "/admin/thong-tin-ca-nhan",
    Conponent: () => <Infomation />,
  },
];

export default routers;
