import { useEffect, useState } from "react";
import { fetchCourses } from "../api/api";

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses()
      .then((data) => {
        console.log("Fetched Courses:", data); // 🔍 Debugging log
        setCourses(data);
      })
      .catch((error) => console.error("Error loading courses:", error));
  }, []);

  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.length > 0 ? (
          courses.map((course) => (
            <li key={course.id}>{course.code} - {course.name}</li>
          ))
        ) : (
          <p>No courses found...</p>
        )}
      </ul>
    </div>
  );
}

export default Home;