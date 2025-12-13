import React from 'react';
import Layout from '@theme/Layout';
import RegistrationForm from '../components/RegistrationForm';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

function Register() {
  const { login } = useAuth(); // Get login function from context

  const handleRegister = async ({ email, password, experienceLevel }) => {
    try {
      const response = await fetch('/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, experienceLevel }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      alert(`Registration successful! User ID: ${data.userId}`);
      // Assuming the register endpoint also returns session data or a way to get it
      // For simplicity, we'll manually create a session object. In a real app,
      // the backend would return a session or JWT.
      login({ userId: data.userId, experienceLevel: experienceLevel }); // Use context login function
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
      console.error('Registration error:', error);
    }
  };

  return (
    <Layout title="Register" description="Register for a personalized experience.">
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div>
          <h1>Register</h1>
          <RegistrationForm onRegister={handleRegister} />
        </div>
      </main>
    </Layout>
  );
}

export default Register;
