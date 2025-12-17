import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import RegistrationForm from '../components/RegistrationForm';

function RegisterContent() {
  const { useAuth } = require("../contexts/AuthContext");
  const { useHistory } = require("@docusaurus/router");

  const { register } = useAuth();
  const history = useHistory();

  const handleRegister = async ({ email, password, name, experienceLevel }) => {
    try {
      // Call Better Auth register from context
      await register({
        email,
        password,
        name: name || email.split("@")[0],
      });

      // If experienceLevel is provided, update profile via backend
      if (experienceLevel) {
        try {
          const response = await fetch('https://ai-book-new.onrender.com/api/v1/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password,
              name: name || email.split("@")[0],
              experienceLevel
            })
          });
          if (!response.ok) {
            console.error('Failed to save experience level');
          }
        } catch (err) {
          console.error('Profile update error:', err);
        }
      }

      alert("Registration successful! Please login.");
      history.push("/ai-book-new/login");
    } catch (err) {
      alert(err.message);
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
