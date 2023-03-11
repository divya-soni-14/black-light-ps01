import "./App.css";
import ImageCard from "./components/Password/ImageCard.jsx";
import logo from "./components/Password/nature.webp";
import EnterPassword from "./pages/EnterPassword";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <EnterPassword />

    </div>
  );
}

export default App;
