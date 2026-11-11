import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../authorization';

const Projects = () => {
    const navigate = useNavigate();
    const user = useAuth();

    async function getStores() {
        const response = await fetch("/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        });
        const stores = await response.json(); // array of store objects
    }
    const handleClick = () => {
        navigate('/Workshop');
    }

    return (
        <div>
            <h1>{user ? `Your project` : 'Please log in to save your projects'}</h1><br />
            <button onClick={handleClick}>
                + New Project
            </button>
{/*TODO:: pull in-progress projects from the database and allow link to them so users can work on them*/}
        </div>
    )
}

export default Projects
