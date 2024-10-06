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
        <Button className={`w-100 px-1 py-10 hover:bg-black/10 ${classNameButton || ''}`} style={{
            backgroundColor:isActive ? 'hsl(210deg 100% 96.08%)' : 'white'
        }} onClick={onClick}  >
            {iconLeft && <span className="icon mr-2 w-[30px] h-[30px] flex items-centrer justify-center rounded-md ">
                {iconLeft}
            </span>}
            <TextComponent text={text} className="flex-1 text-start" color={isActive ? 'hsl(210deg 71.43% 46.67%)' : "#222222"} size={fontSize ?? 15} fontWeight={600} />   
            {iconRight && <span className=" ml-auto w-[25px] h-[25px] flex items-center justify-center">
                {iconRight}
            </span>}
        </Button>
    );
}

export default ItemMenu;
