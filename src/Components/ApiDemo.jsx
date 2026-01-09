/**
 * API Demo component
 * 
 * Demonstrates POST request to the API endpoint with JSON payload
 */

import React, { useState } from "react";

const ApiDemo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Construct API URL based on environment
      let apiUrl;
      if (window.location.hostname === 'localhost') {
        apiUrl = 'http://localhost:3001/api/data';
      } else {
        // For Codespaces: replace port in hostname
        const apiHost = window.location.hostname.replace(/-1234\./, '-3001.');
        apiUrl = `${window.location.protocol}//${apiHost}/api/data`;
      }
      
      console.log('API URL:', apiUrl); // Debug logging
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error('Fetch error:', err); // Debug logging
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>API Demo - POST Request</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: "0.75rem", cursor: "pointer" }}
        >
          {loading ? "Sending..." : "Send Data"}
        </button>
      </form>

      {error && (
        <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#ffebee", color: "#c62828", borderRadius: "4px" }}>
          Error: {error}
        </div>
      )}

      {response && (
        <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#e8f5e9", borderRadius: "4px" }}>
          <h3>Response from API:</h3>
          <pre style={{ overflow: "auto" }}>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiDemo;
