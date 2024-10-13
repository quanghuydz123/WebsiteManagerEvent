import { ReactNode, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { TrendingDownOutlined, TrendingUpOutlined } from "@mui/icons-material";
import { FaClock } from "react-icons/fa6";

interface Props{
    color:string[],
    title:string,
    icon:ReactNode,
    grow:boolean
}

const DashBoardBoxComponent = (props:Props) => {
    const {color,title,icon,grow} = props
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const MenuComponent = ()=>{
        return (
            <Menu
        anchorEl={anchorEl}
        id="dashborad-menu"
        className="dashborad-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FaClock fontSize="small" />
          </ListItemIcon>
          Tuần vừa rồi
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FaClock fontSize="small" />
          </ListItemIcon>
          Tháng vừa rồi
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <FaClock fontSize="small" />
          </ListItemIcon>
          Năm vừa rồi
        </MenuItem>
      </Menu>
        )
    }
    return (
        <>
            <Button className="dashboardBox"  style={{
                backgroundImage:`linear-gradient(to right , ${color[0]} , ${color[1]})`
            }} >
                {
                    grow ? <span className="chart"><TrendingUpOutlined /></span> : <span className="chart"><TrendingDownOutlined     /></span>
                }
                <div className="d-flex w-100">
                    <div className="col1 mb-0">
                        <h4 className="text-white">{title ?? "Tổng người dùng"}</h4>
                        <span className="text-white">277</span>
                    </div>
                    <div className="ml-auto">
                        <span className="icon">
                            {icon ?? <FaUserCircle />}
                        </span>
                    </div>
                </div>
                <div className="d-flex align-items-center w-100">
                    <h6 className="text-white mb-0 mt-0" style={{textTransform:'none',fontSize:13}}>Trong năm </h6>
                    <Button className="ml-auto toggleIcon" onClick={(e)=>{handleClick(e)}}>
                        <HiDotsVertical/>
                    </Button>
                </div>
            </Button>
            <MenuComponent />
        </>
    )
}

export default DashBoardBoxComponent