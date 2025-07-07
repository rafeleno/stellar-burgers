describe('Тесты конструктора', () => {
  before(() => {
    // Мокнаем ингредиенты, пользователя, заказ
    cy.fixture('ingredients').then((ingredients) => {
      cy.intercept('GET', '**/ingredients', {
        statusCode: 200,
        body: ingredients
      }).as('getIngredients');
    });

    cy.fixture('user').then((user) => {
      console.log(100);
      console.log(user);
      cy.intercept('GET', '**/user', {
        statusCode: 200,
        body: user
      }).as('getUser');
    });

    cy.fixture('order').then((order) => {
      cy.intercept('POST', '**/orders', {
        statusCode: 200,
        body: order
      }).as('getOrder');
    });

    // Токены
    window.localStorage.setItem('accessToken', '666');
    cy.setCookie('refreshToken', '666');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  after(() => {
    // Токены
    window.localStorage.removeItem('accessToken');
    cy.setCookie('refreshToken', '');
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

    // Проверка модалки
    cy.get('[data-cy-type="bun"]').first().find('a').click();
    cy.get('[data-cy-type="modal"]').should('exist');
    cy.get('[data-cy-type="modal"]')
      .find('h3')
      .contains('Описание ингредиента');

    // Проверка ее закрытия на крестик
    cy.get('[data-cy-type="modal"]').find('button').click();
    cy.get('[data-cy-type="modal"]').should('not.exist');

    // Проверка ее закрытия на оверлей. Примитивно но выглядит надежно
    cy.get('[data-cy-type="bun"]').first().find('a').click();
    cy.get('body').click(0, 0);
    cy.get('[data-cy-type="modal"]').should('not.exist');

    //Заказ
    cy.get('[data-cy-test-id="order-button"]').click();
    cy.wait('@getOrder');
    cy.get('[data-cy-test-id="order-number"]').should('contain', '666');
    cy.get('body').click(0, 0);
    cy.get('[data-cy-type="modal"]').should('not.exist');

    // Проверка пустого конструктора
    cy.get('[data-cy-type="ingredients-container"]')
      .find('div')
      .eq(0)
      .find('span')
      .should('not.exist');
    cy.get('[data-cy-type="ingredients-container"]')
      .find('div')
      .eq(1)
      .find('span')
      .should('not.exist');
    cy.get('[data-cy-type="ingredients-container"]')
      .find('div')
      .eq(2)
      .find('span')
      .should('not.exist');
  });
});
