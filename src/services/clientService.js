const API = "http://127.0.0.1:5000";

const getToken = () => localStorage.getItem("token");

export const getClients = async () => {

  const res = await fetch(`${API}/clients`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return res.json();
};

export const getClientById = async (id) => {
  
  const res = await fetch(`${API}/clients/${id}`, 
  {
    headers:{
      Authorization: "Bearer " + getToken(),
    },
  });
  return res.json();
};

export const deactivateClient = async (clientId) => {
  const res = await fetch(`${API}/clients/${clientId}/deactivate`, {
    method: "PATCH",
    headers:{
      Authorization: "Bearer " + getToken(),
    },
  });
  return res.json();
};