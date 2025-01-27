import { Route, Routes, Navigate } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Signup from "./components/Signup/index";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/dashboard";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {/* Redirect to Main page if the user is logged in */}
      <Route path="/" element={<WelcomePage/>} />
	  
      <Route path="/editor" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* Catch-all route for non-authenticated users */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
