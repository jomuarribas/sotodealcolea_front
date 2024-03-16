import './App.css'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Welcome from './components/Welcome/Welcome'
import PrivateRoute from './components/ProtectRoute/PrivateRoute'
import PublicRoute from './components/ProtectRoute/PublicRoute'
import MyResidential from './pages/MyResidential/MyResidential'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse/TermsOfUse'
import NotFound from './pages/404/NotFound'
import Verification from './components/Verification/Verification'
import User from './pages/User/User'
import Incidents from './pages/Incidents/Incidents'
import Formalities from './pages/Formalities/Formalities'
import Help from './pages/Help/Help'

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path='/user'
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path='/myresidential'
        element={
          <PrivateRoute>
            <MyResidential />
          </PrivateRoute>
        }
      />
      <Route
        path='/incidents'
        element={
          <PrivateRoute>
            <Incidents />
          </PrivateRoute>
        }
      />
      <Route
        path='/formalities'
        element={
          <PrivateRoute>
            <Formalities />
          </PrivateRoute>
        }
      />
      <Route
        path='/help'
        element={
          <PrivateRoute>
            <Help />
          </PrivateRoute>
        }
      />
      <Route
        path='/login'
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path='/verification/:tokenVerification'
        element={
          <PublicRoute>
            <Verification />
          </PublicRoute>
        }
      />
      <Route
        path='/verification'
        element={
          <PublicRoute>
            <Verification />
          </PublicRoute>
        }
      />
      <Route
        path='/register'
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path='/welcome'
        element={
          <PublicRoute>
            <Welcome />
          </PublicRoute>
        }
      />
      <Route
        path='/privacypolicy'
        element={
          <PrivateRoute>
            <PrivacyPolicy />
          </PrivateRoute>
        }
      />
      <Route
        path='/termsOfUse'
        element={
          <PrivateRoute>
            <TermsOfUse />
          </PrivateRoute>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
