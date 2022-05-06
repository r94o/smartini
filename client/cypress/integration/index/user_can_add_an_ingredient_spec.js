describe("Adding an ingredient", () => {
  it("adds 3 ingredients", () => {
    cy.visit("/")
    cy.addIngredient("Gin")

    cy.get("#ingredient-list>table>tbody>tr").should("have.length", 1).first().should("contain", "Gin")

    cy.addIngredient("Dry Vermouth")

    cy.get("#ingredient-list>table>tbody>tr").should("have.length", 2).first().should("contain", "Dry Vermouth")

    cy.addIngredient("Vodka")

    cy.get("#ingredient-list>table>tbody>tr").should("have.length", 3).first().should("contain", "Vodka")
  })

  it("adds an ingredient when the 'Enter' key is pressed", () => {
    cy.visit("/")
    cy.get("#ingredient-input").addIngredient("Gin")
    
    cy.get("#ingredient-list>table>tbody>tr").should("have.length", 1).first().should("contain", "Gin")
  })
})