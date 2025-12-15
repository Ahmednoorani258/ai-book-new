describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear cookies and localStorage before each test to ensure a clean state
    cy.clearCookies();
    cy.clearLocalStorage();
    // Visit the base URL (e.g., your Docusaurus app's root)
    cy.visit('/');
  });

  it('should allow a user to register, log in, and log out successfully', () => {
    // Navigate to the registration page
    cy.visit('/register');

    // Fill the registration form
    cy.get('input#email').type('test_e2e@example.com');
    cy.get('input#password').type('securePassword123');
    cy.get('select#experienceLevel').select('beginner');
    cy.get('button[type="submit"]').click();

    // Check for successful registration alert
    cy.on('window:alert', (str) => {
      expect(str).to.include('Registration successful!');
    });
    // Should redirect to login page after registration
    cy.url().should('include', '/login');

    // Fill the login form
    cy.get('input#email').type('test_e2e@example.com');
    cy.get('input#password').type('securePassword123');
    cy.get('button[type="submit"]').click();

    // Check for successful login alert
    cy.on('window:alert', (str) => {
      expect(str).to.include('Login successful!');
    });
    // Should redirect to home page
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // Check if user info is displayed and logout button is present
    cy.contains('Welcome, test_e2e@example.com!');
    cy.contains('button', 'Logout').click();

    // Check for successful logout alert
    cy.on('window:alert', (str) => {
      expect(str).to.include('Logged out successfully!');
    });
    // Should redirect back to login page after logout
    cy.url().should('include', '/login');
  });

  it('should display an error for invalid registration', () => {
    // Attempt to register with a weak password
    cy.visit('/register');
    cy.get('input#email').type('invalid_reg@example.com');
    cy.get('input#password').type('short'); // Password too short
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.include('Password must be at least 8 characters long.');
    });
    cy.url().should('include', '/register'); // Should stay on register page
  });

  it('should display an error for invalid login credentials', () => {
    cy.visit('/login');

    // Attempt to log in with incorrect credentials
    cy.get('input#email').type('nonexistent@example.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.include('Login failed:');
    });
    cy.url().should('include', '/login'); // Should stay on login page
  });

  // You might want to add more tests for:
  // - Email verification flow
  // - Password reset flow
  // - Social login (if implemented)
  // - Accessing protected routes when unauthenticated
  // - Protected routes inaccessible after logout
});
