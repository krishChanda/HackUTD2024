import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Home.css";

function Home() {
    return (
        <div className="home-container">
            {/* Dark Orange Navbar */}
            <header className="navbar">
                <Link to="/" className="nav-link">Home</Link> {/* Home link */}
                <Link to="/Sim" className="nav-link">Simulation</Link> {/* Simulation link */}
                <Link to="/DataAnalytics" className="nav-link">Visualization</Link> {/* Visualization link */}
            </header>

            {/* Main Content */}
            <main className="home-content">
                <h1>[Merge X]</h1>
                <p>Simulate Database Merging</p>
                <Link to="/Sim">
                    <button className="start-btn">Begin Sim</button>
                </Link>
            </main>
        </div>
    );
}

export default Home;
