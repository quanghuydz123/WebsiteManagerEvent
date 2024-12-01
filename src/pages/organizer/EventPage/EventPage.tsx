import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCart';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, AuthState } from '../../../reduxs/reducers/authReducers';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CiSearch } from "react-icons/ci";
import { SearchComponent } from '../../../components';

// Dữ liệu giả lập cho các sự kiện
const cartItems = [
  { title: 'Sự kiện 1', image: 'https://salt.tkbcdn.com/ts/ds/5a/fd/95/e16ce8800ce8d0b9662bb0df01830185.jpg', date: '2024-12-01', location: 'Hà Nội' },
  { title: 'Sự kiện 2', image: 'https://salt.tkbcdn.com/ts/ds/62/52/5d/d2b0dca65de299347bc36d04765aaeed.jpg', date: '2024-12-15', location: 'Hồ Chí Minh' },
  { title: 'Sự kiện 3', image: 'https://salt.tkbcdn.com/ts/ds/20/f6/82/65d28f94512e511e56be3e53e88eb8ab.jpg', date: '2024-12-20', location: 'Đà Nẵng' },
];

const EventPage = () => {
  const auth: AuthState = useSelector((state: any) => state.auth);
  const [activeTab, setActiveTab] = useState("all")

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "upcoming", label: "SẮP DIỄN RA" },
    { id: "past", label: "ĐÃ QUA" },
    { id: "pending", label: "CHỜ DUYỆT" },
  ]
  const dispatch = useDispatch()
  console.log("auth", auth)
  const navigate = useNavigate();
  const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
  }

  return (
    <div className="min-h-screen bg-custom-gradient text-white">
      <div className="flex items-center justify-between p-4 rounded mb-4">
        <h1 className="text-xl font-bold">Sự kiện đã tạo</h1>
        <div className="flex-1 flex justify-end">
          <SearchComponent />
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex rounded-lg bg-white shadow-sm p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out",
                  activeTab === tab.id
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="flex flex-col gap-4 p-4 sm:px-7"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
      >
        {/* Lặp qua các sự kiện và hiển thị chúng */}
        {cartItems.map((event, index) => (
          <EventCard
            key={index}
            cartItems={[event]}  // Truyền từng sự kiện vào EventCard
            eventActions={[
              { label: "Tổng kết", onClick: () => navigate('/organizer/EventPage/:idEvent/Summary?id=asdasd ') },
              { label: "Chỉnh sửa", onClick: () => navigate('/organizer/EventPage/:idEvent/Edit') },
              { label: "CheckIn", onClick: () => navigate('/organizer/EventPage/:idEvent/Member') },
              { label: "Giảm giá", onClick: () => navigate('/organizer/EventPage/:idEvent/Voucher') },
              { label: "Markerting", onClick: () => navigate('/organizer/EventPage/:idEvent/Markerting') },
            ]}
          />
        ))}
      </motion.div>

      {/* Nếu không có sự kiện nào */}
      {cartItems.length === 0 && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4" />
            <p className="text-gray-300">Chưa có sự kiện nào được tạo</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
