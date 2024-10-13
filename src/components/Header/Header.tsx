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
import { AuthState, setIsLogin } from "../../reduxs/reducers/authReducers";
interface Props{
    isToggle:boolean,
    setIsToggle:(val:boolean)=>void,
  
}
const Header = (props:Props) => {
    const {isToggle,setIsToggle} = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isOpenNotifications,setIsOpenNotifications] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const openNotification = Boolean(isOpenNotifications);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth:AuthState = useSelector((state:any) => state.auth)
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
        dispatch(setIsLogin({isLogin:false}))
    }
    return (
        <>
            <header className="d-flex align-items-center">
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100">
                        {/*logo*/}
                        <div className="col-sm-2 part1">
                            <Link to={'/'}>
                                <img
                                    className="logo"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-WlQ_o8q2pBl-bCv6N9XZgWhFaa4b_DRUw&s" />
                            </Link>
                        </div>
                        <div className="col-sm-3 d-flex align-items-center part2 pl-2">
                            <Button className="rounded-circl mr-3 ml-3" onClick={()=>setIsToggle(!isToggle)}>
                                {isToggle ? <MdOutlineMenu className="icon"/>: <MdMenuOpen className="icon"/>}
                            </Button>
                            <SearchBox />
                        </div>

                        <div className="col-sm-7 d-flex align-items-center part3 justify-content-end">
                            <Button className="rounded-circl mr-3">
                                <CiLight className="icon" />
                            </Button>

                            <Button className="rounded-circl mr-3" onClick={handleOpenNotification}>
                                <IoMdNotifications className="icon" />

                            </Button>
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
                                <div className="userImg">
                                    <span className="rounded-circl">
                                        <img src="https://i.scdn.co/image/ab676161000051745a79a6ca8c60e4ec1440be53" />
                                    </span>
                                </div>
                                <div className="userInfo">
                                    <h4>Quang Huy</h4>
                                    <p className="mb-0">examp@gmail.com</p>
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