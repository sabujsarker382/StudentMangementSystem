import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/student");
        setStudents(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || "Error fetching students");
      }
    };
    fetchStudents();
  }, []);

  //  deleting a student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/student/${id}`);
      setStudents(students.filter((student) => student._id !== id));
      alert("Student deleted successfully");
    } catch (err) {
      console.error(err.response?.data?.message || "Error deleting student");
    }
  };

  // Navigate to the Add Student page
  const handleAddStudent = () => {
    navigate("/addStudent");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Management</h2>
      <button
        onClick={handleAddStudent}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add New Student
      </button>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.email}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(student._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;
