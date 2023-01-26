export {}

describe('Drag and drop functionality', function () {
  beforeEach(function () {
    cy.intercept('GET', 'ingredients', { fixture: 'ingredients' })
    cy.visit('http://localhost:3000');
  });

  it('should contain ingredients', function() {
    cy.contains('Булка 1').should('exist');
    cy.contains('Соус 1').should('exist');
    cy.contains('Начинка 1').should('exist');
  });

  it('should drag and drop bun correctly', function () {
    cy.get('[data-testid=ingredients]').contains('Булка 1').trigger('dragstart');
    cy.get('[data-testid=dropContainer]').trigger('drop');
    cy.get('[data-testid=dropBunTopContainer]').contains('Булка 1 (верх)').should('exist');
    cy.get('[data-testid=dropBunBottomContainer]').contains('Булка 1 (низ)').should('exist');
  });

  it('should drag and drop filler ingredient correctly', function () {
    cy.get('[data-testid=ingredients]').contains('Соус 1').trigger('dragstart');
    cy.get('[data-testid=dropContainer]').trigger('drop');
    cy.get('[data-testid=dropMainContainer]').contains('Соус 1').should('exist');

    cy.get('[data-testid=ingredients]').contains('Начинка 1').trigger('dragstart');
    cy.get('[data-testid=dropContainer]').trigger('drop');
    cy.get('[data-testid=dropMainContainer]').contains('Начинка 1').should('exist');
  });

}); 
