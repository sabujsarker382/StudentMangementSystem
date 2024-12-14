import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (res.data.token) {
        alert(res.data.message);
        localStorage.setItem("token", res.data.token);

        const { role, userId } = res.data;

        if (role === "teacher") {
          navigate("/teacher");
        } else if (role === "student") {
          navigate(`/student/${userId}`);
        } else {
          navigate("/");
        }

        setFormData({ email: "", password: "" });
      } else {
        setError("Invalid credentials or unexpected response.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 p-4 border rounded"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
