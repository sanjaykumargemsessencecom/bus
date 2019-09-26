
describe('Customer Account Page', () => {
	beforeEach(() => {
		cy.fixture('users/customer.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('/reservations')
  })		
	})

	afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
	})

	it('Customer Account Page', () => {

	  cy.contains('Customer')

    cy.url().should('include', 'reservations')
    
    
	})
  
})

