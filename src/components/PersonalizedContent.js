import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const PersonalizedContentInner = ({ experienceLevel, children }) => {
  const { useAuth } = require('../contexts/AuthContext');
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user && experienceLevel === 'anonymous') {
    return <>{children}</>;
  }

  if (user && user.experienceLevel === experienceLevel) {
    return <>{children}</>;
  }
  return null;
};

const PersonalizedContent = ({ experienceLevel, children }) => {
  return (
    <BrowserOnly fallback={null}>
      {() => <PersonalizedContentInner experienceLevel={experienceLevel}>{children}</PersonalizedContentInner>}
    </BrowserOnly>
  );
};

export default PersonalizedContent;
