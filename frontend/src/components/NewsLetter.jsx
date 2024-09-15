
import { CiCalendar } from "react-icons/ci";
import { HiOutlineHandRaised } from "react-icons/hi2";

const NewsLetter = () => {
    return (
        <>
            <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to our newsletter.</h2>
                            <p className="mt-4 text-lg leading-8 text-gray-300">
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
                                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />

                                <button type="submit" className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Subscribe</button>
                            </div>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <CiCalendar aria-hidden="true" className="h-6 w-6 text-white" />
                                </div>
                                <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
                                <dd className="mt-2 leading-7 text-gray-400">
                                    Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.
                                </dd>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <HiOutlineHandRaised aria-hidden="true" className="h-6 w-6 text-white" />
                                </div>
                                <dt className="mt-4 font-semibold text-white">No spam</dt>
                                <dd className="mt-2 leading-7 text-gray-400">
                                    Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div aria-hidden="true" className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div>
                <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
                    aria-hidden="true">
                    <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7">
                    </circle>
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641" cx="0" cy="0" r="1"
                            gradientUnits="userSpaceOnUse" gradientTransform="translate(512 512) rotate(90) scale(512)">
                            <stop stopColor="#7775D6"></stop>
                            <stop offset="1" stopColor="#7ED321" stopOpacity="0"></stop>
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </>
    )
}

export default NewsLetter