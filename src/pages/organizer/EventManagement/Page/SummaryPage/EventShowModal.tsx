import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import dấu X
import { ShowTimeModel } from '../../../../../models/ShowTimeModel';
import { DateTime } from '../../../../../utils/DateTime';
import { SpaceComponent } from '../../../../../components';
import { colors } from '../../../../../constrants/color';



interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  shows: ShowTimeModel[];
  onSelectShow: (idShowTime: string) => void;
  idShowTimeSelected:string
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, shows, onSelectShow,idShowTimeSelected }) => {
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
        <SpaceComponent height={12}/>
        <ul className="space-y-4">
          {shows.map((show) => (
            <li
              key={show._id}
              className="cursor-pointer hover:bg-green-600 p-4 rounded-xl transition duration-300 ease-in-out text-white"
              style={{
                backgroundColor:idShowTimeSelected === show._id ? colors.primary : ''
              }}
              onClick={() => onSelectShow(show._id)}
            >
              {`${DateTime.GetTime(show.startDate)} : ${DateTime.GetTime(show.endDate)} ${DateTime.GetDateNew1(show.startDate,show.endDate)}`}
            </li>
          ))}
        </ul>

        {/* <div className="mt-6">
          <button
            onClick={() => onSelectShow('ok')}
            className="bg-green-600 text-white px-8 py-4 text-xl rounded-lg w-full hover:bg-green-700 transition-colors duration-200"
          >
            Xác nhận
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
