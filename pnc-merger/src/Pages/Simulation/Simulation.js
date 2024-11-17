import React from "react";
import "./Simulation.css";

function Simulation() {
    // Mock data representing uploaded databases
    const databases = {
        "Database A": ["Table A", "Table B", "Table C", "Table D", "Table E"],
        "Database B": ["Table A", "Table B", "Table C"],
    };

    return (
        <div className="simulation-container">
            <div className="header">
                <span>Simulation</span>
                <span className="project-name">PROJECT NAME</span>
            </div>
            <div className="main-content">
                <div className="sidebar">
                    {Object.keys(databases).map((dbName, index) => (
                        <div key={index} className="database-selection">
                            <div className="database-header">
                                <span>{dbName}</span>
                                <button className="collapse-button">-</button>
                            </div>
                            <div className="table-list">
                                {databases[dbName].map((table, idx) => (
                                    <div key={idx} className="table-item">
                                        <label>
                                            <input type="checkbox" defaultChecked /> {table}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button className="run-sim-button">RUN SIM</button>
                </div>
                <div className="database-view">
                    <h2>DATABASE VIEW</h2>
                    <div className="dynamic-grid-container">
                        {Object.keys(databases).map((dbName, index) => (
                            <div key={index} className="database-column">
                                <h3>{dbName}</h3>
                                <div className="card-grid">
                                    {databases[dbName].map((table, idx) => (
                                        <div key={idx} className="card">
                                            {table}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
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



