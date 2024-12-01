import React from 'react';
import { color, motion } from 'framer-motion';
import { colors } from '../../../constrants/color';
import { CiCalendar } from "react-icons/ci";
import { RowComponent, SpaceComponent } from '../../../components';
import { FaLocationDot } from "react-icons/fa6";

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
            <div className="w-full  flex flex-col">
              <h2 className="text-2xl font-semibold text-white">{event.title}</h2>
              <SpaceComponent height={16} />
              
              <div>
                <div className='inline-block pt-1 pb-1 pl-2 pr-2' style={{ backgroundColor: colors.primary,borderRadius:100 }}>
                  <p style={{ color: colors.white }}>Thể thao</p>
                </div>
              </div>
              <SpaceComponent height={16} />
              <RowComponent>
                <CiCalendar size={20} />
                <SpaceComponent width={4} />
                <p className="text-sm font-medium	" style={{ color: colors.primary }}>{event.date}</p>
              </RowComponent>
              <SpaceComponent height={16} />
              <RowComponent styles={{ alignItems: 'flex-start' }}>
                <FaLocationDot />
                <SpaceComponent width={4} />
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.primary }}>{event.location}</p>
                  <p className="text-sm" style={{ color: colors.primary }}>{'4 Phạm Ngọc Thạch, Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh'}</p>
                </div>
              </RowComponent>

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
