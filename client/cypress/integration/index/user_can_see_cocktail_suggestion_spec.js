describe("Adding an ingredient and getting a recommendation", () => {
  it("suggests a screwdriver", () => {
    cy.visit("/")
    cy.addIngredient("Vodka")

    cy.get("#cocktail-list>table>tbody").should("be.empty")

    cy.addIngredient("Orange Juice")

    cy.get("#cocktail-list>table>tbody>tr").should("have.length", 1).and("contain", "Screwdriver")
  })
})
