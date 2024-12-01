import { CiSearch } from "react-icons/ci"
import SpaceComponent from "./SpaceComponent"

const SearchComponent = () => {
    return (
        <div className='flex items-center p-2 rounded w-1/3 bg-white text-black'>
            <CiSearch size={22} />
            <SpaceComponent width={12} />
            <input
                type="text"
                placeholder="Tìm kiếm sự kiện"
                className="border-none outline-none w-full"
            />
        </div>
    )
}

export default SearchComponent