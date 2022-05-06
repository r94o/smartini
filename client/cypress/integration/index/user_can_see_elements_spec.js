describe("Index Page", () => {
  it("can see the search input", () => {
    cy.visit("/")
    cy.get("#ingredient-input").should("exist").invoke('attr', 'placeholder').should('contain', 'Enter Ingredient')
  })

  it("can see 'your ingredients' table", () => {
    cy.visit("/")
    cy.get("#ingredient-list>table>tbody").should("exist").and("be.empty")
  })
  it("can see 'your recommendations' table", () => {
    cy.visit("/")
    cy.get("#cocktail-list>table>tbody").should("exist").and("be.empty")
  })
})