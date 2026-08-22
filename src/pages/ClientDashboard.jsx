import Layout from "../components/Layout";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { getPlans } from "../services/planService";
import { useNavigate } from "react-router-dom";
import { getQuestionnaire } from "../services/questionnaireService";

function ClientDashboard({ answers }) {
  const [plans, setPlans] = useState([]);
  const [questionnaire, setQuestionnaire] = useState(null);

  const firstName = localStorage.getItem("first_name");

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const plansData = await getPlans();
      setPlans(plansData);

      const questionnaireData = await getQuestionnaire();
      setQuestionnaire(questionnaireData);
    };
    loadData();
  }, []);

  const goalLabels = {
    lose_weight: "Lose weight",
    gain_weight: "Gain weight",
    maintain_weight: "Maintain weight",
    build_muscle: "Build muscle",
  };

  return (
    <Layout mode="client">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="relative overflow-hidden rounded-[36px] border border-white/30 bg-white/40 p-7 shadow-[0_10px_40px_rgba(255,140,80,0.06)] backdrop-blur-2xl md:p-10">
              <div className="absolute top-[-100px] right-[-80px] h-[260px] w-[260px] rounded-full bg-[#ffedd5]/60 blur-3xl"></div>

              <div className="absolute bottom-[-120px] left-[-60px] h-[220px] w-[220px] rounded-full bg-[#d1fae5]/50 blur-3xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center rounded-full border border-white/40 bg-white/50 px-4 py-2 text-xs tracking-[0.18em] text-[#ff8a4c] uppercase">
                  Wellness Dashboard
                </div>

                <h1
                  className="mt-7 text-[46px] leading-[0.95] font-[800] tracking-[-0.06em] text-[#1f2937] md:text-[64px]"
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
                  Stay consistent with your nutrition goals and follow your
                  personalized wellness journey.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="min-w-[170px] rounded-3xl border border-white/30 bg-white/55 px-6 py-5">
                    <p className="text-xs tracking-[0.16em] text-[#9ca3af] uppercase">
                      Goal
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-[#1f2937]">
                      {goalLabels[questionnaire?.answers?.goal?.primary_goal]}
                    </h3>
                  </div>

                  <div className="min-w-[170px] rounded-3xl border border-white/30 bg-white/55 px-6 py-5">
                    <p className="text-xs tracking-[0.16em] text-[#9ca3af] uppercase">
                      Calories
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-[#1f2937]">
                      2100 kcal
                    </h3>
                  </div>

                  <div className="min-w-[170px] rounded-3xl border border-white/30 bg-white/55 px-6 py-5">
                    <p className="text-xs tracking-[0.16em] text-[#9ca3af] uppercase">
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
            <div className="rounded-[36px] border border-white/30 bg-white/40 p-7 shadow-[0_10px_40px_rgba(16,185,129,0.05)] backdrop-blur-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs tracking-[0.16em] text-[#9ca3af] uppercase">
                    Daily Progress
                  </p>

                  <h2
                    className="mt-2 text-3xl font-bold text-[#1f2937]"
                    style={{ fontFamily: "Plus Jakarta Sans" }}
                  >
                    78%
                  </h2>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[8px] border-[#fde68a]">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#ffb84d] to-[#ff8a4c]"></div>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between">
                    <p className="text-sm text-[#5f6f66]">Protein</p>

                    <p className="text-sm font-semibold text-[#1f2937]">120g</p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#f3f4f6]">
                    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#34d399] to-[#10b981]"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <p className="text-sm text-[#5f6f66]">Carbs</p>

                    <p className="text-sm font-semibold text-[#1f2937]">180g</p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#f3f4f6]">
                    <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-[#ffb84d] to-[#fb923c]"></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <p className="text-sm text-[#5f6f66]">Water</p>

                    <p className="text-sm font-semibold text-[#1f2937]">2.4L</p>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#f3f4f6]">
                    <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-[#86efac] to-[#34d399]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <div className="rounded-[36px] border border-white/30 bg-white/40 p-7 shadow-[0_10px_40px_rgba(255,140,80,0.05)] backdrop-blur-2xl">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs tracking-[0.16em] text-[#9ca3af] uppercase">
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
                    className="rounded-3xl border border-white/30 bg-white/50 px-6 py-5 transition-all hover:bg-white/70"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs tracking-[0.16em] text-[#9ca3af] uppercase">
                          {plan.plan_type}
                        </p>

                        <h3 className="mt-2 text-xl font-semibold text-[#1f2937]">
                          {plan.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="rounded-2xl bg-[#fff7ed] px-4 py-3 text-sm font-semibold text-[#ea580c]">
                          520 kcal
                        </div>

                        <button
                          onClick={() => navigate(`/client-plans/${plan.id}`)}
                          className="cursor-pointer rounded-2xl bg-[#1f2937] px-5 py-3 text-sm text-white transition-all duration-150 hover:opacity-90 active:scale-95"
                        >
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
            <div className="rounded-[36px] border border-white/30 bg-gradient-to-br from-[#ffedd5]/80 to-[#dcfce7]/70 p-7 shadow-[0_10px_40px_rgba(255,140,80,0.06)] backdrop-blur-2xl">
              <p className="text-xs tracking-[0.16em] text-[#7f8b84] uppercase">
                Upcoming
              </p>

              <h2
                className="mt-3 text-3xl font-bold text-[#1f2937]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Coach Check-In
              </h2>

              <div className="mt-7 rounded-3xl border border-white/30 bg-white/50 p-6">
                <p className="text-sm text-[#7f8b84]">Scheduled Session</p>

                <h3 className="mt-3 text-2xl font-bold text-[#1f2937]">
                  Monday · 10:00 AM
                </h3>

                <p className="mt-4 leading-relaxed text-[#5f6f66]">
                  Review your weekly progress and adjust your nutrition strategy
                  with your coach.
                </p>
              </div>

              <button className="mt-6 w-full rounded-3xl bg-gradient-to-r from-[#ffb84d] to-[#ff8a4c] py-4 font-semibold text-white shadow-[0_15px_35px_rgba(255,140,80,0.18)] transition-all duration-150 hover:-translate-y-1 active:scale-95">
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
