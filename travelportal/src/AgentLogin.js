import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgentLogin = () => {
  const [isLoginForm, setLoginForm] = useState(true);
  const [traveller_agent_name, setTravellerAgentName] = useState("");
  const [traveller_agent_password, setTravellerAgentPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState(""); 
  const[agentimage,setImage] =useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setLoginForm(true);
  };

  const handleSignupClick = () => {
    setLoginForm(false);
  };

  const handleSignupLinkClick = () => {
    setLoginForm(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "traveller_agent_name") {
      setTravellerAgentName(value);
      setNameError(value.length > 100 ? "Name must not exceed 100 characters" : "");
    } else if (name === "traveller_agent_password") {
      setTravellerAgentPassword(value);
      if (value.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
        setPasswordError(passwordRegex.test(value) ? "" : "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      }
    } else if (name === "phonenumber") {
      setPhoneNumber(value);
      setPhoneError(value.length !== 10 || !/^\d+$/.test(value) ? "Invalid phone number" : "");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    axios.post("https://localhost:7203/api/Token/Traveller", { traveller_agent_name, traveller_agent_password })
      .then((response) => {
        console.log("Login response:", response);
        if (response.data && response.data.token && response.data.id) {
          navigate('/tourpost'); 
          console.log("Token:", response.data.token);
          console.log("Traveller Agent ID:", response.data.id);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('traveller_agent_id', response.data.id); 
        } else {
          console.error("Login error: Token or traveller_agent_id is not available in the response.");
          // Handle login error here
        }
      })      
      .catch((error) => {
        console.error("Login error:", error);
      });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('traveller_agent_name', traveller_agent_name);
    formData.append('traveller_agent_password', traveller_agent_password);
    formData.append('phonenumber', phonenumber);
    if (agentimage) {
      formData.append("imageFile", agentimage);
  }
    try {
      const response = await axios.post("https://localhost:7203/api/Travelagent", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };


  return (
    <div>
       <style>
        {`
html,body{
  display: grid;
  height: 100%;
  width: 100%;
  place-items: center;
  background: -webkit-linear-gradient(left, #003366,#004080,#0059b3
, #0073e6);
}
::selection{
  background: #1a75ff;
  color: #fff;
}
.wrapper{
  overflow: hidden;
  max-width: 390px;
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
}
.wrapper .title-text{
  display: flex;
  width: 200%;
}
.wrapper .title{
  width: 50%;
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}
.wrapper .slide-controls{
  position: relative;
  display: flex;
  height: 50px;
  width: 100%;
  overflow: hidden;
  margin: 30px 0 10px 0;
  justify-content: space-between;
  border: 1px solid lightgrey;
  border-radius: 15px;
}
.slide-controls .slide{
  height: 100%;
  width: 100%;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  z-index: 1;
  transition: all 0.6s ease;
}
.slide-controls label.signup{
  color: #000;
}
.slide-controls .slider-tab{
  position: absolute;
  height: 100%;
  width: 50%;
  left: 0;
  z-index: 0;
  border-radius: 15px;
  background: -webkit-linear-gradient(left,#003366,#004080,#0059b3
, #0073e6);
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}
input[type="radio"]{
  display: none;
}
#signup:checked ~ .slider-tab{
  left: 50%;
}
#signup:checked ~ label.signup{
  color: #fff;
  cursor: default;
  user-select: none;
}
#signup:checked ~ label.login{
  color: #000;
}
#login:checked ~ label.signup{
  color: #000;
}
#login:checked ~ label.login{
  cursor: default;
  user-select: none;
}
.wrapper .form-container{
  width: 100%;
  overflow: hidden;
}
.form-container .form-inner{
  display: flex;
  width: 200%;
}
.form-container .form-inner form{
  width: 50%;
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}
.form-inner form .field{
  height: 50px;
  width: 100%;
  margin-top: 20px;
}
.form-inner form .field input{
  height: 100%;
  width: 100%;
  outline: none;
  padding-left: 15px;
  border-radius: 15px;
  border: 1px solid lightgrey;
  border-bottom-width: 2px;
  font-size: 17px;
  transition: all 0.3s ease;
}
.form-inner form .field input:focus{
  border-color: #1a75ff;
  /* box-shadow: inset 0 0 3px #fb6aae; */
}
.form-inner form .field input::placeholder{
  color: #999;
  transition: all 0.3s ease;
}
form .field input:focus::placeholder{
  color: #1a75ff;
}
.form-inner form .pass-link{
  margin-top: 5px;
}
.form-inner form .signup-link{
  text-align: center;
  margin-top: 30px;
}
.form-inner form .pass-link a,
.form-inner form .signup-link a{
  color: #1a75ff;
  text-decoration: none;
}
.form-inner form .pass-link a:hover,
.form-inner form .signup-link a:hover{
  text-decoration: underline;
}
form .btn{
  height: 50px;
  width: 100%;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}
form .btn .btn-layer{
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(right,#003366,#004080,#0059b3
, #0073e6);
  border-radius: 15px;
  transition: all 0.4s ease;;
}
form .btn:hover .btn-layer{
  left: 0;
}
form .btn input[type="submit"]{
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
  background: none;
  border: none;
  color: #fff;
  padding-left: 0;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}
.error {
  color: blue;
  font-size: 14px;
  margin-top: 5px;
}


       `}
      </style>
      <div className="wrapper">
        <div className="title-text">
          <div className="title login">Login Form</div>
          <div className="title signup">Signup Form</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" checked={isLoginForm} onChange={handleLoginClick} />
            <input type="radio" name="slide" id="signup" checked={!isLoginForm} onChange={handleSignupClick} />
            <label htmlFor="login" className="slide login">Login</label>
            <label htmlFor="signup" className="slide signup">Signup</label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            {isLoginForm ? (
              <form onSubmit={handleSubmit} className="login">
                <div className="field">
                  <input type="text" name="traveller_agent_name" placeholder="Name" value={traveller_agent_name} onChange={handleInputChange} required />
                  {nameError && <p className="error">{nameError}</p>}

                </div>
                <div className="field">
                  <input type="password" name="traveller_agent_password" placeholder="Password" value={traveller_agent_password} onChange={handleInputChange} required />
                  {passwordError && <p className="error">{passwordError}</p>}

                </div>
                <div className="field" style={{ display: "none" }}>
                  <input type="file" name="agentimage" onChange={handleImageChange} disabled />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">
                  <a href="#" onClick={handleSignupLinkClick}>Create an account</a>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="signup">
                <div className="field">
                  <input type="text" name="traveller_agent_name" placeholder="Name" value={traveller_agent_name} onChange={handleInputChange} required />
                </div>
                <div className="field">
                  <input type="password" name="traveller_agent_password" placeholder="Password" value={traveller_agent_password} onChange={handleInputChange} required />
                  {passwordError && <p className="error">{passwordError}</p>}

                </div>
                
                <div className="field">
                  <input type="text" name="phonenumber" placeholder="Phone Number" value={phonenumber} onChange={handleInputChange} required />
                  {phoneError && <p className="error">{phoneError}</p>}

                </div>
                <div className="field">
                  <input type="file" name="agentimage" onChange={handleImageChange} required />
                </div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Signup" />
                </div>
                <div className="pass-link">
                  <a href="#" onClick={handleSignupLinkClick}>Already have an account? Log in</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;
