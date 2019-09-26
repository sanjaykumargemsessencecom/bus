
describe('Bus Owner Edit Page', () => {
	beforeEach(() => {
		cy.fixture('users/bus_owner.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('http://localhost:3000/users/edit')
  })		
	})

	afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
	})

	it('Bus Owner Edit Details Page', () => {
    
    cy.url().should('include', '/users/edit')
    cy.fixture('users/bus_owner.json').then((data) => {
      cy.get('#user_email').should('have.value',data.email)
    })  
   
    cy.get('#user_name').clear()
      .type('Owner edited name')
      .should('have.value','Owner edited name')

    cy.fixture('users/bus_owner.json').then((data) => {
 
      cy.get('#user_current_password').type(data.password)
        .should('have.value',data.password)
     
      cy.get('.actions > .btn').click()
    
    })

    cy.get('.navbar-right > :nth-child(2) > a')
      .then(element => {
        expect(element.text()).to.equal('Owner edited name')
    })

	})
})

