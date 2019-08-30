
describe('login', () => {
	beforeEach(() => {
		cy.fixture('users/admin.json').then((data) => {
    cy.login(data.email,data.password)
  })		
	})

	afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
	})

	it('admin page', () => {
    cy.contains('Signed in successfully')

	  cy.contains('Admin')

	  cy.get('.search_form')
	     .find('#source')
       .type('Obedullaganj')
       .should('have.value','Obedullaganj')

    cy.get('.search_form')
	     .find('#destination')
       .type('Goharganj')
       .should('have.value','Goharganj')

    cy.get('[type="submit"]').click()

    cy.get('.table').find('tbody > :nth-child(2) > :nth-child(3)')
      .first()
      .contains('Obedullaganj')    

    cy.get('.table').find('tbody > :nth-child(2) > :nth-child(4)')
      .first()
      .contains('Goharganj')

    cy.get(':nth-child(2) > :nth-child(7) > .btn > a')
      .should('have.class','btn')
      .contains('Book')


	})

})
