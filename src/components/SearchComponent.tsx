import { CiSearch } from "react-icons/ci"
import SpaceComponent from "./SpaceComponent"
interface Props {
    value:string,
    onSearch:(val:string)=>void
}
const SearchComponent = (props:Props) => {
    const {value,onSearch} = props
    return (
        <div className='flex items-center p-2 rounded w-1/3 bg-white text-black'>
            <CiSearch size={22} />
            <SpaceComponent width={12} />
            <input
                type="text"
                placeholder="Tìm kiếm sự kiện"
                className="border-none outline-none w-full text-[17px]"
                value={value}
                onChange={(e)=>onSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchComponent