import React from 'react';
import Layout from '@theme/Layout';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { useHistory } from '@docusaurus/router'; // Import useNavigate for redirection

function Login() {
  const { login } = useAuth(); // Get login function from context
  const history = useHistory(); // Initialize useNavigate hook

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
      await login(email, password); // Use the login function from AuthContext
      alert('Login successful!');
      history.push('/ai-book-new/'); // Redirect to home for now
    } catch (error) {
      alert(`Login failed: ${error.message}`);
      console.error('Login error:', error);
    }
  };

  return (
    <Layout title="Login" description="Login to access personalized content.">
      <main className="auth-container">
        <div className="auth-card">
          <h1>Login</h1>
          <LoginForm onLogin={handleLogin} />
        </div>
      </main>
    </Layout>
  );
}

export default Login;
