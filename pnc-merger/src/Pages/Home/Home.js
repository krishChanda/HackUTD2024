import { Link } from "react-router-dom";
import "./Home.css";


function Home() {
    return (
        <div className="home-container">
            {/* Dark Orange Navbar */}
            <header className="navbar">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/Sim" className="nav-link">Simulation</Link>
            </header>


            {/* Main Content */}
            <main className="home-content">
                <h1>[PROJECT NAME]</h1>
                <p>Simulate Database Merging</p>
                <Link to="/Sim">
                    <button className="start-btn">Begin Sim</button>
                </Link>
            </main>
        </div>
    );
}


export default Home;