import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Adjust path as necessary

const PersonalizedContent = ({ experienceLevel, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  // If user is null (not logged in or session expired) and content is for anonymous
  // Or if user is logged in and experienceLevel matches
  if (!user && experienceLevel === 'anonymous') { // Assuming 'anonymous' is a valid experienceLevel for this component
    return <>{children}</>;
  }

  if (user && user.experienceLevel === experienceLevel) {
    return <>{children}</>;
  }
  return null;
};

export default PersonalizedContent;
