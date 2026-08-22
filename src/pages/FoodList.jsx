import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import FoodModal from "../components/FoodModal";
import { deleteFoodNorm, getFoods } from "../services/foodService";

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedFood, setExpandedFood] = useState(null);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [expandedDefaultList, setExpandedDeafaultList] = useState(true);
  const [expandedMyFoodList, setExpandedMyFoodList] = useState(true);

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const loadFoods = async () => {
    setLoading(true);

    try {
      const data = await getFoods();

      if (data) {
        setFoods(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteFood = async (foodId) => {
    const success = await deleteFoodNorm(foodId);

    if (success) {
      loadFoods();
    }
  };

  const customFoods = filteredFoods.filter((food) => food.created_by);
  const defaultFoods = filteredFoods.filter((food) => !food.created_by);

  return (
    <Layout>
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
            Nutrition Database
          </p>

          <h1
            className="text-5xl font-bold text-[#24163b]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Food List
          </h1>

          <p className="mt-3 text-[#8d87a1]">
            Manage all available foods and create custom items.
          </p>
        </div>

        <div className="mb-12 flex flex-col items-center gap-5">
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
          />

          <Button
            onClick={() => {
              setShowFoodModal(true);
            }}
          >
            + Add Food
          </Button>
        </div>

        <div className="mb-6 flex items-center justify-between"></div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <div>
            {defaultFoods.length > 0 && (
              <div>
                <div
                  onClick={() => setExpandedDeafaultList(!expandedDefaultList)}
                  className="mb-4 flex cursor-pointer items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <h2
                      className="text-2xl font-semibold text-[#24163b]"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Default Foods
                    </h2>

                    <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                      {defaultFoods.length}
                    </div>
                  </div>
                  <span className="text-2xl text-[#8b5cf6]">
                    {expandedDefaultList ? "-" : "+"}
                  </span>
                </div>

                {expandedDefaultList && (
                  <div className="space-y-3">
                    {defaultFoods.map((food) => (
                      <div
                        key={food.id}
                        className="overflow-hidden rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl"
                      >
                        <button
                          onClick={() =>
                            setExpandedFood(
                              expandedFood === food.id ? null : food.id,
                            )
                          }
                          className="flex w-full cursor-pointer items-center justify-between px-5 py-4"
                        >
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-[#24163b]">
                              {capitalize(food.name)}
                            </h3>

                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                              Default
                            </span>
                          </div>

                          <span className="text-xl text-[#8b5cf6]">
                            {expandedFood === food.id ? "−" : "+"}
                          </span>
                        </button>

                        {expandedFood === food.id && (
                          <div className="border-t border-white/30 bg-white/40 px-5 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-[#8d87a1] uppercase">
                                  Calories
                                </p>
                                <p className="font-semibold">
                                  {Math.round(food.calories_per_g * 100)}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-[#8d87a1] uppercase">
                                  Protein
                                </p>
                                <p className="font-semibold">
                                  {Math.round(food.protein_per_g * 100)}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-[#8d87a1] uppercase">
                                  Carbs
                                </p>
                                <p className="font-semibold">
                                  {Math.round(food.carbs_per_g * 100)}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-[#8d87a1] uppercase">
                                  Fat
                                </p>
                                <p className="font-semibold">
                                  {Math.round(food.fat_per_g * 100)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            {customFoods.length > 0 && (
              <div>
                <div
                  onClick={() => setExpandedMyFoodList(!expandedMyFoodList)}
                  className="mb-4 flex cursor-pointer items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <h2
                      className="text-2xl font-semibold text-[#24163b]"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      My Foods
                    </h2>

                    <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                      {customFoods.length}
                    </div>
                  </div>
                  <span className="text-2xl text-[#8b5cf6]">
                    {expandedMyFoodList ? "-" : "+"}
                  </span>
                </div>

                {expandedMyFoodList && (
                  <div className="space-y-3">
                    {customFoods.map((food) => (
                      <div
                        key={food.id}
                        className="overflow-hidden rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl"
                      >
                        <div className="flex items-center justify-between px-5 py-4">
                          <button
                            onClick={() =>
                              setExpandedFood(
                                expandedFood === food.id ? null : food.id,
                              )
                            }
                            className="flex flex-1 cursor-pointer items-center justify-between transition-all duration-150 active:scale-95"
                          >
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-[#24163b]">
                                {capitalize(food.name)}
                              </h3>

                              <span className="rounded-full bg-violet-100 px-2 py-1 text-xs text-violet-700">
                                Custom
                              </span>
                            </div>

                            <span className="mr-4 text-xl text-[#8b5cf6]">
                              {expandedFood === food.id ? "−" : "+"}
                            </span>
                          </button>

                          <button
                            onClick={() => handleDeleteFood(food.id)}
                            className="text-sm font-medium text-red-500 transition-all duration-150 hover:text-red-600 active:scale-95"
                          >
                            Delete
                          </button>
                        </div>

                        {expandedFood === food.id && (
                          <div className="border-t border-white/30 bg-white/40 px-5 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-[#8d87a1] uppercase">
                                  Calories
                                </p>
                                <p className="font-semibold">
                                  {Math.round(food.calories_per_g * 100)}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-[#8d87a1] uppercase">
                                  Protein
                                </p>
                                <p className="font-semibold">
                                  {Math.round(food.protein_per_g * 100)}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-[#8d87a1] uppercase">
                                  Carbs
                                </p>
                                <p className="font-semibold">
                                  {Math.round(food.carbs_per_g * 100)}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs text-[#8d87a1] uppercase">
                                  Fat
                                </p>
                                <p className="font-semibold">
                                  {Math.round(food.fat_per_g * 100)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <FoodModal
          isOpen={showFoodModal}
          onClose={() => setShowFoodModal(false)}
          onSuccess={loadFoods}
        />
      </div>
    </Layout>
  );
}

export default FoodList;
