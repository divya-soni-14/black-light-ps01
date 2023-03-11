import '../styles/ImageGrid.css';
import { useState } from 'react';
import ImageCard from '../components/Password/ImageCard';
import logo from '../components/Password/logo.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState(false);
    const [signed, setSigned] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Add logic to submit the form data
        console.log(formData);
    };

    const [imageData, setImageData] = useState([]);
    const [imageCount, setImageCount] = useState(0);
    let standardArray = [];
    for (let i = 0; i < 30; i++)
        standardArray.push(0);
    const [activeList, setActiveList] = useState(standardArray);
    const ACCESS_KEY = 'FdXIacPMTKkGr4PVaOXv2t6I1J2XBaFZ9ks54xuAfa8'; // replace with your own Unsplash access key

    async function getImageIDs() {
        const params = JSON.stringify({
            email: formData.email
        })
        const response = await axios.get('http://144.24.133.212:3000/api/image_ids', {
            params: params
        })
        console.log(await response);

    }

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
    if (form && !signed)
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

                <button style={imageData.length ? { display: "none" } : { display: "block" }} onClick={() => {
                    getRandomImages(30).then((images) => {
                        setImageData(images.data);
                        console.log(images.data);
                    }).catch((error) => {
                        console.error(error);
                    });
                }}>Get Images</button>

                <button style={(imageCount != 5) ? { display: "none" } : { display: "block" }} onClick={

                    () => {
                        let password = "";
                        let descriptions = [];
                        console.log(order);
                        for (let i = 0; i < 5; i++) {
                            console.log(order[i]);
                            password = password + imageData[order[i]].id;
                            console.log(imageData[order[i]])
                            descriptions.push(imageData[order[i]].alt_description);

                        }
                        console.log(descriptions);
                        let ids = [];
                        imageData.map((image) => {
                            ids.push(image.id);
                        })

                        axios.post('http://144.24.133.212:3000/api/signup', {
                            email: formData.email,
                            password: password,
                            image_ids: ids,
                            image_desc: descriptions

                        }).then((response) => {
                            console.log(response);
                            setPrompt(response.data.prompt);
                            setSigned(true);
                        })

                    }}>Login</button>

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
    else if (!form)
        return (
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <br />
                <br />
                <button onClick={() => {
                    if (formData.email) {
                        setForm(true);
                        getImageIDs();
                    }
                }} type="submit">
                    Continue
                </button>
            </form>
        )
    else if (signed) {
        return (
            <>
                <h2 className='white-color'>
                    Congratulations! You have signed in!
                </h2>
                <p className='white-color'>
                    Here's your prompt: <br />
                    {prompt}
                </p >

            </>
        )
    }
}