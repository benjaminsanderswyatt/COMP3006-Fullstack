import React, { useState} from "react";

const RegisterForm = ({ formData, onChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Check form is valid
  const handleSubmit = (e) => {
    e.preventDefault();

    // Password and Confirm Password must be the same to submit
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage("");
    onSubmit(e);
  };

  return (
  <form style={styles.container} onSubmit={handleSubmit}>
    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor="username">Username</label>
      <input
        style={styles.input}
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={onChange}
        required
      />
    </div>
    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor="email">Email</label>
      <input
        style={styles.input}
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        required
      />
    </div>
    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor="password">Password</label>
      <div style={styles.passwordField}>
        <input
          style={styles.input}
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
        />
        <button type="button" onClick={togglePasswordVisibility} style={styles.showPasswordButton}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
    <div style={styles.formGroup}>
      <label style={styles.label} htmlFor="confirmPassword">Confirm Password</label>
      <div style={styles.passwordField}>
        <input
          style={styles.input}
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onChange}
          required
        />
        <button type="button" onClick={toggleConfirmPasswordVisibility} style={styles.showPasswordButton}>
          {showConfirmPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
    <button style={styles.button} type="submit">Register</button>
  </form>
  );

};

const styles = {
  error: {
    color: "#e74c3c",
    fontSize: "16px",
    margin: "0px",
  },
  container: {

  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#444444",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
    margin: "0px 0px 20px 0px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3F7FAA",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "20px 0px",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  showPasswordButton: {
    display: "block",
    height: "40px",
    width: "60px",
    marginLeft: "4px",
    background: "aliceblue",
    border: "grey",
    borderRadius: "8px",
    borderWidth: "thin",
    borderStyle: "solid",
  },
  passwordField: {
    display: "flex",
  },
}


export default RegisterForm;