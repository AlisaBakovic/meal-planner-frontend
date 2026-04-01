import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Meal Planner</h1>
            <p>Create and menage meal plans for your clients</p>

            <button onClick={() => navigate("/login")}>Sign in</button>
            <button onClick={() => navigate("/signup")}>Sign up</button>
        </div>
    )
}

export default Home