
import { useState } from 'react';
import SidebarComponent from '../../../components/SideBar/SideBarComponent';
import MainContent from '../../../components/MainContent/MainContent';




const AdminHome = () => {
    const [isOpen, setIsOpen] = useState(true);

  
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex font-Montserrat bg-slate-700`}>
        <SidebarComponent isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />
        <MainContent 
            isOpen={isOpen} 
           
            />

        </div>
    );
}

export default AdminHome;
