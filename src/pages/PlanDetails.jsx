import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPlanById,
  getMeals,
  createMeal,
  deleteMeal,
  updateMeal,
} from "../services/planService";
import { addFoodToMeal, getFoods, deleteFood } from "../services/foodService";

function PlanDetails() {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [meals, setMeals] = useState([]);
  const [editingMealId, setEditingMealId] = useState(null);
  const [editName, setEditName] = useState("");
  const [days, setDays] = useState([]);
  const [newMealNames, setNewMealNames] = useState({});
  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState({});
  const [grams, setGrams] = useState({});

  useEffect(() => {
    const fetchPlan = async () => {
      const planData = await getPlanById(id);
      if (!planData) return;
      setPlan(planData);

      const mealsData = await getMeals(id);
      setMeals(mealsData);

      const foodsData = await getFoods();
      console.log("FOODS:", foodsData);
      setFoodOptions(foodsData);

      const uniqueDays = [...new Set(mealsData.map((m) => m.day_number))];
      setDays(uniqueDays);
    };

    fetchPlan();
  }, [id]);

  if (!plan) return <p>Loading...</p>;

  const handleMealInputChange = (day, value) => {
    setNewMealNames((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  const handleAddMealForDay = async (day) => {
    const name = newMealNames[day];

    if (!name || !name.trim()) return;

    const newMeal = await createMeal(id, {
      name,
      day_number: Number(day),
    });

    if (!newMeal) return;

    setMeals((prev) => [...prev, newMeal]);

    setNewMealNames((prev) => ({
      ...prev,
      [day]: "",
    }));
  };

  const getDateLabel = (dayNumber) => {
    if (plan.plan_type === "template") {
      return `Day ${dayNumber}`;
    }

    if (plan.plan_type === "calendar") {
      const start = new Date(plan.start_date);
      const date = new Date(start);
      date.setDate(start.getDate() + dayNumber - 1);

      return `Day ${dayNumber} (${date.toLocaleDateString()})`;
    }
  };

  const handleDeleteMeal = async (mealId) => {
    await deleteMeal(mealId);

    setMeals((prev) => prev.filter((m) => m.id !== mealId));
  };

  const handleStartEdit = (meal) => {
    setEditingMealId(meal.id);
    setEditName(meal.name);
  };

  const handleSaveEdit = async (mealId) => {
    const updated = await updateMeal(mealId, {
      name: editName,
    });

    if (!updated) return;

    setMeals((prev) =>
      prev.map((m) => (m.id === mealId ? { ...m, name: editName } : m)),
    );

    setEditingMealId(null);
    setEditName("");
  };

  const handleAddFood = async (mealId) => {
    const selectedFoodId = selectedFoods[mealId];
    const foodGrams = grams[mealId];

    if (!selectedFoodId || !foodGrams) return;

    const newFood = await addFoodToMeal(mealId, {
      food_norm_id: Number(selectedFoodId),
      grams: Number(foodGrams),
    });

    if (!newFood) return;

    const updatedMeals = await getMeals(id);
    setMeals(updatedMeals);

    setSelectedFoods((prev) => ({
      ...prev,
      [mealId]: "",
    }));

    setGrams((prev) => ({
      ...prev,
      [mealId]: "",
    }));
  };

  const handleDeleteFood = async (foodId) => {
    await deleteFood(foodId);

    const updatedMeals = await getMeals(id);
    setMeals(updatedMeals);
  };

  return (
    <div>
      <h1>Plan id: {id}</h1>
      <p>{plan.name}</p>
      <p>{plan.plan_type}</p>
      <button
        className="bg-blue-500 text-white px-3 py-2"
        onClick={() => {
          const nextDay = days.length ? Math.max(...days) + 1 : 1;
          setDays((prev) => [...prev, nextDay]);
        }}
      >
        Add Day
      </button>

      <h2>Meals</h2>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {days.map((day) => {
          const mealsForDay = meals.filter((m) => m.day_number === Number(day));

          return (
            <div key={day} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold mb-3">{getDateLabel(Number(day))}</h3>

              <div className="mt-3 flex gap-2">
                <input
                  className="border px-2 py-1 w-full"
                  placeholder="New meal"
                  value={newMealNames[day] || ""}
                  onChange={(e) => handleMealInputChange(day, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddMealForDay(day);
                    }
                  }}
                />

                <button
                  className="bg-blue-500 text-white px-2"
                  onClick={() => handleAddMealForDay(day)}
                >
                  +
                </button>
              </div>
              {mealsForDay.map((meal) => (
                <div key={meal.id} className="border-b py-3 group">
                  {editingMealId === meal.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={() => handleSaveEdit(meal.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveEdit(meal.id);
                        }
                      }}
                      className="px-2 py-1"
                      autoFocus
                    />
                  ) : (
                    <div>
                      <p
                        className="cursor-pointer font-semibold"
                        onClick={() => handleStartEdit(meal)}
                      >
                        {meal.name}
                      </p>

                      <div className="mt-2">
                        {meal.foods.map((food) => (
                          <div key={food.id} className="text-sm">
                            <p>
                              {food.food_norm.name} - {food.grams}g
                            </p>

                            <button
                              className="text-red-500 text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFood(food.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                        <div className="mt-3 text-sm text-gray-600">
                          <p>Calories: {meal.total_calories}</p>
                          <p>Protein: {meal.total_protein}g</p>
                          <p>Fat: {meal.total_fat}g</p>
                          <p>Carbs: {meal.total_carbs}g</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMeal(meal.id);
                    }}
                  >
                    Delete
                  </button>

                  <div className="mt-2 flex gap-2">
                    <select
                      value={selectedFoods[meal.id] || ""}
                      onChange={(e) =>
                        setSelectedFoods((prev) => ({
                          ...prev,
                          [meal.id]: e.target.value,
                        }))
                      }
                      className="border p-1"
                    >
                      <option value="">Select food</option>
                      {foodOptions.map((food) => (
                        <option key={food.id} value={food.id}>
                          {food.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      placeholder="g"
                      value={grams[meal.id] || ""}
                      onChange={(e) =>
                        setGrams((prev) => ({
                          ...prev,
                          [meal.id]: e.target.value,
                        }))
                      }
                      className="border p-1 w-20"
                    />
                    <button
                      className="bg-blue-500 text-white px-2"
                      onClick={() => handleAddFood(meal.id)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanDetails;
