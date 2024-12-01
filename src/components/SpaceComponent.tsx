
interface Props{
    height?:number,
    width?:number
}
const SpaceComponent = (props:Props)=>{
    const {height,width} = props
    return (
        <div style={{height:height ?? 0,width:width ?? 0}}/>
    )
}
export default SpaceComponent