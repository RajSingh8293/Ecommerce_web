
import { CiCalendar } from "react-icons/ci";
import { HiOutlineHandRaised } from "react-icons/hi2";

const NewsLetter = () => {
    return (
        <>
            <div className="relative isolate overflow-hidden text-black bg-pink-50 py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight tomato sm:text-4xl capitalize">Subscribe to our newsletter.</h2>
                            <p className="mt-4 text-sm font-semibold leading-8 text-gray-600">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati fuga tenetur nemo praesentium maiores atque magnam sapiente.
                            </p>
                            <div className="mt-6 flex max-w-md gap-x-4">
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className="px-4 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"

                                />

                                <button type="submit" className="btn w-[200px]">Subscribe</button>
                            </div>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-[tomato]">
                                    <CiCalendar aria-hidden="true" className="h-6 w-6 tomato font-semibold" />
                                </div>
                                <dt className="mt-4 font-semibold text-black">Weekly articles</dt>
                                <dd className="mt-2 leading-7 text-gray-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione aliquid necessitatibus ut omnis officia aspernatur suscipit error.
                                </dd>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-[tomato]">
                                    <HiOutlineHandRaised aria-hidden="true" className="h-6 w-6 text-[tomato]" />
                                </div>
                                <dt className="mt-4 font-semibold text-black">No spam</dt>
                                <dd className="mt-2 leading-7 text-gray-600">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione aliquid necessitatibus ut omnis officia aspernatur suscipit error.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsLetter