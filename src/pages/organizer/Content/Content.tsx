import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import DashboardPage from '../../admin/dashboradPage/DashboardPage';
import EventPage from '../EventPage/EventPage';


const Content = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`min-h-screen flex-1 transition-all duration-300 ${isOpen ? "md:ml-56" : "ml-20"} bg-gradient-to-b from-green-900 via-black to-purple-900`} style={{ paddingTop: '4rem' }}
    >
      <div className={`text-white`}>
        <Header
          isToggle={false}
          setIsToggle={function (val: boolean): void {
            throw new Error('Function not implemented.');
          }}
          windowWidth={0}
          setIsOpenNav={function (val: boolean): void {
            throw new Error('Function not implemented.');
          }}
          isOpenNav={false}
        />
        <Routes>
          <Route path='EventPage' element={<EventPage />} />
          <Route path='Dashboard' element={<DashboardPage />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default Content;
