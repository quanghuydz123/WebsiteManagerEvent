import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCart';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, AuthState } from '../../../reduxs/reducers/authReducers';

// Dữ liệu giả lập cho các sự kiện
const cartItems = [
  { title: 'Sự kiện 1', image: 'https://salt.tkbcdn.com/ts/ds/5a/fd/95/e16ce8800ce8d0b9662bb0df01830185.jpg', date: '2024-12-01', location: 'Hà Nội' },
  { title: 'Sự kiện 2', image: 'https://salt.tkbcdn.com/ts/ds/62/52/5d/d2b0dca65de299347bc36d04765aaeed.jpg', date: '2024-12-15', location: 'Hồ Chí Minh' },
  { title: 'Sự kiện 3', image: 'https://salt.tkbcdn.com/ts/ds/20/f6/82/65d28f94512e511e56be3e53e88eb8ab.jpg', date: '2024-12-20', location: 'Đà Nẵng' },
];

const EventPage = () => {
  const auth:AuthState = useSelector((state: any) => state.auth);
  const dispatch = useDispatch()
  console.log("auth",auth)
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-custom-gradient text-white">
      <div className="flex items-center justify-between p-4 rounded mb-4">
        <h1 className="text-xl font-bold">Sự kiện đã tạo</h1>
        <div className="flex-1 flex justify-end">
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện"
            className="p-2 rounded w-1/3 bg-white text-black"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <button className="px-4 py-2 rounded bg-green-700 hover:bg-green-600">Tất cả</button>
        <button className="px-4 py-2 rounded bg-green-500 hover:bg-green-400">Sắp diễn ra</button>
        <button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Đã qua</button>
        <button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Chờ duyệt</button>
        <button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">Nháp</button>
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
              { label: "Tổng kết", onClick: () => navigate('/organizer/EventPage/:idEvent/Summary')},
              { label: "Chỉnh sửa", onClick: () => navigate('/organizer/EventPage/:idEvent/Edit')},
              { label: "Member", onClick: () => navigate('/organizer/EventPage/:idEvent/Member')},
              { label: "Voucher", onClick: () => navigate('/organizer/EventPage/:idEvent/Voucher') },
              { label: "Markerting",onClick: () => navigate('/organizer/EventPage/:idEvent/Markerting')},
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
