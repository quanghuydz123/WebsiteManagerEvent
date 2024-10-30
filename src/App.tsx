import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import { Header, SideBarComponent } from './components';
import { CreateEventPage, DashboardPage, EventPage, LoginPage } from './pages';
import { useSelector } from 'react-redux';
import { AuthState } from './reduxs/reducers/authReducers';

function App() {
  const [isToggleMenu,setIsToggleMenu] = useState(false)
  const [isLogin,setIsLogin] = useState(false)
  const auth = useSelector((state:any) => state.auth)
  const [isOpenNav,setIsOpenNav] = useState(false)
  const [windowWidth,setWindowWidth] = useState(window.innerWidth)
  const hanleResize = ()=>{
    setWindowWidth(window.innerWidth)
  }
  useEffect(()=>{
    window.addEventListener('resize', hanleResize)
    return ()=>{
      window.removeEventListener('resize', hanleResize)
    }
  },[])
  useEffect(()=>{
    if(windowWidth > 992){
      setIsOpenNav(false) 
    }else{
      setIsToggleMenu(false)
    }
  },[windowWidth])
  return (
    <>
    {auth?.authData?.isLogin ? <section>
        <Header isToggle={isToggleMenu} setIsToggle={(val)=>setIsToggleMenu(val)} 
        windowWidth={windowWidth} isOpenNav={isOpenNav} setIsOpenNav={(val)=>setIsOpenNav(val)}/>
        <div className='main d-flex '>
            <div className={`sidebarOverlay d-none ${isOpenNav===true ? 'show' : ''}`} onClick={()=>setIsOpenNav(false)}></div>
              <div className={`sidebarWapper  ${isToggleMenu === true ? 'toggle' : ''} ${isOpenNav ? 'open' : ''}`}>
                  <SideBarComponent isToggle={isToggleMenu} setIsOpenNav={(val)=>setIsOpenNav(val)}/>
              </div>
            <div className={`content px-3 ${isToggleMenu === true ? 'toggle' : ''}`} >
                <Routes>
                  <Route path='/organizer/dashboard'  element={<DashboardPage />}/>
                  <Route path='/organizer/events'  element={<EventPage />}/>
                  <Route path='/organizer/create-event'  element={<CreateEventPage />}/>
                  <Route path='*' element={<h1>404 - Page Not Found</h1>} />
                </Routes>
            </div>
        </div>
    </section> : 
    <>
      <Routes>
        <Route path='/login'  element={<LoginPage/>}/>
        <Route path='*' element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </>}
</>
  );
}

export default App;
