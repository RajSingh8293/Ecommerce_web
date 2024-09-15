/* eslint-disable react/prop-types */


const Button = ({ title }) => {
    return (
        <div>
            <button className="w-[200px] border border-black text-black hover:bg-black p-2 px-5 hover:text-white font-semibold">{title}</button>
        </div>
    )
}

export default Button