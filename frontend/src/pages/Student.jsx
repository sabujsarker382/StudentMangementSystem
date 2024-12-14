import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentPage = () => {
  const { id } = useParams(); 

  const [studentData, setStudentData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Fetch student data
  useEffect(() => {
    if (id) {
      const fetchStudentData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setError("No token found");
            setLoading(false);
            return;
          }

          const res = await axios.get(
            `http://localhost:5000/api/auth/student/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (res.status === 200) {
            setStudentData(res.data);
            setUpdatedData({
              name: res.data.name,
              email: res.data.email,
            });
          } else {
            setError("Failed to load student data");
          }
        } catch (err) {
          console.error(err);
          setError("Failed to load student data");
        } finally {
          setLoading(false);
        }
      };

      fetchStudentData();
    } else {
      setError("Invalid student ID");
      setLoading(false);
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission for updating data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/auth/update/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        setUpdateSuccess(true);
        setStudentData(res.data);
      } else {
        setError("Failed to update student data");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update student data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {updateSuccess && (
          <div className="text-green-500 text-center mb-4">
            Student data updated successfully!
          </div>
        )}
        {studentData && (
          <div>
            <h1 className="text-3xl font-semibold text-center mb-6">
              Update Your Information
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={updatedData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPage;
