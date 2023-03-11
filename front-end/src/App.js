import "./App.css";
import ImageCard from "./components/Password/ImageCard.jsx";
import logo from "./components/Password/nature.webp";
import EnterPassword from "./pages/EnterPassword";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUpPage from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/password" element={<EnterPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
