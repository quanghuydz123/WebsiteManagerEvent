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
    color?:string,
    mb?:number
}
const TextComponent = (props:Props)=> {
    const {text,styles,size,className,fontWeight,color,mb} = props
    return (
        <p style={{fontSize:size ?? 14,fontWeight:fontWeight,color:color,textTransform:'none',...styles,marginBottom:mb ?? 0}} className={`${className}`}>
            {text}
        </p>
    );
  }
  
  export default TextComponent ;
  