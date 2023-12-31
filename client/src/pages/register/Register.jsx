import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
const baseURL = process.env.REACT_APP_BASE_URL;

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${baseURL}/api/auth/register`, {
        username,
        email,
        password,
        profilePic
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  const handleImage = async (e) =>{
    const reader = new FileReader();

    reader.onload = () =>{
      if(reader.readyState===2){
        setProfilePic(reader.result);
      }
    }

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="registerprofile">
        {profilePic ? (
          <img
          src={profilePic}
          alt=""
          className="registerImage"
        />
        ) : (
           <i className="registerPPIcon far fa-user-circle"></i>
        )}
        <label
          htmlFor="file-input"
        >
          <input
             type="file"
             name="profilePic"
             id="file-input"
             accept=".jpg,.jpeg,.png"
             className="inputImage"
             onChange={handleImage}
          />
        </label>
      </div>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
    </div>
  );
}
