import { Link } from "react-router-dom";

const MenuItem = ({ icon: Icon, name, isOpen, isLogout ,onClicked} : {icon: any, name: any, isOpen: any, isLogout: any,onClicked:()=>void}) => {
  return (
    <div
      className={`m-2 flex cursor-pointer items-center space-x-4 rounded-md px-4 py-4
       text-white duration-500 hover:bg-teal-700 hover:text-white 
       ${isLogout ? 'mt-auto hidden' : ''}`}
       style={{textDecoration:'none'}}
       onClick={onClicked}
    >
      <Icon className="text-2xl" />
      {isOpen && (
        <span className="text-[18px] overflow-hidden">{name}</span>
      )}
    </div>
  );
};

export default MenuItem;