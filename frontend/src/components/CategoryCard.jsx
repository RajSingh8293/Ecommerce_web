/* eslint-disable react/prop-types */
import { IoCodeSlashOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

const CategoryCard = ({ filterData, item }) => {

    return (
        <div className="cursor-pointer" onClick={() => filterData(item)}>
            <div className="flex justify-center items-center flex-col ">
                <h1 className="text-blue-500 text-2xl"><IoCodeSlashOutline /></h1>
                <Link to='/products' className="text-xl"  >{item}</Link>
                <p className="opacity-50">Products (10)</p>
            </div>
        </div>
    )
}

export default CategoryCard