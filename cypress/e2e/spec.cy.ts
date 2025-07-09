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
    // Проверяем что булки нет
    cy.get('[data-cy-type="ingredients-container"]')
      .find('div')
      .eq(0)
      .find('span')
      .should('not.exist');

    // Добавляем булку
    cy.get('[data-cy-type="bun"]').find('button').contains('Добавить').click();

    // Проверяем что булка есть
    cy.get('[data-cy-type="ingredients-container"]')
      .find('div')
      .eq(0)
      .find('span')
      .should('exist');

    // Проверяем что ингредиента нет
    cy.get('[data-cy-type="ingredients-container"]')
      .find('ul')
      .find('li')
      .should('not.exist');

    // Добавляем ингредиент
    cy.get('[data-cy-type="main"]')
      .first()
      .find('button')
      .contains('Добавить')
      .click();

    // Проверяем что ингредиент есть
    cy.get('[data-cy-type="ingredients-container"]')
      .find('ul')
      .find('li')
      .eq(0)
      .find('span')
      .should('exist');

    // Проверяем что соуса нет
    cy.get('[data-cy-type="ingredients-container"]')
      .find('ul')
      .find('li')
      .eq(1)
      .should('not.exist');

    // Добавляем суос
    cy.get('[data-cy-type="sauce"]')
      .first()
      .find('button')
      .contains('Добавить')
      .click();

    // Проверяем что соус есть
    cy.get('[data-cy-type="ingredients-container"]')
      .find('ul')
      .find('li')
      .eq(1)
      .find('span')
      .should('exist');

    // Проверка модалки
    cy.get('[data-cy-type="bun"]').first().find('a').click();
    cy.get('[data-cy-type="modal"]').contains('h3', 'Ингредиент 1');
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

    //   //Заказ
    //   cy.get('[data-cy-test-id="order-button"]').click();

    //   // Проверка пустого конструктора
    //   cy.get('[data-cy-type="ingredients-container"]')
    //     .find('div')
    //     .eq(0)
    //     .find('span')
    //     .should('not.exist');
    //   cy.get('[data-cy-type="ingredients-container"]')
    //     .find('div')
    //     .eq(1)
    //     .find('span')
    //     .should('not.exist');
    //   cy.get('[data-cy-type="ingredients-container"]')
    //     .find('div')
    //     .eq(2)
    //     .find('span')
    //     .should('not.exist');

    //   cy.wait('@getOrder');

    //   cy.get('[data-cy-test-id="order-number"]').should('contain', '666');
    //   cy.get('body').click(0, 0);
    //   cy.get('[data-cy-type="modal"]').should('not.exist');
    // });

    // Нажать кнопку
    cy.get('[data-cy-test-id="order-button"]').click();

    // Дождаться моканного ответа
    cy.wait('@getOrder');

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

    // Проверить номер заказа
    cy.get('[data-cy-test-id="order-number"]').should('contain', '666');

    // Закрыть модалку
    cy.get('body').click(0, 0);
    cy.get('[data-cy-type="modal"]').should('not.exist');
  });
});
