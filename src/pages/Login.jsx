import { useEffect, useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Layout from "../components/Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  return (
    <Layout>
      <div
        className="
          flex items-center justify-center

          min-h-[75vh]
        "
      >
        <div
          className="
            w-full
            max-w-xl

            bg-white/55
            backdrop-blur-2xl

            border border-white/30

            rounded-[36px]

            shadow-[0_8px_32px_rgba(31,38,135,0.12)]

            p-10
          "
        >
          <div className="mb-10">
            <p
              className="
                text-sm
                uppercase

                tracking-[0.18em]

                text-[#8a7ca8]

                mb-4
              "
              style={{ fontFamily: "'Open Sans'" }}
            >
              WELCOME BACK
            </p>

            <h1
              className="
                text-5xl

                leading-[0.95]
                tracking-[-0.05em]

                font-[800]

                text-[#24163b]
              "
              style={{ fontFamily: "'Plus Jakarta Sans'" }}
            >
              Sign in
            </h1>

            <p
              className="
                mt-4

                text-[#6f6884]
                leading-relaxed
              "
              style={{ fontFamily: "'Open Sans'" }}
            >
              Continue managing clients and nutrition plans from your dashboard.
            </p>
          </div>

          <div className="space-y-5">
            <input
              type="email"
              placeholder="Email address"
              className="
                w-full

                rounded-2xl

                border border-white/40

                bg-white/60
                backdrop-blur-xl

                px-5 py-4

                outline-none

                text-[#24163b]
                placeholder:text-[#8d87a1]

                focus:border-[#9b6cff]
                focus:ring-4
                focus:ring-[#9b6cff]/15

                transition-all
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="
                w-full

                rounded-2xl

                border border-white/40

                bg-white/60
                backdrop-blur-xl

                px-5 py-4

                outline-none

                text-[#24163b]
                placeholder:text-[#8d87a1]

                focus:border-[#9b6cff]
                focus:ring-4
                focus:ring-[#9b6cff]/15

                transition-all
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p
                className="
                  text-red-500
                  text-sm
                  text-center
                "
              >
                {error}
              </p>
            )}

            <div className="pt-6 flex justify-center">
              <div className="w-full max-w-[260px]">
                <Button onClick={handleLogin}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
