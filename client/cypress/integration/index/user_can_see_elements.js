describe("Index Page", () => {
  it("can see the search input", () => {
    cy.visit("/")
    cy.get("#ingredient-input").should("exist")
  })
  it("can see the add button", () => {
    cy.visit("/")
    cy.get("#add-ingredient").should("exist")
  })
  it("can see 'your ingredients' table", () => {
    cy.visit("/")
    cy.get("#ingredients-container").should("exist").and("contains", )
  })
})