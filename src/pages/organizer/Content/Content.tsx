import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import DashboardPage from '../../admin/DashboardPage/DashboardPage';
import EventPage from '../EventPage/EventPage';
import EventCreationOrganizerPage from '../EventCreationOrganizerPage/EventCreationOrganizerPage';
import OrganizerTerms from '../Policy/Policy';
import AdvertisingPage from '../Policy/AdvertisingPage';
import BusinessPage from '../Policy/BusinessPage';
import ContentImagePage from '../Policy/ContentImagePage';


const Content = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`min-h-screen flex-1 transition-all duration-300 ${isOpen ? "md:ml-56" : "ml-20"} bg-gradient-to-b from-[#1a251f] via-[#1d1b20] to-[#0e0910] text-white`} 
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
          <Route path='CreateEvent' element={<EventCreationOrganizerPage/>} />
          <Route path='Policy/*' element={<OrganizerTerms/>}/>
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/advertising" element={<AdvertisingPage />} />
          <Route path="/contentImage" element={<ContentImagePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Content;
