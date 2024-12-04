import React, { useEffect, useState } from 'react';
import Accordion from '../../../components/accordion/AccordionComponent';
import Addbutton from '../../../components/Button/Addbutton';
import AddButton from '../../../components/Button/Addbutton';
import TicketModal from './TicketModal';
import { FaDollarSign, FaTicketAlt } from 'react-icons/fa';
import { RowComponent, SpaceComponent } from '../../../components';
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { colors } from '../../../constrants/color';
import { DataEventCreate } from './EventCreationOrganizerPage';
import { DateTime } from '../../../utils/DateTime';
import { initTypeTicket, TypeTicketModel } from '../../../models/TypeTicketModel';
import AlertComponent from '../../../components/AlertComponent';
import { initShowTime, ShowTimeModel } from '../../../models/ShowTimeModel';

interface EventCreationTimePageProps {
    dataEventCreate: DataEventCreate,
    setDataEventCreate: React.Dispatch<React.SetStateAction<DataEventCreate>>;
}

const EventCreationTimePage: React.FC<EventCreationTimePageProps> = ({ dataEventCreate, setDataEventCreate }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalState, setModalState] = useState<{
        type: 'create' | 'update',
        indexShowTimeSelected: number,
        indexTypeTicketSelected: number,
        typeTicketSelected: TypeTicketModel,
        showTimeSelected:ShowTimeModel
    }>({
        type: 'create',
        indexShowTimeSelected: -1,
        indexTypeTicketSelected: -1,
        typeTicketSelected: initTypeTicket,
        showTimeSelected:initShowTime
    })
    const [errorMessage, setErrorMessage] = useState<string[]>([])
    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [deleteState, setDeleteState] = useState<{
        content: 'showTime' | 'typeTicket',
        indexShowTimeSelected: number,
        indexTypeTicketSelected: number,
        message: string
    }>({
        content: 'showTime',
        indexShowTimeSelected: -1,
        indexTypeTicketSelected: -1,
        message: ''
    })
    // const [performances, setPerformances] = useState<{
    //     startTime: string, endTime: string, ticketTypes: {
    //         name: string;
    //         description: string;
    //         price: string;
    //         amount: number;
    //         startSaleTime: string;
    //         endSaleTime: string
    //     }[], isOpen: boolean, errorMessage?: string
    // }[]>([]);

    // Add a new performance event when the button is clicked
    const toggleCreateShow = () => {
        // setPerformances(prev => {
        //     const newPerformances = [
        //         ...prev,
        //         { startTime: '', endTime: '', ticketTypes: [], isOpen: false }
        //     ];
        //     return newPerformances;
        // });
        setDataEventCreate(prev => {
            return {
                ...prev,
                showTimes: [
                    ...prev.showTimes,
                    { startDate: new Date(), endDate: new Date(), typeTickets: [], isOpen: false, _id: '', status: "OnSale", errorMessage: '' }
                ]
            }
        })
    };
    // Toggle the accordion for each performance
    const toggleAccordion = (index: number) => {
        // setPerformances(prev => {
        //     const updatedPerformances = [...prev];
        //     if (updatedPerformances[index]) {
        //         updatedPerformances[index].isOpen = !updatedPerformances[index].isOpen;
        //     }
        //     return updatedPerformances;
        // });
        setDataEventCreate(prev => {
            const updatedPerformances = [...prev.showTimes];
            if (updatedPerformances[index]) {
                updatedPerformances[index].isOpen = !updatedPerformances[index].isOpen;
            }
            return {
                ...prev,
                showTimes: updatedPerformances
            }
        })
    };

    // Handle changes for each performance's start time, end time, and ticket type
    const handleInputChange = (index: number, field: 'startTime' | 'endTime', value: string) => {
        // setPerformances(prev => {
        //     const updatedPerformances = [...prev];
        //     updatedPerformances[index] = { ...updatedPerformances[index], [field]: value };

        //     // If the field is 'endTime' and there is a startTime, validate the time
        //     if (field === 'endTime' && updatedPerformances[index].startTime && new Date(value) < new Date(updatedPerformances[index].startTime)) {
        //         updatedPerformances[index].errorMessage = 'Thời gian kết thúc phải sau thời gian bắt đầu';
        //     } else {
        //         updatedPerformances[index].errorMessage = '';  // Clear error message if validation passes
        //     }
        //     return updatedPerformances;
        // });

        setDataEventCreate(prev => {
            const updatedPerformances = [...prev.showTimes];
            if (updatedPerformances[index]) {
                // if (field === 'endTime' && updatedPerformances[index].startDate && new Date(value) < new Date(updatedPerformances[index].endDate)) {
                //     updatedPerformances[index].errorMessage = 'Thời gian kết thúc phải sau thời gian bắt đầu';
                // } else {
                //     updatedPerformances[index].errorMessage = '';  // Clear error message if validation passes
                // }
                // if(field === 'endTime' && updatedPerformances[index].startDate < new Date(value)){
                //     setErrorMessage(prev => {
                //         const newErrors = [...prev];
                //         newErrors[index] = 'Thời gian kết thúc phải sau thời gian bắt đầu'; 
                //         return newErrors; 
                //     });
                // }else{
                //     setErrorMessage(prev => {
                //         const newErrors = [...prev];
                //         newErrors[index] = ''; 
                //         return newErrors; 
                //     });
                //     if (field === 'startTime') {
                //         updatedPerformances[index].startDate = new Date(value)
                //     } else {
                //         updatedPerformances[index].endDate = new Date(value)
                //     }
                // }
                if (field === 'endTime') {
                    if(updatedPerformances[index].startDate < new Date()){
                        setErrorMessage(prev => {
                            const newErrors = [...prev];
                            newErrors[index] = 'Thời gian bắt đầu phải lớn hơn thời gian hiện tại';
                            return newErrors;
                        });
                    }else{
                        if (new Date(updatedPerformances[index].startDate) > new Date(value)) {
                            setErrorMessage(prev => {
                                const newErrors = [...prev];
                                newErrors[index] = 'Thời gian kết thúc phải sau thời gian bắt đầu';
                                return newErrors;
                            });
                        } else {
                            setErrorMessage(prev => {
                                const newErrors = [...prev];
                                newErrors[index] = '';
                                return newErrors;
                            });
                        }
                    }
                } else {
                    if (new Date(value) < new Date()) {
                        setErrorMessage(prev => {
                            const newErrors = [...prev];
                            newErrors[index] = 'Thời gian bắt đầu phải lớn hơn thời gian hiện tại';
                            return newErrors;
                        });
                    } else {
                        if (new Date(updatedPerformances[index].endDate) < new Date(value)) {
                            setErrorMessage(prev => {
                                const newErrors = [...prev];
                                newErrors[index] = 'Thời gian kết thúc phải sau thời gian bắt đầu';
                                return newErrors;
                            });
                        } else {
                            setErrorMessage(prev => {
                                const newErrors = [...prev];
                                newErrors[index] = '';
                                return newErrors;
                            });
                        }
                    }
                }
                if (field === 'startTime') {
                    updatedPerformances[index].startDate = new Date(value)
                } else {
                    updatedPerformances[index].endDate = new Date(value)
                }

            }
            return {
                ...prev,
                showTimes: updatedPerformances
            }
        })
    };

    // Delete a performance event
    const deletePerformance = (index: number) => {
        // if (performances[index]) {
        //     setPerformances(prev => prev.filter((_, i) => i !== index));
        // 
        setDataEventCreate(prev => {
            const updatedPerformances = prev.showTimes.filter((_, i) => i !== index);
            return {
                ...prev,
                showTimes: updatedPerformances
            }
        })
    };
    // useEffect(()=>{
    //     if(modalState.type === 'update'){
    //         setModalOpen(true)
    //     }
    // },[modalState.type])
    const handleUpdateTicket = (showTime:ShowTimeModel,typeTicket: TypeTicketModel, indexShowTime: number, indexTypeTicket: number) => {
        setModalState(prev => {
            return {
                ...prev,
                indexShowTimeSelected: indexShowTime,
                typeTicketSelected: typeTicket,
                indexTypeTicketSelected: indexTypeTicket,
                showTimeSelected:showTime,
                type: 'update'

            }
        })
        setModalOpen(true)
    }
    const handleDeleteTicket = (indexShowTime: number, indexTypeTicket: number) => {
        setDataEventCreate(prev => {
            const updatedPerformances = [...prev.showTimes];
            updatedPerformances[indexShowTime].typeTickets = updatedPerformances[indexShowTime].typeTickets.filter((_, i) => i !== indexTypeTicket);
            return {
                ...prev,
                showTimes: updatedPerformances
            }
        })
    }

    const renderTypeTicket = (showTime:ShowTimeModel,typeTicket: TypeTicketModel, indexTypeTicket: number, indexShowTime: number) => {
        return <div className='bg-gray-500 rounded-md p-3 mt-2 mb-2 flex justify-between' key={typeTicket.name}>
            <RowComponent>
                <FaTicketAlt size={20} />
                <SpaceComponent width={8} />
                <p>{typeTicket.name}</p>
            </RowComponent>
            <RowComponent>
                <div className='bg-white p-1.5 rounded-md' onClick={() => handleUpdateTicket(showTime,typeTicket, indexShowTime, indexTypeTicket)}>
                    <BsPencilSquare size={20} color={colors.background} />
                </div>
                <SpaceComponent width={12} />
                <div className='bg-red-500 p-1.5 rounded-md' onClick={() => {
                    setDeleteState({
                        content: 'typeTicket',
                        indexShowTimeSelected: indexShowTime,
                        indexTypeTicketSelected: indexTypeTicket,
                        message: 'Bạn có muốn xóa loại vé này !!!'
                    })
                    setIsAlertOpen(true)
                }}>
                    <MdDeleteOutline size={20} />
                </div>
            </RowComponent>
        </div>
    }
    const createTypeTicket = (showTime:ShowTimeModel,index: number) => {
        setModalState(prev => {
            return {
                ...prev,
                indexShowTimeSelected: index,
                type: 'create',
                showTimeSelected:showTime
            }
        })
        setModalOpen(true)
    }
    return (
        <div className="flex flex-col items-center justify-center py-4"> {/* Center content vertically */}
            {/* Add Event Button centered */}
            <div className="mb-8">
                <Addbutton text="Thêm suất diễn" onClick={toggleCreateShow} />
            </div>

            {/* Render an accordion for each performance */}
            {dataEventCreate?.showTimes?.map((performance, indexShowTime) => (
                <div key={indexShowTime} className="mt-4 w-full">
                    <Accordion
                        title={
                            <div className="flex items-center">
                                {/* Toggle Button */}
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(indexShowTime)}
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
                                <span className="ml-2" style={{ color: colors.primary }}>{`Tạo suất diễn ${indexShowTime + 1}`}</span>

                                {/* Delete Button */}
                                <button
                                    onClick={() => {
                                        setDeleteState(prev => {
                                            return {
                                                ...prev,
                                                content: 'showTime',
                                                indexShowTimeSelected: indexShowTime,
                                                message: 'Bạn có muốn xóa suất diễn này !!!'
                                            }
                                        })
                                        setIsAlertOpen(true)
                                    }}
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
                        toggleOpen={() => toggleAccordion(indexShowTime)}
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
                                        value={DateTime.formatLocalDateTime(performance.startDate)}
                                        onChange={(e) => handleInputChange(indexShowTime, 'startTime', e.target.value)}
                                        className="w-full mt-2 p-2 bg-white dark:bg-gray-800 border border-gray-500 rounded-lg text-black dark:text-black dark:border-gray-700"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="text-black dark:text-gray-400 text-sm font-semibold">Thời gian kết thúc</label>
                                    <input
                                        type="datetime-local"
                                        value={DateTime.formatLocalDateTime(performance.endDate)}
                                        onChange={(e) => handleInputChange(indexShowTime, 'endTime', e.target.value)}
                                        className="w-full mt-2 p-2 bg-white dark:bg-gray-800 border border-gray-500 rounded-lg text-black dark:text-black dark:border-gray-700"
                                    />
                                    {/* Show error message if validation fails */}
                                    {performance.errorMessage && (
                                        <p className="text-red-500 text-sm mt-1">{performance.errorMessage}</p>
                                    )}
                                </div>
                            </section>
                            <SpaceComponent height={12} />
                            {errorMessage[indexShowTime] && <p className='text-red-600 text-center' >{errorMessage[indexShowTime]}</p>}
                            {/* Ticket Type Section */}
                            <div className="flex flex-col mt-4">
                                <div className="flex justify-between items-center">
                                    <label className="font-semibold text-black">
                                        <span className="text-red-500">*</span> Loại vé
                                    </label>
                                    <AddButton
                                        text="Tạo loại vé mới"
                                        onClick={() => createTypeTicket(performance,indexShowTime)}
                                        className="text-lg font-semibold "
                                    />
                                </div>
                                {
                                    (performance.typeTickets && performance.typeTickets.length) && performance.typeTickets.map((typeTicket, indexTypeTicket) => {
                                        return renderTypeTicket(performance,typeTicket, indexTypeTicket, indexShowTime)
                                    })
                                }

                            </div>
                        </div>
                    </Accordion>
                </div>
            ))}
            <AlertComponent
                isOpen={isAlertOpen}
                message={deleteState.message}
                title='Thông báo'
                onClose={() => setIsAlertOpen(false)}
                onCancel={() => setIsAlertOpen(false)}
                onConfirm={() => {
                    if (deleteState.content === 'showTime') {
                        deletePerformance(deleteState.indexShowTimeSelected)

                    } else {
                        handleDeleteTicket(deleteState.indexShowTimeSelected, deleteState.indexTypeTicketSelected)
                    }
                    setIsAlertOpen(false)
                }}
            />
            <TicketModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                value={modalState.typeTicketSelected}
                showTimeSelected={modalState.showTimeSelected}
                onSubmit={(val) => {
                    if (modalState.type === 'create') {
                        setDataEventCreate(prev => {
                            const updatedPerformances = [...prev.showTimes];
                            const selectedPerformance = updatedPerformances[modalState.indexShowTimeSelected];

                            const updatedTypeTickets = [...selectedPerformance.typeTickets, val];

                            updatedPerformances[modalState.indexShowTimeSelected] = {
                                ...selectedPerformance,
                                typeTickets: updatedTypeTickets
                            };
                            return {
                                ...prev,
                                showTimes: updatedPerformances
                            }
                        })
                    } else {
                        setDataEventCreate(prev => {
                            const updatedPerformances = [...prev.showTimes];
                            updatedPerformances[modalState.indexShowTimeSelected].typeTickets[modalState.indexTypeTicketSelected] = val
                            return {
                                ...prev,
                                showTimes: updatedPerformances
                            }
                        })
                    }
                }}
                type={modalState.type}
            />

        </div>
    );
};

export default EventCreationTimePage;
