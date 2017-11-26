describe('Log In test', function() {
  it('Log in to the Marketing page', function() {
    cy.visit('http://localhost:9000/#!/login') //link de la pagina

    cy.get('input[name=username]').type('joqo.p@hotmail.com')
    cy.get('input[name=password]').type('1234')

    cy.get('button[name=submit]').click()
    cy.url().should('include', '/lists')

  })
})