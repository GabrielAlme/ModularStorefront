import { useState, useEffect } from "react";

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState([]);

  // Dynamically load panel requests from storage whenever roles switch or render
  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem("panelRequests")) || [];
    setRequests(savedRequests);
  }, [isAdmin]);

  // Handles the approval flow with user verification confirmation
  const handleApprove = (reqId, reqTitle) => {
    // Standard prompt to confirm admin authorization intent
    const confirmed = window.confirm(`Are you sure you want to approve the "${reqTitle}" panel request?`);
    
    if (confirmed) {
      // Filter out the newly approved item to remove it from active queue lists
      const remainingRequests = requests.filter(item => item.id !== reqId);
      
      // Update local React UI rendering state directly
      setRequests(remainingRequests);
      
      // Persist the changes into localStorage so it updates across the application
      localStorage.setItem("panelRequests", JSON.stringify(remainingRequests));
      
      // Success receipt confirmation alert
      alert(`"${reqTitle}" request successfully approved and migrated to the backlog!`);
    }
  };

  return (
    <div className="sidebar" style={{ padding: "12px", color: "#818181" }}>
      <h3 style={{ color: "#fff", fontSize: "16px" }}>Dashboard Control</h3>
      
      {/* Switch button enabling role swaps between regular storefront users and administrators */}
      <button 
        onClick={() => setIsAdmin(!isAdmin)} 
        style={{ margin: "10px 0", padding: "6px", width: "100%", cursor: "pointer" }}
      >
        Switch to {isAdmin ? "User Mode" : "Admin Mode"}
      </button>

      <hr style={{ borderColor: "#333", margin: "12px 0" }} />

      {/* Admin Interface layout */}
      {isAdmin ? (
        <div>
          <h4 style={{ color: "#fff", marginBottom: "10px" }}>Admin Panel Requests:</h4>
          {requests.length === 0 ? (
            <p style={{ fontSize: "12px", fontStyle: "italic" }}>No new requests pending review.</p>
          ) : (
            <ul style={{ paddingLeft: "0", fontSize: "12px", listStyleType: "none" }}>
              {requests.map(req => (
                <li 
                  key={req.id} 
                  style={{ 
                    marginBottom: "12px", 
                    backgroundColor: "#1c1c1c", 
                    padding: "8px", 
                    borderRadius: "4px",
                    borderLeft: "3px solid #5cb85c" 
                  }}
                >
                  <strong style={{ color: "#fff" }}>{req.title}</strong>: {req.description} <br />
                  <span style={{ color: "orange", fontWeight: "bold" }}>[{req.status}]</span> 
                  <span style={{ color: "#8a857c", marginLeft: "6px" }}>{req.timestamp}</span>
                  
                  {/* Functional Approve Button */}
                  <div style={{ marginTop: "8px" }}>
                    <button
                      onClick={() => handleApprove(req.id, req.title)}
                      style={{
                        backgroundColor: "#5cb85c",
                        color: "white",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "3px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "11px"
                      }}
                    >
                      Approve Request
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        /* Standard User Persona Layout Info */
        <div>
          <p style={{ fontSize: "12px" }}>Logged in as: <strong>Storefront User</strong></p>
          <span style={{ fontSize: "11px" }}>Use the drop-down workspace window controls to deploy components.</span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;