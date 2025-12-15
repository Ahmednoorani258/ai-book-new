import React, { createContext, useContext, useState, useEffect } from 'react';
import { authClient } from '../lib/auth-client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user session from Better Auth on first render
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data, error } = await authClient.getSession();
        if (data?.user) {
          // Fetch user profile with experience level
          const profileResponse = await fetch(`http://localhost:8000/api/v1/users/${data.user.id}/profile`);
          if (profileResponse.ok) {
            const profile = await profileResponse.json();
            setUser({ ...data.user, experienceLevel: profile.experienceLevel });
          } else {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message || 'Login failed');
    }

    if (data?.user) {
      // Fetch user profile
      try {
        const profileResponse = await fetch(`http://localhost:8000/api/v1/users/${data.user.id}/profile`);
        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          setUser({ ...data.user, experienceLevel: profile.experienceLevel });
        } else {
          setUser(data.user);
        }
      } catch (err) {
        setUser(data.user);
      }
    }

    return data.user;
  };

  const logout = async () => {
    await authClient.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        authClient, // Expose authClient for registration
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
