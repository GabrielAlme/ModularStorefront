import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../authorization';
import { useState, useEffect } from 'react';
import List from '../List';
import SiteCreation from '../SiteCreation';

const Projects = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [stores, setStores] = useState(null);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetch("/api/stores", {headers : { Authorization: `Bearer ${ token }` } }).then((res) => {
            if (res.status === 401) { navigate("/SignIn"); return []; }
            if (!res.ok) throw new Error(`Stores request failed ${ res.status }`);
            return res.json();
        }).then((rows) => 
            setStores(rows.map((s) => ({ id: s.store_id, label: s.slug, createdAt: s.created_at})))).catch(console.error);
    }, [token]);

    const handleCreated = (store) => {
        setStores((prev) => [...prev, { id: store.store_id, label: store.slug, createdAt: store.created_at }]);
        setAdding(false);
    }

    const openStore = async (storeId) => {
        const res = await fetch(`/api/stores/${storeId}/activate`, {
            method: "PUT", 
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) navigate('/Workspace');
    };

    return (
        <div>
            <h1>{token ? `Your projects` : 'Please log in to save your projects'}</h1><br />
            <button onClick = {() => setAdding(true)}>
                + New Project
            </button>
            {adding && <SiteCreation onClose={() => setAdding(false)} onCreated={handleCreated} />}
            {stores === null ? (
                <p>Loading...</p>
            ) : (
                <List registry = { stores }
                onSelect = { openStore }
                numbered = { true }
                showCreatedAt = { true }
                emptyMessage="You don't have any projects yet."
                />
            )}
        </div>
    )
}

export default Projects
