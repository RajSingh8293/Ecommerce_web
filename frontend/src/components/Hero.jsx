import HeroImages from "./HeroImages"


const Hero = () => {

    const heroImgages = [
        {
            url: "https://images.meesho.com/images/products/191005346/mocgn_400.webp"
            // url: "/src/assets/hero_images/hero_img_2.jpg"
        },
        {
            url: "https://images.meesho.com/images/products/276746305/ass8n_400.webp"
            // url: "/src/assets/hero_images/hero_img_3.jpg"
        },
        {
            url: "https://images.meesho.com/images/products/267551090/cirv9_400.webp"
            // url: "/src/assets/hero_images/hero_img_4.jpg"
        },
        {
            url: "https://images.meesho.com/images/products/440703233/d4v35_400.webp"
            // url: "/src/assets/hero_images/hero_img_5.jpg"
        },
        {
            url: "https://images.meesho.com/images/products/420576192/68zxi_400.webp"
        },

    ]
    return (
        <section className="">
            <div className=" w-full lg:px-10">
                <div className="w-full relative bg-white lg:px-16 px-5 lg:py-20 rounded-lg lg:mt-16 py-5">
                    <div className="w-[100%] z-20 h-full flex flex-col justify-center ">

                        <div>
                            <h1 className=" py-4 lg:text-4xl md:text-5xl sm:text-4xl text-2xl font-bold text-black">
                                There Are
                                <br />
                                <span className="text-[tomato]">50% </span>
                                Discount For Today!
                            </h1>
                        </div>
                        <p className="py-2  font-semibold text-sm">Find products Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure.</p>


                        <p className="py-4 text-sm opacity-80 "><strong>Popular searches : </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, debitis!</p>

                        <div className="pt-4 ">
                            <button className="btn w-[200px]">Explore more...</button>
                        </div>
                    </div>
                    <div className="hidden -z-2 absolute w-[500px] h-[300px] top-12 right-10 lg:flex flex-col overflow-hidden  items-center">
                        <HeroImages heroImgages={heroImgages} />
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Hero