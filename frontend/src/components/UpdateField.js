import React, { useState } from 'react';
import { updateUser } from '../api/fetchUsers';

const UpdateField = ({ field }) => {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(''); // Stores if the message is 'success' or 'error'

  const token = localStorage.getItem('token');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    const updateData = { [field]: value };
    const result = await updateUser(token, updateData);

    if (result.success) {
      setMessage(`${field} updated successfully.`);
      setMessageType('success');
      setValue('');
    } else {
      setMessage(`Error updating ${field}: ${result.message}`);
      setMessageType('error');
    }
  };


  // Message colour, green for success, red for failure
  const messageStyle = messageType === 'success' ? { color: 'green' } : { color: 'red' };

  return (
    <div style={styles.fieldContainer}>
      <form onSubmit={handleSubmit}>

        <label>
          {`Change ${field.charAt(0).toUpperCase() + field.slice(1)}?`}

          <input
            type={field === 'password' ? 'password' : 'text'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Enter new ${field}`}
            style={styles.input}
          />
          
        </label>

        {message && <p style={{ ...styles.message, ...messageStyle }}>{message}</p>}

        <button type="submit" style={styles.button}>
          Update
        </button>

      </form>

      

    </div>
  );
};

const styles = {
  fieldContainer: {
    margin: '30px 0',
    
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#444444",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    boxSizing: "border-box",
    padding: '8px',
    margin: '10px 0px',
    fontSize: '16px',
    width: '100%',
  },
  button: {
    padding: '8px 15px',
    backgroundColor: "#3F7FAA",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "10px 0px",
  },
  message: {
    marginTop: '10px',
  },

};

export default UpdateField;
