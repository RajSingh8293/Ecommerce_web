/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const CategoryCard = ({ filterData, item }) => {

    return (
        <div className="cursor-pointe relative border-2 border-transparent hover:border-2 hover:border-black w-[300px] h-[300px]  p-5" onClick={() => filterData(item)}>
            <Link to={`/products`}>
                <div className=" ">
                    <h1 className="text-blue-500 text-2xl">
                        <img className="w-full h-full" src={item?.icon} alt="icon" />
                    </h1>
                </div>
            </Link>
            <Link to={`/products`}>
                <button className=" absolute top-0 left-0 btn_2">
                    {item?.name}
                </button>
            </Link>
        </div>
    )
}

export default CategoryCard