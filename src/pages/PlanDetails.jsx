import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import FoodModal from "../components/FoodModal";


import {
  getPlanById,
  getMeals,
  createMeal,
  deleteMeal,
  updateMeal,
  updatePlan,
} from "../services/planService";

import {
  addFoodToMeal,
  getFoods,
  deleteFood,
  updateFoodGrams,
} from "../services/foodService";

import Layout from "../components/Layout";
import Toast from "../components/Toast";

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
  const [foodSearch, setFoodSearch] = useState({});
  const [openDropdown, setOpenDropdown] = useState({});
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [showToast, setShowToast] = useState(false)

  const dayRefs = useRef({});

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  const loadFoods = async () => {
    setLoading(true);

    try {
      const data = await getFoods();

      if (data) {
        setFoods(data);
        setFoodOptions(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPlan = async () => {
      const planData = await getPlanById(id);

      if (!planData) return;

      setPlan({
        ...planData,
        daily_calories: planData.daily_calories ?? "",
        daily_protein: planData.daily_protein ?? "",
        daily_carbs: planData.daily_carbs ?? "",
        daily_fat: planData.daily_fat ?? "",
        daily_water: planData.daily_water ?? "",
        coach_notes: planData.coach_notes ?? "",
      });

      const mealsData = await getMeals(id);
      setMeals(mealsData);

      const foodsData = await getFoods();
      setFoodOptions(foodsData);

      const uniqueDays = [...new Set(mealsData.map((m) => m.day_number))];

      setDays(uniqueDays);
    };

    fetchPlan();
  }, [id]);

  useEffect(() => {
    loadFoods();
  }, []);

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

  const handleSavePlan = async () => {
    const updatedPlan = await updatePlan(id, plan);
    if(!updatedPlan.error) {
      setShowToast(true)
    }

    setTimeout(() => {
      setShowToast(false);
    }, 2500)

    if (updatedPlan.error) {
      return;
    }

    setPlan(updatedPlan);
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

    setFoodSearch((prev) => ({
      ...prev,
      [mealId]: "",
    }));
  };

  const handleDeleteFood = async (foodId) => {
    await deleteFood(foodId);

    const updatedMeals = await getMeals(id);

    setMeals(updatedMeals);
  };

  const handleUpdateFoodGrams = async (foodId, grams) => {
    const updatedMeal = await updateFoodGrams(foodId, Number(grams));

    setMeals((prev) =>
      prev.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal)),
    );
  };

  const filteredFoods = (mealId) => {
    const search = foodSearch[mealId]?.toLowerCase() || "";

    return foodOptions.filter((food) =>
      food.name.toLowerCase().includes(search),
    );
  };

  return (
    <Layout>
      <div className="mb-8 rounded-[30px] border border-white/50 bg-white/80 p-7 shadow-[0_10px_35px_rgba(0,0,0,0.05)] backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="mb-2 text-[11px] tracking-[0.3em] text-[#8d84b3] uppercase">
              Nutrition Targets
            </p>

            <h2 className="text-2xl font-black tracking-tight text-[#1d1135]">
              Daily Goals
            </h2>
          </div>

          <button
            onClick={handleSavePlan}
            className="transition-all duration-150 active:scale-95 h-11 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20"
          >
            Save Targets
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-[#736a92]">
              Calories
            </label>

            <input
              type="number"
              value={plan?.daily_calories ?? ""}
              onChange={(e) =>
                setPlan({
                  ...plan,
                  daily_calories: e.target.value,
                })
              }
              placeholder="2100"
              className="h-11 w-full rounded-xl border border-[#ece7ff] bg-[#faf8ff] px-4 text-sm outline-none focus:border-violet-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#736a92]">
              Protein (g)
            </label>

            <input
              type="number"
              value={plan?.daily_protein ?? ""}
              onChange={(e) =>
                setPlan({
                  ...plan,
                  daily_protein: e.target.value,
                })
              }
              placeholder="160"
              className="h-11 w-full rounded-xl border border-[#ece7ff] bg-[#faf8ff] px-4 text-sm outline-none focus:border-violet-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#736a92]">
              Carbs (g)
            </label>

            <input
              type="number"
              value={plan?.daily_carbs ?? ""}
              onChange={(e) =>
                setPlan({
                  ...plan,
                  daily_carbs: e.target.value,
                })
              }
              placeholder="220"
              className="h-11 w-full rounded-xl border border-[#ece7ff] bg-[#faf8ff] px-4 text-sm outline-none focus:border-violet-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#736a92]">
              Fat (g)
            </label>

            <input
              type="number"
              value={plan?.daily_fat ?? ""}
              onChange={(e) =>
                setPlan({
                  ...plan,
                  daily_fat: e.target.value,
                })
              }
              placeholder="60"
              className="h-11 w-full rounded-xl border border-[#ece7ff] bg-[#faf8ff] px-4 text-sm outline-none focus:border-violet-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-[#736a92]">
              Water (L)
            </label>

            <input
              type="number"
              step="0.1"
              value={plan?.daily_water ?? ""}
              onChange={(e) =>
                setPlan({
                  ...plan,
                  daily_water: e.target.value,
                })
              }
              placeholder="2.5"
              className="h-11 w-full rounded-xl border border-[#ece7ff] bg-[#faf8ff] px-4 text-sm outline-none focus:border-violet-400"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-xs font-medium text-[#736a92]">
            Coach Notes
          </label>

          <textarea
            rows={5}
            value={plan?.coach_notes ?? ""}
            onChange={(e) =>
              setPlan({
                ...plan,
                coach_notes: e.target.value,
              })
            }
            placeholder="Write personalized recommendations for your client..."
            className="w-full resize-none rounded-2xl border border-[#ece7ff] bg-[#faf8ff] p-4 text-sm outline-none focus:border-violet-400"
          />
        </div>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-2 text-[11px] tracking-[0.3em] text-[#8d84b3] uppercase">
            Nutrition Plan
          </p>

          <h1 className="text-4xl leading-none font-black tracking-tight text-[#1d1135] md:text-5xl">
            {plan.name}
          </h1>

          <p className="mt-3 text-sm text-[#736a92] capitalize">
            {plan.plan_type}
          </p>
        </div>

        <button
          className="transition-all duration-150 active:scale-95 h-11 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20"
          onClick={() => {
            const nextDay = days.length ? Math.max(...days) + 1 : 1;

            setDays((prev) => [...prev, nextDay]);
            setTimeout(() => {
                dayRefs.current[nextDay]?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }, 50);
            }}
        >
          + Add Day
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {days.map((day) => {
          const mealsForDay = meals.filter((m) => m.day_number === Number(day));

          const totalCalories = mealsForDay.reduce(
  (sum, meal) =>
    sum +
    meal.foods.reduce(
      (foodSum, food) =>
        foodSum + food.grams * (food.food_norm?.calories_per_g || 0),
      0
    ),
  0
);

const totalProtein = mealsForDay.reduce(
  (sum, meal) =>
    sum +
    meal.foods.reduce(
      (foodSum, food) =>
        foodSum + food.grams * (food.food_norm?.protein_per_g || 0),
      0
    ),
  0
);

const totalCarbs = mealsForDay.reduce(
  (sum, meal) =>
    sum +
    meal.foods.reduce(
      (foodSum, food) =>
        foodSum + food.grams * (food.food_norm?.carbs_per_g || 0),
      0
    ),
  0
);

const totalFat = mealsForDay.reduce(
  (sum, meal) =>
    sum +
    meal.foods.reduce(
      (foodSum, food) =>
        foodSum + food.grams * (food.food_norm?.fat_per_g || 0),
      0
    ),
  0
);

          return (
            <div
              key={day}
              ref={(el) => dayRefs.current[day] = el}
              className="overflow-hidden rounded-[26px]  bg-white shadow-[0_6px_24px_rgba(0,0,0,0.03)]"
            >
            <div className="flex items-center justify-between border-b border-[#fafafa] bg-gradient-to-r from-[#d6cdf3] to-white px-5 py-4">
                  <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#bdabe5] to-[#8b5cf6] text-sm font-bold text-white shadow-[0_6px_16px_rgba(255,140,80,0.18)]">
                      {day}
                    </div>

                    <div>
                      <p className="text-[11px] tracking-[0.16em] text-[#8b5cf6] uppercase">
                        Nutrition Day
                      </p>

                      <h2
                        className="text-lg font-bold text-[#1d1135]"
                        style={{ fontFamily: "Plus Jakarta Sans" }}
                      >
                        Day {day}
                      </h2>
                    </div>          </div>

          <div className="rounded-xl bg-[#f5efff] px-3 py-2 text-[11px] font-semibold text-[#8b5cf6]">
              {mealsForDay.length} {mealsForDay.length === 1 ? "meal" : "meals"}

              <p className="mt-2 text-xs text-[#5b21b6]">
                {totalCalories.toFixed(0)} kcal ·{" "}
                {totalProtein.toFixed(0)}P ·{" "}
                {totalCarbs.toFixed(0)}C ·{" "}
                {totalFat.toFixed(0)}F
              </p>
          </div>        
        </div>


              <div className="mb-5 flex gap-2 mt-2 ml-1 mr-1">
                <input
                  className="h-10 w-full rounded-xl border border-[#ece7ff] bg-[#faf8ff] px-3 text-sm outline-none"
                  placeholder="New meal..."
                  value={newMealNames[day] || ""}
                  onChange={(e) => handleMealInputChange(day, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddMealForDay(day);
                    }
                  }}
                />

                <button
                  className="transition-all duration-150 active:scale-95 h-10 min-w-[40px] rounded-xl bg-[#6d3df5] font-bold text-white"
                  onClick={() => handleAddMealForDay(day)}
                >
                  +
                </button>
              </div>

              <div className="space-y-4">
                {mealsForDay.map((meal) => (
                  <div
                    key={meal.id}
                    className="group rounded-2xl border border-[#f1edff] bg-[#fcfbff] p-4"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex-1">
                        {editingMealId === meal.id ? (
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            onBlur={() => handleSaveEdit(meal.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                e.target.blur();
                              }
                            }}
                            className="h-9 w-full rounded-lg border border-[#ece7ff] px-3 text-sm outline-none"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center justify-between gap-3">
                            <h3
                              className="cursor-pointer text-base font-bold text-[#1d1135]"
                              onClick={() => handleStartEdit(meal)}
                            >
                              {meal.name}
                            </h3>

                            <p className="text-xs font-semibold whitespace-nowrap text-[#6d3df5]">
                              {meal.total_calories} kcal
                            </p>
                          </div>
                        )}
                      </div>

                      <button
                        className="transition-all duration-150 active:scale-95 text-[11px] text-red-500 opacity-0 transition group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMeal(meal.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>

                    <div className="space-y-2">



                      
                        {meal.foods?.map((food) => (
                          <div
                            key={food.id}
                            className="flex items-center justify-between gap-3 rounded-xl border border-[#f3efff] bg-white px-3 py-2"
                          >
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                              <p className="truncate text-sm font-medium text-[#251742]">
                                {capitalize(food.food_norm.name)}
                              </p>

                              <p className="text-xs whitespace-nowrap text-[#7b7297]">
                                {Math.round(
                                  food.food_norm.calories_per_g * food.grams,
                                )}{" "}
                                kcal
                              </p>
                            </div>

                            <div className="flex items-center gap-2">
                              <input
                                type="number"
                                defaultValue={food.grams}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleUpdateFoodGrams(
                                      food.id,
                                      e.target.value,
                                    );

                                    e.target.blur();
                                  }
                                }}
                                className="h-8 w-16 rounded-lg border border-[#ece7ff] bg-[#faf8ff] px-2 text-xs outline-none"
                              />

                              <span className="text-[11px] text-gray-500">g</span>

                              <button
                                className="transition-all duration-150 active:scale-95 text-[11px] text-red-500 opacity-0 transition group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteFood(food.id);
                                }}
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {meal.foods.length === 0 && (
                      <div className="rounded-xl border border-dashed border-[#9b79f7] bg-[#f3efff] px-4 py-3 text-sm text-[#6d3df5]">
                            No foods added yet.
                          </div>
                    )}

                    <div className="mt-4">
                      <div className="relative">
                        <input
                          className="h-10 w-full rounded-xl border border-[#ece7ff] bg-white px-3 text-sm outline-none"
                          type="text"
                          placeholder="Search food..."
                          value={foodSearch[meal.id] || ""}
                          onChange={(e) => {
                            setFoodSearch((prev) => ({
                              ...prev,
                              [meal.id]: e.target.value,
                            }));

                            setOpenDropdown((prev) => ({
                              ...prev,
                              [meal.id]: true,
                            }));
                          }}
                        />

                        {openDropdown[meal.id] &&
                          foodSearch[meal.id]?.length >= 2 && (
                            <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-[#ece7ff] bg-white shadow-xl">
                              {filteredFoods(meal.id).map((food) => (
                                <div
                                  className="cursor-pointer px-3 py-2 text-sm hover:bg-[#f7f4ff]"
                                  key={food.id}
                                  onClick={() => {
                                    setSelectedFoods((prev) => ({
                                      ...prev,
                                      [meal.id]: food.id,
                                    }));

                                    setOpenDropdown((prev) => ({
                                      ...prev,
                                      [meal.id]: false,
                                    }));

                                    setFoodSearch((prev) => ({
                                      ...prev,
                                      [meal.id]: food.name,
                                    }));
                                  }}
                                >
                                  {capitalize(food.name)}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>

                      <div className="mt-2 flex gap-2">
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
                          className="h-10 w-20 rounded-xl border border-[#ece7ff] bg-white px-3 text-sm outline-none"
                        />

                        <button
                          className="transition-all duration-150 active:scale-95 h-10 rounded-xl bg-[#f3efff] px-4 text-sm font-medium text-[#6d3df5] transition hover:bg-[#ebe4ff]"
                          onClick={() => handleAddFood(meal.id)}
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowFoodModal(true)}
                          className="transition-all duration-150 active:scale-95 h-10 rounded-xl bg-[#f3efff] px-4 text-sm font-medium text-[#6d3df5] transition hover:bg-[#ebe4ff]"
                        >
                          Create food
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <FoodModal
          isOpen={showFoodModal}
          onClose={() => setShowFoodModal(false)}
          onSuccess={loadFoods}
        ></FoodModal>
      </div>
      <Toast
          show={showToast}
          title="Saved successfully"
          message="Nutrition Targets Updated"
        />
    </Layout>
  );
}

export default PlanDetails;
