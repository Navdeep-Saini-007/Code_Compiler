import "./App.css";
import { Routes, Route } from "react-router-dom";
import CoverPage from "../CoverPage";
import Login from "../Login";
import Signup from "../Signup";
import ForgotPassword from "../ForgotPassword";
import Home from "../Home";
import Dashboard from "../Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CoverPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
