const Hero = () => {
    return (
        <div className="bg-[#E3EDF6] mt-4">
            <div className="container grid md:grid-cols-2 py-8 items-center">

                {/* Text Content */}
                <div className="flex items-center">
                    <div className="max-w-[450px] space-y-4">
                        <p className="text-topHeadingSecondary">
                            Starting at <span className="font-bold">999THB.</span>
                        </p>

                        <h1 className="text-topHeadingPrimary font-bold text-4xl md:text-5xl">
                            The Best Product Summer collection
                        </h1>
                        <h3 className="text-2xl font-['Oregano',cursive]">
                            Exclusive offer <span className="text-red-600">-10%</span>off this week
                        </h3>
                        <a
                            className="inline-block bg-white rounded-md px-6 py-3 hover:bg-accent
                             hover:text-white"
                            href="#">
                            Shop Now
                        </a>
                    </div>
                </div>

                {/*  Image */}
                <div className="flex justify-center ">
                    <img className="w-full max-w-[300px]" src="/nike-shoe-png-nike-shoes-transparent-png-1464-768x804.png" alt="hero" />
                </div>
            </div>
        </div>


    )
}

export default Hero;

