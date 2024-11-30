import { Link, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import { MdMenuBook, MdMenuOpen, MdOutlineMenu } from "react-icons/md";
import SearchBox from "../SearchBox/SearchBox";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { Divider } from "@mui/material";
import AvatarComponent from "../Avatar/AvatarComponent";
import NotificationComponent from "../Notification/NotificationComponent";
import { useDispatch, useSelector } from "react-redux";
import { AuthState, removeAuth } from "../../reduxs/reducers/authReducers";
interface Props{
    isToggle:boolean,
    setIsToggle:(val:boolean)=>void,
    windowWidth:number,
    setIsOpenNav:(val:boolean)=>void,
    isOpenNav:boolean,
    bgColor?:string
}
const Header = (props:Props) => {
    const {isToggle,setIsToggle,windowWidth,setIsOpenNav,isOpenNav,bgColor} = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {authData }:{authData:AuthState} = useSelector((state: any) => state.auth);

    const [isOpenNotifications,setIsOpenNotifications] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const openNotification = Boolean(isOpenNotifications);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // React.useEffect(()=>{
    //     dispatch(removeAuth())
    // },[])
    const handleOpenMyAcc = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
        setAnchorEl(null);
    };

    const handleOpenNotification = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpenNotifications(event.currentTarget);
    };
    const handleCloseNotification = () => {
        setIsOpenNotifications(null);
    };
    const handleLogout = ()=>{
        dispatch(removeAuth())
        navigate('/')
        // dispatch(setIsLogin({isLogin:false}))
    }
    return (
        <>
            <header className="d-flex align-items-center justify-end bg-gradient-to-b from-green-900 via-black to-purple-900"  style={{borderBottom: '1px solid #616161 !important' }}>
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100 ">
                        {/*logo*/}
                        {/* <div className="col-sm-2 part1">
                           
                        </div>
                        {windowWidth > 992 && <div className="col-sm-3 d-flex align-items-center part2 pl-2 res-hide">
                            <Button className="rounded-circl mr-3 ml-3" onClick={()=>setIsToggle(!isToggle)}>
                                {isToggle ? <MdOutlineMenu className="icon"/>: <MdMenuOpen className="icon"/>}
                            </Button>
                        </div>} */} 

                        <div className="col-sm-12 d-flex align-items-center part3 justify-content-end">
                            

                            <Button className="rounded-circl mr-2" onClick={handleOpenNotification}>
                                <IoMdNotifications className="icon" />

                            </Button>

                           {/* {windowWidth < 992 && <Button className="rounded-circl mr-2" onClick={()=>setIsOpenNav(!isOpenNav)}>
                                <MdOutlineMenu className="icon" />
                            </Button>} */}
                            <Menu
                                anchorEl={isOpenNotifications}
                                id="notification"
                                className="notification dropdown_list"
                                open={openNotification}
                                onClose={handleCloseNotification}
                                onClick={handleCloseNotification}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                           
                              
                                <div className="head pl-3 pb-0">
                                    <h4>Thông báo</h4>
                                </div>
                                <Divider className="mb-2"/>
                                <div className="scroll">
                                <MenuItem onClick={handleCloseNotification}>
                                    <div className="d-flex">
                                        
                                        <NotificationComponent />
                                    </div>
                                </MenuItem>

                                <MenuItem onClick={handleCloseNotification}>
                                    <div className="d-flex">
                                        
                                        <NotificationComponent />
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNotification}>
                                    <div className="d-flex">
                                        <NotificationComponent />
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNotification}>
                                    <div className="d-flex">
                                        
                                        <NotificationComponent />
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNotification}>
                                    <div className="d-flex">
                                        
                                        <NotificationComponent />
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNotification}>
                                    <div className="d-flex">
                                        
                                        <NotificationComponent />
                                    </div>
                                </MenuItem>
                                </div>
                                <div style={{display:'flex',justifyContent:"center",paddingTop:6}}>
                                    <Button style={{
                                        width:'80%',
                                        backgroundColor:'rgb(228,230,235)',
                                        color:'black'
                                    }}>Xem thông báo trước đó</Button>
                                </div>

                            </Menu>
                            <Button className="myAcc d-flex align-items-center" onClick={handleOpenMyAcc}>
                                <AvatarComponent photoUrl={authData?.photoUrl}/>
                                <div className="userInfo res-hide text-white">
                                    <h4 className=" text-white">{authData?.fullname ?? 'Người dùng'}</h4>
                                    <p className="mb-0">{authData.email}</p>
                                </div>
                            </Button>   
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleCloseMyAcc}
                                onClick={handleCloseMyAcc}
                                
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                           
                              
                                <MenuItem onClick={handleCloseMyAcc}>
                                    <ListItemIcon>
                                        <FaUser />
                                    </ListItemIcon>
                                    Hồ sơ
                                </MenuItem>
                                <MenuItem onClick={handleCloseMyAcc}>
                                    <ListItemIcon>
                                        <MdOutlineSecurity />
                                    </ListItemIcon>
                                    Đổi mật khẩu
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Đăng xuất
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>

            </header>
        </>
    )
}

export default Header