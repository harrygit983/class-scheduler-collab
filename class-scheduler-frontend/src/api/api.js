const API_URL = "http://localhost:5001/api";

// Fetch a valid schedule
export const fetchSchedule = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/schedule");
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  
      const data = await response.json();
      console.log("Fetched Schedule:", data); // Debugging log
      return data;
    } catch (error) {
      console.error("Failed to fetch schedule:", error);
      return null;
    }
  };  


// 📌 Fetch all courses
export const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/courses");
      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  
      const data = await response.json();
      console.log("API Response:", data); // 🔍 Debugging log
      return data;
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      return []; // Return empty array on failure
    }
  };  

// 📌 Generate a schedule based on major
export const generateSchedule = async (major) => {
  try {
    const response = await fetch(`${API_URL}/schedule/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ major }),
    });

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to generate schedule:", error);
    return null; // Return null on failure
  }
};

// 📌 Register a new user
export const registerUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to register user:", error);
    return null;
  }
};

// 📌 Log in an existing user
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to log in:", error);
    return null;
  }
};