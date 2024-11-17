import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <h1>this is home page</h1>
            <Link to="/Sim">Create Sim</Link>
        </>

    )
}

export default Home;