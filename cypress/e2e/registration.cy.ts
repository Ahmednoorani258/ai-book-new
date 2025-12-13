describe('Registration Flow', () => {
  it('should allow a new user to register', () => {
    cy.visit('/register');

    const email = `test-${Date.now()}@example.com`;
    const password = 'password123';
    const experienceLevel = 'intermediate';

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('select#experienceLevel').select(experienceLevel);
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.include('Registration successful!');
    });

    cy.url().should('include', '/login');
  });
});
