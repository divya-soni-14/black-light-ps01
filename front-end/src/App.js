import "./App.css";
import ImageCard from "./components/Password/ImageCard.jsx";
import logo from "./components/Password/nature.webp";
function App() {
  return (
    <div className="App">
      <ImageCard imgsrc={logo} selected={true} number="3" />
      <ImageCard imgsrc={logo} selected={true} number="2" />
      <ImageCard imgsrc={logo} selected={true} number="3" />
      <ImageCard imgsrc={logo} selected={false} number="3" />
    </div>
  );
}

export default App;
