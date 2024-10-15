import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import TextComponent from "../TextComponent";
import { FaUser } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ItemMenu from "../ItemMenu";
interface Props{
    isToggle:boolean,
    setIsOpenNav:(val:boolean)=>void
}
const SideBarComponent = (props:Props) => {
    const {setIsOpenNav} = props
    const [activeItemMenu,setActiveItemMenu] = useState(0)
    const [isToogleSubMenu,setIsToogleSubMenu] = useState(false)
    useEffect(()=>{
        navigate('/')
    },[])
    const navigate = useNavigate()
    const openSubMenu = (index:number)=>{
        setIsOpenNav(false)
        setActiveItemMenu(index)
        if(index===2){
            setIsToogleSubMenu(!isToogleSubMenu)
        }else{
            if(isToogleSubMenu){
                setIsToogleSubMenu(false)
            }
        }
        if(index ===0){
            navigate('/')
        }else if(index === 1){
            navigate('/users')
        }
    }
    return (
        <>
            <div className="sidebar ">
                <div className="sidebarTabs px-2">
                    <ul className="flex gap-2 flex-col">
                        <li>
                            {/* <Button className="w-100 px-1 py-10  hover:bg-black/10" onClick={()=>openSubMenu(0)}  >
                                <span className="icon mr-2 w-[30px] h-[30px] flex items-centrer justify-center rounded-md">
                                    <MdOutlineDashboardCustomize size={20} color={"#222222"} />
                                </span>
                                <TextComponent text="Trang chủ" className="flex-1 text-start" color={"#222222"} size={15} fontWeight={600} />
                            </Button> */}
                            <ItemMenu text="Trang chủ" 
                            iconLeft={<MdOutlineDashboardCustomize size={20} color={activeItemMenu === 0 ? "hsl(210deg 71.43% 46.67%)" : "#5e5d72"} />}
                            onClick={()=>{openSubMenu(0)}}
                            isActive={activeItemMenu === 0}
                            />
                        </li>
                        
                        <li>
                            {/* <Button className="w-100 px-1 py-10 hover:bg-black/10" onClick={()=>openSubMenu(1)}>
                                <span className="icon mr-2 w-[30px] h-[30px] flex items-center justify-center rounded-md">
                                    <FaUser size={20} color={"#222222"} />
                                </span>
                                <TextComponent text="Người dùng" className="flex-1 text-start" color={"#222222"} size={15} fontWeight={600} />
                            </Button> */}
                             <ItemMenu text="Người dùng" 
                            iconLeft={<FaUser size={20} color={activeItemMenu === 1 ? "hsl(210deg 71.43% 46.67%)" : "#222222"} />}
                            onClick={()=>openSubMenu(1)}
                            isActive={activeItemMenu === 1}
                            />
                        </li>
                        <li className={`${activeItemMenu === 2 && isToogleSubMenu === true ? 'colapse' : ''}`}>
                            {/* <Button className="w-100 px-1 py-10 hover:bg-black/10" onClick={()=>openSubMenu(2)}>
                                <span className="icon mr-2 w-[30px] h-[30px] flex items-center justify-center rounded-md">
                                    <FaProductHunt size={20} color={"#222222"} />
                                </span>
                                <TextComponent text="Sản phẩm" className="flex-1 text-start" color={"#222222"} size={15} fontWeight={600} />
                                <span className=" ml-auto w-[20px] h-[20px] flex items-center justify-center"><FaAngleRight className={`arrow ${activeItemMenu === 2 && isToogleSubMenu === true ? 'rotate' : ''}`} size={12} color={"#222222"} /></span>
                            </Button> */}
                             <ItemMenu text="Sản phẩm" 
                            iconLeft={<FaProductHunt size={20} color={activeItemMenu === 2 ? "hsl(210deg 71.43% 46.67%)" : "#222222"} />}
                            onClick={()=>openSubMenu(2)}
                            isActive={activeItemMenu === 2}
                            iconRight={<FaAngleRight className={`arrow ${activeItemMenu === 2 && isToogleSubMenu === true ? 'rotate' : ''}`} size={12} color={activeItemMenu === 2 ? "hsl(210deg 71.43% 46.67%)" : "#222222"} />}
                            />

                            <div className="submenu">
                                {/* <Button className="w-100 hover:bg-black/10">
                                    <TextComponent text="Danh sách sản phẩm" className="flex-1 text-start" color={"#222222"} size={15} fontWeight={600} />
                                </Button>
                                <Button className="w-100 hover:bg-black/10">
                                    <TextComponent text="Thêm sản phẩm" className="flex-1 text-start" color={"#222222"} size={15} fontWeight={600} />
                                </Button> */}
                                <ItemMenu text="Danh sách sản phẩm" fontSize={14}/>
                                <ItemMenu text="Thêm sản phẩm" fontSize={14}/>
                            </div>
                        </li>
                        <li>
                            {/* <Button className="w-100 px-1 py-10 hover:bg-black/10" onClick={()=>openSubMenu(3)}>
                                <span className="icon mr-2 w-[30px] h-[30px] flex items-center justify-center rounded-md">
                                    <FaUser size={20} color={"#222222"} />
                                </span>
                                <TextComponent text="Thể loại" className="flex-1 text-start" color={"#222222"} size={15} fontWeight={600} />
                            </Button> */}
                            <ItemMenu text="Thể loại" 
                            iconLeft={<FaUser size={20} color={activeItemMenu === 3 ? "hsl(210deg 71.43% 46.67%)" : "#222222"} />}
                            onClick={()=>openSubMenu(3)}
                            isActive={activeItemMenu === 3}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SideBarComponent;
