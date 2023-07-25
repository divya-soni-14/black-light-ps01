import '../styles/ImageGrid.css';
import { useState } from 'react';
import ImageCard from '../components/Password/ImageCard';
import logo from '../components/Password/logo.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { Component } from 'react'

export default function Login() {
    const [form, setForm] = useState(false);
    const [signed, setSigned] = useState(false);
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


    async function getImageIDs() {
        console.log(formData.email)
        const response = await axios.post('http://144.24.133.212:3000/api/image_ids', {
            email: formData.email
        })
        return response;

    }
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
                        console.log(image)
                        let index = imageData.indexOf(image);

                        if (activeList[index])
                            return (
                                <div
                                    onClick={() => {
                                        clickHandler(index)
                                        setImageData([...imageData]);
                                    }}
                                    className="password-flex-item">
                                    <ImageCard
                                        imgsrc={image.image_url} selected={activeList[index]} number={index} />
                                </div>
                            )

                    })}
                </div>

                <div className="confirm-btn-wrap">
                    <button className="confirm-btn" style={(imageCount != 5) ? { display: "none" } : { display: "block" }} onClick={

                        () => {
                            let password = "";
                            for (let i = 0; i < 5; i++) {
                                console.log(order[i]);
                                password = password + imageData[order[i]].image_id;
                            }

                            axios.post('http://144.24.133.212:3000/api/login', {
                                email: formData.email,
                                password: password,
                            }).then((response) => {
                                console.log("the response", response.data);
                                if (response.data.msg == "Incorrect password") {
                                    console.log("bad password");
                                } else
                                    setSigned(true);
                            })

                        }}>Login</button>
                </div>
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
                                        imgsrc={image.image_url} selected={activeList[index]} number={index}

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
                        getImageIDs().then(data => {
                            let img_arr = [];

                            for (let i = 0; i < data.data.image_ids.length; i++) {

                                let img_data = {};
                                img_data.image_id = data.data.image_ids[i];
                                img_data.image_url = data.data.image_urls[i];
                                img_arr.push(img_data);
                            }
                            setImageData(img_arr);
                        });
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
            </>
        )
    }
}