describe('Тесты конструктора', () => {
  beforeEach(() => {
    cy.fixture('ingredients').then((ingredients) => {
      cy.intercept('GET', '**/ingredients', {
        statusCode: 200,
        body: ingredients
      }).as('getIngredients');
    });

    cy.fixture('user').then((user) => {
      cy.intercept('GET', '**/user', {
        statusCode: 200,
        body: user
      }).as('getUser');
    });

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('добавляет булку в конструктор', () => {
    cy.get('[data-cy-type="ingredients-container-bun"]')
      .first()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-cy-type="ingredients-container-bun"]')
      .find('span')
      .should('exist');
  });
});
