// src/UserInputForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UserInputForm = () => {
    // State variables to store input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [pin, setPin] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const [endDate, setEndDate] = useState('');

    const [currentDate, setCurrentDate] = useState('');
    const [datePlusOneYear, setDatePlusOneYear] = useState('');

    // Error state to show form validation or server errors
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    


    // Function to get the current date


    // Form submission handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');




        
        // Prepare the data to send to the backend
        const userInputData = {
            currentDate: currentDate || new Date(),
            datePlusOneYear: datePlusOneYear || new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            name,
            email,
            creditCardNumber,
            pin,
            expiryDate,
        };
        setCurrentDate(currentDate);
        setDatePlusOneYear(datePlusOneYear);


        try {
            // Post the data to the backend API
            const response = await axios.post('https://localhost:44371/api/UserInput', userInputData);

            // If the request is successful, show success message
            setSuccessMessage('User input saved successfully!');
        } catch (err) {
            // Handle any errors
            setError('Error submitting the form. Please try again.');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Submit User Input</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Credit Card Number: </label>
                    <input
                        type="text"
                        value={creditCardNumber}
                        onChange={(e) => setCreditCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>PIN: </label>
                    <input
                        type="text"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Expiry Date: </label>
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                    />
                </div>
                
                
                <div>
                    <button type="submit">Submit</button>

                    
                </div>
            </form>
        </div>
    );
};

export default UserInputForm;
