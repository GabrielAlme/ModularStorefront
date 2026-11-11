import React from 'react'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Workspace');
    }

    return (
        <div>
            <br />
            <h1>Your Projects:</h1><br />
            <button onClick={handleClick}>
                + New Project
            </button>
        </div>
    )
}

export default Projects
