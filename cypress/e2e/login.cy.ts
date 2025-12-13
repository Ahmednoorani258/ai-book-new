describe('Login Flow', () => {
  // Assuming a user can be registered before attempting to log in for a clean test.
  // In a real scenario, you might have a setup hook to register a user.
  const email = `login-test-${Date.now()}@example.com`;
  const password = 'password123';
  const experienceLevel = 'beginner';

  before(() => {
    // Register a user before all login tests
    cy.visit('/register');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('select#experienceLevel').select(experienceLevel);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
  });

  it('should allow an existing user to log in', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.include('Login successful!');
    });

    cy.url().should('eq', Cypress.config().baseUrl + '/'); // Should redirect to home
    cy.window().its('localStorage').invoke('getItem', 'userSession')
      .should('exist')
      .then((session) => {
        const parsedSession = JSON.parse(session);
        expect(parsedSession.userId).to.exist;
        expect(parsedSession.experienceLevel).to.eq(experienceLevel);
      });
  });
});
