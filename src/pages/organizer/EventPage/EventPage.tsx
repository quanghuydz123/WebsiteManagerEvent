import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCart';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, AuthState } from '../../../reduxs/reducers/authReducers';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CiSearch } from "react-icons/ci";
import { PaginationComponent, SearchComponent, SpaceComponent } from '../../../components';
import { EventModelNew } from '../../../models/EventModelNew';
import { apis } from '../../../constrants/apis';
import organizerAPI from '../../../apis/organizerAPI';
import { constantState } from '../../../reduxs/reducers/constantReducers';

// Dữ liệu giả lập cho các sự kiện
// const cartItems = [
//   { title: 'Sự kiện 1', image: 'https://salt.tkbcdn.com/ts/ds/5a/fd/95/e16ce8800ce8d0b9662bb0df01830185.jpg', date: '2024-12-01', location: 'Hà Nội' },
//   { title: 'Sự kiện 2', image: 'https://salt.tkbcdn.com/ts/ds/62/52/5d/d2b0dca65de299347bc36d04765aaeed.jpg', date: '2024-12-15', location: 'Hồ Chí Minh' },
//   { title: 'Sự kiện 3', image: 'https://salt.tkbcdn.com/ts/ds/20/f6/82/65d28f94512e511e56be3e53e88eb8ab.jpg', date: '2024-12-20', location: 'Đà Nẵng' },
// ];

const EventPage = () => {
  const {authData}:{authData:AuthState} = useSelector((state: any) => state.auth);
  const {constantData}:{constantData:constantState} = useSelector((state: any) => state.constant);
  const [activeTab, setActiveTab] = useState("all")
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsCreated,setEventsCreated] = useState<EventModelNew[]>([])
  const [totalPages,setTotalPages] = useState(1)
  const [isLoadingGetEvents,setIsLoadingGetEvents] = useState(false)
  useEffect(()=>{
    handleCallAPIGetEventsCreated()
  },[authData.id,currentPage,activeTab])
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCallAPIGetEventsCreated = async ()=>{
    const api = apis.organizer.getEventCreatedOrganizerByIdForOrganizer({idUser:authData.id,limit:'5',page:currentPage.toString(),filterStatus:activeTab})
    setIsLoadingGetEvents(true)
    try {
        const res:any = await organizerAPI.HandleOrganizer(api)
        if(res && res.data && res.status === 200)
        {
          setEventsCreated(res.data)
          setTotalPages(res.pagination.totalPages)
        }
        setIsLoadingGetEvents(false)

    } catch (error:any) { 
      setIsLoadingGetEvents(false)
      const errorMessage = JSON.parse(error.message)
      console.log("lỗi tại EventPage",errorMessage.statusCode)
    }
  }
  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "upcoming", label: "SẮP DIỄN RA" },
    { id: "past", label: "ĐÃ QUA" },
    { id: "pending", label: "CHỜ DUYỆT" },
    { id: "canceled", label: "ĐÃ HỦY" },

  ]
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
  }
  return (
    <div className="min-h-screen bg-custom-gradient text-white">
      <div className="flex items-center justify-between p-4 rounded mb-4">
        <h1 className="text-3xl font-bold">Sự kiện đã tạo</h1>
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
                  "flex-1 px-4 py-2 text-[17px] font-medium rounded-md transition-all duration-200 ease-in-out",
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
        
          {(eventsCreated && eventsCreated.length > 0) ? <EventCard
            // key={index}
            cartItems={eventsCreated}  // Truyền từng sự kiện vào EventCard
            eventActions={[
              { label: "Tổng kết",url:'/organizer/EventPage/:idEvent/Summary' },
              { label: "Chỉnh sửa",url:'/organizer/EventPage/:idEvent/Edit' },
              { label: "Đơn hàng",url:'/organizer/EventPage/:idEvent/Order' },
              { label: "CheckIn",url:'/organizer/EventPage/:idEvent/Checkin'},
              { label: "Giảm giá",url:'/organizer/EventPage/:idEvent/Voucher' },
              { label: "Markerting",url:'/organizer/EventPage/:idEvent/Markerting' },    
            ]}
          /> : <>
         
          </>}
       
        
      </motion.div>

      {/* Nếu không có sự kiện nào */}
      {eventsCreated.length === 0 && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4" />
            <p className="text-gray-300 text-xl">Chưa có sự kiện nào ở đây !!!</p>
          </div>
        </div>
      )}
      <PaginationComponent  currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}  />
        <SpaceComponent height={30}/>
    </div>
  );
};

export default EventPage;
