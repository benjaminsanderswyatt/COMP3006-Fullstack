import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ToggleButton from "../components/ToggleButton";
import { register, login } from "../api/fetchUsers";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Stores if the error is 'success' or 'error'

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect to store if user has token (already logged in)
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/store", { replace: true }); // Redirect
    }
  }, [navigate]);


  const toggleForm = () => {
    setIsRegistering(!isRegistering);

    // Reset the form when switched
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });

    // Reset message type
    // The messageType is only = success when successfully registered (so it can be transfered to the login)
    if (messageType === 'error') { 
      setMessage("");
      setMessageType("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Set the value when user types it in
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      // Register

      try {
        // Send request
        const response = await register(
          formData.username,
          formData.email,
          formData.password
        );

        if (response.success) {
          setMessageType('success');
          setMessage("Registration successful!");
          toggleForm(); // Go to the login page
        } else {
          setMessageType('error');
          setMessage(response.message || "Registration failed");
        }

      } catch (error) {
        console.error("Registration error:", error);
        setMessageType('error');
        setMessage("An error occurred during registration. Please try again.");
      }

    } else {
      // Login

      try {
        // Send request
        const response = await login(
          formData.email,
          formData.password
        );
        
        if (response.success){
          localStorage.setItem('token', response.token);
          navigate("/store"); // Navigate
        } else {
          setMessageType('error');
          setMessage("Incorrect username or password. Please try again.");
        }

      } catch (error) {
        console.error("Login error:", error);
        setMessageType('error');
        setMessage("An error occurred during login");
      }

    }
  };



  // Message colour, green for success, red for failure
  const messageStyle = messageType === 'success' ? { color: 'green' } : { color: 'red' };

  return (
    <div style={styles.main}>
      <h1 style={styles.heading}>{isRegistering ? "Register" : "Login"}</h1>
      {isRegistering ? (
        <RegisterForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      ) : (
        <LoginForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}

      {message && <p style={{ ...styles.message, ...messageStyle }}>{message}</p>}

      <ToggleButton isRegistering={isRegistering} onClick={toggleForm} />
    </div>
  );
};

const styles = {
  main: {
    backgroundColor: "#acd6f6",
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2.5rem",
    margin: "20px 0px",
    textShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
  message: {
    marginTop: '15px',
    fontWeight: 'bold',
  },
}



export default Login;