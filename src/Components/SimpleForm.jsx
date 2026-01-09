/**
 * Simple Form component
 */

import React, { useState } from "react";

const SimpleForm = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Construct API URL based on environment
      let apiUrl;
      if (window.location.hostname === 'localhost') {
        apiUrl = 'http://localhost:3001/generate';
      } else {
        // For Codespaces: replace port in hostname
        const apiHost = window.location.hostname.replace(/-1234\./, '-3001.');
        apiUrl = `${window.location.protocol}//${apiHost}/generate`;
      }
      
      console.log('API URL:', apiUrl); // Debug logging
      
      const response = await fetch(apiUrl, {        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const resultDiv = document.getElementById('result');
      if (resultDiv) {
        resultDiv.textContent = JSON.stringify(data, null, 2);
      }
      
      setInputValue("");
    } catch (error) {
      console.error('Fetch error:', error); // Debug logging
      const resultDiv = document.getElementById('result');
      if (resultDiv) {
        resultDiv.textContent = `Error: ${error.message}`;
      }
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter text here"
          style={{ padding: "0.5rem", fontSize: "1rem", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer" }}>
          Submit
        </button>
      </form>
      <div 
        id="result" 
        style={{ 
          marginTop: "1rem", 
          padding: "1rem", 
          backgroundColor: "#f5f5f5", 
          borderRadius: "4px",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace"
        }}
      >
        Response will appear here...
      </div>
    </div>
  );
};

export default SimpleForm;
