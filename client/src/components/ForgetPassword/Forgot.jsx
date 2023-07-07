import React, { useState } from 'react';
import './forgot.css'

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setResetSent(true);
      } else {
        const data = await response.json();
        console.error('Password reset error:', data.message);
      }
    } catch (error) {
      console.error('Password reset error:', error);
    }
  };

  return (
    <div>
      {!resetSent ? (
        <div>
          <h2>Password Recovery</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Password Reset Email Sent</h2>
          <p>An email has been sent to {email} with further instructions.</p>
        </div>
      )}
    </div>
  );
};

export default Forgot;
