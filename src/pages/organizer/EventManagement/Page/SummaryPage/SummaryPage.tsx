import React, { useState } from 'react';
import Modal from './EventShowModal';
import { FaCalendarAlt, FaSyncAlt } from 'react-icons/fa'; // Import các icon
import { motion } from 'framer-motion'; // Import motion for animation
import { FaDollarSign, FaTicketAlt } from 'react-icons/fa'; // Thêm các icon mới cho doanh thu và vé
import CardItem from './CardItem'; // Import CardItem component
import Card from './Card';
import CustomLineChart from './CustomLineChart';
import TicketTable from './TicketTable';

interface ShowTime {
  id: number;
  time: string;
}

const SummaryPage: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<ShowTime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dữ liệu các suất diễn (thông tin mẫu)
  const shows: ShowTime[] = [
    { id: 1, time: '10:00 AM' },
    { id: 2, time: '02:00 PM' },
    { id: 3, time: '06:00 PM'},
  ];

  // Mở modal
  const openModal = () => setIsModalOpen(true);

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Chọn suất diễn
  const handleSelectShow = (show: ShowTime) => {
    setSelectedShow(show);
    closeModal(); // Đóng modal khi chọn suất diễn
  };



  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-custom-gradient text-white p-6">
      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold mb-6">Tổng kết</h1>

      {/* Thông tin sự kiện */}
      <div className="p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4"> {/* Đường kẻ dưới */}
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-xl" /> 
            <p className="text-xl mt-3">
              <strong>Ngày tổ chức:</strong> 20/12/2024
            </p>
          </div>

          <button
            onClick={openModal}
            className="bg-green-600 text-white text-xl px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
          >
            <FaSyncAlt className="mr-2 text-xl" /> 
            Chọn suất diễn khác
          </button>
        </div>
      </div>

      {/* Modal cho các suất diễn */}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        shows={shows}
        onSelectShow={handleSelectShow}
      />

      {/* Thêm phần doanh thu */}
      <h1 className="text-2xl font-bold mb-6">Doanh thu:</h1>
      
      {/* Cards for revenue, tickets sold, and total tickets */}
      <motion.div
        className="translate-all flex flex-wrap gap-3 p-4 duration-300 sm:px-7"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Card/>
      </motion.div>
      {/* Biểu đồ doanh thu */}
      <h1 className="text-2xl font-bold mt-6 mb-4">Biểu đồ doanh thu</h1>
      <CustomLineChart variants={itemVariants} />
      {/* Bảng doanh thu vé */}
      <h1 className="text-2xl font-bold mt-6 mb-4">Chi tiết vé bán được</h1>
      <TicketTable variants={undefined} />
    </div>
  );
};

export default SummaryPage;
