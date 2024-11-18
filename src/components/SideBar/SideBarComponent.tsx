import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import TextComponent from "../TextComponent";
import { FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ItemMenu from "../ItemMenu";
import { IoMdCreate } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";

interface Props{
    isToggle:boolean,
    setIsOpenNav:(val:boolean)=>void
    bgColor?:string
}
const SideBarComponent = (props:Props) => {
    const {setIsOpenNav,bgColor} = props
    const [activeItemMenu,setActiveItemMenu] = useState(0)
    const [isToogleSubMenu,setIsToogleSubMenu] = useState(false)
    useEffect(()=>{
        navigate('/organizer/dashboard')
    },[])
    const navigate = useNavigate()
    const openSubMenu = (index:number)=>{
        setIsOpenNav(false)
        setActiveItemMenu(index)
        // if(index===2){
        //     setIsToogleSubMenu(!isToogleSubMenu)
        // }else{
        //     if(isToogleSubMenu){
        //         setIsToogleSubMenu(false)
        //     }
        // }
        if(index ===0){
            navigate('/organizer/dashboard')
        }else if(index === 1){
            navigate('/organizer/events')
        }else if(index ===2){
            navigate('/organizer/create-event')

        }
    }
    return (
        <>
            <div className="sidebar" style={{backgroundColor:bgColor}}>
                <div className="sidebarTabs">
                    <ul className="flex gap-2 flex-col">
                        <li>
                            <ItemMenu text="Thống kê" 
                            iconLeft={<MdOutlineDashboardCustomize size={24} color={activeItemMenu === 0 ? "hsl(210deg 71.43% 46.67%)" : "#5e5d72"} />}
                            onClick={()=>{openSubMenu(0)}}
                            isActive={activeItemMenu === 0}
                            />
                        </li>
                        
                        <li>
                           
                             <ItemMenu text="Sự kiện đã tạo" 
                            iconLeft={<MdEventAvailable size={24} color={activeItemMenu === 1 ? "hsl(210deg 71.43% 46.67%)" : "#222222"} />}
                            onClick={()=>openSubMenu(1)}
                            isActive={activeItemMenu === 1}
                            />
                        </li>
                        {/* <li className={`${activeItemMenu === 2 && isToogleSubMenu === true ? 'colapse' : ''}`}>
                           
                             <ItemMenu text="Sản phẩm" 
                            iconLeft={<FaProductHunt size={24} color={activeItemMenu === 2 ? "hsl(210deg 71.43% 46.67%)" : "#222222"} />}
                            onClick={()=>openSubMenu(2)}
                            isActive={activeItemMenu === 2}
                            iconRight={<FaAngleRight className={`arrow ${activeItemMenu === 2 && isToogleSubMenu === true ? 'rotate' : ''}`} size={12} color={activeItemMenu === 2 ? "hsl(210deg 71.43% 46.67%)" : "#222222"} />}
                            />

                            <div className="submenu">
                               
                                <ItemMenu text="Danh sách sản phẩm" fontSize={14}/>
                                <ItemMenu text="Thêm sản phẩm" fontSize={14}/>
                            </div>
                        </li> */}
                        <li>
                            <ItemMenu text="Tạo sự kiện" 
                            iconLeft={<IoMdCreate size={24} color={activeItemMenu === 2 ? "hsl(210deg 71.43% 46.67%)" : "#222222"} />}
                            onClick={()=>openSubMenu(2)}
                            isActive={activeItemMenu === 2}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SideBarComponent;
