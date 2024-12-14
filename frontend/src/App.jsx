import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import TeacherPage from "./pages/Teacher"; 
import StudentPage from "./pages/Student"; 
import AddStudent from "./pages/Addstudent"; 

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student/:id" element={<StudentPage />} />
        <Route path="/addStudent" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}
