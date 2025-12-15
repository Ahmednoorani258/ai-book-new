import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import LoginForm from '../components/LoginForm';

function LoginContent() {
  const { useAuth } = require('../contexts/AuthContext');
  const { useHistory } = require('@docusaurus/router');
  
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = async ({ email, password }) => {
    // Client-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!password) {
      alert('Password cannot be empty.');
      return;
    }

    try {
      await login(email, password);
      alert('Login successful!');
      history.push('/ai-book-new/');
    } catch (error) {
      alert(`Login failed: ${error.message}`);
      console.error('Login error:', error);
    }
  };

  return (
    <main className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <LoginForm onLogin={handleLogin} />
      </div>
    </main>
  );
}

function Login() {
  return (
    <Layout title="Login" description="Login to access personalized content.">
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => <LoginContent />}
      </BrowserOnly>
    </Layout>
  );
}

export default Login;
