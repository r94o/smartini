describe("Index Page", () => {
  it("can see the search input", () => {
    cy.visit("/")
    cy.get("#ingredient-input").should("exist").invoke('attr', 'placeholder').should('contain', 'Enter Ingredient')
  })
  it("can see the add button", () => {
    cy.visit("/")
    cy.get("#add-ingredient").should("exist").and('contain', "Add")
  })
  it("can see 'your ingredients' table", () => {
    cy.visit("/")
    cy.get("#ingredient-list>table>tbody").should("exist").and("be.empty")
  })
  xit("can see 'your recommendations' table", () => {
    cy.visit("/")
    cy.get("#cocktail-recommendation-list>table>tbody").should("exist").and("be.empty")
  })
})