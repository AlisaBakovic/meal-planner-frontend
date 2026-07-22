import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";

function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      title: "Invite Clients",
      description:
        "Send private invitation links and onboard clients into your coaching workspace in seconds.",
    },
    {
      number: "02",
      title: "Create Nutrition Plans",
      description:
        "Build elegant meal plans, organize meals by day and manage macros with a smooth workflow.",
    },
    {
      number: "03",
      title: "Monitor Progress",
      description:
        "Track client information, upcoming reports and future progress updates from one dashboard.",
    },
  ];

  const token = localStorage.getItem("token");

  return (
    <section
      id="how-it-works"
      className="relative z-10 px-6 md:px-12 py-32 overflow-hidden bg-gradient-to-t from-[#f7f5ff] via-[#f7f5ff] via-85% to-[#f7f5ffa9]  backdrop-blur-sm "
    >
      <div className="absolute top-40 left-[-120px] h-[320px] w-[320px] rounded-full bg-[#9b6cff]/15 blur-3xl"></div>

      <div className="absolute bottom-20 right-[-100px] h-[260px] w-[260px] rounded-full bg-[#7b4dff]/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <p className="text-sm uppercase tracking-[6px] text-[#8b5cf6] font-semibold mb-6">
            Workflow
          </p>

          <h2
            className="text-5xl md:text-7xl font-bold text-[#24163b] leading-[1.1]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Coaching Made
            <br />
            Effortless
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl leading-relaxed text-[#6f6883]">
            Everything you need to manage clients, create nutrition plans and
            scale your coaching business in one elegant platform.
          </p>
        </div>

        <div className="relative">
          <div className="hidden xl:block absolute top-24 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d8c7ff] to-transparent"></div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {steps.map((step) => (
              <div key={step.number} className="group relative">
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/40 to-white/10 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100"></div>

                <div className="relative h-full rounded-[40px] border border-white/30 bg-white/55 backdrop-blur-2xl p-10 md:p-12 shadow-[0_10px_40px_rgba(31,38,135,0.08)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_80px_rgba(31,38,135,0.14)] overflow-hidden">
                  <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-[#9b6cff]/10 blur-3xl transition-all duration-500 group-hover:scale-125"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-14">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] shadow-[0_15px_40px_rgba(123,77,255,0.3)]">
                        <span className="text-3xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>

                      <div className="h-[1px] flex-1 ml-6 bg-gradient-to-r from-[#d8c7ff] to-transparent"></div>
                    </div>

                    <h3
                      className="text-3xl font-bold text-[#24163b] leading-tight mb-6"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      {step.title}
                    </h3>

                    <p className="text-[#6f6883] text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!token ? (
          <div className="flex justify-center mt-20">
            <Button
              className="px-14 py-6 text-xl rounded-[36px] min-w-[240px]"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default HowItWorks;
