import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import {  LoginPage } from './pages';
import { useSelector } from 'react-redux';
import { AuthState } from './reduxs/reducers/authReducers';
import OrganizerHome from './pages/organizer/OrganizerHome/OrganizerHome';
import EventManagementHome from './pages/organizer/EventManagement/EventManagementHome/EventManagementHome';
import 'ckeditor5/ckeditor5.css';
import ProfilePage from './pages/profile/ProfilePage';
import AdminHome from './pages/admin/AdminHome/AdminHome';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [isFrist,setIsFrist] = useState(true)
  const {authData }:{authData:AuthState} = useSelector((state: any) => state.auth);
  // Check the login status when the app is loaded
  // useEffect(() => {
  //   if (auth?.authData?.isLogin) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [auth]);
    // useEffect(() => {
    //   if(isFrist){
    //     if (authData?.accesstoken) {
    //       navigate('/organizer/EventPage'); 
    //     } else {
    //       navigate('/'); 
    //     }
    //   }
    //   setIsFrist(false)
    // }, [authData,isFrist]);
  return (
    <>
      {/* If the user is logged in, show the authenticated routes */}
      {authData.accesstoken ? (
          <Routes>
            <Route path='/organizer/*' element={<OrganizerHome />} />
            <Route path='/admin/*' element={<AdminHome />} />
            <Route path='/organizer/EventPage/:idEvent/*' element={<EventManagementHome />} />
            <Route path='*' element={<h1>404 - Page Not Found</h1>} />
            <Route path='/profile' element={<ProfilePage />} />
          </Routes>
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
