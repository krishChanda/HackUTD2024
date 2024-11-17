import React from "react";
import "./DynamicCardGrid.css";

const DynamicCardGrid = ({ databases }) => {
    return (
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
    );
};

export default DynamicCardGrid;