import React from 'react';
import { color, motion } from 'framer-motion';
import { colors } from '../../../constrants/color';
import { CiCalendar } from "react-icons/ci";
import { RowComponent, SpaceComponent } from '../../../components';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { EventModelNew } from '../../../models/EventModelNew';
import { DateTime } from '../../../utils/DateTime';

// Dữ liệu sự kiện kiểu EventItemType
interface EventItemType {
  title: string;
  image: string;
  date: string;
  location: string;
}

interface EventActionType {
  label: string;
  // onClick: () => void;
  url: string
}

interface EventCardProps {
  cartItems: EventModelNew[];  // Mảng các sự kiện
  eventActions: EventActionType[];  // Mảng các hành động
}

const EventCard: React.FC<EventCardProps> = ({ cartItems, eventActions }) => {
  const renderTextStatus = (statusEvent: 'PendingApproval' | "NotStarted" | 'Ongoing' | 'Ended' | 'Cancelled' | 'OnSale' | 'SoldOut' | 'SaleStopped' | 'NotYetOnSale')=>{
    let text = 'Sắp diễn ra'
    if(statusEvent === 'Ended'){
      text = 'Đã kết thúc'
    }else if(statusEvent === 'PendingApproval'){
      text = 'Đang chờ chấp nhập'
    }else if(statusEvent === 'Cancelled'){
      text = 'Đã bị hủy'
    }
    return text
  }
  const renderColorStatusEvent = (statusEvent: 'PendingApproval' | "NotStarted" | 'Ongoing' | 'Ended' | 'Cancelled' | 'OnSale' | 'SoldOut' | 'SaleStopped' | 'NotYetOnSale')=>{
    let color = colors.orange
    if(statusEvent === 'Ended'){
      color = colors.danger
    }else if(statusEvent === 'PendingApproval'){
      color = colors.warning
    }else if(statusEvent === 'Cancelled'){
      color = colors.danger2
    }
    return color
  }
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
                src={event.photoUrl}
                alt={event.title}
                className="rounded-md w-full object-fill"
              />
            </div>

            {/* Cột thông tin sự kiện */}
            <div className="w-full  flex flex-col">
              <h2 className="text-2xl font-semibold text-white">{event.title}</h2>
              <SpaceComponent height={16} />

              <RowComponent>
              <div>
                <div className='inline-block pt-1 pb-1 pl-2 pr-2' style={{ backgroundColor: colors.primary, borderRadius: 100 }}>
                  <p style={{ color: colors.white }}>{event.category.name}</p>
                </div>
              </div>
              <SpaceComponent width={12}/>
              {(event.showTimes && event.showTimes.length > 0) &&<div>
                <div className='inline-block pt-1 pb-1 pl-2 pr-2' style={{ backgroundColor: renderColorStatusEvent(event.statusEvent), borderRadius: 100 }}>
                  <p style={{ color: colors.white }}>{renderTextStatus(event.statusEvent)}</p>
                </div>
              </div>}
              </RowComponent>
              <SpaceComponent height={16} />
              <RowComponent>
                <CiCalendar size={20} />
                <SpaceComponent width={4} />
                {event.showTimes && event.showTimes.length > 0  ? <p className="text-sm font-medium	" style={{ color: colors.primary }}>
                  {`${DateTime.GetTime(event.showTimes[0].startDate)} - ${DateTime.GetTime(event.showTimes[0].endDate)} ${DateTime.GetDateNew1(event.showTimes[0].startDate,event.showTimes[0].endDate)}`}
                </p>: <>Chưa có suất diễn nào</>}
              </RowComponent>
              <SpaceComponent height={16} />
              <RowComponent styles={{ alignItems: 'flex-start' }}>
                <FaLocationDot />
                <SpaceComponent width={4} />
                <div>
                  <p className="text-sm font-medium" style={{ color: colors.primary }}>{event?.Location}</p>
                  <p className="text-xs " style={{ color: colors.primary }}>{event?.Address}</p>
                </div>
              </RowComponent>

            </div>
          </div>

          {/* Hàng 2: Các nút chức năng */}
          <div className="flex gap-6">
            {eventActions.map((action, idx) => (
              // <button
              //   key={idx}
              //   onClick={action.onClick}
              //   className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition duration-200"
              // >
              //   <Link to={action.url}>
              //     {action.label}
              //   </Link>
              // </button>
              <Link
                target="_blank"
                to={action.url + `?idEvent=${event?._id}&idShowTime=${event?.showTimes[0]?._id ?? ''}`}
                style={{ textDecoration: 'none' }}
                className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-700 transition duration-200"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      ))}

    </motion.div>
  );
};

export default EventCard;
