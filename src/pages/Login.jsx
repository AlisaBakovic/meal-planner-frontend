import { useEffect, useState } from 'react'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState(null)
  const [plans, setPlans] = useState([])
  const [name, setName] = useState("")
  const [planType, setPlanType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedPlanId, setSelectedPlanId] = useState(null)
 
  const handleLogin = () => {
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setData(data)
      localStorage.setItem("token", data.token)
    })
    .catch(error => console.error(error))
  }

  const handleGetPlans = () => {
    const token = localStorage.getItem("token")

    fetch("http://127.0.0.1:5000/plans", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
    }
   })
    .then(response => response.json())
    .then(data => {
      setPlans(data)
      
    })
    .catch(error => console.error(error))
    }
  
  const handleCreatPlan = () => {
    const token = localStorage.getItem("token")

    fetch("http://127.0.0.1:5000/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        name: name,
        plan_type: planType,
        start_date: startDate,
        client_id: Number(selectedClient)
      })
      })
      .then(response => response.json())
      .then(data => {
        
        console.log(data)

        handleGetPlans()
    })
    .catch(error => console.log(error))
  }

  const handleDeletePlan = (plan_id) => {
    const token = localStorage.getItem("token")

    fetch(`http://127.0.0.1:5000/plans/${plan_id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      handleGetPlans()
    })
    .catch(error => console.log(error))
  }

  const handleUpdatePlan = () => {
    if (!selectedPlanId) {
      alert("Select plan first")
      return
    }
    const token = localStorage.getItem("token")

    fetch(`http://127.0.0.1:5000/plans/${selectedPlanId}`, {
      method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      name: name,
      plan_type: planType,
      start_date: startDate,
      client_id: Number(selectedClient),
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    handleGetPlans()
    setSelectedPlanId(null)
  })
  .catch(error => console.log(error))
  }
  
  const handleSelectedPlan = (plan) => {
    setName(plan.name)
    setPlanType(plan.plan_type)
    setStartDate(plan.start_date)
    setSelectedClient(plan.client_id.toString())
    setSelectedPlanId(plan.id)
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    
    fetch("http://127.0.0.1:5000/clients", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(response => response.json())
    .then(data => {
      setClients(data)
    })
    .catch(error => console.log(error))
  }, [])

  console.log("selectedClient:", selectedClient)
console.log("type:", typeof selectedClient)
  return (
    <>
    <h2>Sign in </h2>
      <label> Email:
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}>
        </input>
      </label>
      <label> Password:
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}>
        </input>
      </label>
      <label>Name:
        <input placeholder='Plan name' value={name} onChange={(e) => setName(e.target.value)}></input>
      </label>
      <label>Plan type:
        <input placeholder='Plan type' value={planType} onChange={(e) => setPlanType(e.target.value)}></input>
      </label>
      <label>Start date:
        <input type="date" placeholder='Start day' value={startDate} onChange={(e) => setStartDate(e.target.value)}></input>
      </label>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetPlans}>Get Plans</button>
      <button onClick={handleCreatPlan}>Create Plan</button>
      <button onClick={handleUpdatePlan}>Update Plan</button>
      <select 
        value={selectedClient} onChange={(c) => setSelectedClient(c.target.value)}>
          <option value="">Select client</option>
          
          {clients.map((client) =>(
          <option key={client.id} value={client.id}>
            {client.first_name} {client.last_name}
          </option>
        ))}
      </select>


      {plans.map((plan) => (
        <div key={plan.id}>
          {plan.name}
          <button onClick={() => handleDeletePlan(plan.id)}>Delete</button>
          <button onClick={() => handleSelectedPlan(plan)}>Edit Plan</button>
        </div>
        
      ))}
    </>
  )
}

export default Login

