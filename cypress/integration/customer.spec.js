
describe('Customer index page', () => {
	beforeEach(() => {
		cy.fixture('users/customer.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('/')
  })		
	})

  afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
  })

	it('Customer Index Page', () => {

	  cy.contains('Customer')

	  cy.get('.search_form')
	    .find('#source')
      .type('Obedullaganj')
      .should('have.value','Obedullaganj')

    cy.get('.search_form')
	    .find('#destination')
      .type('Goharganj')
      .should('have.value','Goharganj')

    cy.get('.search_form').find('#date')
      .type('2019-08-29').should('have.value','2019-08-29')
   
    cy.get('[type="submit"]').click()

    cy.get('.table').find('tbody > :nth-child(2) > :nth-child(3)')
      .first()
      .contains('Obedullaganj')   

    cy.get('.table').find('tbody > :nth-child(2) > :nth-child(4)')
      .first()
      .contains('Goharganj')

    cy.get(':nth-child(2) > :nth-child(7) > .btn')
      .should('have.class','btn btn-default')
      .contains('Book')
    cy.get(':nth-child(2) > :nth-child(7) > .btn > a')
      .click()
    
    cy.url().should('include', '/reservations/new')
    
	})

})
