import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import DashboardPage from '../DashboardPage/DashboardPage';
import OrganizerPage from '../OrganizerPage/OrganizerPage';
import EventAdminPage from '../EventPage/EventAdminPage';
import UserManagementPage from '../UserPage/UserManagementPage';



const ContentAdmin = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`min-h-screen flex-1 transition-all duration-300 ${isOpen ? "md:ml-56" : "ml-20"} bg-white text-white`} 
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
          <Route path='Event' element={<EventAdminPage />} />
          <Route path='Organizer' element={<OrganizerPage/>} />
          <Route path='User' element={<UserManagementPage/>}/>
          <Route path="Dashboard" element={<DashboardPage />} />

        </Routes>
      </div>
    </div>
  );
};

export default ContentAdmin;
