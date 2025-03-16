import { CiSearch } from "react-icons/ci"
import SpaceComponent from "./SpaceComponent"
interface Props {
    value:string,
    onSearch:(val:string)=>void
    handleSearch:()=>void,
    placeholder?:string
}
const SearchComponent = (props:Props) => {
    const {value,onSearch,handleSearch,placeholder} = props
    return (
        <div className='flex items-center p-2 rounded w-1/3 bg-white text-black'>
            <CiSearch size={22} onClick={()=>handleSearch()}/>
            <SpaceComponent width={12} />
            <input
                type="text"
                placeholder={placeholder ?? "Tìm kiếm..."}
                className="border-none outline-none w-full text-[17px]"
                value={value}
                onChange={(e)=>onSearch(e.target.value)}
                
                // onKeyDown={()=>handleSearch()}
            />
        </div>
    )
}

export default SearchComponent