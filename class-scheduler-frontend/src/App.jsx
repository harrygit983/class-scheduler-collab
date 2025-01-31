import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Schedule from "./pages/Schedule";

/*
function App() {
  return (
    <div>
      <h1>Class Schedule</h1>
      <Schedule />
    </div>
  );
}

export default App;
*/
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Schedule />} />
      </Routes>
    </Router>
  );
}

export default App;