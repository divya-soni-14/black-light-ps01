import '../../styles/ImageGrid.css';
import { useState } from 'react';
import ImageCard from './ImageCard';
import logo from './logo.svg';
import axios from 'axios';


export default function ImageGrid() {

    const [imageData, setImageData] = useState([]);
    const [imageCount, setImageCount] = useState(0);
    let standardArray = [];
    for (let i = 0; i < 30; i++)
        standardArray.push(0);
    const [activeList, setActiveList] = useState(standardArray);
    const ACCESS_KEY = 'FdXIacPMTKkGr4PVaOXv2t6I1J2XBaFZ9ks54xuAfa8'; // replace with your own Unsplash access key

    async function getRandomImages(count) {
        const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}&orientation=squarish`);
        return response;
    }

    let images = [{ imgsrc: logo, selected: true, number: "1" }, { imgsrc: logo, selected: true, number: "2" }, { imgsrc: logo, selected: true, number: "3" }, { imgsrc: logo, selected: true, number: "4" }, { imgsrc: logo, selected: true, number: "5" }, { imgsrc: logo, selected: true, number: "6" }]

    const [active, setActive] = useState([]);
    let defaultOrder = [-1, -1, -1, -1, -1];
    const [order, setOrder] = useState(defaultOrder);

    const clickHandler = (imageNumber) => {
        let index = active.indexOf(imageNumber);
        let activeArr = active;
        let newActiveList = activeList
        if (index == -1) {
            // not selected
            // update order
            let i = 0;
            let newOrder = order;
            for (i = 0; i < 5; i++) {
                if (order[i] == -1) {
                    newOrder[i] = imageNumber;
                    setOrder(newOrder);
                    break;
                }
            }
            if (i == 5)
                console.log('Cannot select more');
            else {
                setImageCount(imageCount + 1);
                // add to the array
                activeArr.push(imageNumber);
                setActive(activeArr);
                newActiveList[imageNumber] = 1;
                setActiveList(newActiveList);
            }

        } else {
            // selected
            setImageCount(imageCount - 1);
            console.log("before: ", activeArr)
            activeArr.splice(index, 1);
            console.log("after: ", activeArr)
            setActive(activeArr);
            newActiveList[imageNumber] = 0;
            setActiveList(newActiveList);
            // remove from orderSet and slide elements of the array
            let newOrder = order;
            newOrder.splice(index, 1);
            newOrder.push(-1);
            setOrder(newOrder);
        }
        console.log(active);
        console.log("New order:", order);
    }

    return (
        <div className="imageGrid-container black-color-bg">
            <div style={{ color: 'white', width: '100%', border: '1px solid white', textAlign: 'center' }} className="imageGrid-password-field password-flex-container black-color-bg">
                {imageData.map((image) => {
                    let index = imageData.indexOf(image);
                    console.log(index);
                    console.log(activeList[index]);
                    if (activeList[index])
                        return (
                            <div
                                onClick={() => {
                                    clickHandler(index)
                                    setImageData([...imageData]);
                                }}
                                className="password-flex-item">
                                <ImageCard
                                    imgsrc={image.urls.small} selected={activeList[index]} number={index} />
                            </div>
                        )
                })}
            </div>

            <button onClick={() => {
                getRandomImages(30).then((images) => {
                    setImageData(images.data);
                    console.log(images.data);
                }).catch((error) => {
                    console.error(error);
                });
            }}>Get Images</button>

            <div className="grid-flex-container">

                {
                    imageData.map((image) => {
                        let index = imageData.indexOf(image);
                        if (activeList[index] == 0)
                            return (<div
                                onClick={() => {
                                    clickHandler(index)
                                    setImageData([...imageData]);
                                }}
                                className="flex-item" >
                                <ImageCard
                                    imgsrc={image.urls.small} selected={activeList[index]} number={index}

                                />
                            </div>)
                    })}
            </div>

        </div >
    );
}