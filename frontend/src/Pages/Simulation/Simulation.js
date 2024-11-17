import React, { useState } from "react";
import "./Simulation.css";

function Simulation() {
    // Initial state for databases and connection form
    const [databases, setDatabases] = useState({
        "Database A": [],
        "Database B": [],
    });

    const [formData, setFormData] = useState({
        "Database A": { host: "", port: "", user: "", password: "", database: "" },
        "Database B": { host: "", port: "", user: "", password: "", database: "" },
    });

    const [collapsed, setCollapsed] = useState({
        "Database A": false,
        "Database B": false,
    });

    const [showForm, setShowForm] = useState({
        "Database A": true,
        "Database B": true,
    });

    const [isLoading, setIsLoading] = useState({
        "Database A": false,
        "Database B": false,
    });

    const [connectionStatus, setConnectionStatus] = useState({
        "Database A": "",
        "Database B": "",
    });

    // Handle form input changes
    const handleFormChange = (e, dbName) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [dbName]: {
                ...prevData[dbName],
                [name]: value,
            },
        }));
    };

    // Handle form submission to "fake connect" to the database
    const handleFormSubmit = (e, dbName) => {
        e.preventDefault();
        setIsLoading((prevState) => ({ ...prevState, [dbName]: true }));

        // Simulate a fake successful connection
        setTimeout(() => {
            console.log(`Successfully connected to ${dbName}`);
            const fakeTables = [
                "Account Information",
                "User Information",
                "CreditCard Main Data",
                "Loan Imp Data",
                "Transaction",
            ];

            setDatabases((prevDatabases) => ({
                ...prevDatabases,
                [dbName]: fakeTables,
            }));

            setConnectionStatus((prevState) => ({
                ...prevState,
                [dbName]: "Successfully connected!",
            }));

            setShowForm((prevShowForm) => ({
                ...prevShowForm,
                [dbName]: false,
            }));

            setIsLoading((prevState) => ({ ...prevState, [dbName]: false }));
        }, 1000); // Fake delay for connection
    };

    // Toggle collapse/expand for a database
    const toggleCollapse = (dbName) => {
        setCollapsed((prevState) => ({
            ...prevState,
            [dbName]: !prevState[dbName],
        }));
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
                                <button
                                    className="collapse-button"
                                    onClick={() => toggleCollapse(dbName)}
                                >
                                    {collapsed[dbName] ? "+" : "-"}
                                </button>
                            </div>
                            {!collapsed[dbName] && showForm[dbName] ? (
                                <form
                                    onSubmit={(e) => handleFormSubmit(e, dbName)}
                                    className="database-form"
                                >
                                    <h3>{dbName} Connection</h3>
                                    <label>
                                        Host:
                                        <input
                                            type="text"
                                            name="host"
                                            value={formData[dbName].host}
                                            onChange={(e) => handleFormChange(e, dbName)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Port:
                                        <input
                                            type="number"
                                            name="port"
                                            value={formData[dbName].port}
                                            onChange={(e) => handleFormChange(e, dbName)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        User:
                                        <input
                                            type="text"
                                            name="user"
                                            value={formData[dbName].user}
                                            onChange={(e) => handleFormChange(e, dbName)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Password:
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData[dbName].password}
                                            onChange={(e) => handleFormChange(e, dbName)}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Database:
                                        <input
                                            type="text"
                                            name="database"
                                            value={formData[dbName].database}
                                            onChange={(e) => handleFormChange(e, dbName)}
                                            required
                                        />
                                    </label>
                                    <button type="submit" className="submit-button">
                                        {isLoading[dbName] ? "Connecting..." : "Submit"}
                                    </button>
                                    {connectionStatus[dbName] && (
                                        <p className="success-message">
                                            {connectionStatus[dbName]}
                                        </p>
                                    )}
                                </form>
                            ) : (
                                !collapsed[dbName] && (
                                    <div className="table-list">
                                        {databases[dbName].map((table, idx) => (
                                            <div key={idx} className="table-item">
                                                {table}
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
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
                <div className="sim-results">SIM RESULTS</div>
            </div>
        </div>
    );
}

export default Simulation;
