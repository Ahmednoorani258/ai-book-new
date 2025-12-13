import React from 'react';
import { render, screen } from '@testing-library/react';
import PersonalizedContent from '../PersonalizedContent';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext for mocking

describe('PersonalizedContent', () => {
  it('renders children when user experience level matches', () => {
    const mockUser = { userId: '123', experienceLevel: 'beginner' };
    render(
      <AuthContext.Provider value={{ user: mockUser, loading: false }}>
        <PersonalizedContent experienceLevel="beginner">
          <span>Beginner Content</span>
        </PersonalizedContent>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Beginner Content')).toBeInTheDocument();
  });

  it('does not render children when user experience level does not match', () => {
    const mockUser = { userId: '123', experienceLevel: 'intermediate' };
    render(
      <AuthContext.Provider value={{ user: mockUser, loading: false }}>
        <PersonalizedContent experienceLevel="beginner">
          <span>Beginner Content</span>
        </PersonalizedContent>
      </AuthContext.Provider>
    );
    expect(screen.queryByText('Beginner Content')).not.toBeInTheDocument();
  });

  it('renders children for anonymous users if experienceLevel is "anonymous" and no user is logged in', () => {
    render(
      <AuthContext.Provider value={{ user: null, loading: false }}>
        <PersonalizedContent experienceLevel="anonymous">
          <span>Anonymous Content</span>
        </PersonalizedContent>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Anonymous Content')).toBeInTheDocument();
  });

  it('does not render children for anonymous users if a user is logged in', () => {
    const mockUser = { userId: '123', experienceLevel: 'beginner' };
    render(
      <AuthContext.Provider value={{ user: mockUser, loading: false }}>
        <PersonalizedContent experienceLevel="anonymous">
          <span>Anonymous Content</span>
        </PersonalizedContent>
      </AuthContext.Provider>
    );
    expect(screen.queryByText('Anonymous Content')).not.toBeInTheDocument();
  });

  it('renders nothing when loading', () => {
    render(
      <AuthContext.Provider value={{ user: null, loading: true }}>
        <PersonalizedContent experienceLevel="beginner">
          <span>Beginner Content</span>
        </PersonalizedContent>
      </AuthContext.Provider>
    );
    expect(screen.queryByText('Beginner Content')).not.toBeInTheDocument();
  });
});
