import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../../../components/Header/Header';
import SummaryPage from '../Page/SummaryPage/SummaryPage';
import OrderPage from '../Page/OrderPage';
import MemberPage from '../Page/MemberPage';
import VoucherPage from '../Page/VoucherPage';
import EditPage from '../Page/EditPage';
import CheckInPage from '../Page/CheckInPage';


const EventContent = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div
      className={`min-h-screen flex-1 transition-all duration-300 ${isOpen ? "md:ml-56" : "ml-20"} bg-gradient-to-b from-[#1a251f] via-[#1d1b20] to-[#0e0910] text-white`} 
    >
      <div className="text-white">
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
          <Route path="Summary" element={<SummaryPage />} />
          <Route path="Order" element={<OrderPage variants={undefined} />} />
          <Route path="Checkin" element={<CheckInPage />} /> 
          <Route path="Voucher" element={<VoucherPage variants={undefined} />} /> 
          <Route path="Edit" element={<EditPage />}/>
          {/* <Route path="Summary" element={<SummaryPage />} /> */}

          {/* <Route path="EventPage/Edit" element={<EditPage />} /> 
          <Route path="EventPage/Member" element={<MemberPage />} /> 
         
          <Route path="EventPage/Marketing" element={<MarketingPage />} />   */}
        </Routes>
      </div>
    </div>
  );
};

export default EventContent;
