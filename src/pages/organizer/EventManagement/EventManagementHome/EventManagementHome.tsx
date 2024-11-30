
import { useState } from 'react';
import EventSidebar from '../EventSidebar/EventSibar';
import EventContent from '../EventContent/EventContent';




const EventManagementHome = () => {
    const [isOpen, setIsOpen] = useState(true);

  
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`flex font-Montserrat bg-slate-700`}>
        <EventSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />
        <EventContent 
            isOpen={isOpen} 
           
            />

        </div>
    );
}

export default EventManagementHome;
