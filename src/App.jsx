import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import PublicProfile from "./pages/PublicProfile";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gradient-to-br from-gray-[#0b0f2a] via-gray-[#0f1438] to-gray-[#050716] text-gray-200">
      <Navbar />

      {/* add padding-top so content doesn't hide behind navbar */}
      <div className="">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:username" element={<PublicProfile />} />
        </Routes>
      </div>

      <Footer />
    </div>
    </BrowserRouter>
  )
}

