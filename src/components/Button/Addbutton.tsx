import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai'; 
interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const AddButton: React.FC<ButtonProps> = ({ text, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-green-400 via-green-500 to-green-600
                 text-white font-semibold py-3 px-6 rounded-full
                 shadow-md transform transition-transform duration-300
                 hover:scale-105 hover:shadow-lg
                 focus:outline-none ${className}`}
    >
      {/* Plus icon in front of the text */}
      <AiOutlinePlus className="w-5 h-5 inline-block mr-2" /> {/* Icon styling */}
      {text}
    </button>
  );
};

export default AddButton;
