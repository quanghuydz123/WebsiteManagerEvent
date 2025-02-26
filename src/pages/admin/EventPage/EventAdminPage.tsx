import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCart';
import { PaginationComponent, SpaceComponent } from '../../../components';
import LoadingModal from '../../../modals/LoadingModal';

interface Event {
  _id: string;
  title: string;
  photoUrl: string;
  startAt: string;
  location: string;
}


const EventAdminPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pendingEvents, setPendingEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fake dữ liệu sự kiện chờ duyệt
    const fakePendingEvents: Event[] = [
      { _id: "1", title: "Sự kiện A", photoUrl: "https://via.placeholder.com/300", startAt: "2024-12-01", location: "Hà Nội" },
      { _id: "2", title: "Sự kiện B", photoUrl: "https://via.placeholder.com/300", startAt: "2024-12-10", location: "Hồ Chí Minh" },
      { _id: "3", title: "Sự kiện C", photoUrl: "https://via.placeholder.com/300", startAt: "2024-12-20", location: "Đà Nẵng" },
    ];
    setPendingEvents(fakePendingEvents);
    setTotalPages(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
   
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <h1 className="text-3xl font-bold mb-6">Duyệt Sự Kiện</h1>

      <motion.div
        className="flex flex-col gap-4 p-4 sm:px-7"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
      >
        {pendingEvents.length > 0 ? (
          <EventCard
            cartItems={pendingEvents}
            eventActions={[
              { label: "Xem Chi Tiết", url: '/admin/EventPage/:idEvent/Detail' },
              { label: "Duyệt", url: "#"}
            ]}
          />
        ) : (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-gray-400 text-xl">Không có sự kiện nào cần duyệt.</p>
          </div>
        )}
      </motion.div>

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <SpaceComponent height={30} />
      <LoadingModal visible={isLoading} />
    </div>
  );
};

export default EventAdminPage;
