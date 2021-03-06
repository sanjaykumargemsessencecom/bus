
describe('Owner index page', () => {
	beforeEach(() => {
		cy.fixture('users/bus_owner.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('/')
  })		
	})

	afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
	})
  context('Index Page', function(){
    it('check the owner index page', () => {

      cy.contains('Owner')
          
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
      cy.wait(100)
      cy.url().should('include', '/reservations/new')
      
	  })
  })
})
