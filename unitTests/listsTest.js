describe('Creating a contact test', function() {
  it('Creating a contact in the marketing page', function() {
    cy.visit('http://localhost:9000/#!/login') //link de la pagina

    cy.get('input[name=username]').type('joqo.p@hotmail.com')
    cy.get('input[name=password]').type('1234')

    cy.get('button[name=submit]').click()
    cy.url().should('include', '/lists')

    cy.get('h3').click()
    cy.url().should('include', '/newList')

    cy.get('input[name=name]').type('Test Unit List')
    cy.get('input[name=lastName]').type('Test Contact')
    cy.get('input[name=email]').type('pruebaTestContact@hotmail.com')
    cy.get('input[name=phone]').type('2216227676')

    cy.get('input[name=tags]').type('joven')
    cy.get('h4[name=addTag').click()
    cy.get('h3[name=contactTag]').should('have.length', 1)

    cy.get('input[name=tags]').type('estudiante')
    cy.get('h4[name=addTag').click()
    cy.get('h3[name=contactTag]').should('have.length', 2)

    cy.get('input[name=tags]').type('empleado')
    cy.get('h4[name=addTag').click()
    cy.get('h3[name=contactTag]').should('have.length', 3)

    cy.get('input[name=tags]').type('padre')
    cy.get('h4[name=addTag').click()
    cy.get('h3[name=contactTag]').should('have.length', 4)


    cy.get('button[name=submit]').click()
    cy.url().should('include', '/myContacts')
    cy.get('td').contains('Test Contact')
    cy.get('table[name=contactsTable]').find('tr').should('have.length', 4)

  })
})