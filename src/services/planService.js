const API = "http://127.0.0.1:5000";

const getToken = () => localStorage.getItem("token");

export const getPlans = async () => {
  console.log("Get token Plan", getToken());
  const res = await fetch(`${API}/plans`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    return;
  }
  return res.json();
};

export const createPlan = async (plan) => {
  const res = await fetch(`${API}/plans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(plan),
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    return;
  }
  return res.json();
};

export const deletePlan = async (id) => {
  const res = await fetch(`${API}/plans/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    return;
  }
  return res.json();
};

export const updatePlan = async (id, plan) => {
  const res = await fetch(`${API}/plans/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(plan),
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    return;
  }
  return res.json();
};

export const getPlanById = async (id) => {
  const res = await fetch(`${API}/plans/${id}`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    return;
  }
  return res.json();
};

export const getMeals = async (planId) => {
  const res = await fetch(`${API}/plans/${planId}/meals`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    return;
  }
  return res.json();
};

export const createMeal = async (planId, meal) => {
  const res = await fetch(`${API}/plans/${planId}/meals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(meal),
  });
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    return;
  }
  return res.json();
};

export const deleteMeal = async (mealId) => {
  const res = await fetch(`${API}/meals/${mealId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    return;
  }

  return res.json();
};

export const updateMeal = async (mealId, data) => {
  const res = await fetch(`${API}/meals/${mealId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(data),
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
    return;
  }

  return res.json();
};
