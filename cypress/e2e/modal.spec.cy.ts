export { }

describe('Drag and drop functionality', function () {
    beforeEach(function () {
        cy.intercept('GET', 'ingredients', { fixture: 'ingredients' })
        cy.visit('http://localhost:3000');
    });

    it('should open modal by click and show correct data', function () {
        cy.get('[data-testid=ingredients]').contains('Булка 1').click()
        cy.get('div[id=modals]').get('[data-testid=modal]').should('exist')
        cy.get('[data-testid=ingredientTitle]').contains('Булка 1').should('exist')
    });

    it('should close modal by click on "X"', function () {
        cy.get('[data-testid=ingredients]').contains('Булка 2').click()
        cy.get('[data-testid=closeModal]').click()
        cy.get('[data-testid=modal]').should('not.exist')
    });

    it('should close modal by click on overlay', function () {
        cy.get('[data-testid=ingredients]').contains('Соус 1').click()
        cy.get('[data-testid=overlayClose]').click({ force: true })
        cy.get('[data-testid=modal]').should('not.exist')
    });

}); 

