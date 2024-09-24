/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const CategoryCard = ({ filterData, item }) => {

    return (
        <div className="cursor-pointer categoryCard bg-pink-100  mx-2 p-2" onClick={() => filterData(item)}>
            <Link to={`/products`}>
                <div className="flex justify-center items-center flex-col ">
                    <h1 className="text-blue-500 text-2xl w-[50px] h-[50px] pb-2">
                        <img className="w-full h-full" src={item?.icon} alt="icon" />
                    </h1>

                    <span>
                        {item?.name}
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default CategoryCard