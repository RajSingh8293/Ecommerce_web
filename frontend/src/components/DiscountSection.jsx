
const DiscountSection = () => {
    return (
        <section>
            <div className="relative w-full h-full  ">
                <img className="w-full h-full bg-contain bg-center " src="/src/assets/home_page/discount_section_img.webp" alt="" />
                <div className="absolute w-full h-full top-0 left-0 flex gap-4 flex-col justify-center items-center">
                    <h1 className="text-[tomato]">50% off</h1>
                    <p className="text-center font-semibold text-xl text-gray-700">New lower prices on hundreds <br /> of home furnishings</p>
                    <h1 className="text-[tomato] text-2xl uppercase font-semibold" >Sale up 35% off</h1>
                </div>
            </div>
        </section>
    )
}

export default DiscountSection