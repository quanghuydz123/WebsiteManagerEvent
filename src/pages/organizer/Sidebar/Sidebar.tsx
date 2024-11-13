import React, { useEffect } from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { FaUser, FaBook, FaClipboardList, FaTachometerAlt, FaChartLine, FaCog, FaSignOutAlt, FaTags, FaListAlt, FaBookOpen, FaCalendarAlt, FaEdit, FaFileExport } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MenuItem from '../../../components/SideBar/MenuItem';

const menuItems = [
    {
      icon: FaCalendarAlt,
      name: 'Sự kiện đã tạo',
      key: 'EventPage',
    },
    {
      icon: FaFileExport, 
      name: 'Quản lý xuất file',
    },
    {
      icon: FaEdit, 
      name: 'Tạo sự kiện',
      key: 'CreateEvent'
    },
    {
      icon: FaBookOpen, 
      name: 'Điều khoản cho Ban tổ chức',
    },
    {
        icon: FaSignOutAlt, 
        name: 'Logout',
        isLogout: true,
    },
];

const SidebarComponent = ({ isOpen, toggleSidebar, setIsOpen }: { isOpen: any, toggleSidebar: any, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const navigate = useNavigate();
  
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
    <div className={`fixed left-0 top-0 h-full bg-gradient-to-b from-green-900 via-black to-purple-900 text-white transition-all flex flex-col duration-300
    ${isOpen ? "w-56" : "w-20 items-center"}`}>
      {/* Sidebar logo */}
      <div className="flex items-center justify-center py-4">
        <LuLayoutDashboard className={`text-2xl text-teal-700 transition-all ${isOpen ? "w-12" : "w-8"}`} />
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
              onClicked={() => { navigate("/organizer/" + item.key) }}
             // className="hover:bg-green-700 px-4 py-2 rounded transition duration-200"
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

export default SidebarComponent;