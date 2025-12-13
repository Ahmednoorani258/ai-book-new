import React from 'react';
import Layout from '@theme/Layout';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

function Login() {
  const { login } = useAuth(); // Get login function from context

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch('/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      alert('Login successful!');
      login(data.session); // Use context login function
      window.location.href = '/'; // Redirect to home for now
    } catch (error) {
      alert(`Login failed: ${error.message}`);
      console.error('Login error:', error);
    }
  };

  return (
    <Layout title="Login" description="Login to access personalized content.">
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div>
          <h1>Login</h1>
          <LoginForm onLogin={handleLogin} />
        </div>
      </main>
    </Layout>
  );
}

export default Login;
