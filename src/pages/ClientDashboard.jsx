import Layout from "../components/Layout";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { getPlans } from "../services/planService";
import { useNavigate } from "react-router-dom";

function ClientDashboard() {

  const [plans, setPlans] = useState([])

  const firstName = localStorage.getItem("first_name");

  const navigate = useNavigate();

  useEffect(() => {

    const loadPlans = async () => {
      const data = await getPlans();
      setPlans(data);
    };
    loadPlans();

  }, []);

  return (

    <Layout mode="client">

      <div className="max-w-[1400px] mx-auto">

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

          <div className="xl:col-span-8">

            <div className="relative overflow-hidden rounded-[36px] border border-white/30 bg-white/40 backdrop-blur-2xl p-7 md:p-10 shadow-[0_10px_40px_rgba(255,140,80,0.06)]">

              <div className="absolute top-[-100px] right-[-80px] w-[260px] h-[260px] rounded-full bg-[#ffedd5]/60 blur-3xl"></div>

              <div className="absolute bottom-[-120px] left-[-60px] w-[220px] h-[220px] rounded-full bg-[#d1fae5]/50 blur-3xl"></div>

              <div className="relative z-10">

                <div className="inline-flex items-center rounded-full border border-white/40 bg-white/50 px-4 py-2 text-[#ff8a4c] text-xs tracking-[0.18em] uppercase">

                  Wellness Dashboard

                </div>

                <h1
                  className="mt-7 text-[46px] md:text-[64px] leading-[0.95] tracking-[-0.06em] font-[800] text-[#1f2937]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  Welcome back,
                  <br />

                  <span className="bg-gradient-to-r from-[#ffb84d] to-[#ff8a4c] bg-clip-text text-transparent">
                    {firstName}
                  </span>

                </h1>

                <p
                  className="mt-5 max-w-2xl text-[17px] leading-[1.8] text-[#5f6f66]"
                  style={{ fontFamily: "Open Sans" }}
                >
                  Stay consistent with your nutrition goals and follow your personalized wellness journey.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">

                  <div className="rounded-3xl border border-white/30 bg-white/55 px-6 py-5 min-w-[170px]">

                    <p className="text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                      Goal
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-[#1f2937]">
                      Fat Loss
                    </h3>

                  </div>

                  <div className="rounded-3xl border border-white/30 bg-white/55 px-6 py-5 min-w-[170px]">

                    <p className="text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                      Calories
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-[#1f2937]">
                      2100 kcal
                    </h3>

                  </div>

                  <div className="rounded-3xl border border-white/30 bg-white/55 px-6 py-5 min-w-[170px]">

                    <p className="text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                      Coach
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-[#1f2937]">
                      Sarah Coach
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="xl:col-span-4">

            <div className="rounded-[36px] border border-white/30 bg-white/40 backdrop-blur-2xl p-7 shadow-[0_10px_40px_rgba(16,185,129,0.05)]">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                    Daily Progress
                  </p>

                  <h2
                    className="mt-2 text-3xl font-bold text-[#1f2937]"
                    style={{ fontFamily: "Plus Jakarta Sans" }}
                  >
                    78%
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-full border-[8px] border-[#fde68a] flex items-center justify-center">

                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffb84d] to-[#ff8a4c]"></div>

                </div>

              </div>

              <div className="mt-8 space-y-5">

                <div>

                  <div className="flex justify-between mb-2">

                    <p className="text-[#5f6f66] text-sm">
                      Protein
                    </p>

                    <p className="text-[#1f2937] text-sm font-semibold">
                      120g
                    </p>

                  </div>

                  <div className="h-2 rounded-full bg-[#f3f4f6] overflow-hidden">

                    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#34d399] to-[#10b981]"></div>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <p className="text-[#5f6f66] text-sm">
                      Carbs
                    </p>

                    <p className="text-[#1f2937] text-sm font-semibold">
                      180g
                    </p>

                  </div>

                  <div className="h-2 rounded-full bg-[#f3f4f6] overflow-hidden">

                    <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-[#ffb84d] to-[#fb923c]"></div>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <p className="text-[#5f6f66] text-sm">
                      Water
                    </p>

                    <p className="text-[#1f2937] text-sm font-semibold">
                      2.4L
                    </p>

                  </div>

                  <div className="h-2 rounded-full bg-[#f3f4f6] overflow-hidden">

                    <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-[#86efac] to-[#34d399]"></div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-7 grid grid-cols-1 xl:grid-cols-12 gap-6">

          <div className="xl:col-span-8">

            <div className="rounded-[36px] border border-white/30 bg-white/40 backdrop-blur-2xl p-7 shadow-[0_10px_40px_rgba(255,140,80,0.05)]">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <p className="text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                    Meal Plan
                  </p>

                  <h2
                    className="mt-2 text-3xl font-bold text-[#1f2937]"
                    style={{ fontFamily: "Plus Jakarta Sans" }}
                  >
                    Today's Meals
                  </h2>

                </div>

              </div>

              <div className="mt-8 space-y-4">

                {plans.map((plan) => (

                  <div
                    key={plan.id}
                    className="rounded-3xl border border-white/30 bg-white/50 px-6 py-5 hover:bg-white/70 transition-all"
                  >

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                      <div>

                        <p className="text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                          {plan.plan_type}
                        </p>

                        <h3 className="mt-2 text-xl font-semibold text-[#1f2937]">
                          {plan.name}
                        </h3>

                      </div>

                      <div className="flex items-center gap-4">

                        <div className="rounded-2xl bg-[#fff7ed] px-4 py-3 text-[#ea580c] font-semibold text-sm">
                          520 kcal
                        </div>

                        <button onClick={() => navigate(`/client-plans/${plan.id}`)} className="cursor-pointer rounded-2xl bg-[#1f2937] px-5 py-3 text-sm text-white hover:opacity-90 transition-all">
                          View
                        </button>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

          <div className="xl:col-span-4">

            <div className="rounded-[36px] border border-white/30 bg-gradient-to-br from-[#ffedd5]/80 to-[#dcfce7]/70 backdrop-blur-2xl p-7 shadow-[0_10px_40px_rgba(255,140,80,0.06)]">

              <p className="text-xs uppercase tracking-[0.16em] text-[#7f8b84]">
                Upcoming
              </p>

              <h2
                className="mt-3 text-3xl font-bold text-[#1f2937]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Coach Check-In
              </h2>

              <div className="mt-7 rounded-3xl border border-white/30 bg-white/50 p-6">

                <p className="text-[#7f8b84] text-sm">
                  Scheduled Session
                </p>

                <h3 className="mt-3 text-2xl font-bold text-[#1f2937]">
                  Monday · 10:00 AM
                </h3>

                <p className="mt-4 text-[#5f6f66] leading-relaxed">
                  Review your weekly progress and adjust your nutrition strategy with your coach.
                </p>

              </div>

              <button className="w-full mt-6 rounded-3xl bg-gradient-to-r from-[#ffb84d] to-[#ff8a4c] py-4 text-white font-semibold shadow-[0_15px_35px_rgba(255,140,80,0.18)] hover:-translate-y-1 transition-all">

                Join Session

              </button>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );
}

export default ClientDashboard;