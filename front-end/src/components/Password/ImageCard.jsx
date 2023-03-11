import "./ImageCard.css";

function ImageCard(props) {
  return (
    <div className={`image-card ${props.selected ? "select" : "nselect"}`}>
      <img src={props.imgsrc} alt="" />
    </div>
  );
}

export default ImageCard;
