import { useEffect, useState } from "react";
import { acceptInvite, validateInviteToken } from "../services/invitationService"
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function AcceptInvite() {

    const [inviteValid, setInviteValid] = useState(false)
    const [loading, setLoading] = useState(true)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const { token } = useParams();
    const navigate = useNavigate();

    const loadData = async () => {

        setLoading(true);

        try {
            const validateToken = await validateInviteToken(token);
            
            setInviteValid(true)
        }
        catch {
            setInviteValid(false)
        }

        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }

  const handleAcceptInvite = async () => {

  const data = await acceptInvite(
    token,
    firstName,
    lastName,
    password
  );

  if (data.error) return;

  localStorage.removeItem("token");

  navigate("/client-welcome");

};
    
if (!inviteValid) {
  return (

    <div className="min-h-screen flex items-center justify-center bg-[url('/picture/Purple-bg-homepage.png')] bg-cover bg-center px-6 overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-[#f7f4ff]/90 via-[#f7f4ff]/45 to-[#f7f4ff]/20 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-xl rounded-[36px] border border-white/30 bg-white/70 backdrop-blur-2xl p-10 md:p-14 shadow-[0_8px_32px_rgba(31,38,135,0.12)] text-center">

        <div className="flex justify-center">

          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] flex items-center justify-center shadow-[0_15px_40px_rgba(123,77,255,0.35)]">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
              />
            </svg>

          </div>

        </div>

        <h1
          className="mt-8 text-4xl font-bold text-[#24163b]"
          style={{ fontFamily: "Plus Jakarta Sans" }}
        >
          Invitation Invalid
        </h1>

        <p className="mt-4 text-lg text-[#8d87a1] leading-relaxed">
          This invitation link is either expired or no longer valid.
          Please contact your coach and request a new invitation.
        </p>

        <div className="mt-10 flex justify-center">

          <button
            onClick={() => navigate("/")}
            className="group relative overflow-hidden flex items-center justify-center gap-3 rounded-4xl bg-gradient-to-r from-purple-500 to-[rgb(103,30,206)] px-8 py-4 text-base font-semibold tracking-[0.5px] text-white shadow-[0_12px_35px_rgba(98,0,255,0.28)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(98,0,255,0.38)] active:scale-[0.98] cursor-pointer"
          >
            Back to Home
          </button>

        </div>

      </div>

    </div>

  );
  
}
    return (

  <div className="relative min-h-screen overflow-hidden bg-[#d9efe7] flex items-center justify-center px-6">

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,210,120,0.18),transparent_30%)]"></div>

    <div className="relative z-10 w-full max-w-xl">

      <div className="rounded-[40px] border border-white/40 bg-white/60 backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-10 md:p-14">

        <div className="flex justify-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-[30px] bg-gradient-to-br from-[#ffb84d] to-[#ff8a4c] shadow-[0_18px_45px_rgba(255,140,80,0.28)]">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-11 w-11 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>

          </div>

        </div>

        <div className="mt-10 text-center">

          <p className="text-sm font-semibold uppercase tracking-[4px] text-[#ff9a57]">
            Welcome
          </p>

          <h1
            className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-[#1f2937]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Create Your
            <br />
            Client Account
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-[#6b7280]">
            Complete your onboarding and access your personalized nutrition experience.
          </p>

        </div>

        <div className="mt-10 space-y-4">

          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-2xl border border-white/40 bg-white/80 px-5 py-4 outline-none text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#ffb84d] focus:ring-4 focus:ring-[#ffb84d]/10 transition-all"
          />

          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-2xl border border-white/40 bg-white/80 px-5 py-4 outline-none text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#ffb84d] focus:ring-4 focus:ring-[#ffb84d]/10 transition-all"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/40 bg-white/80 px-5 py-4 outline-none text-[#1f2937] placeholder:text-[#94a3b8] focus:border-[#ffb84d] focus:ring-4 focus:ring-[#ffb84d]/10 transition-all"
          />

        </div>

        <div className="mt-10">

          <button
            onClick={handleAcceptInvite}
            className="w-full rounded-3xl bg-gradient-to-r from-[#ffb84d] to-[#ff8a4c] px-8 py-4 text-base font-semibold tracking-[0.3px] text-white shadow-[0_15px_40px_rgba(255,140,80,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,140,80,0.38)]"
          >
            Create Account
          </button>

        </div>

      </div>

    </div>

  </div>

);
}

export default AcceptInvite;