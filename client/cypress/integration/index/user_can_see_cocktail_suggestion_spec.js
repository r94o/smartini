describe("Adding an ingredient and getting a recommendation", () => {
  it("suggests a martini", () => {
    cy.visit("/")
    cy.get("#ingredient-input").type("Gin")
    cy.get("#add-ingredient").click()

    cy.get("#cocktail-recommendation-list>table>tbody").should("be.empty")

    cy.get("#ingredient-input").type("Dry Vermouth")
    cy.get("#add-ingredient").click()

    cy.get("#cocktail-recommendation-list>table>tbody").should("be.empty")

    cy.get("#ingredient-input").type("Olive")
    cy.get("#add-ingredient").click()

    cy.get("#cocktail-recommendation-list>table>tbody>tr").should("have.length", 1).and("contain", "Martini")
  })
})
