import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"
import PrivateRoutes from "./utils/PrivateRoutes"
import NavBar from './components/navigation/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ActivatePage from './pages/ActivatePage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ResetPasswordConfirmPage from './pages/ResetPasswordConfirmPage'
import NotFoundPage from "./pages/notFoundPage"
import DashboardPage from "./pages/DashboardPage"
import MyProfilePage from "./pages/MyProfilePage"
import QuizHomePage from "./pages/quiz/QuizHomePage"
import QuizOfflineDashboardPage from "./pages/quiz/QuizOfflineDashboardPage"
import QuizGamePage from "./pages/quiz/QuizGamePage"
import MyQuizzesPage from "./pages/quiz/MyQuizzesPage"
import CreateQuizPage from "./pages/quiz/CreateQuizPage"
import ScorePage from "./pages/quiz/ScorePage"
import QuizAnswersPage from "./pages/quiz/QuizAnswersPage"

function App() {

  return (
    <>
      <Router>
        <div className='min-h-screen flex flex-col items-center'>

          <NavBar className="" />
          <div className="container">
            <Routes  >
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<RegisterPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirmPage />} />
              <Route path="/activate/:uid/:token" element={<ActivatePage />} />

              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/my-profile" element={<MyProfilePage />} />
                <Route path="/quiz" element={<QuizHomePage />} />
                <Route path="/quiz/me" element={<MyQuizzesPage />} />
                <Route path="/quiz/create/:slug" element={<CreateQuizPage />} />
                <Route path="/quiz-offline" element={<QuizOfflineDashboardPage />} />
                <Route path="/quiz/play/:slug" element={<QuizGamePage />} />
                <Route path="/quiz/score/:slug" element={<ScorePage />} />
                <Route path="/quiz/answers/:slug" element={<QuizAnswersPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

        </div>
      </Router>
      <ToastContainer />

    </>
  )
}

export default App
