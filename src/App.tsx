import React from 'react';
import logo from './logo.svg';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import { Header, SideBarComponent } from './components';

function App() {
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
        <Header />
        <Routes>
              <Route path='/'  element={<AdminPage />}/>
              <Route path='/dashboard'  element={<AdminPage />}/>
        </Routes>
    </section>
</>
  );
}

export default App;
