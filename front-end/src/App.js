import "./App.css";
import ImageCard from "./components/Password/ImageCard.jsx";
import logo from "./components/Password/nature.webp";
function App() {
  return (
    <div className="App">
      <ImageCard imgsrc={logo} selected={true} />
    </div>
  );
}

export default App;
