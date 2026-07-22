import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PlanDetails from "./pages/PlanDetails";
import ClientDetails from "./pages/ClientDetails";
import AcceptInvite from "./pages/AcceptInvite";
import ClientWelcome from "./pages/ClientWelcome";
import ClientDashboard from "./pages/ClientDashboard";
import ClientPlanDetails from "./pages/ClientPlanDetails";
import EmailForm from "./pages/EmailForm";
import Features from "./pages/Features";
import FoodList from "./pages/FoodList";
import Questionnaire from "./pages/Questionnaire";
import QuestionnaireSubmitted from "./pages/QuestionnaireSubmitted";
import QuestionnaireExpired from "./pages/QuestionnaireExpired";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/client-welcome" element={<ClientWelcome />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route
          path="/client-plans/:id"
          element={
            <ProtectedRoute>
              <ClientPlanDetails />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/plans/:id"
          element={
            <ProtectedRoute>
              <PlanDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/:id"
          element={
            <ProtectedRoute>
              <ClientDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/invite/:token" element={<AcceptInvite />} />
        <Route path="/email-form" element={<EmailForm />} />
        <Route path="/features" element={<Features />} />
        <Route path="/foods" element={<FoodList />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/submitted" element={<QuestionnaireSubmitted />} />
        <Route path="/questionnaire-expired" element={<QuestionnaireExpired />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
