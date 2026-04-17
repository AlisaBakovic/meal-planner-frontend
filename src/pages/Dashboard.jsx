import { useEffect, useState } from 'react'
import { getPlans, createPlan, updatePlan, deletePlan } from '../services/planService'
import { getClients } from '../services/clientService'
import { useAsyncError } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Button from '../components/Button'

function Dashboard() {
    const [plans, setPlans] = useState([])
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    const [name, setName] = useState("")
    const [planType, setPlanType] = useState("")
    const [startDate, setStartDate] = useState("")
    const [selectedClient, setSelectedClient] = useState("")
    const [selectedPlanId, setSelectedPlanId] = useState(null)
 
    const loadData = async () => {
        setLoading(true)

        const plansData = await getPlans()
        const clientsData = await getClients()

        setPlans(plansData)
        setClients(clientsData)

        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleCreate = async () => {
        await createPlan({
            name,
            plan_type: planType,
            start_date: startDate,
            client_id: Number(selectedClient)
        })
        loadData()
    }

    const handleDelete = async (id) => {
        await deletePlan(id)
        setPlans(prevPlans => prevPlans.filter(plan => plan.id !== id)
      )
    }

    const handleUpdate = async () => {
        if (!selectedPlanId) return

        await updatePlan(selectedPlanId, {
            name,
            plan_type: planType,
            start_date: startDate,
            client_id: Number(selectedClient)
        })
        setSelectedPlanId(null)
        loadData()
    }

    const navigate = useNavigate()
    
    const handleLogout = () => {
      localStorage.removeItem("token")
      navigate("/login")
    }

        if (loading) {
        return <p>Loading...</p>
      }

    return (
        <>
        <div className="min-h-screen bg-gray-100 p-6">
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button onClick={handleLogout}>Logout</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="font-semibold mb-4">Create Plan</h2>

              <input className="w-full mb-3 p-2 border rounded" placeholder='Plan name' value={name} onChange={(e) => setName(e.target.value)}/>

              <div className="mb-3 ">
                <p className="mb-1 text-sm text-gray-600">Plan type</p>

                <label className='flex items-center gab-2 cursor-pointer'>
                  <input className="w-full mb-3 p-2 border rounded" type="radio" value="calendar" checked={planType === "calendar"} onChange={(e) => setPlanType(e.target.value)}
                  />
                  Calendar Plan
                </label>

                <label className='flex items-center gab-2 cursor-pointer'>
                  <input className="w-full mb-3 p-2 border rounded" type="radio" value="template" checked={planType === "template"} onChange={(e) => setPlanType(e.target.value)}
                  />
                  Template plan
                </label>
              </div>

              {planType === "calendar" && (
                <input className=" mb-3 p-2 border rounded" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
              )}
      
              <select className=" mb-3 p-2.5  border rounded" value={selectedClient} onChange={(c) => setSelectedClient(c.target.value)}>
                <option value="">Select client</option>
                {clients.map((client) =>(
                  <option key={client.id} value={client.id}>
                    {client.first_name} {client.last_name}
                  </option>
                ))}
              </select>

        <div className="flex gap-2">
          <Button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create</Button>
          <Button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 rounded">Update</Button>
        </div>
      </div>
    </div>
            
    <div className='md:col-span-2'>
      <h2 className="font-semibold mb 4">Plans</h2>

      <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{plan.name}</p>
                <p className="text-sm text-gray-500">{plan.plan_type}</p>
              </div>
              <button
                onClick={() => handleDelete(plan.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
</div>

        </>
    )

}

export default Dashboard