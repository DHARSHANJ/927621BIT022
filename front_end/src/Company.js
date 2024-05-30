import React, { useState } from "react";
import "./App.css";

function Company() {
  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      companyName: companyName,
      ownerName: ownerName,
      rollNo: rollNo,
      ownerEmail: ownerEmail,
      accessCode: "sFmNjQ",
    };

    try {
      const res = await fetch("http://20.244.56.144/test/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
      setResponse({
        error: "An error occurred while registering the company.",
      });
    }
  };

  return (
    <div className="App">
      <h1>Register Your Company</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Owner Name:
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Roll No:
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Owner Email:
          <input
            type="email"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      {response && (
        <div className="Response">
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Company;
