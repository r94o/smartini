describe("Adding an ingredient and getting a recommendation", () => {
  xit("suggests a martini", () => {
    cy.visit("/")
    cy.addIngredient("Gin")

    cy.get("#cocktail-list>table>tbody").should("be.empty")

    cy.addIngredient("Dry Vermouth")

    cy.get("#cocktail-list>table>tbody").should("be.empty")

    cy.addIngredient("Olive")

    cy.get("#cocktail-list>table>tbody>tr").should("have.length", 1).and("contain", "Martini")
  })
})
