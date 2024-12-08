import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);

    // Fetch users from the backend API
    useEffect(() => {
        axios.get('https://localhost:7170/api/users') // Update with your API URL
            .then(response => setUsers(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`https://localhost:7170/api/users/${id}`) // Update with your API URL
            .then(() => {
                setUsers(users.filter(user => user.id !== id)); // Remove deleted user from state
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2>User List</h2>
            <Link to="/create">Create New User</Link>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.isSubscribed ? 'Subscribed' : 'Not Subscribed'}
                        <Link to={`/edit/${user.id}`}>Edit</Link> |
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
