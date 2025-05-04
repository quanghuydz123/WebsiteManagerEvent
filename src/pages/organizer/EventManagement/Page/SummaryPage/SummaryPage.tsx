import React, { useEffect, useState } from 'react';
import Modal from './EventShowModal';
import { FaCalendarAlt, FaSyncAlt } from 'react-icons/fa'; // Import các icon
import { motion } from 'framer-motion'; // Import motion for animation
import { FaDollarSign, FaTicketAlt } from 'react-icons/fa'; // Thêm các icon mới cho doanh thu và vé
import CardItem from './CardItem'; // Import CardItem component
import Card from './Card';
import CustomLineChart from './CustomLineChart';
import TicketTable from './TicketTable';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { apis } from '../../../../../constrants/apis';
import ticketAPI from '../../../../../apis/ticketAPI';
import { SalesSummary } from '../../../../../models/SalesSumary';
import { ShowTimeModel } from '../../../../../models/ShowTimeModel';
import eventAPI from '../../../../../apis/eventAPI';
import { DateTime } from '../../../../../utils/DateTime';
import LoadingModal from '../../../../../modals/LoadingModal';

interface ShowTime {
  id: number;
  time: string;
}

const SummaryPage: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState<ShowTime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams(); // Hook để làm việc với query string
  const [salesSummary, setSalesSummary] = useState<SalesSummary>();
  const id = searchParams.get('id'); // Lấy giá trị của tham số 'id'
  const data = useParams();
  const navigate = useNavigate();
  const idEventParams = searchParams.get('idEvent');
  const idShowTimeParams = searchParams.get('idShowTime');
  const [idShowTime, setIdShowTime] = useState('');
  const [allShowTime, setAllShowTime] = useState<ShowTimeModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (idShowTimeParams) {
      setIdShowTime(idShowTimeParams);
    }
    if (idEventParams) {
      handleCallAPIGetAllShowTimeByIdEvent();
    }
  }, [idShowTimeParams]);
  useEffect(() => {
    if (idShowTime) {
      handleCallAPIGetSummaryByIdShowTime();
    }
  }, [idShowTime]);
  // Dữ liệu các suất diễn (thông tin mẫu)
  const shows: ShowTime[] = [
    { id: 1, time: '10:00 AM' },
    { id: 2, time: '02:00 PM' },
    { id: 3, time: '06:00 PM' },
  ];
  const handleCallAPIGetSummaryByIdShowTime = async () => {
    const api = apis.ticket.getSalesSumaryByIdShowTime({
      idShowTime: idShowTime ?? '',
    });
    setIsLoading(true);
    try {
      const res = await ticketAPI.HandleTicket(api);
      if (res && res.data && res.status === 200) {
        setSalesSummary(res.data);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage = JSON.parse(error.message);
      console.log('lỗi tại SummaryPage', errorMessage.statusCode);
    }
  };
  const handleCallAPIGetAllShowTimeByIdEvent = async () => {
    const api = apis.event.getShowTimesEventForOrganizer({
      idEvent: idEventParams ?? '',
    });
    try {
      const res: any = await eventAPI.HandleEvent(api);
      if (res && res.data && res.status === 200) {
        setAllShowTime(res.data);
      }
    } catch (error: any) {
      const errorMessage = JSON.parse(error.message);
      console.log('lỗi tại SummaryPage', errorMessage.statusCode);
    }
  };
  console.log(allShowTime);
  // Mở modal
  const openModal = () => setIsModalOpen(true);

  // Đóng modal
  const closeModal = () => setIsModalOpen(false);

  // Chọn suất diễn
  const handleSelectShow = (idShowTime: string) => {
    setIdShowTime(idShowTime);
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
        ease: 'easeOut',
      },
    },
  };
  console.log('salesSummary', salesSummary);
  return (
    <div className="min-h-screen bg-custom-gradient text-white p-6">
      {/* Tiêu đề */}
      <h1
        className="text-3xl font-bold mb-6"
        onClick={() => {
          navigate(
            '/organizer/EventPage/:idEvent/Summary?idEvent=666b0dcfedb7fe46ae8ecdd9&idShowTime=123123'
          );
        }}
      >
        Tổng kết
      </h1>

      {/* Thông tin sự kiện */}
      <div className="p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4">
          {' '}
          {/* Đường kẻ dưới */}
          <div className="flex items-center ">
            <FaCalendarAlt className="mr-2 text-xl" />
            <p className="text-xl">
              <strong>Suất diễn:</strong>{' '}
              {`${DateTime.GetTime(
                allShowTime.find((item) => item._id === idShowTime)
                  ?.startDate ?? new Date()
              )} : ${DateTime.GetTime(
                allShowTime.find((item) => item._id === idShowTime)?.endDate ??
                  new Date()
              )} ${DateTime.GetDateNew1(
                allShowTime.find((item) => item._id === idShowTime)
                  ?.startDate ?? new Date(),
                allShowTime.find((item) => item._id === idShowTime)?.endDate ??
                  new Date()
              )}`}
            </p>
          </div>
          <button
            onClick={openModal}
            className="bg-green-600 text-white text-xl px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
          >
            <FaSyncAlt className="mr-2 text-xl" />
            Chọn suất diễn khác ({allShowTime.length})
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
      <h1 className="text-2xl font-bold mb-6">Doanh thu:</h1>

      {/* Cards for revenue, tickets sold, and total tickets */}
      <motion.div
        className="translate-all flex flex-wrap gap-3 p-4 duration-300 sm:px-7"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Card
          cartItems={[
            {
              title: 'Doanh thu',
              value1:
                salesSummary?.totalTicketSoldAndtotalRevenue
                  ?.totalRevenueSold ?? 0,
              value2:
                salesSummary?.totalTicketSoldAndtotalRevenue?.totalRevenue ?? 0,
              icon: <FaDollarSign />,
              type: 'revenue',
            },
            {
              title: 'Số vé đã bán',
              value1:
                salesSummary?.totalTicketSoldAndtotalRevenue.totalTicketsSold ??
                0,
              value2:
                salesSummary?.totalTicketSoldAndtotalRevenue.totalAmount ?? 0,
              icon: <FaTicketAlt />,
              type: 'ticketSold',
            },
          ]}
        />
      </motion.div>
      {/* Biểu đồ doanh thu */}
      <h1 className="text-2xl font-bold mt-6 mb-4">Biểu đồ doanh thu</h1>
      <CustomLineChart variants={itemVariants} />
      {/* Bảng doanh thu vé */}
      <h1 className="text-2xl font-bold mt-6 mb-4">Chi tiết vé bán được</h1>
      <TicketTable
        TypeTicketSoldAndtotalRevenue={
          salesSummary?.typeTicketSoldAndtotalRevenue ?? []
        }
      />
      <LoadingModal visible={isLoading} />
    </div>
  );
};

export default SummaryPage;
