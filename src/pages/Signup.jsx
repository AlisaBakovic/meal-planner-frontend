import { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

function Signup() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {

    fetch("http://127.0.0.1:5000/register", {

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

      <div className="flex items-center justify-center min-h-[75vh]">

        <div className="w-full max-w-xl bg-white/55 backdrop-blur-2xl border border-white/30 rounded-[36px] shadow-[0_8px_32px_rgba(31,38,135,0.12)] p-10">

          <div className="mb-10">

            <p
              className="text-sm uppercase tracking-[0.18em] text-[#8a7ca8] mb-4"
              style={{ fontFamily: "'Open Sans'" }}
            >
              CREATE ACCOUNT
            </p>

            <h1
              className="text-5xl leading-[0.95] tracking-[-0.05em] font-[800] text-[#24163b]"
              style={{ fontFamily: "'Plus Jakarta Sans'" }}
            >
              Join MealMap
            </h1>

            <p
              className="mt-4 text-[#6f6884] leading-relaxed"
              style={{ fontFamily: "'Open Sans'" }}
            >
              Start creating nutrition plans and managing clients in one modern
              workspace.
            </p>

          </div>

          <div className="space-y-5">

            <div className="grid grid-cols-2 gap-4">

              <input
                className="w-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl px-5 py-4 outline-none text-[#24163b] placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15 transition-all"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                className="w-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl px-5 py-4 outline-none text-[#24163b] placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15 transition-all"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

            </div>

            <div className="grid grid-cols-2 gap-4">

              <input
                className="w-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl px-5 py-4 outline-none text-[#24163b] placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15 transition-all"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="w-full rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl px-5 py-4 outline-none text-[#24163b] placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15 transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {error && (

              <ErrorMessage>
                {error}
              </ErrorMessage>

            )}

            <div className="pt-6 flex justify-center">

              <div className="max-w-[260px]">

                <Button onClick={handleRegister}>
                  Create account
                </Button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );
}

export default Signup;

