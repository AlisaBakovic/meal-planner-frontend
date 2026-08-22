import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";

function QuestionnaireExpired() {
  const navigate = useNavigate();

  return (
    <Layout mode="client">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[32px] border border-white/40 bg-white/70 p-10 text-center backdrop-blur-xl md:p-16">
          <p className="text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
            Questionnaire
          </p>

          <div className="mx-auto mt-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#ffe4b8] bg-[#fff7eb]">
            <span className="text-4xl">⏳</span>
          </div>

          <h1
            className="mt-8 text-4xl font-bold text-[#24163b] md:text-5xl"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Editing Period Expired
          </h1>

          <div className="mx-auto mt-6 mb-8 h-1 w-16 rounded-full bg-[#9b6cff]" />

          <p className="mx-auto max-w-2xl text-lg leading-8 text-[#8d87a1]">
            The 24-hour editing period has ended. Your questionnaire has been
            locked and sent to your trainer for review.
          </p>

          <div className="mt-10 rounded-3xl border border-[#ece8ff] bg-[#f7f3ff] p-6 text-left">
            <h3 className="mb-3 text-lg font-semibold text-[#24163b]">
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
