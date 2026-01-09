/**
 * Simple Form component
 */

import React, { useState } from "react";

const SimpleForm = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3001/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue })
      });
      
      const data = await response.json();
      const resultDiv = document.getElementById('result');
      if (resultDiv) {
        resultDiv.textContent = JSON.stringify(data, null, 2);
      }
      
      setInputValue("");
    } catch (error) {
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
