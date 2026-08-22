import { useEffect, useRef, useState } from "react";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../services/planService";
import { getClientById } from "../services/clientService";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Layout from "../components/Layout";
import LoadingScreen from "../components/LoadingScreen";
import { getClientQuestionnaire } from "../services/questionnaireService";
import Toast from "../components/Toast";

function ClientDetails() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionnaire, setQuestionnaire] = useState(null);

  const [name, setName] = useState("");
  const [planType, setPlanType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [client, setClient] = useState(null);

  const [dailyCalories, setDailyCalories] = useState("");
  const [dailyProtein, setDailyProtein] = useState("");
  const [dailyCarbs, setDailyCarbs] = useState("");
  const [dailyFat, setDailyFat] = useState("");
  const [dailyWater, setDailyWater] = useState("");
  const [coachNotes, setCoachNotes] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { id } = useParams();
  const planRef = useRef({});

  const loadData = async () => {
    setLoading(true);

    const plansData = await getPlans();
    if (!plansData) return;

    const clientData = await getClientById(id);
    if (!clientData) return;

    const questionnaireData = await getClientQuestionnaire(id);
    if (!questionnaireData) return;

    setPlans(plansData.filter((plan) => plan.client_id === Number(id)));

    setClient(clientData);

    setQuestionnaire(questionnaireData);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    const newPlan = await createPlan({
      name,
      plan_type: planType,
      start_date: startDate,
      client_id: Number(id),
      daily_calories: dailyCalories,
      daily_protein: dailyProtein,
      daily_carbs: dailyCarbs,
      daily_fat: dailyFat,
      daily_water: dailyWater,
      coach_notes: coachNotes,
    });
    if (!newPlan.error) {
      setShowToast(true);
    }

    setTimeout(() => {
      setShowToast(false);
    }, 2500);

    setPlans((prev) => [...prev, newPlan]);
    setTimeout(() => {
      planRef.current[newPlan.id]?.scrollIntoView({
        behavior: "smooth",
      });
    }, 50);
  };

  const handleDelete = async (id) => {
    await deletePlan(id);

    setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  };

  const handleUpdate = async () => {
    if (!selectedPlanId) return;

    await updatePlan(selectedPlanId, {
      name,
      plan_type: planType,
      start_date: startDate,
      client_id: Number(id),
    });

    setSelectedPlanId(null);

    loadData();
  };

  const navigate = useNavigate();

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }

  return (
    <>
      <Layout>
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[28px] bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] text-3xl font-bold text-white shadow-[0_20px_45px_rgba(123,77,255,0.18)]">
                {client?.first_name?.[0]}
              </div>

              <div>
                <h1
                  className="text-4xl font-bold tracking-[-0.03em] text-[#24163b] md:text-[52px]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  {client?.first_name} {client?.last_name}
                </h1>

                <p className="mt-2 text-[15px] text-[#8d87a1]">
                  {client?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/client/${id}/report`)}
              className="w-fit rounded-full border border-white/40 bg-white/70 px-6 py-3 text-sm font-medium text-[#6d43d6] shadow-[0_8px_30px_rgba(123,77,255,0.08)] backdrop-blur-xl transition-all duration-150 hover:bg-white active:scale-95"
            >
              View Full Report
            </button>
          </div>

          <div className="mb-12 grid grid-cols-2 gap-4 xl:grid-cols-4">
            <div className="rounded-[28px] border border-white/30 bg-white/60 p-5 backdrop-blur-xl">
              <p className="text-[13px] tracking-[0.18em] text-[#9f97b4] uppercase">
                Age
              </p>

              <h3 className="mt-3 text-3xl font-bold text-[#24163b]">
                {questionnaire?.answers?.basic_info?.age}
              </h3>
            </div>

            <div className="rounded-[28px] border border-white/30 bg-white/60 p-5 backdrop-blur-xl">
              <p className="text-[13px] tracking-[0.18em] text-[#9f97b4] uppercase">
                Height
              </p>

              <h3 className="mt-3 text-3xl font-bold text-[#24163b]">
                {questionnaire?.answers?.basic_info?.height}
              </h3>
            </div>

            <div className="rounded-[28px] border border-white/30 bg-white/60 p-5 backdrop-blur-xl">
              <p className="text-[13px] tracking-[0.18em] text-[#9f97b4] uppercase">
                Weight
              </p>

              <h3 className="mt-3 text-3xl font-bold text-[#24163b]">
                {questionnaire?.answers?.basic_info?.current_weight}
              </h3>
            </div>

            <div className="rounded-[28px] bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] p-5 shadow-[0_18px_40px_rgba(123,77,255,0.18)]">
              <p className="text-[13px] tracking-[0.18em] text-white/70 uppercase">
                Active Plans
              </p>

              <h3 className="mt-3 text-3xl font-bold text-white">
                {plans.length}
              </h3>
            </div>
          </div>

          <div className="space-y-10">
            <div className="rounded-[34px] border border-white/30 bg-white/65 p-7 shadow-[0_10px_35px_rgba(0,0,0,0.03)] backdrop-blur-2xl">
              <div className="mb-8">
                <p className="text-[13px] tracking-[0.18em] text-[#9b6cff] uppercase">
                  Nutrition Setup
                </p>

                <h2
                  className="mt-3 text-[34px] leading-none font-bold text-[#24163b]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  Create Plan
                </h2>
              </div>

              <div className="flex flex-col gap-5 xl:flex-row xl:items-center">
                <input
                  className="min-w-[260px] flex-1 rounded-3xl border border-white/40 bg-white/80 px-6 py-5 text-[#24163b] transition-all outline-none placeholder:text-[#aaa2bf] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/10"
                  placeholder="Plan name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="flex flex-col gap-4 sm:flex-row">
                  <label
                    className={`flex min-w-[220px] cursor-pointer items-center justify-between rounded-3xl border px-5 py-5 transition-all ${
                      planType === "calendar"
                        ? "border-[#dccdff] bg-[#f8f3ff]"
                        : "border-white/40 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-[#24163b]">
                        Calendar Plan
                      </p>

                      <p className="mt-1 text-sm text-[#8d87a1]">
                        Start date based
                      </p>
                    </div>

                    <input
                      type="radio"
                      value="calendar"
                      checked={planType === "calendar"}
                      onChange={(e) => setPlanType(e.target.value)}
                    />
                  </label>

                  <label
                    className={`flex min-w-[220px] cursor-pointer items-center justify-between rounded-3xl border px-5 py-5 transition-all ${
                      planType === "template"
                        ? "border-[#dccdff] bg-[#f8f3ff]"
                        : "border-white/40 bg-white/60 hover:bg-white"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-[#24163b]">
                        Template Plan
                      </p>

                      <p className="mt-1 text-sm text-[#8d87a1]">
                        Reusable structure
                      </p>
                    </div>

                    <input
                      type="radio"
                      value="template"
                      checked={planType === "template"}
                      onChange={(e) => setPlanType(e.target.value)}
                    />
                  </label>
                </div>

                {planType === "calendar" && (
                  <input
                    className="rounded-3xl border border-white/40 bg-white/80 px-6 py-5 text-[#24163b] transition-all outline-none focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/10"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                )}

                <div className="xl:ml-auto">
                  <Button onClick={handleCreate}>Create</Button>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-7 flex items-center justify-between">
                <div>
                  <h2
                    className="text-[34px] font-bold text-[#24163b]"
                    style={{ fontFamily: "Plus Jakarta Sans" }}
                  >
                    Nutrition Plans
                  </h2>

                  <p className="mt-2 text-[#8d87a1]">
                    Personalized plans created for this client
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    ref={(el) => (planRef.current[plan.id] = el)}
                    onClick={() => navigate(`/plans/${plan.id}`)}
                    className="group grid cursor-pointer grid-cols-1 items-center gap-6 rounded-[28px] border border-white/30 bg-white/65 px-6 py-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_18px_45px_rgba(0,0,0,0.04)] lg:grid-cols-[220px_1fr_220px]"
                  >
                    <div className="shrink-0 lg:w-[220px]">
                      <p className="text-xl font-semibold text-[#24163b]">
                        {plan.name}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="rounded-full bg-[#f5efff] py-1 text-xs font-semibold tracking-[0.08em] text-[#8b5cf6] uppercase">
                          {plan.plan_type}
                        </div>

                        {plan.start_date && (
                          <div className="rounded-full bg-[#f5efff] px-3 py-1 text-xs font-semibold text-[#8b5cf6]">
                            {new Date(plan.start_date).toLocaleDateString(
                              "en-GB",
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                      {plan.daily_calories && (
                        <div className="rounded-full bg-[#fff4e8] px-3 py-1.5 text-xs font-semibold text-[#ea580c]">
                          {plan.daily_calories} kcal
                        </div>
                      )}

                      {plan.daily_protein && (
                        <div className="rounded-full bg-[#eefbf4] px-3 py-1.5 text-xs font-semibold text-[#16a34a]">
                          {plan.daily_protein} g Protein
                        </div>
                      )}

                      {plan.daily_carbs && (
                        <div className="rounded-full bg-[#eef4ff] px-3 py-1.5 text-xs font-semibold text-[#2563eb]">
                          {plan.daily_carbs} g Carbs
                        </div>
                      )}

                      {plan.daily_fat && (
                        <div className="rounded-full bg-[#fff7ed] px-3 py-1.5 text-xs font-semibold text-[#c2410c]">
                          {plan.daily_fat} g Fat
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-3 opacity-0 transition-all group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          setSelectedPlanId(plan.id);
                          setName(plan.name);
                          setPlanType(plan.plan_type);
                          setStartDate(plan.start_date || "");
                        }}
                        className="rounded-2xl bg-[#f5efff] px-4 py-2 text-sm font-medium text-[#8b5cf6] transition-all duration-150 hover:bg-[#ede9fe] active:scale-95"
                      >
                        Update
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(plan.id);
                        }}
                        className="curosor-pointer rounded-2xl bg-[#fff1f2] px-4 py-2 text-sm font-medium text-[#e11d48] transition-all duration-150 hover:bg-[#ffe4e6] active:scale-95"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Toast
          show={showToast}
          title="Plan Created"
          message="You can now start adding meals and nutrition details."
        />
      </Layout>
    </>
  );
}

export default ClientDetails;
