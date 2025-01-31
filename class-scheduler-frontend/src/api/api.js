import axios from "axios";

const API_URL = "http://localhost:5001/api"; // Adjust if deployed

export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const fetchRequirements = async (major, degree) => {
  try {
    const response = await axios.get(`${API_URL}/requirements/${major}/${degree}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching requirements:", error);
    return [];
  }
};

/*
import axios from "axios";

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


// Fetch all courses
  export const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  };
// Fetch a course Requirements for a major
  export const fetchRequirements = async (major, degree) => {
    try {
      const response = await axios.get(`${API_URL}/requirements/${major}/${degree}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching requirements:", error);
      return [];
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
*/