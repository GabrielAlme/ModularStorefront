import { useState } from 'react';
import { useAuth } from '../authorization';
import Modal from './Modal';

const SiteCreation = ({ onClose, onCreated }) => {
    const { token } = useAuth();
    const [slug, setSlug] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const createStore = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            const res = await fetch("/api/stores", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${ token }` },
                body: JSON.stringify({ slug })
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? "Something went wrong");
                return;
            }
            onCreated(data);
        } catch {
            setError("Couldn't reach the server, try again");
        }finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen onClose={onClose}>
            <form className="modal-form" onSubmit={ createStore }>
                <h2>New Project</h2>
                <input
                    autoFocus
                    value={ slug }
                    onChange={ (e) => { setSlug(e.target.value.toLowerCase()); setError("");  }}
                    placeholder="store-name"
                />
                {error && <p className="modal-error">{error}</p>}
                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit" disabled={submitting || !slug}>Create</button>
            </form>
        </Modal>
    );
};

export default SiteCreation;