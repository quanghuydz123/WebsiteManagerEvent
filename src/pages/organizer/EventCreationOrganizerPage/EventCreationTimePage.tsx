import React, { useState } from 'react';
import Accordion from '../../../components/accordion/AccordionComponent';
import Addbutton from '../../../components/Button/Addbutton';
import AddButton from '../../../components/Button/Addbutton';
import TicketModal from './TicketModal';

interface EventCreationTimePageProps {
    eventType: string;
    setEventType: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
}

const EventCreationTimePage: React.FC<EventCreationTimePageProps> = ({ eventType, setEventType, handleSubmit }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [performances, setPerformances] = useState<{ startTime: string, endTime: string, ticketType: string, isOpen: boolean, errorMessage?: string }[]>([]);
    
    // Add a new performance event when the button is clicked
    const toggleCreateShow = () => {
        setPerformances(prev => {
            const newPerformances = [
                ...prev,
                { startTime: '', endTime: '', ticketType: '', isOpen: false }
            ];
            console.log(newPerformances);  
            return newPerformances;
        });
    };

    // Toggle the accordion for each performance
    const toggleAccordion = (index: number) => {
        setPerformances(prev => {
            const updatedPerformances = [...prev];
            if (updatedPerformances[index]) {
                updatedPerformances[index].isOpen = !updatedPerformances[index].isOpen;
            }
            return updatedPerformances;
        });
    };

    // Handle changes for each performance's start time, end time, and ticket type
    const handleInputChange = (index: number, field: string, value: string) => {
        setPerformances(prev => {
            const updatedPerformances = [...prev];
            updatedPerformances[index] = { ...updatedPerformances[index], [field]: value };
            
            // If the field is 'endTime' and there is a startTime, validate the time
            if (field === 'endTime' && updatedPerformances[index].startTime && new Date(value) < new Date(updatedPerformances[index].startTime)) {
                updatedPerformances[index].errorMessage = 'Thời gian kết thúc phải sau thời gian bắt đầu';
            } else {
                updatedPerformances[index].errorMessage = '';  // Clear error message if validation passes
            }

            return updatedPerformances;
        });
    };

    // Delete a performance event
    const deletePerformance = (index: number) => {
        if (performances[index]) {
            setPerformances(prev => prev.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-4"> {/* Center content vertically */}
            {/* Add Event Button centered */}
            <div className="mb-8">
                <Addbutton text="Thêm suất diễn" onClick={toggleCreateShow} />
            </div>

            {/* Render an accordion for each performance */}
            {performances.map((performance, index) => (
                <div key={index} className="mt-4 w-full">
                    <Accordion
                        title={
                            <div className="flex items-center">
                                {/* Toggle Button */}
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(index)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                        className={`w-5 h-5 transition-transform duration-200 ${performance.isOpen ? 'rotate-180' : ''}`}
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 8l4-4 4 4M6 12l4 4 4-4"
                                        />
                                    </svg>
                                </button>

                                {/* Title */}
                                <span className="ml-2">{`Tạo suất diễn ${index + 1}`}</span>

                                {/* Delete Button */}
                                <button
                                    onClick={() => deletePerformance(index)}
                                    className="ml-auto text-red-500 hover:text-red-700 text-lg font-semibold"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                        className="w-5 h-5 inline"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        }
                        isOpen={performance.isOpen ?? false}
                        toggleOpen={() => toggleAccordion(index)}
                    >
                        <div>
                            {/* Time Event Section */}
                            <label className="font-semibold text-black">
                                <span className="text-red-500">*</span> Thời gian sự kiện
                            </label>
                            <section className="flex flex-row gap-4">
                                <div className="flex-1">
                                    <label className="text-black dark:text-gray-400 text-sm font-semibold">Thời gian bắt đầu</label>
                                    <input
                                        type="datetime-local"
                                        value={performance.startTime}
                                        onChange={(e) => handleInputChange(index, 'startTime', e.target.value)}
                                        className="w-full mt-2 p-2 bg-white dark:bg-gray-800 border border-gray-500 rounded-lg text-black dark:text-black dark:border-gray-700"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="text-black dark:text-gray-400 text-sm font-semibold">Thời gian kết thúc</label>
                                    <input
                                        type="datetime-local"
                                        value={performance.endTime}
                                        onChange={(e) => handleInputChange(index, 'endTime', e.target.value)}
                                        className="w-full mt-2 p-2 bg-white dark:bg-gray-800 border border-gray-500 rounded-lg text-black dark:text-black dark:border-gray-700"
                                    />
                                    {/* Show error message if validation fails */}
                                    {performance.errorMessage && (
                                        <p className="text-red-500 text-sm mt-1">{performance.errorMessage}</p>
                                    )}
                                </div>
                            </section>

                            {/* Ticket Type Section */}
                            <div className="flex flex-col mt-4">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold text-black">
                                        <span className="text-red-500">*</span> Loại vé
                                    </label>
                                    <AddButton
                                        text="Tạo loại vé mới" 
                                        onClick={() => setModalOpen(true)} 
                                        className="text-lg font-semibold " 
                                    />   
                                </div>
                                <TicketModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                            </div>
                        </div>
                    </Accordion>
                </div>
            ))}
        </div>
    );
};

export default EventCreationTimePage;
