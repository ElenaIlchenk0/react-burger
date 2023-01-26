export { }

describe('Drag and drop functionality', function () {
    beforeEach(function () {
        cy.intercept('GET', 'ingredients', { fixture: 'ingredients' })
        cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "api/orders", { fixture: "order.json" });

        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
        );
        
        cy.visit('http://localhost:3000');
    });

    it('should open modal and show order number', function () {
        cy.get('[data-testid=ingredients]').contains('Булка 1').trigger('dragstart');
        cy.get('[data-testid=dropContainer]').trigger('drop');
        cy.get('[data-testid=ingredients]').contains('Соус 1').trigger('dragstart');
        cy.get('[data-testid=dropContainer]').trigger('drop');

        cy.get('[data-testid=orderButton]').click()
        cy.get("[data-testid=orderNumber]").contains("123").should("exist");
        
    });

}); 
