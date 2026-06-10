import { useEffect, useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Layout from "../components/Layout";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const mode = searchParams.get("mode");

  const isClient = mode === "client";

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await login(email, password);

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("first_name", data.first_name);
      localStorage.setItem("role", data.role);
      
      if (data.role === "client") {
        navigate("/client-dashboard")
      } else {
        navigate("/dashboard")
      }
        
    } catch (err) {
      setError("Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {

    if (role === "client") {
      navigate("/client-dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }

  }

}, []);

  return (
  <Layout mode={isClient ? "client" : "trainer"}>

    <div className="flex items-center justify-center min-h-[78vh] px-4">

      <div
        className={`w-full max-w-xl backdrop-blur-2xl border rounded-[36px] shadow-[0_8px_32px_rgba(31,38,135,0.10)] p-8 sm:p-10 transition-all duration-300 ${
          isClient
            ? "bg-white/45 border-white/30"
            : "bg-white/55 border-white/30"
        }`}
      >

        <div className="mb-10">

          <p
            className={`text-sm uppercase tracking-[0.18em] mb-4 ${
              isClient
                ? "text-[#ff9a57]"
                : "text-[#8a7ca8]"
            }`}
            style={{ fontFamily: "'Open Sans'" }}
          >
            {isClient ? "WELCOME TO YOUR WELLNESS JOURNEY" : "WELCOME BACK"}
          </p>

          <h1
            className={`text-4xl sm:text-5xl leading-[0.95] tracking-[-0.05em] font-[800] ${
              isClient
                ? "text-[#1f2937]"
                : "text-[#24163b]"
            }`}
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Sign in
          </h1>

          <p
            className={`mt-4 leading-relaxed ${
              isClient
                ? "text-[#5f6f66]"
                : "text-[#6f6884]"
            }`}
            style={{ fontFamily: "'Open Sans'" }}
          >
            {isClient
              ? "Access your personalized nutrition plans, wellness guidance and healthy lifestyle tools."
              : "Continue managing clients and nutrition plans from your dashboard."}
          </p>

        </div>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email address"
            className={`w-full rounded-2xl backdrop-blur-xl px-5 py-4 outline-none transition-all ${
              isClient
                ? "border border-white/30 bg-white/50 text-[#1f2937] placeholder:text-[#7f8b84] focus:border-[#ffb84d] focus:ring-4 focus:ring-[#ffb84d]/15"
                : "border border-white/40 bg-white/60 text-[#24163b] placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className={`w-full rounded-2xl backdrop-blur-xl px-5 py-4 outline-none transition-all ${
              isClient
                ? "border border-white/30 bg-white/50 text-[#1f2937] placeholder:text-[#7f8b84] focus:border-[#ffb84d] focus:ring-4 focus:ring-[#ffb84d]/15"
                : "border border-white/40 bg-white/60 text-[#24163b] placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (

            <ErrorMessage>
              {error}
            </ErrorMessage>

          )}

          <div className="pt-6 flex items-center justify-center w-full">

            {isClient ? (

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full max-w-[280px] rounded-full bg-gradient-to-r from-[#ffb84d] to-[#ff8a4c] px-8 py-4 text-base font-semibold tracking-[0.3px] text-white shadow-[0_15px_40px_rgba(255,140,80,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,140,80,0.38)] disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

            ) : (

              <div className="w-full flex justify-center">

                <Button onClick={handleLogin}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  </Layout>
);
}

export default Login;
