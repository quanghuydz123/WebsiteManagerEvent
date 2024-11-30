import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header, SideBarComponent } from './components';
import { CreateEventPage, DashboardPage, EventPage, LoginPage } from './pages';
import { useSelector } from 'react-redux';
import { AuthState } from './reduxs/reducers/authReducers';
import AdminHome from './pages/admin/AdminHome/AdminHome';
import OrganizerHome from './pages/organizer/OrganizerHome/OrganizerHome';
import EventManagementHome from './pages/organizer/EventManagement/EventManagementHome/EventManagementHome';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  
  // Check the login status when the app is loaded
  // useEffect(() => {
  //   if (auth?.authData?.isLogin) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [auth]);

  return (
    <>
      {/* If the user is logged in, show the authenticated routes */}
      {true ? (
        <section>
          <Routes>
          <Route path='/' element={<LoginPage />} />
            <Route path='/organizer/*' element={<OrganizerHome />} />
            <Route path='/admin/*' element={<AdminHome />} />
            <Route path='/organizer/EventPage/:idEvent/*' element={<EventManagementHome />} />
         
            <Route path='*' element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </section>
      ) : (
        
        <Routes>
          <Route path='/' element={<LoginPage />} />
          {/* <Route path='*' element={<Navigate to='/login' replace />} /> */}
        </Routes>
      )}
    </>
  );
}

export default App;
