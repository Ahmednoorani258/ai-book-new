import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores userId and experienceLevel
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSession = localStorage.getItem('userSession');
    if (storedSession) {
      const session = JSON.parse(storedSession);
      // In a real app, you would validate this session with your backend
      // For now, we assume it's valid and contains userId.
      const fetchUserProfile = async (userId) => {
        try {
          const response = await fetch(`/api/v1/users/${userId}/profile`);
          if (response.ok) {
            const profile = await response.json();
            setUser({ userId: profile.userId, experienceLevel: profile.experienceLevel });
          } else {
            console.error('Failed to fetch user profile:', response.statusText);
            localStorage.removeItem('userSession'); // Clear invalid session
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          localStorage.removeItem('userSession');
        } finally {
          setLoading(false);
        }
      };
      if (session.userId) { // Assuming session has userId
        fetchUserProfile(session.userId);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = (session) => {
    localStorage.setItem('userSession', JSON.stringify(session));
    // Assuming session object contains userId and experienceLevel
    setUser({ userId: session.userId, experienceLevel: session.experienceLevel });
  };

  const logout = () => {
    localStorage.removeItem('userSession');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
