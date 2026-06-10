import { useEffect, useState } from "react";
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

function ClientDetails() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [planType, setPlanType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [client, setClient] = useState(null);

  const { id } = useParams();

  const loadData = async () => {
    setLoading(true);

    const plansData = await getPlans();
    if (!plansData) return;

    const clientData = await getClientById(id);
    if (!clientData) return;

    setPlans(
      plansData.filter((plan) => plan.client_id === Number(id))
    );

    setClient(clientData);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    await createPlan({
      name,
      plan_type: planType,
      start_date: startDate,
      client_id: Number(id),
    });

    loadData();
  };

  const handleDelete = async (id) => {
    await deletePlan(id);

    setPlans((prevPlans) =>
      prevPlans.filter((plan) => plan.id !== id)
    );
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

      <div className="max-w-[1500px] mx-auto">

        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] flex items-center justify-center text-white text-3xl font-bold shadow-[0_20px_45px_rgba(123,77,255,0.18)] shrink-0">
              {client?.first_name?.[0]}
            </div>

            <div>

              <h1
                className="text-4xl md:text-[52px] font-bold tracking-[-0.03em] text-[#24163b]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                {client?.first_name} {client?.last_name}
              </h1>

              <p className="text-[#8d87a1] mt-2 text-[15px]">
                {client?.email}
              </p>

            </div>

          </div>

          <button
            onClick={() => navigate(`/client/${id}/report`)}
            className="w-fit rounded-full bg-white/70 backdrop-blur-xl border border-white/40 px-6 py-3 text-sm font-medium text-[#6d43d6] shadow-[0_8px_30px_rgba(123,77,255,0.08)] hover:bg-white transition-all"
          >
            View Full Report
          </button>

        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-12">

          <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-[28px] p-5">

            <p className="text-[13px] uppercase tracking-[0.18em] text-[#9f97b4]">
              Age
            </p>

            <h3 className="mt-3 text-3xl font-bold text-[#24163b]">
              —
            </h3>

          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-[28px] p-5">

            <p className="text-[13px] uppercase tracking-[0.18em] text-[#9f97b4]">
              Height
            </p>

            <h3 className="mt-3 text-3xl font-bold text-[#24163b]">
              —
            </h3>

          </div>

          <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-[28px] p-5">

            <p className="text-[13px] uppercase tracking-[0.18em] text-[#9f97b4]">
              Weight
            </p>

            <h3 className="mt-3 text-3xl font-bold text-[#24163b]">
              —
            </h3>

          </div>

          <div className="bg-gradient-to-br from-[#9b6cff] to-[#7b4dff] rounded-[28px] p-5 shadow-[0_18px_40px_rgba(123,77,255,0.18)]">

            <p className="text-[13px] uppercase tracking-[0.18em] text-white/70">
              Active Plans
            </p>

            <h3 className="mt-3 text-3xl font-bold text-white">
              {plans.length}
            </h3>

          </div>

        </div>

        <div className="space-y-10">

          <div className="bg-white/65 backdrop-blur-2xl border border-white/30 rounded-[34px] p-7 shadow-[0_10px_35px_rgba(0,0,0,0.03)]">

            <div className="mb-8">

              <p className="text-[13px] uppercase tracking-[0.18em] text-[#9b6cff]">
                Nutrition Setup
              </p>

              <h2
                className="mt-3 text-[34px] leading-none font-bold text-[#24163b]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                Create Plan
              </h2>

            </div>

            <div className="flex flex-col xl:flex-row xl:items-center gap-5">

              <input
                className="flex-1 min-w-[260px] rounded-3xl border border-white/40 bg-white/80 px-6 py-5 outline-none text-[#24163b] placeholder:text-[#aaa2bf] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/10 transition-all"
                placeholder="Plan name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="flex flex-col sm:flex-row gap-4">

                <label
                  className={`min-w-[220px] flex items-center justify-between rounded-3xl border px-5 py-5 cursor-pointer transition-all ${
                    planType === "calendar"
                      ? "bg-[#f8f3ff] border-[#dccdff]"
                      : "bg-white/60 border-white/40 hover:bg-white"
                  }`}
                >

                  <div>

                    <p className="font-semibold text-[#24163b]">
                      Calendar Plan
                    </p>

                    <p className="text-sm text-[#8d87a1] mt-1">
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
                  className={`min-w-[220px] flex items-center justify-between rounded-3xl border px-5 py-5 cursor-pointer transition-all ${
                    planType === "template"
                      ? "bg-[#f8f3ff] border-[#dccdff]"
                      : "bg-white/60 border-white/40 hover:bg-white"
                  }`}
                >

                  <div>

                    <p className="font-semibold text-[#24163b]">
                      Template Plan
                    </p>

                    <p className="text-sm text-[#8d87a1] mt-1">
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
                  className="rounded-3xl border border-white/40 bg-white/80 px-6 py-5 outline-none text-[#24163b] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/10 transition-all"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />

              )}

              <div className="xl:ml-auto">

                <Button onClick={handleCreate}>
                  Create
                </Button>

              </div>

            </div>
          </div>

          <div>

            <div className="flex items-center justify-between mb-7">

              <div>

                <h2
                  className="text-[34px] font-bold text-[#24163b]"
                  style={{ fontFamily: "Plus Jakarta Sans" }}
                >
                  Nutrition Plans
                </h2>

                <p className="text-[#8d87a1] mt-2">
                  Personalized plans created for this client
                </p>

              </div>

            </div>

            <div className="space-y-4">

              {plans.map((plan) => (

                <div
                  key={plan.id}
                  onClick={() => navigate(`/plans/${plan.id}`)}
                  className="group bg-white/65 backdrop-blur-2xl border border-white/30 rounded-[28px] px-6 py-5 flex items-center justify-between gap-6 cursor-pointer hover:shadow-[0_18px_45px_rgba(0,0,0,0.04)] hover:-translate-y-[2px] transition-all duration-300"
                >

                  <div>

                    <p className="text-xl font-semibold text-[#24163b]">
                      {plan.name}
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <div className="px-3 py-1 rounded-full bg-[#f5efff] text-[#8b5cf6] text-xs font-semibold uppercase tracking-[0.08em]">
                        {plan.plan_type}
                      </div>

                      {plan.start_date && (

                        <p className="text-sm text-[#8d87a1]">
                          {plan.start_date}
                        </p>

                      )}

                    </div>

                  </div>

                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        setSelectedPlanId(plan.id);
                        setName(plan.name);
                        setPlanType(plan.plan_type);
                        setStartDate(plan.start_date || "");
                      }}
                      className="px-4 py-2 rounded-2xl bg-[#f5efff] text-[#8b5cf6] text-sm font-medium hover:bg-[#ede9fe] transition-all"
                    >
                      Update
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(plan.id);
                      }}
                      className="px-4 py-2 rounded-2xl bg-[#fff1f2] text-[#e11d48] text-sm font-medium hover:bg-[#ffe4e6] transition-all"
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

    </Layout>
  </>
);
}

export default ClientDetails;