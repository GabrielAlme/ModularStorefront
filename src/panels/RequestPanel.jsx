import { useState } from "react";

const RequestPanel = () => {
  const [panelName, setPanelName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // Handles form submission by saving the request to localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!panelName || !description) {
      setMessage("Please fill out all fields.");
      return;
    }

    // Pull existing requests, add new entry, and save back to localStorage
    const currentRequests = JSON.parse(localStorage.getItem("panelRequests")) || [];
    const newRequest = {
      id: Date.now(),
      title: panelName,
      description: description,
      status: "Pending",
      timestamp: new Date().toLocaleString()
    };
    
    localStorage.setItem("panelRequests", JSON.stringify([...currentRequests, newRequest]));
    setMessage("Success! Your request has been sent to the admins.");
    
    // Clear inputs
    setPanelName("");
    setDescription("");
  };

  return (
    <div style={{ padding: "12px", color: "var(--text)" }}>
      <h3>Request a New Panel Feature</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label>
          Panel Name:
          <input 
            type="text" 
            value={panelName} 
            onChange={(e) => setPanelName(e.target.value)} 
            style={{ width: "100%", padding: "4px" }} 
          />
        </label>
        <label>
          Description / Intended Use:
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={{ width: "100%", padding: "4px", minHeight: "60px" }}
          />
        </label>
        <button type="submit" style={{ padding: "6px", cursor: "pointer" }}>Submit Request</button>
      </form>
      {message && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>}
    </div>
  );
};

export default RequestPanel;