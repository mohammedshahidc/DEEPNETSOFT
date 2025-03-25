const Hero = () => {
    return (
        <section
            style={{
                backgroundImage: `url("/images/hero.jpeg")`,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
            }}
            className="relative w-full h-[250px] md:h-[300px] lg:h-[350px] flex items-center justify-center text-center text-white"
        >
            <div className="absolute inset-0 bg-black opacity-50" />

            <div className="relative z-10 px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white">MENU</h1>
                <p className="mt-2 text-sm md:text-lg max-w-2xl mx-auto">
                    Please take a look at our menu featuring food, drinks, and brunch. If you&apos;d like to place an order, use the &quot;Order Online&quot; button located below the menu.        </p>
            </div>
        </section>
    );
};

export default Hero;
