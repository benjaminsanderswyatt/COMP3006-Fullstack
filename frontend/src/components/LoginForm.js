import React, { useState} from "react";

const LoginForm = ({ formData, onChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form style={styles.container} onSubmit={onSubmit}>
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
      <button style={styles.button} type="submit">Login</button>
    </form>
  );

};


const styles = {
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
  },
  passwordField: {
    display: "flex",
  },
}

export default LoginForm;