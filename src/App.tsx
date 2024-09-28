import React from 'react';
import logo from './logo.svg';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import { SideBarComponent } from './components';

function App() {
  return (
    <>
    <section className="main flex">
        <div className="sidebarWapper w-[18%]">
            <SideBarComponent />
        </div>
        <div className="content_Right w-[82%] px-3">
          <Routes>
              <Route path='/' element={<AdminPage />}/>
          </Routes>
        </div>
    </section>
</>
  );
}

export default App;
