import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";

function QuestionnaireSubmitted() {
  const navigate = useNavigate();

  return (
    <Layout mode="client">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-10 md:p-16 text-center">

          <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff]">
            Questionnaire
          </p>

          <div className="w-20 h-20 mx-auto mt-8 rounded-full bg-[#f7f3ff] border border-[#ece8ff] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#9b6cff]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-[#24163b] mt-8"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Questionnaire Submitted
          </h1>

          <div className="w-16 h-1 bg-[#9b6cff] rounded-full mx-auto mt-6 mb-8" />

          <p className="text-lg text-[#8d87a1] leading-8 max-w-2xl mx-auto">
            Thank you for completing your nutrition questionnaire.
            Your trainer will review your answers and create a
            personalized nutrition plan based on your goals,
            lifestyle and preferences.
          </p>

          <div className="mt-10 rounded-3xl bg-[#f7f3ff] border border-[#ece8ff] p-6 text-left">

            <h3 className="text-lg font-semibold text-[#24163b] mb-3">
              What's next?
            </h3>

            <ul className="space-y-3 text-[#6f6887]">
              <li>• Your trainer will review your questionnaire</li>
              <li>• A personalized meal plan will be created for you</li>
              <li>• You can edit your questionnaire during the next 24 hours</li>
            </ul>

          </div>

          
            <div className="mt-12 flex justify-center">
                <Button onClick={() => navigate("/client-dashboard")}>
                    Go to Dashboard
                </Button>
            </div>

        </div>

      </div>
    </Layout>
  );
}

export default QuestionnaireSubmitted;