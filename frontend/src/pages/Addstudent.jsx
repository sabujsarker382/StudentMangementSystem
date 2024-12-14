import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const AddStudentPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", 
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); 

      // POST request to the backend to add a new student
      const res = await axios.post(
        "http://localhost:5000/api/student/add", 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(res.data.message);
      setFormData({ name: "", email: "", password: "", role: "student" });

      // adding the student and redirect to the Teacher page
      navigate("/teacher");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add student");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add New Student</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
     
      {success && <div className="text-green-500 mb-4">{success}</div>}{" "}
    
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-4 border rounded"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border mb-4 p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border mb-4 p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border mb-4 p-2 rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border mb-4 p-2 rounded"
          required
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;
