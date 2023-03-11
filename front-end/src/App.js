import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import EnterPassword from "./pages/EnterPassword";
function App() {
  return <div className="App">
    <Navbar />
    <EnterPassword />
  </div>;
}

export default App;