/*
import { useEffect, useState } from "react";
import { fetchCourses } from "../api/api";

function Schedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    console.log("Schedule Component Mounted!"); // 🔍 Debugging log
  }, []);

  return (
    <div>
      <h1>4-Year Course Schedule</h1>
      <p>🚀 If you see this message, `Schedule.jsx` is rendering!</p>
    </div>
  );
}

export default Schedule;
*/
import { useEffect, useState } from "react";
import { fetchCourses } from "../api/api";

function Schedule() {
    
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetchCourses().then((courses) => {
      console.log("Fetched Courses:", courses);

      // Structure the schedule (4 years, 2 semesters per year)
      const formattedSchedule = [
        { year: 1, semester: "Fall", courses: ["MATH 150", "CSC 171", "WRT 105", "Free Course"] },
        { year: 1, semester: "Spring", courses: ["MATH 161", "CSC 172", "Free Course", "Free Course"] },
        { year: 2, semester: "Fall", courses: ["MATH 162", "CSC 173", "Free Course", "Free Course"] },
        { year: 2, semester: "Spring", courses: ["MATH 165", "CSC 252", "Free Course", "Free Course"] },
        { year: 3, semester: "Fall", courses: ["CSC 254", "CSC 262", "CSC 2XX", "Upper Writing 1"] },
        { year: 3, semester: "Spring", courses: ["CSC 280", "CSC 242", "CSC 2XX", "Free Course"] },
        { year: 4, semester: "Fall", courses: ["CSC 282", "CSC 2XX", "Upper Writing 2", "Free Course"] },
        { year: 4, semester: "Spring", courses: ["CSC 2XX", "Free Course", "Free Course", "Free Course"] },
      ];

      setSchedule(formattedSchedule);
    });
  }, []);
  return (
    <div>
      <h1>4-Year Course Schedule</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Year</th>
            <th>Semester</th>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((entry, index) => (
            <tr key={index}>
              <td>{entry.year}</td>
              <td>{entry.semester}</td>
              <td>{entry.courses.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;