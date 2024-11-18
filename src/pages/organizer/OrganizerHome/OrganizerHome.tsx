
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Content from '../Content/Content';




const OrganizerHome = () => {
    const [isOpen, setIsOpen] = useState(true);

  
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex font-Montserrat bg-slate-700`}>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />
        <Content 
            isOpen={isOpen} 
           
            />

        </div>
    );
}

export default OrganizerHome;
