import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CSSProperties, ReactNode } from 'react';  // Import CSSProperties
import { ClassNamesProps } from "@emotion/react";
import TextComponent from "./TextComponent";

interface Props {
    text: string,
    onClick?: () => void,
    iconRight?: ReactNode,
    iconLeft?: ReactNode
    fontSize?: number,
    classNameButton?: string,
    isActive?:boolean
}
const ItemMenu = (props: Props) => {
    const { text, onClick, iconRight, iconLeft, fontSize, classNameButton,isActive } = props
    return (
        <Button  style={{
            backgroundColor:isActive ? 'hsl(210deg 100% 96.08%)' : '',
            paddingLeft:20,
            paddingTop:14,
            paddingBottom:14,
        }} className={`w-100  hover:bg-black/10  ${classNameButton || ''}`}  onClick={onClick}  >
            {iconLeft && <span className="icon mr-2  flex items-centrer  justify-center rounded-md ">
                {iconLeft}
            </span>}
            <TextComponent text={text} className="flex-1 text-start" color={isActive ? 'hsl(210deg 71.43% 46.67%)' : "#222222"} size={fontSize ?? 16} />   
            {iconRight && <span className=" ml-auto  flex items-center justify-center">
                {iconRight}
            </span>}
        </Button>
    );
}

export default ItemMenu;
