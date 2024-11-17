import React, { useState } from "react";
import axios from "axios";

export default function DatabaseModal({ onClose, onConnect }) {
  const [credentials, setCredentials] = useState({
    serverAddress: "",
    port: "",
    database: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/connect-db", credentials);
      onConnect(true);
      alert(response.data.message);
    } catch (err) {
      onConnect(false);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="modal">
      <h2>Database Connection</h2>
      <input name="serverAddress" placeholder="Server Address" onChange={handleChange} />
      <input name="port" placeholder="Port" onChange={handleChange} />
      <input name="database" placeholder="Database" onChange={handleChange} />
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleSubmit}>Connect</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
