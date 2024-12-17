import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ToggleButton from "../components/ToggleButton";
import { register, login } from "../api/fetchUsers";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegistering(!isRegistering);

    // Reset the form when switched
    setFormData({
      email: "",
      username: "",
      password: ""
    });
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
          alert("Registration successful!");
          toggleForm(); // Go to the login page
        } else {
          alert(response.message || "Registration failed");
        }

      } catch (error) {
        console.error("Registration error:", error);
        alert("An error occurred during registration");
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
          alert("Login failed");
        }

      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login");
      }

    }
  };

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
}



export default Login;