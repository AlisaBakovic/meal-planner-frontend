import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";

function QuestionnaireExpired() {
  const navigate = useNavigate();

  return (
    <Layout mode="client">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-10 md:p-16 text-center">

          <p className="text-sm uppercase tracking-[0.18em] text-[#9b6cff]">
            Questionnaire
          </p>

          <div className="w-20 h-20 mx-auto mt-8 rounded-full bg-[#fff7eb] border border-[#ffe4b8] flex items-center justify-center">
            <span className="text-4xl">⏳</span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-[#24163b] mt-8"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Editing Period Expired
          </h1>

          <div className="w-16 h-1 bg-[#9b6cff] rounded-full mx-auto mt-6 mb-8" />

          <p className="text-lg text-[#8d87a1] leading-8 max-w-2xl mx-auto">
            The 24-hour editing period has ended.
            Your questionnaire has been locked and sent to your trainer for review.
          </p>

          <div className="mt-10 rounded-3xl bg-[#f7f3ff] border border-[#ece8ff] p-6 text-left">

            <h3 className="text-lg font-semibold text-[#24163b] mb-3">
              What happens next?
            </h3>

            <ul className="space-y-3 text-[#6f6887]">
              <li>• Your trainer can review your answers.</li>
              <li>• A personalized nutrition plan will be created.</li>
              <li>• If you need changes, contact your trainer directly.</li>
            </ul>

          </div>

          <div className="mt-12 flex justify-center">
            <Button onClick={() => navigate("/client-welcome")}>
              Back to Dashboard
            </Button>
          </div>

        </div>

      </div>
    </Layout>
  );
}

export default QuestionnaireExpired;