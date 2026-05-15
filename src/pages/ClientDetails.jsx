import { useEffect, useState, useRef } from "react";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../services/planService";
import { getClients } from "../services/clientService";
import { useAsyncError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Layout from "../components/Layout";

function ClientDetails() {
  const [plans, setPlans] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [clientSearch, setClientSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState("");

  const [name, setName] = useState("");
  const [planType, setPlanType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const dropdownRef = useRef(null);

  const loadData = async () => {
    setLoading(true);

    const plansData = await getPlans();
    if (!plansData) return;

    const clientsData = await getClients();
    if (!clientsData) return;

    setPlans(plansData);
    setClients(clientsData);

    setLoading(false);
  };

  const firstName = localStorage.getItem("first_name");

  useEffect(() => {
    loadData();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreate = async () => {
    await createPlan({
      name,
      plan_type: planType,
      start_date: startDate,
      client_id: Number(selectedClient),
    });
    loadData();
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
      client_id: Number(selectedClient),
    });
    setSelectedPlanId(null);
    loadData();
  };

  const navigate = useNavigate();

  const filteredClients = clients.filter((client) =>
    `${client.first_name} ${client.last_name}`
      .toLowerCase()
      .includes(clientSearch.toLowerCase()),
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Layout>
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-center">Hello {firstName}</h1>
        </div>

        <div className="flex justify-center">
          <div className="relative w-100" ref={dropdownRef}>
            <input
              className="mb-3 p-2 border rounded w-100"
              placeholder="Search client..."
              value={clientSearch}
              onFocus={() => setOpenDropdown(true)}
              onChange={(e) => setClientSearch(e.target.value)}
            />

            {openDropdown && (
              <div className="absolute w-full border rounded bg-white shadow">
                {filteredClients.map((client) => (
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    key={client.id}
                    onClick={() => {
                      setSelectedClient(client.id);

                      setClientSearch(
                        `${client.first_name} ${client.last_name}`,
                      );
                    }}
                  >
                    {client.first_name} {client.last_name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="font-semibold mb-4">Create Plan</h2>

            <input
              className="w-full mb-3 p-2 border rounded"
              placeholder="Plan name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="mb-3">
              <p className="mb-1 text-sm  text-gray-600">Plan type</p>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="calendar"
                  checked={planType === "calendar"}
                  onChange={(e) => setPlanType(e.target.value)}
                />
                Calendar Plan
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="template"
                  checked={planType === "template"}
                  onChange={(e) => setPlanType(e.target.value)}
                />
                Template plan
              </label>
            </div>

            {planType === "calendar" && (
              <input
                className=" mb-3 p-2 border rounded"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            )}

            <select
              className=" mb-3 p-2.5  border rounded"
              value={selectedClient}
              onChange={(c) => setSelectedClient(c.target.value)}
            >
              <option value="">Select client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.first_name} {client.last_name}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <Button onClick={handleCreate}>Create</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-semibold mb-4">Plans</h2>

          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => navigate(`/plans/${plan.id}`)}
                className="bg-white p-4 rounded-xl shadow flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-medium">{plan.name}</p>
                  <p className="text-sm text-gray-500">{plan.plan_type}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(plan.id);
                  }}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default ClientDetails;
