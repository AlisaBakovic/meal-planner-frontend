import { useNavigate } from "react-router-dom"
import Button from "./Button"

function Hero () {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center h-screen text-center px-4 ">
            <h1 className="text-7xl font-bold text-white  text-shadow-lg/30 text-center" 
                style={{ fontFamily: "Comfortea" }}
            >From plan to progress</h1>

            <p className="text-xl text-white  drop-shadow-md text-center mt-4" 
                style={{ fontFamily: "Open Sans" }}
            >
                CREATE AND MANAGE MEAL PLANS FOR YOUR CLIENTS
            </p>

            <div className="flex justify-center gap-4 mt-4">
                <Button onClick={() => navigate("/signup")}>Get started</Button>
                <Button variant="secondary" onClick={() => navigate("/login")}>Sign in</Button>
            </div>
        </div>
    );
}

export default Hero;