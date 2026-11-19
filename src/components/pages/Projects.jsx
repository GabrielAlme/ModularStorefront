import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authorization';
import { useState, useEffect } from 'react';
import List from '../List';

const Projects = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [stores, setStores] = useState(null);

    useEffect(() => {
        fetch("/api/stores", {headers : { Authorization: `Bearer ${ token }` } }).then((res) => {
            if (res.status === 401) { navigate("/SignIn"); return []; }
            if (!res.ok) throw new Error(`Stores request failed ${ res.status }`);
            return res.json();
        }).then((rows) => 
            setStores(rows.map((s) => ({ id: s.store_id, label: s.slug, createdAt: s.created_at})))).catch(console.error);
    }, [token]);

    async function getStores() {
        const response = await fetch("/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        });
        const stores = await response.json(); // array of store objects
    }
    const handleClick = () => {
        navigate('/Workspace');
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
