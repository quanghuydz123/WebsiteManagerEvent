import { CSSProperties, ReactNode } from "react"

interface Props{
    children:ReactNode,
    onPress?: ()=>void,
    styles?:CSSProperties,

}
const RowComponent = (props:Props)=>{
    const {children,onPress,styles} = props
    return (
       <div className="flex items-center" style={styles}>
        {children}
       </div>
    )
}

export default RowComponent