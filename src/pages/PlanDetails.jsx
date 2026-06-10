import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getPlanById,
  getMeals,
  createMeal,
  deleteMeal,
  updateMeal,
} from "../services/planService";

import {
  addFoodToMeal,
  getFoods,
  deleteFood,
  updateFoodGrams,
} from "../services/foodService";

import Layout from "../components/Layout";

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

  useEffect(() => {
    const fetchPlan = async () => {
      const planData = await getPlanById(id);

      if (!planData) return;

      setPlan(planData);

      const mealsData = await getMeals(id);
      setMeals(mealsData);

      const foodsData = await getFoods();
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
      prev.map((m) =>
        m.id === mealId ? { ...m, name: editName } : m
      )
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
    const updatedMeal = await updateFoodGrams(
      foodId,
      Number(grams)
    );

    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === updatedMeal.id
          ? updatedMeal
          : meal
      )
    );
  };

  const filteredFoods = (mealId) => {
    const search = foodSearch[mealId]?.toLowerCase() || "";

    return foodOptions.filter((food) =>
      food.name.toLowerCase().includes(search)
    );
  };
  

  return (
    <Layout>
      
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#8d84b3] mb-2">
              Nutrition Plan
            </p>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#1d1135] leading-none">
              {plan.name}
            </h1>

            <p className="text-sm text-[#736a92] mt-3 capitalize">
              {plan.plan_type}
            </p>
          </div>

          <button
            className="h-11 px-5 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/20"
            onClick={() => {
              const nextDay = days.length ? Math.max(...days) + 1 : 1;

              setDays((prev) => [...prev, nextDay]);
            }}
          >
            + Add Day
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
          {days.map((day) => {
            const mealsForDay = meals.filter(
              (m) => m.day_number === Number(day)
            );

            return (
              <div
                key={day}
                className="rounded-[30px] bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_10px_35px_rgba(0,0,0,0.05)] p-5"
              >
                <div className="mb-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#8d84b3] mb-1">
                    Schedule
                  </p>

                  <h2 className="text-2xl font-black tracking-tight text-[#1d1135]">
                    {getDateLabel(Number(day))}
                  </h2>
                </div>

                <div className="flex gap-2 mb-5">
                  <input
                    className="h-10 w-full rounded-xl bg-[#faf8ff] border border-[#ece7ff] px-3 text-sm outline-none"
                    placeholder="New meal..."
                    value={newMealNames[day] || ""}
                    onChange={(e) =>
                      handleMealInputChange(day, e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddMealForDay(day);
                      }
                    }}
                  />

                  <button
                    className="min-w-[40px] h-10 rounded-xl bg-[#6d3df5] text-white font-bold"
                    onClick={() => handleAddMealForDay(day)}
                  >
                    +
                  </button>
                </div>

                <div className="space-y-4">
                  {mealsForDay.map((meal) => (
                    <div
                      key={meal.id}
                      className="rounded-2xl bg-[#fcfbff] border border-[#f1edff] p-4 group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex-1">
                          {editingMealId === meal.id ? (
                            <input
                              value={editName}
                              onChange={(e) =>
                                setEditName(e.target.value)
                              }
                              onBlur={() =>
                                handleSaveEdit(meal.id)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleSaveEdit(meal.id);
                                }
                              }}
                              className="w-full h-9 rounded-lg border border-[#ece7ff] px-3 text-sm outline-none"
                              autoFocus
                            />
                          ) : (
                            <div className="flex items-center justify-between gap-3">
                              <h3
                                className="text-base font-bold text-[#1d1135] cursor-pointer"
                                onClick={() =>
                                  handleStartEdit(meal)
                                }
                              >
                                {meal.name}
                              </h3>

                              <p className="text-xs font-semibold text-[#6d3df5] whitespace-nowrap">
                                {meal.total_calories} kcal
                              </p>
                            </div>
                          )}
                        </div>

                        <button
                          className="text-[11px] text-red-500 opacity-0 group-hover:opacity-100 transition"
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
                            className="flex items-center justify-between gap-3 rounded-xl bg-white border border-[#f3efff] px-3 py-2"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#251742] truncate">
                                {food.food_norm.name}
                              </p>

                              <p className="text-xs text-[#7b7297] whitespace-nowrap">
                                {Math.round(food.food_norm.calories_per_g * food.grams)} kcal
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
                                      e.target.value
                                    );

                                    e.target.blur();
                                  }
                                }}
                                className="h-8 w-16 rounded-lg border border-[#ece7ff] bg-[#faf8ff] px-2 text-xs outline-none"
                              />

                              <span className="text-[11px] text-gray-500">
                                g
                              </span>

                              <button
                                className="text-[11px] text-red-500 opacity-0 group-hover:opacity-100 transition"
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

                      <div className="mt-4">
                        <div className="relative">
                          <input
                            className="h-10 w-full rounded-xl bg-white border border-[#ece7ff] px-3 text-sm outline-none"
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
                              <div className="absolute z-10 w-full mt-1 rounded-xl bg-white border border-[#ece7ff] shadow-xl max-h-48 overflow-y-auto">
                                {filteredFoods(meal.id).map(
                                  (food) => (
                                    <div
                                      className="px-3 py-2 hover:bg-[#f7f4ff] cursor-pointer text-sm"
                                      key={food.id}
                                      onClick={() => {
                                        setSelectedFoods(
                                          (prev) => ({
                                            ...prev,
                                            [meal.id]: food.id,
                                          })
                                        );

                                        setOpenDropdown(
                                          (prev) => ({
                                            ...prev,
                                            [meal.id]: false,
                                          })
                                        );

                                        setFoodSearch(
                                          (prev) => ({
                                            ...prev,
                                            [meal.id]: food.name,
                                          })
                                        );
                                      }}
                                    >
                                      {food.name}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                        </div>

                        <div className="flex gap-2 mt-2">
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
                            className="h-10 px-4 rounded-xl bg-[#f3efff] text-[#6d3df5] text-sm font-medium hover:bg-[#ebe4ff] transition"
                            onClick={() =>
                              handleAddFood(meal.id)
                            }
                          >
                            Add food
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      
    </Layout>
  );
}

export default PlanDetails;