const API = "http://127.0.0.1:5000"

const getToken = () => localStorage.getItem("token")

export const getPlans = async () => {
    console.log("Get token Plan", getToken())
    const res = await fetch(`${API}/plans`, {
        headers: {
            Authorization: "Bearer " + getToken()
        }
    })
    return res.json()
}

export const createPlan = async (plan) => {
    const res = await fetch(`${API}/plans`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken()
        },
        body: JSON.stringify(plan)
    })
    return res.json()
}

export const deletePlan = async(id) => {
    const res = await fetch(`${API}/plans/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + getToken()
        }
    })
    return res.json()
}

export const updatePlan = async (id, plan) => {
    const res = await fetch(`${API}/plans/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getToken()
        },
        body: JSON.stringify(plan)
    })
    return res.json()
}