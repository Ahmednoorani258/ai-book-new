import React, { useState } from 'react';
import Link from '@docusaurus/Link'; // Import Link for redirection

const RegistrationForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('beginner'); // Default to beginner

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming 'name' and 'image' are optional and might be added later
    onRegister({ email, password, experienceLevel });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth-form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="auth-form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="auth-form-group">
        <label htmlFor="experienceLevel">Experience Level:</label>
        <select
          id="experienceLevel"
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="auth-input-select"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
      </div>
      <button type="submit" className="auth-submit-button">Register</button>
      <div className="auth-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
