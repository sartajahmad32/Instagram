import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Perform form submission or API call with the form data
      axios
        .post('http://localhost:8080/api/signUp', formData)
        .then((response) => {
          console.log('Signup successful');
          console.log(response.data);

          // Display success message
          alert('Successfully registered!');

          // Navigate to home page
          navigate('/instagram'); // Replace '/' with the path to your home page component
        })
        .catch((error) => {
          console.log('Signup failed:', error);
        });
    } else {
      setFormError('Please fill in all the fields');
    }
  };

  const handleGoogleSignup = () => {
    // Perform Google signup logic here
    // For example, you can initiate Google sign-in using a library like Firebase Authentication
    console.log('Google signup');
  };

  const handleFacebookSignup = () => {
    // Perform Facebook signup logic here
    // For example, you can initiate Facebook sign-in using a library like Firebase Authentication
    console.log('Facebook signup');
  };

  const isFormValid = () => {
    return (
      formData.firstName !== '' &&
      formData.lastName !== '' &&
      formData.email !== '' &&
      formData.password !== ''
    );
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Sign up</button>
      </form>
      {formError && <p>{formError}</p>}
      <div>
        <h3>Or sign up with:</h3>
        <button onClick={handleGoogleSignup}>Google</button>
        <button onClick={handleFacebookSignup}>Facebook</button>
      </div>
    </div>
  );
};

export default SignUp;
