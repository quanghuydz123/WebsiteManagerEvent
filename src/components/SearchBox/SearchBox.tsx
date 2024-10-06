import { FaSearch } from "react-icons/fa";

const SearchBox = ()=>{
    return (
        <div className="searchBox position-relative d-flex align-items-center">
            <FaSearch />
            <input type="text" placeholder="Search..." />
        </div>
    )
}

export default SearchBox