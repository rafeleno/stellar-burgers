describe('Тесты конструктора', () => {
  beforeEach(() => {
    // TODO: Мокнуть ингредиенты и пользователя
    // cy.fixture('ingredients').then((ingredients) => {
    //   cy.intercept('GET', '**/ingredients', {
    //     statusCode: 200,
    //     body: ingredients
    //   }).as('getIngredients');
    // });

    // cy.fixture('user').then((user) => {
    //   cy.intercept('GET', '**/user', {
    //     statusCode: 200,
    //     body: user
    //   }).as('getUser');
    // });

    cy.visit('/');
    // cy.wait('@getIngredients');
    // cy.wait('@getUser');
  });

  it('собираем бургер', () => {
    cy.get('[data-cy-type="bun"]').find('button').contains('Добавить').click();

    cy.get('[data-cy-type="ingredients-container"]')
      .find('div')
      .eq(0)
      .find('span')
      .should('exist');

    cy.get('[data-cy-type="main"]')
      .first()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-cy-type="ingredients-container"]')
      .find('ul')
      .find('li')
      .eq(0)
      .find('span')
      .should('exist');

    cy.get('[data-cy-type="sauce"]')
      .first()
      .find('button')
      .contains('Добавить')
      .click();

    cy.get('[data-cy-type="ingredients-container"]')
      .find('ul')
      .find('li')
      .eq(1)
      .find('span')
      .should('exist');
  });
});
