
describe('Admin Edit Page', () => {
	beforeEach(() => {
		cy.fixture('users/admin.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('http://localhost:3000/users/edit')
  })		
	})

	afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
	})

	it('Admin Edit Details Page', () => {
    
    cy.url().should('include', '/users/edit')
    cy.fixture('users/admin.json').then((data) => {
      cy.get('#user_email').should('have.value',data.email)
    })  
   
    cy.get('#user_name').clear()
      .type('Admin edited name')
      .should('have.value','Admin edited name')

    cy.fixture('users/admin.json').then((data) => {
 
      cy.get('#user_current_password').type(data.password)
        .should('have.value',data.password)
     
      cy.get('.actions > .btn').click()
    
    })

    cy.get(':nth-child(3) > a')
      .then(element => {
        expect(element.text()).to.equal('Admin edited name')
    })

	})
})

