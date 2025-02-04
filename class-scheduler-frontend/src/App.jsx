import React, { useEffect, useState } from "react";
import { fetchCourses, fetchRequirements } from "./api/api";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };

    const getRequirements = async () => {
      const data = await fetchRequirements("Computer Science", "B.S.");
      setRequirements(data);
    };
    getCourses();
    getRequirements();
  }, []);

  // Group requirements by requirement_type
  const groupedRequirements = requirements.reduce((acc, req) => {
    if (!acc[req.requirement_type]) {
      acc[req.requirement_type] = [];
    }
    acc[req.requirement_type].push(req);
    return acc;
  }, {});

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Computer Science Major</h1>
      
      {/* Course List */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold">Courses</h2>
        {courses.length > 0 ? (
          <ul>
            {courses.map((course) => (
              <li key={course.id} className="p-2 border-b last:border-b-0">
                <strong>{course.name}</strong> - {course.department} ({course.credits} credits)
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No courses available</p>
        )}
      </div>

      {/* Major Requirements */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Major Requirements</h2>
        {Object.keys(groupedRequirements).length > 0 ? (
          Object.keys(groupedRequirements).map((type) => (
            <div key={type} className="mb-4">
              <h3 className="text-lg font-semibold">{type}</h3>
              <ul>
                {groupedRequirements[type].map((req, index) => (
                  <li key={index} className="p-2 border-b last:border-b-0">
                    <strong>{req.requirement_type}:</strong> {req.description}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No requirements found</p>
        )}
      </div>
    </div>
  );
};

export default App;