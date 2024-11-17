import React, { useState } from "react";
import "./Simulation.css";

function Simulation() {
    // Mock data representing uploaded databases
    const databases = {
        "Bank A": ["Account Information", "Customer Data", "Credit Card Data", "Customer Loan Data", "Transaction Data"],
        "Bank B": ["Accounts Data", "User Information", "CreditCard Main Data", "Loan Imp Data", "Transaction"],
    };

    // State to handle collapse/expand functionality for each database
    const [collapsed, setCollapsed] = useState({
        "Bank A": false,
        "Bank B": false,
    });

    // State to handle selected tables for each database
    const [selectedTables, setSelectedTables] = useState({
        "Bank A": databases["Bank A"].reduce((acc, table) => {
            acc[table] = true; // Initially, all tables are selected
            return acc;
        }, {}),
        "Bank B": databases["Bank B"].reduce((acc, table) => {
            acc[table] = true; // Initially, all tables are selected
            return acc;
        }, {}),
    });

    const [isCompleted, setIsCompleted] = useState(false);

    // State to track which table's data dictionary is being viewed
    const [viewingDictionaryForTable, setViewingDictionaryForTable] = useState(null);

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

     // Hardcoded data dictionaries for all tables in Bank A and Bank B
     const dataDictionaries = {
         'Account Information': [
             "customer_id",
             "account_id",
             "Account_type",
             "currency_code",
             "current_balance",
             "available_balance",
             "hold_amount",
             "minimum_balance",
             "Interest_rate",
             "routing_number",
             "Opened_date"
         ],
         'Customer Data': [
             'customer_id', 'ssn', 'first_name', 'last_name', 'date_of_birth', 'email', 'primary_phone', 'address_line1', 'city', 'state', 'zip_code', 'country', 'credit_score'
         ],
         'Credit Card Data': [
             'card_id', 'customer_id', 'card_type', 'card_status', 'credit_limit', 'current_balance', 'available_credit', 'minimum_payment', 'payment_due_date', 'issue_date', 'expiration_date'
         ],
         'Customer Loan Data': [
             'loan_id', 'customer_id', 'loan_type', 'loan_status', 'original_amount', 'interest_rate', 'term_months', 'payment_amount', 'start_date'
         ],
         'Transaction Data': [
             'transaction_id', 'account_id', 'transaction_type', 'transaction_date', 'amount'
         ],
         // Bank B Tables
         AccountsData: [
             "acct_num", 
             "cust_number", 
             "product_type", 
             "currency", 
             "balance", 
             "usable_balance"
         ],
         UserInformation: [
             "cust_number", 
             "social_security_num", 
             "firstname", 
             "lastname"
         ],
         CreditCardMainData: [
            "card_number","cust_number","product_name","max_limit","outstanding_balance"
        ],
        LoanImpData: [
            "loan_number","cust_number","principal_amount","interest_rate"
        ],
        Transaction: [
            "trans_id","acct_num","trans_category","trans_timestamp","trans_amount"
        ]
    };

    // State for fake migration progress bar
    const [progress, setProgress] = useState(0);
    const [isRunningSim, setIsRunningSim] = useState(false);

    // Handle Run Sim button click to show fake progress bar
// Handle Run Sim button click to show fake progress bar
    // Handle Run Sim button click to show fake progress bar and display errors
    const handleRunSimClick = () => {
        setIsRunningSim(true);
        setProgress(0);  // Reset progress
        setIsCompleted(false);  // Reset completion message
        setErrors([]);  // Clear previous errors

        let interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    setIsRunningSim(false);  // Stop simulation once complete
                    setIsCompleted(true);    // Show completion message
                    setErrors(getRandomErrors()); // Display random errors
                    return 100;
                }
                return prevProgress + 10;  // Increment progress by 10%
            });
        }, 300);  // Update every 300ms to simulate progress
    };

