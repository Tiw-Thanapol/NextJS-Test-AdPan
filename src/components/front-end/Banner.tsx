const Banner = () => {
    return (
        <div className=" container mt-32">
            <div className="grid lg:grid-cols-[66%,34%] gap-4 pr-[15px]">
                <div className="h-[200px] md:h-[260px] 
                bg-[url(/16.jfif)]
                bg-cover bg-center rounded-xl p-8 md:p-16">
                    <p className="text-topHeadingSecondary text-xl font-medium">
                        Sale 20%</p>
                <h2 className="text-topHeadingPrimary font-bold text-xl sm:text-3xl max-w-[240px]">
                    General
                </h2>
                <a
                    className="inline-clock mt-6 hover:text-accent text-topHeadingSecondary font font-medium"
                    href="#"
                    > 
                    ShopNow
                    </a>
                </div>
                <div className="h-[260px] bg-[url(/nike-shoe-png-nike-shoes-transparent-png-1464-768x804.png)] bg-right rounded-xl hidden lg:block">
                </div>
            </div>
        </div>
    )
}

export default Banner;