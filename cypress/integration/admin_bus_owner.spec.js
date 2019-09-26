
describe('Bus Owners List Page', () => {
	beforeEach(() => {
		cy.fixture('users/admin.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('/admins/users')
  })		
	})

	afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
	})

	it('admin BusOwner list page', () => {

    cy.url().should('include', '/admins')
   
    cy.get('tbody > :nth-child(1) > th').should(($th) => {
      expect($th.eq(0)).to.contain('Bus Owner')
      expect($th.eq(1)).to.contain('Email Id')
      expect($th.eq(2)).to.contain('Status')
      expect($th.eq(3)).to.contain('Do')
      expect($th.eq(4)).to.contain('Check Buses')
      
    })
 
    cy.get(':nth-child(2) > :nth-child(4) > .button_to > .btn').then(($btn) => {
           
      if ($btn.hasClass('.btn btn-danger')) {
        cy.get('.:nth-child(2) > :nth-child(4) > .button_to > .btn')
          .click()
        cy.get(':nth-child(2) > :nth-child(4) > .button_to > .btn')
        .should('have.class','btn btn-primary')
      } 
      else {
        cy.get(':nth-child(2) > :nth-child(4) > .button_to > .btn')
          .click()
        cy.get(':nth-child(2) > :nth-child(4) > .button_to > .btn')
        .should('have.class','btn btn-danger')
      }

  })
  cy.wait(1000)
  cy.get(':nth-child(2) > :nth-child(5) > .btn > a')
    .contains('Buses')
    .click()
    .url().should('include','/buses')

  cy.get('.table')
    
	})
  
})

