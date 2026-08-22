import { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { BASE_URL } from "../constants";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    fetch(`${BASE_URL}/register`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);

        if (data.error) {
          setError(data.error);
        } else {
          setError("");

          navigate("/login");
        }
      })

      .catch((err) => {
        setError("Something went wrong");

        console.log(err);
      });
  };

  return (
    <Layout>
      <div className="flex min-h-[75vh] items-center justify-center">
        <div className="w-full max-w-xl rounded-[36px] border border-white/30 bg-white/55 p-10 shadow-[0_8px_32px_rgba(31,38,135,0.12)] backdrop-blur-2xl">
          <div className="mb-10">
            <p
              className="mb-4 text-sm tracking-[0.18em] text-[#8a7ca8] uppercase"
              style={{ fontFamily: "'Open Sans'" }}
            >
              CREATE ACCOUNT
            </p>

            <h1
              className="text-5xl leading-[0.95] font-[800] tracking-[-0.05em] text-[#24163b]"
              style={{ fontFamily: "'Plus Jakarta Sans'" }}
            >
              Join MealMap
            </h1>

            <p
              className="mt-4 leading-relaxed text-[#6f6884]"
              style={{ fontFamily: "'Open Sans'" }}
            >
              Start creating nutrition plans and managing clients in one modern
              workspace.
            </p>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full rounded-2xl border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                className="w-full rounded-2xl border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full rounded-2xl border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="w-full rounded-2xl border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex justify-center pt-6">
              <div className="max-w-[260px]">
                <Button onClick={handleRegister}>Create account</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;
