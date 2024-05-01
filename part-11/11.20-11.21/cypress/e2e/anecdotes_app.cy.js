describe('Anecdotes App', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3001')
    cy.contains('Anecdotes')
    cy.contains('filter')
    cy.contains('create new')
  })

  it('a new anecdote can be created and then deleted', function () {
    cy.visit('http://localhost:3001')
    cy.get('#newAnecdote').type('This is a TEST anecdote')
    cy.get('#submitAnecdote').click()
    cy.get('#anecdotesContainer')
      .contains('This is a TEST anecdote')
      .contains('delete')
      .click()
  })
})
