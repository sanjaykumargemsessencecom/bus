describe('Index page', () => {
	it('Index page should contain', () => {
    
    cy.visit('/')
    
    cy.get('.changing_text')    
    .contains('Bus Reservation')
    
    cy.get('.table').find('tbody>tr')
      .find('.btn')

    cy.contains('Sign Up')

    cy.contains('Login')

    cy.url().should('eq', Cypress.config().baseUrl+'/')
	})

  it('index page bus searching from', () => {

    cy.get('.search_form').find('#source')
    .type('mumbai').should('have.value','mumbai')

    cy.get('.search_form').find('#destination')
    .type('pune').should('have.value','pune')

    cy.get('.search_form').find('#date')
    .type('2019-08-29').should('have.value','2019-08-29')

    cy.get('[type="submit"]').click()

    cy.url().should('include', Cypress.config().baseUrl+'/')

  })

  it('A table should exist', () => {

    cy.get('.table').contains('Bus Name')

    cy.get('.table').find('tbody>tr')
      .find('.btn')
  })

})