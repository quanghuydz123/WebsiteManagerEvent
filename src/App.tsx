import React, { useState } from 'react';
import logo from './logo.svg';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import { Header, SideBarComponent } from './components';
import { LoginPage, UserPage } from './pages';
import { useSelector } from 'react-redux';
import { AuthState } from './reduxs/reducers/authReducers';

function App() {
  const [isToggleMenu,setIsToggleMenu] = useState(false)
  const [isLogin,setIsLogin] = useState(false)
  const auth = useSelector((state:any) => state.auth)
  console.log("isToggleMenu",isToggleMenu)
  return (
    <>
    {auth?.authData?.isLogin ? <section>
        <Header isToggle={isToggleMenu} setIsToggle={(val)=>setIsToggleMenu(val)} />
        <div className='main d-flex '>
            <div className={`sidebarWapper  ${isToggleMenu === true ? 'toggle' : ''}`}>
                <SideBarComponent isToggle={isToggleMenu}/>
            </div>
            <div className={`content px-3 ${isToggleMenu === true ? 'toggle' : ''}`} >
                <Routes>
                  <Route path='/'  element={<AdminPage />}/>
                  <Route path='/users'  element={<UserPage/>}/>
                </Routes>
            </div>
        </div>
    </section> : 
    <>
      <Routes>
        <Route path='/'  element={<LoginPage/>}/>
      </Routes>
    </>}
</>
  );
}

export default App;
