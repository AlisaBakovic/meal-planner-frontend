import { useEffect, useState } from 'react'
import { login } from '../services/authService'
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  
  const handleLogin = async () => {
    setLoading(true)
    setError("")

      try {
        const data = await login(email, password)

        if(data.error) {
          throw new Error(data.error)
        }

        localStorage.setItem("token", data.token)

        navigate("/dashboard")
      } catch (err) {
        setError("Invalid credentials")
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token) {
      navigate("/dashboard", { replace: true })
    }
  }, [])
  
  return (
    
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8  rounded-xl shadow-md w-[350px]">
          <h2 className="text-xl font-semibold mb-4">Sign in</h2>

          <input type="email" placeholder='Email' className='w-full mb-3 p-2 border rounded' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' className='w-full mb-3 p-2 border rounded' value={password} onChange={(e) => setPassword(e.target.value)}/>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <Button onClick={handleLogin}>{loading ? "Signin in..." : "Sign in"}</Button>
        </div>
      </div>
    
  )
}

export default Login

