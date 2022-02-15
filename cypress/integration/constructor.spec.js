describe('Test for burger constructor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Check main page', () => {
    cy.contains('Соберите бургер');
  });

  it('Choose ingredient and open modal', () => {
    cy.get('[data-test-id="burger-ingredient"]').eq(1).click();
    cy.get('[data-test-id="modal"]').contains('Детали ингредиента');
    cy.get('[data-test-id="modal-close"]').click();
    cy.get('[data-test-id="burger-ingredient"]').eq(7).click();
    cy.get('[data-test-id="modal"]').contains('Protostomia');
    cy.get('[data-test-id="modal-close"]').click();
  });

  it('Make new order', () => {
    // add ingredients
    cy.get('[data-test-id="burger-ingredient"]').eq(1).trigger('dragstart');
    cy.get('[data-test-id="constructor-container"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(3).trigger('dragstart');
    cy.get('[data-test-id="constructor-container"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(6).trigger('dragstart');
    cy.get('[data-test-id="constructor-container"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(5).trigger('dragstart');
    cy.get('[data-test-id="constructor-container"]').trigger('drop');
    cy.get('[data-test-id="burger-ingredient"]').eq(8).trigger('dragstart');
    cy.get('[data-test-id="constructor-container"]').trigger('drop');

    // change ingredients order
    cy.get('.constructor-element').eq(2).trigger('dragstart', {force: true});
    cy.get('.constructor-element').eq(1).trigger('drop', {force: true});

    // remove ingredient
    cy.get('.constructor-element__action').eq(2).click({force: true});

    // make order
    cy.get('button').contains('Оформить заказ').click();
    cy.get('.input__textfield').eq(0).type('vitalymuravyev@yandex.ru');
    cy.get('.input__textfield').eq(1).type('111111');
    cy.get('button').contains('Войти').click().wait(1000);

    cy.get('button').contains('Оформить заказ').click().wait(16000);
    cy.get('[data-test-id="modal"]').contains('идентификатор заказа');
    cy.get('[data-test-id="modal-close"]').click();
  });

});
