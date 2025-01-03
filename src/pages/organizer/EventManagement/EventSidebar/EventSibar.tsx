import React, { useEffect } from 'react';
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { FaUser,FaShoppingCart, FaBook, FaClipboardList, FaTachometerAlt, FaChartLine, FaCog, FaSignOutAlt, FaTags, FaListAlt, FaBookOpen, FaCalendarAlt, FaEdit, FaFileExport } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '../../../../components/SideBar/MenuItem';
import { FaCheckCircle } from "react-icons/fa";



const EventSidebar = ({ isOpen, toggleSidebar, setIsOpen,idShowTime,idEvent }: { isOpen: any, toggleSidebar: any, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,idShowTime:string,idEvent:string }) => {
  const navigate = useNavigate();
  const menuItems = [
    {
      icon: FaChartLine,
      name: 'Tổng kết',
      key: 'Summary' +`?idEvent=${idEvent}&idShowTime=${idShowTime}`,
    },
    {
      icon: FaShoppingCart, 
      name: 'Danh sách đơn hàng',
      key: 'Order' +`?idEvent=${idEvent}&idShowTime=${idShowTime}`,
    },
    {
      icon: FaCheckCircle,  
      name: 'Check-in',
      key: 'Checkin' +`?idEvent=${idEvent}&idShowTime=${idShowTime}`,
    },
    {
      icon: FaEdit, 
      name: 'Chỉnh sửa',
      key: 'Edit' +`?idEvent=${idEvent}&idShowTime=${idShowTime}`,
    },
    
    {
      icon: FaTags,  
      name: 'Voucher',
      key: 'Voucher' +`?idEvent=${idEvent}&idShowTime=${idShowTime}`,
    },
    // {
    //   icon: FaClipboardList,  
    //   name: 'Marketing',
    //   key: 'Marketing' +`?idEvent=${idEvent}&idShowTime=${idShowTime}`,
    // },
    {
      icon: FaSignOutAlt, 
      name: 'Logout',
      isLogout: true,
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#1a251f] via-[#1d1b20] to-[#231a27] text-white transition-all flex flex-col duration-300
    ${isOpen ? "w-56" : "w-20 items-center"}`}>
      {/* Sidebar logo */}
      <div className="flex items-center justify-center ">
        <Link to={'/organizer/EventPage'}>
          <img
            className={`logo transition-all ${isOpen ? "w-100" : "w-100"}`}
            src="https://cdn.saffire.com/images.ashx?t=ig&rid=FFEA&i=Event_Hub(3)(1).png"
            alt="Logo"
          />
        </Link>
      </div>
      
      {/* Menu list */}
      <div className="mt-6 flex-1">
        {
          menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              name={item.name}
              isOpen={isOpen}
              isLogout={item.isLogout}
              // url={`/organizer/EventPage/:idEvent/${item.key}`}
              onClicked={() => { navigate("/organizer/EventPage/:idEvent/" + item.key) }}
            />
          ))
        }
      </div>
      
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="m-2 flex items-center justify-center rounded-md bg-gray-600 hover:bg-green-700 p-3 text-2xl font-bold transition duration-300"
      >
        {isOpen ? <RiArrowLeftWideFill /> : <RiArrowRightWideFill />}
      </button>
    </div>
  );
}

export default EventSidebar;
