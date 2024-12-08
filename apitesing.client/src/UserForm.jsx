import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function UserForm() {
    const [user, setUser] = useState({ firstName: '', lastName: '', isSubscribed: false });
    const { id } = useParams();
    const history = useHistory();

    // If editing an existing user, fetch user data
    useEffect(() => {
        if (id) {
            axios.get(`https://localhost:7170/api/users/${id}`) // Update with your API URL
                .then(response => setUser(response.data))
                .catch(error => console.log(error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({
            ...user,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            // Update existing user
            axios.put(`https://localhost:7170/api/users/${id}`, user) // Update with your API URL
                .then(() => history.push('/'))
                .catch(error => console.log(error));
        } else {
            // Create new user
            axios.post('https://localhost:7170/api/users', user) // Update with your API URL
                .then(() => history.push('/'))
                .catch(error => console.log(error));
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit User' : 'Create New User'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Subscribed:</label>
                    <input
                        type="checkbox"
                        name="isSubscribed"
                        checked={user.isSubscribed}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">{id ? 'Update User' : 'Create User'}</button>
            </form>
        </div>
    );
}

export default UserForm;
