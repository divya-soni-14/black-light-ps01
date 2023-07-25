import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
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

    return (
        <form className="sign-up-form" onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <br />
            <br />
            <Link to="/password">
                <button type="submit">
                    Continue
                </button>
            </Link>
        </form>
    );
};

export default SignUpPage;
