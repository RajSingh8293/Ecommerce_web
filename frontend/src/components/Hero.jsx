import HeroImages from "./HeroImages"


const Hero = () => {

    const heroImgages = [
        {
            url: "/src/assets/hero_images/hero_img_2.jpg"
        },
        {
            url: "/src/assets/hero_images/hero_img_3.jpg"
        },
        {
            url: "/src/assets/hero_images/hero_img_4.jpg"
        },
        {
            url: "/src/assets/hero_images/hero_img_5.jpg"
        },

    ]
    return (
        <section className="min-h-[80vh]">
            <div className=" w-full h-full lg:px-10">
                <div className="w-full relative  lg:px-16 px-5 bg-pink-100 lg:py-20 rounded-lg lg:mt-16 py-5">
                    <div className="w-[100%] h-full flex flex-col justify-center ">

                        <div>
                            <h1 className="py-4 lg:text-4xl md:text-5xl sm:text-4xl text-2xl font-bold text-black">
                                There Are
                                <br />
                                <span className="text-[tomato]">50% </span>
                                Discount For Today!
                            </h1>
                        </div>
                        <p className="py-2  font-semibold text-sm">Find products Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure.</p>


                        <p className="py-4 text-sm opacity-80 z-10"><strong>Popular searches : </strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, debitis!</p>

                        <div className="pt-4 ">
                            <button className="btn w-[200px]">Explore more...</button>
                        </div>
                    </div>
                    <div className="absolute w-[500px] h-[300px] top-12 right-10 rounded-lg flex flex-col overflow-hidden  items-center">
                        <HeroImages heroImgages={heroImgages} />
                    </div>
                </div>
            </div>
        </section>
    )

}

export default Hero