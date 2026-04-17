const API = "http://127.0.0.1:5000"

const getToken = () => localStorage.getItem("token")

export const getClients = async () => {
    console.log("Get token Client", getToken())
    const res = await fetch(`${API}/clients`, {
        headers: {
            Authorization: "Bearer " + getToken()
        }
    })
    return res.json()
}