/* eslint-disable react/prop-types */

const Title = ({ title }) => {
    return (
        <div className="lg:px-10 px-5">
            <h2 className="title_lines lg:max-w-[500px] md:max-w-[400px] sm:max-w-[400px] w-full lg:text-2xl md:text-2xl sm:text-2xl  text-normal font-bold">{title}</h2>
        </div>

    )
}

export default Title