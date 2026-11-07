import React from 'react'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Workshop');
    }

    return (
        <div>
            <br />
            <h1>Your Projects:</h1><br />
            <button onClick={handleClick}>
                + New Project
            </button>
{/*TODO:: pull in-progress projects from the database and allow link to them so users can work on them*/}
        </div>
    )
}

export default Projects
