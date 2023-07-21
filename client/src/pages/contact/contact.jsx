import axios from "axios";
import React, { useState } from "react";
import "./contact.css";
const baseURL=process.env.REACT_APP_BASE_URL;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      await axios.post(`${baseURL}/api/contact`, {
        name,
        email,
        message,
      });
      setResponse(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="contact">
      <span className="contactTitle">Contact Me</span>
      <form className="contactForm" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          className="contactInput"
          placeholder="Enter your name..."
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="contactInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Message</label>
        <textarea
          className="contactMessage"
          placeholder="Enter your message..."
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        {response && <span className="response">Message was sent successfully.</span>}
        <button className="contactButton" type="submit">
          Contact
        </button>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
      </form>
    </div>
  );
}
