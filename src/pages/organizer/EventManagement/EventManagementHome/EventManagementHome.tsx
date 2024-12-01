
import { useEffect, useState } from 'react';
import EventSidebar from '../EventSidebar/EventSibar';
import EventContent from '../EventContent/EventContent';
import { useSearchParams } from 'react-router-dom';




const EventManagementHome = () => {
    const [isOpen, setIsOpen] = useState(true);

  
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const [searchParams] = useSearchParams(); // Hook để làm việc với query string

    return (
        <div className={`flex font-Montserrat bg-slate-700`}>
        <EventSidebar idEvent={searchParams.get('idEvent') ?? ''} idShowTime={searchParams.get('idShowTime') ?? ''} isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />
        <EventContent 
            isOpen={isOpen} 
           
            />

        </div>
    );
}

export default EventManagementHome;
