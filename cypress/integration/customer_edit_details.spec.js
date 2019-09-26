
describe('Customer Edit  Page', () => {
	beforeEach(() => {
		cy.fixture('users/customer.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('http://localhost:3000/users/edit')
  })		
	})

	afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
	})

	it('Customer Edit Details Page', () => {

	  cy.contains('Customer')
    
    cy.url().should('include', '/users/edit')
    
    cy.fixture('users/customer.json').then((data) => {
      cy.get('#user_email').should('have.value',data.email)
    })

    
	})
  
})