// Possible error messages with specific row/column information
    const errorMessages = [
        "Row 1002, Column 'email' in 'Customer Data': Missing email address.",
        "Row 405, Column 'account_id' in 'Account Information': Duplicate account ID detected.",
        "Row 7688, Column 'phone_number' in 'Customer Data': Null phone number found.",
        "Row 24353, Column 'transaction_amount' in 'Transaction Data': Unusually large transaction detected ($1,000,000).",
        "Row 5624, Column 'currency_code' in 'Transaction Data': Inconsistent currency formatting (USD vs GBP).",
        "Row 905, Column 'phone_number' in 'Customer Data': Inconsistent phone number format (123-456-7890 vs +1 (234) 567-890).",
        "Row 3674, Column 'account_balance' in 'Accounts Data': Negative balance detected.",
        "Row 224, Column 'name' in 'User Information': Inconsistent capitalization (JOHN vs John).",
        "Row 1154, Column 'ssn' in 'User Information': Duplicate SSN found."
    ];

    // Function to randomly select 3 errors from the list
    const getRandomErrors = () => {
        const shuffled = [...errorMessages].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3); // Return 3 random errors
    };

    const [errors, setErrors] = useState([]);

     return (
         <div className="simulation-container">
             <div className="header">
                 <span>DATABASE VIEW</span>
                 <span className="project-name">PROJECT NAME</span>
             </div>

             {/* Sidebar with collapse/expand */}
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
                            {!collapsed[dbName] && (
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
                            )}
                        </div>
                    ))}
                   
                    {/* Fake Progress Bar */}
                    {isRunningSim && (
                        <div className="progress-bar-container">
                            <p>Migration in Progress...</p>
                            <div className="progress-bar">
                                <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
                                    {progress}%
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Display Migration Completed Message */}
                    {isCompleted && (
                        <div className="completion-message">
                            <p>Migration Completed!</p>
                        </div>
                    )}


                    {/* Run Sim Button */}
                    {!isRunningSim && (
                        <button className="run-sim-button" onClick={handleRunSimClick}>
                            RUN SIM
                        </button>
                    )}
                    
                </div>
    {/* Migration Insights Button
    <button className="migration-insights-button">
        MIGRATION INSIGHTS
    </button> */}
                    

                {/* DATABASE VIEW */}
                {/* DATABASE VIEW */}
            <div className="database-view">
                <h2>DATABASE VIEW</h2>
                <div className="dynamic-grid-container">
                    {Object.keys(selectedForView).map((dbName, index) => (
                        <div key={index} className="database-column">
                            <h3>{dbName}</h3>
                            <div className="card-grid">
                                {selectedForView[dbName].map((table, idx) => (
                                    <div 
                                        key={idx} 
                                        className="card" 
                                        onClick={() => setViewingDictionaryForTable(table)}
                                        style={{ cursor: "pointer" }}  
                                    >
                                        {table}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Display Errors After Simulation Completes */}
                {isCompleted && (
                    <div className="error-list">
                        <h4>Potential Errors Detected:</h4>
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>


                {/* Modal for Data Dictionary */}
                {viewingDictionaryForTable && (
                    <div className="modal-overlay" onClick={() => setViewingDictionaryForTable(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h3>Data Dictionary for {viewingDictionaryForTable}</h3>
                            {/* Display columns for the clicked table */}
                            {dataDictionaries[viewingDictionaryForTable] ? (
                                <>
                                    <p><strong>Columns:</strong></p>
                                    <ul>
                                        {dataDictionaries[viewingDictionaryForTable].map((column, idx) => (
                                            <li key={idx}>{column}</li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <p>No data dictionary available for this table.</p>
                            )}
                            {/* Close button */}
                            <button 
                                className="close-modal-button"
                                onClick={() => setViewingDictionaryForTable(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Simulation Results Section */}
            <div className="sim-results-container">
                <div className="sim-results">SIM RESULTS</div>
            </div>

         </div>
     );
 }

 export default Simulation;
