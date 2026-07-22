import { BASE_URL } from "../constants";

const getToken = () => localStorage.getItem("token");

export const getClients = async () => {
  const res = await fetch(`${BASE_URL}/clients`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return res.json();
};

export const getClientById = async (id) => {
  const res = await fetch(`${BASE_URL}/clients/${id}`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return res.json();
};

export const deactivateClient = async (clientId) => {
  const res = await fetch(`${BASE_URL}/clients/${clientId}/deactivate`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return res.json();
};
