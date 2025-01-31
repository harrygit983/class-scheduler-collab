import React, { useEffect, useState } from "react";
import { fetchCourses } from "./api/api";

const App = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };
    getCourses();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Course List</h1>
      <div className="bg-white p-4 rounded shadow">
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
    </div>
  );
};

export default App;