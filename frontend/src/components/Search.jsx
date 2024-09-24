/* eslint-disable react/prop-types */

const Search = ({ handleSearch, setSearchKeyword, searchKeyword }) => {

    return (
        <div className="border-2 mb-10  lg:w-[70%] flex justify-between p-1 border-black rounded overflow-hidden ">
            <input
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)} className=" px-2 w-full outline-none" type="text" placeholder="Filter by name" />
            <button onClick={handleSearch} className="text-white px-4 py-1 bg-black hover:bg-[#302d2d]" >Search</button>
        </div>
    )
}

export default Search