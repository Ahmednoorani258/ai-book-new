import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from '../RegistrationForm';

describe('RegistrationForm', () => {
  it('renders correctly', () => {
    render(<RegistrationForm onRegister={() => {}} />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Experience Level/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });

  it('calls onRegister with form data on submit', () => {
    const mockOnRegister = jest.fn();
    render(<RegistrationForm onRegister={mockOnRegister} />);

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/Experience Level/i), { target: { value: 'expert' } });
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    expect(mockOnRegister).toHaveBeenCalledTimes(1);
    expect(mockOnRegister).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      experienceLevel: 'expert',
    });
  });
});
