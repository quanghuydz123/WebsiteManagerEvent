import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CSSProperties } from 'react';  // Import CSSProperties
import { ClassNamesProps } from "@emotion/react";

interface Props{
    text:string,
    styles?:CSSProperties,
    size?:number
    className?:string,
    fontWeight?:number,
    color?:string
}
const TextComponent = (props:Props)=> {
    const {text,styles,size,className,fontWeight,color} = props
    return (
        <span style={{fontSize:size,fontWeight:fontWeight,color:color,textTransform:'none',...styles}} className={`${className}`}>
            {text}
        </span>
    );
  }
  
  export default TextComponent ;
  