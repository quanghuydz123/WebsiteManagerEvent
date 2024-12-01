import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import {  LoginPage } from './pages';
import { useSelector } from 'react-redux';
import { AuthState } from './reduxs/reducers/authReducers';
import OrganizerHome from './pages/organizer/OrganizerHome/OrganizerHome';
import EventManagementHome from './pages/organizer/EventManagement/EventManagementHome/EventManagementHome';
import 'ckeditor5/ckeditor5.css';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const {authData }:{authData:AuthState} = useSelector((state: any) => state.auth);
  // Check the login status when the app is loaded
  // useEffect(() => {
  //   if (auth?.authData?.isLogin) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [auth]);
  useEffect(() => {
    if (authData?.accesstoken) {
      navigate('/organizer/EventPage'); 
    } else {
      navigate('/'); 
    }
  }, [authData]);
  return (
    <>
      {/* If the user is logged in, show the authenticated routes */}
      {authData.accesstoken ? (
        <section>
          <Routes>
          {/* <Route path='/' element={<LoginPage />} /> */}
            <Route path='/organizer/*' element={<OrganizerHome />} />
            {/* <Route path='/admin/*' element={<AdminHome />} /> */}
            <Route path='/organizer/EventPage/:idEvent/*' element={<EventManagementHome />} />
          
            <Route path='*' element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </section>
      ) : (
        
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='*' element={<h1>404 - Page Not Found</h1>} />
          </Routes>
      )}
    </>
  );
}

export default App;
