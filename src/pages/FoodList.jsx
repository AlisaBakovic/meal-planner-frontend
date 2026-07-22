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
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff] mb-3">
            Nutrition Database
          </p>

          <h1
            className="text-5xl font-bold text-[#24163b]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Food List
          </h1>

          <p className="text-[#8d87a1] mt-3">
            Manage all available foods and create custom items.
          </p>
        </div>

        <div className="flex flex-col items-center gap-5 mb-12">
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-white/40 bg-white/60 backdrop-blur-xl px-5 py-4 outline-none text-[#24163b] placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15 transition-all"
          />

          <Button
            onClick={() => {
              setShowFoodModal(true);
            }}
          >
            + Add Food
          </Button>
        </div>

        <div className="mb-6 flex justify-between items-center"></div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <div>
            {defaultFoods.length > 0 && (
              <div>
                <div
                  onClick={() => setExpandedDeafaultList(!expandedDefaultList)}
                  className="flex items-center justify-between mb-4 cursor-pointer bg-white/60 rounded-2xl px-5 py-4 border border-white/40"
                >
                  <div className="flex items-center gap-3">
                    <h2
                      className="text-2xl font-semibold text-[#24163b]"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      Default Foods
                    </h2>

                    <div className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">
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
                        className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setExpandedFood(
                              expandedFood === food.id ? null : food.id,
                            )
                          }
                          className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-[#24163b]">
                              {food.name}
                            </h3>

                            <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
                              Default
                            </span>
                          </div>

                          <span className="text-[#8b5cf6] text-xl">
                            {expandedFood === food.id ? "−" : "+"}
                          </span>
                        </button>

                        {expandedFood === food.id && (
                          <div className="border-t border-white/30 px-5 py-4 bg-white/40">
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
                className="flex items-center justify-between mb-4 cursor-pointer bg-white/60 rounded-2xl px-5 py-4 border border-white/40">
                  <div className="flex items-center gap-3">
                    <h2
                      className="text-2xl font-semibold text-[#24163b]"
                      style={{ fontFamily: "Plus Jakarta Sans" }}
                    >
                      My Foods
                    </h2>

                    <div className="px-4 py-2  rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">
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
                      className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-5 py-4">
                        <button
                          onClick={() =>
                            setExpandedFood(
                              expandedFood === food.id ? null : food.id,
                            )
                          }
                          className="flex items-center justify-between flex-1 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-[#24163b]">
                              {food.name}
                            </h3>

                            <span className="px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-xs">
                              Custom
                            </span>
                          </div>

                          <span className="text-[#8b5cf6] text-xl mr-4">
                            {expandedFood === food.id ? "−" : "+"}
                          </span>
                        </button>

                        <button
                          onClick={() => handleDeleteFood(food.id)}
                          className="text-red-500 text-sm font-medium hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>

                      {expandedFood === food.id && (
                        <div className="border-t border-white/30 px-5 py-4 bg-white/40">
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
