import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaSyncAlt } from 'react-icons/fa'; // Import các icon
import { motion } from 'framer-motion'; // Import motion for animation
import { FaDollarSign, FaTicketAlt } from 'react-icons/fa'; // Thêm các icon mới cho doanh thu và vé
import Card from './SummaryPage/Card';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Modal from './SummaryPage/EventShowModal';
import CustomLineChart from './SummaryPage/CustomLineChart';
import TicketTable from './SummaryPage/TicketTable';
import CheckinTable from './CheckinTable';
import { ShowTimeModel } from '../../../../models/ShowTimeModel';
import { apis } from '../../../../constrants/apis';
import { SalesSummary } from '../../../../models/SalesSumary';
import ticketAPI from '../../../../apis/ticketAPI';
import eventAPI from '../../../../apis/eventAPI';
import { DateTime } from '../../../../utils/DateTime';
import LoadingModal from '../../../../modals/LoadingModal';

interface ShowTime {
  id: number;
  time: string;
}

const CheckInPage: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<ShowTime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams(); // Hook để làm việc với query string
    const id = searchParams.get('id'); // Lấy giá trị của tham số 'id'
  const data = useParams();
  // Dữ liệu các suất diễn (thông tin mẫu)
  const navigate = useNavigate()
  const idEventParams = searchParams.get('idEvent')
  const idShowTimeParams = searchParams.get('idShowTime')
  const [idShowTime,setIdShowTime] = useState('')
  const [allShowTime,setAllShowTime] = useState<ShowTimeModel[]>([])
  const [isLoading,setIsLoading] =  useState(false)
  const [salesSummary,setSalesSummary] = useState<SalesSummary>()
  useEffect(() => {
    if(idShowTimeParams){
      setIdShowTime(idShowTimeParams)
    }
    if(idEventParams){
      handleCallAPIGetAllShowTimeByIdEvent()
    }
  }, [idShowTimeParams])
  useEffect(()=>{
    if(idShowTime){
      handleCallAPIGetSummaryByIdShowTime()
    }
  },[idShowTime])
  const shows: ShowTime[] = [
    { id: 1, time: '10:00 AM' },
    { id: 2, time: '02:00 PM' },
    { id: 3, time: '06:00 PM'},
  ];
  const handleCallAPIGetSummaryByIdShowTime = async ()=>{
    const api = apis.ticket.getSalesSumaryByIdShowTime({idShowTime:idShowTime ?? ''})
    setIsLoading(true)
    try {
      const res = await ticketAPI.HandleTicket(api)
      if(res && res.data && res.status === 200){
        setSalesSummary(res.data)
      }
      setIsLoading(false)
    } catch (error:any) {
      setIsLoading(false)
      const errorMessage = JSON.parse(error.message)
      console.log("lỗi tại SummaryPage",errorMessage.statusCode)
    }
  }
  const handleCallAPIGetAllShowTimeByIdEvent = async ()=>{
    const api = apis.event.getShowTimesEventForOrganizer({idEvent:idEventParams ?? ''})
    try {
      const res:any = await eventAPI.HandleEvent(api)
      if(res && res.data && res.status === 200){
        setAllShowTime(res.data)
      }
    } catch (error:any) {
      const errorMessage = JSON.parse(error.message)
      console.log("lỗi tại SummaryPage",errorMessage.statusCode)
    }
  }
  // Mở modal
  const openModal = () => setIsModalOpen(true);

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Chọn suất diễn
  const handleSelectShow = (idShowTime: string) => {
    setIdShowTime(idShowTime)
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
      <h1 className="text-3xl font-bold mb-6">Check-in</h1>

      {/* Thông tin sự kiện */}
      <div className="p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4"> {/* Đường kẻ dưới */}
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-xl" /> 
            <p className="text-xl">
            <strong>Suất diễn:</strong> {`${DateTime.GetTime(allShowTime.find((item)=>item._id===idShowTime)?.startDate ?? new Date())} : ${DateTime.GetTime(allShowTime.find((item)=>item._id===idShowTime)?.endDate ?? new Date())} ${DateTime.GetDateNew1(allShowTime.find((item)=>item._id===idShowTime)?.startDate ?? new Date(),allShowTime.find((item)=>item._id===idShowTime)?.endDate  ?? new Date() )}`}
            </p>
          </div>

          <button
            onClick={openModal}
            className="bg-green-600 text-white text-xl px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
          >
            <FaSyncAlt className="mr-2 text-xl" /> 
            Chọn suất diễn khác ({(allShowTime.length)})
          </button>
        </div>
      </div>

      {/* Modal cho các suất diễn */}
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        shows={allShowTime}
        onSelectShow={handleSelectShow}
        idShowTimeSelected={idShowTime}
      />


      {/* Thêm phần doanh thu */}
      <h1 className="text-2xl font-bold mb-6">Tổng quan:</h1>
      
      {/* Cards for revenue, tickets sold, and total tickets */}
      <motion.div
        className="translate-all flex flex-wrap gap-3 p-4 duration-300 sm:px-7"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Card cartItems={[ 
    { title: "Đã check-in", value1: salesSummary?.totalTicketSoldAndtotalRevenue.totalTicketsCheckedIn ?? 0, value2: salesSummary?.totalTicketSoldAndtotalRevenue.totalTicketsSold ?? 0, icon: <FaTicketAlt />,type:'check-in'}]}/>
      </motion.div>
      {/* Biểu đồ doanh thu
      <h1 className="text-2xl font-bold mt-6 mb-4">Biểu đồ doanh thu</h1>
      <CustomLineChart variants={itemVariants} /> */}
      {/* Bảng doanh thu vé */}
      <h1 className="text-2xl font-bold mt-6 mb-4">Chi tiết check-in</h1>
      <CheckinTable TypeTicketSoldAndtotalRevenue={salesSummary?.typeTicketSoldAndtotalRevenue ?? []}/>
      <LoadingModal visible={isLoading}/>

    </div>
  );
};

export default CheckInPage;
