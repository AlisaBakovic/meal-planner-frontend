import { useEffect, useState } from "react";
import NavButton from "../components/NavButton";
import Hero from "../components/Hero";
import About from "../components/About";

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed inset-0 from-white/60 via-white/10 to-transparent -z-0"></div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        style={{
          transform: `translateY(${Math.min(scrollY * 0.05, 0)}px)`,
        }}
      >
        <source src="/video/bg-reverse.mp4" type="video/mp4" />
      </video>

      <div className="fixed top-6 left-0 w-full z-50 flex items-center">
        <div className="pl-6">
          <img
            src="/picture/Logo.png"
            alt="Logo"
            className="h-18 w-auto object-contain"
          />
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <div
            className="flex items-center gap-10 w-fit max-w-5xl rounded-full
                       border border-white/20 bg-white/15 backdrop-blur-2xl
                       px-8 py-4 shadow-[0_8px_32px_rgba(31,38,135,0.18)]"
          >
            <NavButton
              onClick={() =>
                document
                  .getElementById("about")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              About
            </NavButton>

            <div className="h-6 w-px bg-gray-500/60" />

            <NavButton>Features</NavButton>

            <div className="h-6 w-px bg-gray-500/60" />

            <NavButton>How it works</NavButton>
          </div>
        </div>
      </div>

      <Hero />
      <About scrollY={scrollY} />
    </div>
  );
}

export default Home;
