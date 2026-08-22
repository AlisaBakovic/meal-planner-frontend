import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClientQuestionnaire } from "../services/questionnaireService";
import LoadingScreen from "../components/LoadingScreen";
import QuestionnaireSummary from "../components/questionnaire/QuestionnaireSummary";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function QuestionnaireReport() {
  const [questionnaireData, setQuestionnaireData] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getClientQuestionnaire(id);
    setQuestionnaireData(data);
  };

  if (!questionnaireData) {
    return <LoadingScreen />;
  }

  return (
    <Layout mode="trainer">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[32px] border border-white/40 bg-white/70 p-8 backdrop-blur-xl md:p-14">
          <div className="mx-auto max-w-3xl space-y-6">
            <p className="text-center text-sm tracking-[0.18em] text-[#9b6cff] uppercase">
              Client Report
            </p>

            <h2
              className="text-center text-4xl font-bold text-[#24163b]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              Nutrition Questionnaire
            </h2>

            <div className="mx-auto mt-5 mb-8 h-1 w-16 rounded-full bg-[#9b6cff]" />

            <p className="mt-4 mb-10 text-center text-[#8d87a1]">
              Review your client's submitted questionnaire before creating a
              personalized nutrition plan.
            </p>

            <QuestionnaireSummary answers={questionnaireData.answers} />

            <div className="rounded-2xl border border-[#ece8ff] bg-[#f7f3ff] p-5">
              <p className="text-[#6f6887]">
                This questionnaire has already been submitted by your client.
              </p>
            </div>

            <div className="mt-10 flex justify-center border-t border-[#ece8ff] pt-8">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Back to Client
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default QuestionnaireReport;
