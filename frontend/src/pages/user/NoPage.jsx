import { Link } from "react-router-dom"


const NoPage = () => {
    return (
        <div className="min-h-[70vh] flex flex-col gap-4 justify-center items-center">
            <h1 className="text-4xl font-semibold">Sorry Could not this Page</h1>
            <button className="btn_2">
                <Link to='/'>Go Back</Link>
            </button>
        </div>
    )
}

export default NoPage