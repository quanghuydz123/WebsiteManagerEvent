import React, { useState } from 'react';
import logo from './logo.svg';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import { Header, SideBarComponent } from './components';

function App() {
  const [isToggleMenu,setIsToggleMenu] = useState(false)
  console.log("isToggleMenu",isToggleMenu)
  return (
    <>
    <section>
        {/* <div className="sidebarWapper w-[18%]">
            <SideBarComponent />
        </div>
        <div className="content_Right w-[82%] px-3">
          <Routes>
              <Route path='/' element={<AdminPage />}/>
          </Routes>
        </div> */}
        <Header isToggle={isToggleMenu} setIsToggle={(val)=>setIsToggleMenu(val)}/>
        <div className='main d-flex '>
            <div className={`sidebarWapper  ${isToggleMenu === true ? 'toggle' : ''}`}>
                <SideBarComponent isToggle={isToggleMenu}/>
            </div>
            <div className={`content px-3 ${isToggleMenu === true ? 'toggle' : ''}`} >
                <Routes>
                  <Route path='/'  element={<AdminPage />}/>
                  <Route path='/dashboard'  element={<div />}/>
                </Routes>
            </div>
        </div>
        
    </section>
</>
  );
}

export default App;
