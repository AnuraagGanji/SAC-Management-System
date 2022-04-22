import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AdminLogin from "./pages/AdminLogin";
import StudentDash from "./pages/StudentDash";
import Login from "./pages/Login";
import AdminDash from "./pages/AdminDash";
import AdminHistory from "./pages/AdminHistory";
import EditPersonLimit from "./pages/EditPersonLimit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/studentdash" element={<StudentDash />} />
        <Route path="/admindash/:room" element={<AdminDash />} />
        <Route
          path="/admindash/:room/editPersonLimit"
          element={<EditPersonLimit />}
        />
        <Route path="/admindash/:room/history" element={<AdminHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
