import { useEffect, useState } from "react";
import {
    getQuestionnaire,
    createQuestionnaire,
    updateQuestionnaire,
} from "../services/questionnaireService";
import Layout from "../components/Layout";
import WelcomeSlide from "../components/questionnaire/WelcomeSlide";
import BasicInfoSlide from "../components/questionnaire/BasicInfoSlide";
import GoalSlide from "../components/questionnaire/GoalSlide";
import LifestyleSlide from "../components/questionnaire/LifeStyle";
import HealthSlide from "../components/questionnaire/HealthSlide";
import PreferencesSlide from "../components/questionnaire/PreferencesSlide";
import ProgressBar from "../components/questionnaire/ProgressBar";
import NotesSlide from "../components/questionnaire/NotesSlide";
import { useNavigate } from "react-router-dom";
import SummarySlide from "../components/questionnaire/SummarySlide";
import { AnimatePresence } from "framer-motion";
import AnimatedSlide from "../components/questionnaire/AnimatedSlide";



function Questionnaire () {

const [step, setStep] = useState(0)
const [loading, setLoading] = useState(true)
const [questionnaireExists, setQuestionnaireExists] = useState(false)
const [answers, setAnswers] = useState({
  basic_info: {
        age: "",
        gender: "",
        height: "",
        current_weight: "",
        target_weight: ""
    },
    goal: {
        primary_goal: ""
    },

    lifestyle: {
        activity_level: "",
        meals_per_day: "",
        water_intake: "",
        sleep_hours: ""
    },

    health: {
        allergies: "",
        medical_conditions: "",
        medications: "",
        injuries: ""
    },

    preferences: {
      diet_type: "",
      disliked_foods: ""
    },

    notes: {
        additional_notes: ""
    }
});

const navigate = useNavigate();

const handleSubmit = async () => {

  if(questionnaireExists) {

  const result = await updateQuestionnaire(answers);

    if (result.error === "editing_expired") {
      navigate("/questionnaire-expired");
      return;
    }
  } else {
            await createQuestionnaire(answers);
        }
        navigate("/submitted")
    };


const loadData = async () => {
  setLoading(true)

  try {
    const data = await getQuestionnaire();

    if (data.answers) {

      const editableUntil = new Date(data.editable_until);
      const now = new Date();

      if (editableUntil < now) {
        navigate("/questionnaire-expired");
        return;
      }
      setAnswers(data.answers);
      setQuestionnaireExists(true)
    }
  }
  catch (error) {
  console.error("Failed to load questionnaire:", error);
} finally {
    setLoading(false);
  }
};

useEffect (() => {
    loadData(true)
}, [])
     
  return (
    <Layout mode="client">

      <ProgressBar
        step={step}
        totalSteps={7}
      />
  <AnimatePresence mode="wait">
    <AnimatedSlide key={step}>
      {step === 0 && (<WelcomeSlide onNext={() => setStep(1)} />)}
      {step === 1 && (<BasicInfoSlide 
        answers={answers}
        setAnswers={setAnswers}
        onNext={() => setStep(2)}
        onBack={() => setStep(0)}  />)}
      {step === 2 && (<GoalSlide 
          answers={answers}
          setAnswers={setAnswers}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)} />)}
      {step === 3 && (<LifestyleSlide 
          answers={answers}
          setAnswers={setAnswers}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
          />)}
      {step === 4 && (<HealthSlide 
          answers={answers}
          setAnswers={setAnswers}
          onNext={() => setStep(5)}
          onBack={() => setStep(3)}
           />)}
      {step === 5 && (<PreferencesSlide 
          answers={answers}
          setAnswers={setAnswers}
          onNext={() => setStep(6)}
          onBack={() => setStep(4)}
          />)}
      {step === 6 && (<NotesSlide 
          answers={answers}
          setAnswers={setAnswers}
          onNext={() => setStep(7)}
          onBack={() => setStep(5)}
          />)}
      {step === 7 && (<SummarySlide 
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={handleSubmit}
          onBack={() => setStep(6)} 
          />)}
    </AnimatedSlide>
      
       </AnimatePresence>
    </Layout>
    
  );
}

export default Questionnaire