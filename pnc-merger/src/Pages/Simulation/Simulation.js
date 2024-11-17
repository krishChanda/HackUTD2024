import React from "react";
import "./Simulation.css";

function Simulation() {
    return (
        <div className="simulation-container">
            <div className="header">
                <span>Simulation</span>
                <span className="project-name">PROJECT NAME</span>
            </div>
            <div className="main-content">
                <div className="sidebar">
                    <button>
                        Main Database <span>+</span>
                    </button>
                    <button>
                        Merge Database <span>+</span>
                    </button>
                </div>
                <div className="database-view">
                    DATABASE VIEW
                </div>
            </div>
            <div className="sim-results-container">
                <div className="sim-results">
                    SIM RESULTS
                </div>
            </div>
        </div>
    );
}

export default Simulation;