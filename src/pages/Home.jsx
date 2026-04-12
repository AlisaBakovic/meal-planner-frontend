import { useEffect, useState } from "react"
import NavButton from "../components/NavButton"
import Hero from "../components/Hero"
import About from "../components/About"

function Home() {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
    return (
        <div className="relative w-full min-h-screen">
            <div className="fixed inset-0 bg-gradient-to-t from-white/60 via-white/10 to-transparent -z-0"></div>
            <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-20" style={{ transform: `translateY(${Math.min(scrollY * 0.05, 0)}px)`}}>
                <source src="/video/bg-reverse.mp4" type="video/mp4"/>
            </video>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[60%] h-12 bg-[rgba(227,227,227,0.61)] backdrop-blur-md rounded-full px-6 flex items-center justify-center gap-12">
                <NavButton onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth"})}>About</NavButton>
                <NavButton>Features</NavButton>
                <NavButton>How it works</NavButton>
            </div>
            <Hero />
            <About scrollY={scrollY} />
        </div>
    )
}

export default Home