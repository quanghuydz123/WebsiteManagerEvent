import React, { useState, useEffect } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { initTypeTicket, TypeTicketModel } from "../../../models/TypeTicketModel";
import { DateTime } from "../../../utils/DateTime";
import { SpaceComponent } from "../../../components";
import { initShowTime, ShowTimeModel } from "../../../models/ShowTimeModel";
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (val: ShowTimeModel) => void,
    type:'create' | 'update',
    showTimeSeleted:ShowTimeModel
}

const ShowTimeModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit,type,showTimeSeleted}) => {

    const [isFree, setIsFree] = useState(false);
    // const [price, setPrice] = useState("");
    // const [ticketName, setTicketName] = useState("");
    // const [quantity, setQuantity] = useState("");
    // const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");
    // const [ticketNameError, setTicketNameError] = useState("");
    // const [quantityError, setQuantityError] = useState("");
    // const [dateError, setDateError] = useState("");
    const [showTime, setShowTime] = useState<ShowTimeModel>(initShowTime)
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(()=>{
        if(type==='update'){
            setShowTime(showTimeSeleted)
        }
      },[showTimeSeleted,isOpen])
    // Kiểm tra tên vé có vượt quá 50 ký tự
    // const handleTicketNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const value = e.target.value;
    //   setTicketName(value);

    //   // if (value.length > 50) {
    //   //   setTicketNameError("Quá ký tự yêu cầu");
    //   // } else {
    //   //   setTicketNameError("");
    //   // }
    // };

    // // Kiểm tra tổng số lượng vé là số
    // const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const value = e.target.value;
    //   setQuantity(value);

    //   // if (isNaN(Number(value)) || Number(value) <= 0) {
    //   //   setQuantityError("Số lượng vé phải là số lớn hơn 0");
    //   // } else {
    //   //   setQuantityError("");
    //   // }
    // };

    // // Kiểm tra thời gian kết thúc phải sau thời gian bắt đầu
    // const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const value = e.target.value;
    //   setEndDate(value);

    //   // if (startDate && new Date(value) <= new Date(startDate)) {
    //   //   setDateError("Thời gian kết thúc phải sau thời gian bắt đầu");
    //   // } else {
    //   //   setDateError("");
    //   // }
    // };



    if (!isOpen) return null;



    const handleSubmit = () => {
        const invalidTicket = showTime.typeTickets.find(ticket => new Date(ticket.endSaleTime) >= new Date(showTime.startDate));
        let error = ''
        if (new Date(showTime.startDate) < new Date()) {
            error = 'Thời gian bắt đầu phải lớn hơn thời gian hiện tại'
        }else if (new Date(showTime.endDate) < new Date(showTime.startDate)) {
            error = 'Thời gian kết thúc phải sau thời gian bắt đầu'
        }else if(invalidTicket){
            error = `Thời bắt đầu của suất diễn phải lớn hơn thời gian bán vẻ của loại vé: ${invalidTicket.name}`
        } else {
            error = ''
        }
        
        setErrorMessage(error)

        if (error === '') {
            setShowTime(initShowTime)
            onSubmit(showTime)
            onClose()
        }

    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* Modal container with rounded corners */}
            <div className="bg-gray-800 text-white w-full max-w-7xl rounded-xl shadow-lg text-lg overflow-y-auto max-h-screen">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-600 sticky top-0 bg-gray-800 z-10 rounded-t-xl">
                    <h2 className="text-2xl font-semibold">Tạo suất diễn mới</h2>
                    <button
                        onClick={() => {
                            setShowTime(initShowTime)
                            setErrorMessage('')
                            onClose()
                        }}
                        className="text-gray-400 hover:text-gray-200 text-2xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-8">


                    {/* Thời gian */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold mb-2">
                                <span className="text-red-500">*</span> Thời gian bắt đầu bán vé
                            </label>
                            <input
                                type="datetime-local"
                                value={DateTime.formatLocalDateTime(showTime.startDate)}
                                onChange={(e) => {
                                    setShowTime(prev => {
                                        return {
                                            ...prev,
                                            startDate: new Date(e.target.value)
                                        }
                                    })
                                }}
                                className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">
                                <span className="text-red-500">*</span> Thời gian kết thúc bán vé
                            </label>
                            <input
                                type="datetime-local"
                                value={DateTime.formatLocalDateTime(showTime.endDate)}
                                onChange={(e) => {
                                    setShowTime(prev => {
                                        return {
                                            ...prev,
                                            endDate: new Date(e.target.value)
                                        }
                                    })
                                }}
                                className="w-full p-4 rounded-xl border border-gray-500 bg-white text-black focus:ring-2 focus:ring-green-500 text-lg"
                            />

                        </div>
                    </div>


                </div>
                {errorMessage && <p className="text-center text-red-600">{errorMessage}</p>}
                <SpaceComponent height={8} />
                {/* Footer */}
                <div className="p-6 border-t border-gray-600 rounded-b-xl">
                    <button onClick={() => handleSubmit()} className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-xl">
                        {type === 'create' ? 'Thêm' : 'Cập nhập'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShowTimeModal;
