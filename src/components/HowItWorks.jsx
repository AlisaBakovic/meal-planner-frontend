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
      className="relative z-10 overflow-hidden bg-gradient-to-t from-[#f7f5ff] via-[#f7f5ff] via-85% to-[#f7f5ffa9] px-6 py-32 backdrop-blur-sm md:px-12"
    >
      <div className="absolute top-40 left-[-120px] h-[320px] w-[320px] rounded-full bg-[#9b6cff]/15 blur-3xl"></div>

      <div className="absolute right-[-100px] bottom-20 h-[260px] w-[260px] rounded-full bg-[#7b4dff]/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-24 text-center">
          <p className="mb-6 text-sm font-semibold tracking-[6px] text-[#8b5cf6] uppercase">
            Workflow
          </p>

          <h2
            className="text-5xl leading-[1.1] font-bold text-[#24163b] md:text-7xl"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Coaching Made
            <br />
            Effortless
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-[#6f6883] md:text-xl">
            Everything you need to manage clients, create nutrition plans and
            scale your coaching business in one elegant platform.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-24 left-0 hidden h-[2px] w-full bg-gradient-to-r from-transparent via-[#d8c7ff] to-transparent xl:block"></div>

          <div className="grid grid-cols-1 gap-10 xl:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="group relative">
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/40 to-white/10 opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100"></div>

                <div className="relative h-full overflow-hidden rounded-[40px] border border-white/30 bg-white/55 p-10 shadow-[0_10px_40px_rgba(31,38,135,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_80px_rgba(31,38,135,0.14)] md:p-12">
                  <div className="absolute top-0 right-0 h-52 w-52 rounded-full bg-[#9b6cff]/10 blur-3xl transition-all duration-500 group-hover:scale-125"></div>

                  <div className="relative z-10">
                    <div className="mb-14 flex items-center justify-between">
                      <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] shadow-[0_15px_40px_rgba(123,77,255,0.3)]">
                        <span className="text-3xl font-bold text-white">
                          {step.number}
                        </span>
                      </div>

                      <div className="ml-6 h-[1px] flex-1 bg-gradient-to-r from-[#d8c7ff] to-transparent"></div>
                    </div>

                    <h3
                      className="mb-6 text-3xl leading-tight font-bold text-[#24163b]"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      {step.title}
                    </h3>

                    <p className="text-lg leading-relaxed text-[#6f6883]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!token ? (
          <div className="mt-20 flex justify-center">
            <Button
              className="min-w-[240px] rounded-[36px] px-14 py-6 text-xl"
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
