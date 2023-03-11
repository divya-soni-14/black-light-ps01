import "./ImageCard.css";
import logo from "./nature.webp";

function ImageCard(props) {
  return (
    <div className={`image-card ${props.selected}`}>
      <img src={logo} alt="" />
    </div>
  );
}

export default ImageCard;
