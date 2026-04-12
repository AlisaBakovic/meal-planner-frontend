function About({ scrollY }) {
    return (
        <div className="w-full py-32 bg-[url('/picture/Pattern.jpg')] bg-cover bg-center">
            <div 
                id="about" 
                className="relative max-w-3xl mx-auto px-6 text-center text-gray-800 transition-all duration-700" 
                style={{ opacity: scrollY > 200 ? 1 : 0, 
                transform: scrollY > 200 ? "translateY(0px)" : "translateY(40px)" }}
            >
                <h2 className="text-3xl font-semibold mb-3">
                    About MealMap
                </h2>

                <div className="bg-[rgb(137,91,178)] backdrop-blur-md rounded-full px-6 flex items-center justify-center">
                    <p 
                        className="leading-relaxed text-lg text-white" 
                        style={{ fontFamily: "Open Sans" }}
                    >
                        MealMap is a modern meal planning platform designed for coaches and trainers.
                        It helps you create structured nutrition plans, manage your clients, and streamline your workflow — all in one place.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;