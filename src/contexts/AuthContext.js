import React, { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load session from Better Auth
  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          // Fetch user profile with experience level
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
      } catch (err) {
        console.error("Session error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    
    // Fetch user profile with experience level
    if (data?.user) {
      try {
        const profileResponse = await fetch(`http://localhost:8000/api/v1/users/${data.user.id}/profile`);
        if (profileResponse.ok) {
          const profile = await profileResponse.json();
          const userWithProfile = { ...data.user, experienceLevel: profile.experienceLevel };
          setUser(userWithProfile);
          return userWithProfile;
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
      }
    }
    
    setUser(data.user);
    return data.user;
  };

  // ✅ REGISTER
  const register = async ({ email, password, name }) => {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) throw new Error(error.message);
    return data.user;
  };

  // ✅ LOGOUT
  const logout = async () => {
    await authClient.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
