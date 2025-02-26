
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ContentAdmin from '../Content/ContentAdmin';




const AdminHome = () => {
    const [isOpen, setIsOpen] = useState(true);

  
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex font-Montserrat bg-slate-700`}>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />
        <ContentAdmin 
            isOpen={isOpen}  
            />

        </div>
    );
}

export default AdminHome;
