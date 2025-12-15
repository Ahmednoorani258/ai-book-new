import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import RegistrationForm from '../components/RegistrationForm';

function RegisterContent() {
  const { useAuth } = require('../contexts/AuthContext');
  const { useHistory } = require('@docusaurus/router');
  
  const { authClient } = useAuth();
  const history = useHistory();
  
  const handleRegister = async ({ email, password, name, image, experienceLevel }) => {
    // Client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    try {
      // Call backend API directly for registration with experienceLevel
      const response = await fetch('http://localhost:8000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name: name || email.split('@')[0],
          image: image || null,
          experienceLevel: experienceLevel || 'beginner',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      alert(`Registration successful! Please log in.`);
      history.push('/ai-book-new/login');
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
      console.error('Registration error:', error);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        <RegistrationForm onRegister={handleRegister} />
      </div>
    </main>
  );
}

function Register() {
  return (
    <Layout title="Register" description="Register for a personalized experience.">
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => <RegisterContent />}
      </BrowserOnly>
    </Layout>
  );
}

export default Register;
