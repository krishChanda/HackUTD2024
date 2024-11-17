import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

function DataAnalytics() {
    // Random data for the charts
    const barData = {
        labels: ["Duplicates", "Null values", "Outliers", "Access", "Missing data fields"],
        datasets: [
            {
                label: "Frequency of Errors",
                data: [500, 400, 300, 700, 600],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };

    const doughnutData = {
        labels: ["Successful Merges", "Unsuccessful Merges"],
        datasets: [
            {
                label: "Merges Ratio",
                data: [40, 25,],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
        ],
    };

    const lineData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
        datasets: [
            {
                label: "Successes",
                data: [2000, 2400, 2100, 2700, 2900],
                borderColor: "#FF6384",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                tension: 0.4,
            },
            {
                label: "Errors",
                data: [1500, 1700, 1600, 1500, 1200],
                borderColor: "#36A2EB",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                tension: 0.4,
            },
        ],
    };

    return (
        <div style={{ padding: "20px", textAlign: "center", backgroundColor: "#f6d8cb"}}>
            <h1>Data Analytics</h1>
            <p>Visualization of Data</p>
            
            {/* Bar Chart */}
            <div style={{ width: "50%", margin: "20px auto" }}>
                <Bar data={barData} options={{ plugins: { title: { display: true, text: "Visualization of Errors" } } }} />
            </div>

            {/* Doughnut Chart */}
            <div style={{ width: "40%", margin: "20px auto" }}>
                <Doughnut data={doughnutData} options={{ plugins: { title: { display: true, text: "Successful vs Unsucessful" } } }} />
            </div>

            {/* Double Line Chart */}
            <div style={{ width: "60%", margin: "20px auto" }}>
                <Line data={lineData} options={{ plugins: { title: { display: true, text: "Predicted Errors vs Predicted Successes" } } }} />
            </div>
        </div>
    );
}

export default DataAnalytics;
