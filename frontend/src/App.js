import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home"; // Import Home component
import Simulation from "./Pages/Simulation/Simulation"; // Import Simulation component
import DataAnalytics from "./Pages/DataAnalytics/dataanalytics"; // Import DataAnalytics component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home page */}
                <Route path="/Sim" element={<Simulation />} /> {/* Simulation page */}
                <Route path="/DataAnalytics" element={<DataAnalytics />} /> {/* Visualization page */}
            </Routes>
        </Router>
    );
}

export default App;
