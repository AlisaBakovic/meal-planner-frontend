import { useState } from "react";
import { createFood } from "../services/foodService";

function FoodModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) {
    return null;
  }
  const handleCreateFood = async () => {
    setLoading(true);

    if (!name.trim() || !calories || !protein || !carbs || !fat) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      setError("");
      await createFood({
        name,
        calories,
        protein,
        carbs,
        fat,
      });
      onSuccess();

      setName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");

      onClose();
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[32px] border border-white/30 bg-white/80 p-8 shadow-[0_20px_60px_rgba(31,38,135,0.15)] backdrop-blur-2xl">
        <div className="mb-8">
          <h2
            className="text-3xl font-bold text-[#24163b]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Create Food
          </h2>

          <p className="mt-2 text-[#8d87a1]">
            Add a custom food item to your nutrition database.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-full border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
          />

          <input
            type="number"
            placeholder="Calories per 100g"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full rounded-full border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
          />

          <input
            type="number"
            placeholder="Protein per 100g"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full rounded-full border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
          />

          <input
            type="number"
            placeholder="Carbs per 100g"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            className="w-full rounded-full border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
          />

          <input
            type="number"
            placeholder="Fat per 100g"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            className="w-full rounded-full border border-white/40 bg-white/60 px-5 py-4 text-[#24163b] backdrop-blur-xl transition-all outline-none placeholder:text-[#8d87a1] focus:border-[#9b6cff] focus:ring-4 focus:ring-[#9b6cff]/15"
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl bg-gray-100 px-5 py-3 transition-all hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateFood}
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-[#9b6cff] to-[#7b4dff] px-6 py-3 font-medium text-white shadow-[0_10px_30px_rgba(123,77,255,0.25)] transition-all hover:scale-[1.02]"
          >
            {loading ? "Creating..." : "Create Food"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default FoodModal;
