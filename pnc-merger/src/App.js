import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Simulation from './Pages/Simulation/Simulation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Sim" element={<Simulation/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
