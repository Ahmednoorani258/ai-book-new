import React from 'react';
import { useAuth } from '@site/src/contexts/AuthContext';
import Link from '@docusaurus/Link';

export default function NavbarAuth(props) {
  const auth = useAuth() as any;
  
  if (!auth || auth.loading) {
    return null;
  }

  const { user, logout } = auth;

  return (
    <div className="navbar__item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {user ? (
        <button 
          className="button button--secondary button--sm" 
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className="button button--primary button--sm" style={{ marginRight: '8px' }}>
            Login
          </Link>
          <Link to="/register" className="button button--secondary button--sm">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}
