const API = "http://127.0.0.1:5000";

const getToken = () => localStorage.getItem("token");

export const getFoods = async () => {
  const res = await fetch(`${API}/foods`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

  return res.json();
};

export const addFoodToMeal = async (mealId, foodData) => {
  const res = await fetch(`${API}/meals/${mealId}/foods`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(foodData),
  });
  return res.json();
};

export const deleteFood = async (foodId) => {
  const res = await fetch(`${API}/foods/${foodId}`, {
    method: "DELETE",

    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return res.ok;
};

export const updatedFood = async (foodId) => {
  const res = await fetch(`${API}/foods/${foodId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(foodData),
  });
  if (!res.ok) {
    return null;
  }
  return await res.json();
};
