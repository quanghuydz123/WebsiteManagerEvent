import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import { Header, SideBarComponent } from './components';
import { CreateEventPage, DashboardPage, EventPage, LoginPage } from './pages';
import { useSelector } from 'react-redux';
import { AuthState } from './reduxs/reducers/authReducers';
import AdminHome from './pages/admin/AdminHome/AdminHome';
import OrganizerHome from './pages/organizer/OrganizerHome/OrganizerHome';

function App() {
  
  return (
    <Routes>
      <Route path='/organizer/*' element={<OrganizerHome />} />
      <Route path='/admin/*' element={<AdminHome />} />
      <Route path='/login' element={<LoginPage />} />
      {/* Thêm một trang 404 */}
      <Route path='*' element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
