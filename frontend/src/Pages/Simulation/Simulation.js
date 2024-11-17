import React, { useState } from "react";
import "./Simulation.css";

function Simulation() {
    // Mock data representing uploaded databases
    const databases = {
        "Database A": ["Table A", "Table B", "Table C", "Table D", "Table E"],
        "Database B": ["Table A", "Table B", "Table C"],
    };

    // State for Database B form and visibility
    const [showForm, setShowForm] = useState(true);

    // State to handle form data for Database B
    const [formData, setFormData] = useState({
        host: "",
        port: "",
        user: "",
        password: "",
        database: "",
    });

    // State to handle collapse/expand functionality for each database
    const [collapsed, setCollapsed] = useState({
        "Database A": false,
        "Database B": false,
    });

    // State to handle selected tables for each database
    const [selectedTables, setSelectedTables] = useState({
        "Database A": databases["Database A"].reduce((acc, table) => {
            acc[table] = true; // Initially, all tables are selected
            return acc;
        }, {}),
        "Database B": databases["Database B"].reduce((acc, table) => {
            acc[table] = true; // Initially, all tables are selected
            return acc;
        }, {}),
    });

    // Toggle the collapse/expand state for a specific database
    const toggleCollapse = (dbName) => {
        setCollapsed((prevState) => ({
            ...prevState,
            [dbName]: !prevState[dbName],
        }));
    };

    // Toggle selection of a specific table
    const toggleTableSelection = (dbName, tableName) => {
        setSelectedTables((prevState) => ({
            ...prevState,
            [dbName]: {
                ...prevState[dbName],
                [tableName]: !prevState[dbName][tableName],
            },
        }));
    };

    // Get the selected tables for display in the DATABASE VIEW
    const getSelectedTables = () => {
        const selected = {};
        Object.keys(selectedTables).forEach((dbName) => {
            selected[dbName] = Object.keys(selectedTables[dbName]).filter(
                (tableName) => selectedTables[dbName][tableName]
            );
        });
        return selected;
    };

    const selectedForView = getSelectedTables();

    // Handle form input changes
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        setShowForm(false); // Hide form and show Database B UI
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
                            {!collapsed[dbName] && dbName === "Database B" && showForm ? (
                                <form onSubmit={handleFormSubmit} className="database-form">
                                    <h3>Database B Connection</h3>
                                    <label>
                                        Host:
                                        <input
                                            type="text"
                                            name="host"
                                            value={formData.host}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Port:
                                        <input
                                            type="number"
                                            name="port"
                                            value={formData.port}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        User:
                                        <input
                                            type="text"
                                            name="user"
                                            value={formData.user}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Password:
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Database:
                                        <input
                                            type="text"
                                            name="database"
                                            value={formData.database}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </label>
                                    <button type="submit" className="submit-button">
                                        Submit
                                    </button>
                                </form>
                            ) : (
                                !collapsed[dbName] && (
                                    <div className="table-list">
                                        {databases[dbName].map((table, idx) => (
                                            <div key={idx} className="table-item">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedTables[dbName][table]}
                                                        onChange={() =>
                                                            toggleTableSelection(dbName, table)
                                                        }
                                                    />{" "}
                                                    {table}
                                                </label>
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
                        {Object.keys(selectedForView).map((dbName, index) => (
                            <div key={index} className="database-column">
                                <h3>{dbName}</h3>
                                <div className="card-grid">
                                    {selectedForView[dbName].map((table, idx) => (
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
