describe("Adding an ingredient", () => {
  it("adds 3 ingredients", () => {
    cy.visit("/")
    cy.get("#ingredient-input").type("Gin")
    cy.get("#add-ingredient").click()

    cy.get("#ingredient-list>table>tbody>tr").should("have.length", 1).first().should("contain", "Gin")

    cy.get("#ingredient-input").type("Dry Vermouth")
    cy.get("#add-ingredient").click()

    cy.get("#ingredient-list>table>tbody>tr").should("have.length", 2).first().should("contain", "Dry Vermouth")

    cy.get("#ingredient-input").type("Olive")
    cy.get("#add-ingredient").click()

    cy.get("#ingredient-list>table>tbody>tr").should("have.length", 3).first().should("contain", "Olive")
  })
})
