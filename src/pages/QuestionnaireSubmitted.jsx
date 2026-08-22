import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";

function QuestionnaireSubmitted() {
  const navigate = useNavigate();

  return (
    <Layout mode="client">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[32px] border border-white/40 bg-white/70 p-10 text-center backdrop-blur-xl md:p-16">
          <p className="text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
            Questionnaire
          </p>

          <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#ece8ff] bg-[#f7f3ff]">
            <svg
              className="h-10 w-10 text-[#9b6cff]"
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
            className="mt-8 text-4xl font-bold text-[#24163b] md:text-5xl"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Questionnaire Submitted
          </h1>

          <div className="mx-auto mt-6 mb-8 h-1 w-16 rounded-full bg-[#9b6cff]" />

          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#8d87a1]">
            Thank you for completing your nutrition questionnaire. Your trainer
            will review your answers and create a personalized nutrition plan
            based on your goals, lifestyle and preferences.
          </p>

          <div className="mt-10 rounded-3xl border border-[#ece8ff] bg-[#f7f3ff] p-6 text-left">
            <h3 className="mb-3 text-lg font-semibold text-[#24163b]">
              What's next?
            </h3>

            <ul className="space-y-3 text-[#6f6887]">
              <li>• Your trainer will review your questionnaire</li>
              <li>• A personalized meal plan will be created for you</li>
              <li>
                • You can edit your questionnaire during the next 24 hours
              </li>
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
