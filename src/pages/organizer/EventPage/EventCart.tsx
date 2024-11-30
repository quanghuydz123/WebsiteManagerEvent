import React from 'react';
import { motion } from 'framer-motion';

// Dữ liệu sự kiện kiểu EventItemType
interface EventItemType {
  title: string;
  image: string;
  date: string;
  location: string;
}

interface EventActionType {
  label: string;
  onClick: () => void;
}

interface EventCardProps {
  cartItems: EventItemType[];  // Mảng các sự kiện
  eventActions: EventActionType[];  // Mảng các hành động
}

const EventCard: React.FC<EventCardProps> = ({ cartItems, eventActions }) => {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg w-full"
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
    >
     {cartItems.map((event, index) => (
        <div key={index} className="bg-gray-900 p-6 rounded-lg w-full mb-6">
            {/* Hàng 1: Cột ảnh bên trái, thông tin bên phải */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
            {/* Cột ảnh */}
            <div className="w-full sm:w-1/2">
                <img
                src={event.image}
                alt={event.title}
                className="rounded-md w-full h-90 object-cover"
                />
            </div>

            {/* Cột thông tin sự kiện */}
            <div className="w-full  flex flex-col justify-between">
                <h2 className="text-2xl font-semibold text-white">{event.title}</h2>
                <p className="text-sm text-white">{event.date}</p>
                <p className="text-sm text-white">{event.location}</p>
            </div>
            </div>

            {/* Hàng 2: Các nút chức năng */}
            <div className="flex gap-6">
            {eventActions.map((action, idx) => (
                <button
                key={idx}
                onClick={action.onClick}
                className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition duration-200"
                >
                {action.label}
                </button>
            ))}
            </div>
        </div>
        ))}

    </motion.div>
  );
};

export default EventCard;
