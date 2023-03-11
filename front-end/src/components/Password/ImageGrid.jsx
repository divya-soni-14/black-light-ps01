import "../../styles/ImageGrid.css";
import ImageCard from "./ImageCard";
import logo from "./logo.svg";
// import axios from 'axios';
export default function ImageGrid() {
  let images = [
    { imgsrc: logo, selected: true, number: "3" },
    { imgsrc: logo, selected: true, number: "3" },
    { imgsrc: logo, selected: true, number: "3" },
    { imgsrc: logo, selected: true, number: "3" },
    { imgsrc: logo, selected: true, number: "3" },
  ];

  return (
    <div className="imageGrid-container black-color-bg">
      <div className="grid-flex-container">
        {images.map((image) => {
          return (
            <div className="flex-item">
              <ImageCard
                imgsrc={image.logo}
                selected={image.selected}
                number={image.number}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
