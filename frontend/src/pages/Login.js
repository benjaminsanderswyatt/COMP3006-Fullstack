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
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegistering(!isRegistering);

    // Reset the form when switched
    setFormData({
      email: "",
      password: "",
      username: "",
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
    <div className={styles.main}>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "white",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    textShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    background: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
    color: "#333",
  },
  input: {
    fontSize: "1rem",
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  inputFocus: {
    borderColor: "#6a11cb",
  },
  button: {
    fontSize: "1rem",
    padding: "10px",
    background: "#6a11cb",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    background: "#2575fc",
  },
  toggleButton: {
    marginTop: "10px",
    cursor: "pointer",
    color: "white",
    textDecoration: "underline",
    fontSize: "0.9rem",
  },
  toggleButtonHover: {
    color: "#ffefba",
  }
}



export default Login;