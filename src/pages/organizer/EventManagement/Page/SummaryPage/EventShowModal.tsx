import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import dấu X

interface ShowTime {
  id: number;
  time: string;
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  shows: ShowTime[];
  onSelectShow: (show: ShowTime) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, shows, onSelectShow }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-gray-800 p-8 rounded-2xl shadow-lg w-[400px] sm:w-[500px]">
        {/* Dấu X ở góc phải */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-400"
        >
          <FaTimes />
        </button>

        <h3 className="text-2xl font-semibold mb-6 text-center text-white">Chọn suất diễn</h3>

        <ul className="space-y-4">
          {shows.map((show) => (
            <li
              key={show.id}
              className="cursor-pointer hover:bg-green-600 p-4 rounded-xl transition duration-300 ease-in-out text-white"
              onClick={() => onSelectShow(show)}
            >
              {show.time} 
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <button
            onClick={() => onSelectShow(shows[0])}
            className="bg-green-600 text-white px-8 py-4 text-xl rounded-lg w-full hover:bg-green-700 transition-colors duration-200"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
