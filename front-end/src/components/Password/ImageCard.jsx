import "./ImageCard.css";

function ImageCard(props) {
  return (
    <div className="pa">
      <div className={`${props.selected ? "fitter" : ""} `}>
        {props.selected ? props.number : ""}
      </div>
      <div className={`image-card`}>
        <img src={props.imgsrc} alt="" />
      </div>
    </div>
  );
}

export default ImageCard;
