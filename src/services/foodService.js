import { BASE_URL } from "../constants";

const getToken = () => localStorage.getItem("token");

export const getFoods = async () => {
  const res = await fetch(`${BASE_URL}/foods`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

  return res.json();
};

export const addFoodToMeal = async (mealId, foodData) => {
  const res = await fetch(`${BASE_URL}/meals/${mealId}/foods`, {
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
  const res = await fetch(`${BASE_URL}/foods/${foodId}`, {
    method: "DELETE",

    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
  return res.ok;
};

export const updateFoodGrams = async (foodId, grams) => {
  const res = await fetch(`${BASE_URL}/foods/${foodId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify({ grams: Number(grams) }),
  });

  if (!res.ok) {
    throw new Error("Failed to update grams");
  }
  return res.json();
};
