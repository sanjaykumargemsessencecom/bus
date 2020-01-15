/// <reference types="Cypress" />

describe('Admin index page', () => {
	 beforeEach(() => {
    cy.fixture('users/admin.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('/')
  })    
  })

  afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
  })
  context('Admin Index Page', function(){

    it('admin index page', () => {

      cy.get('tbody > :nth-child(1) > th').should(($th) => {
        expect($th.eq(0)).to.contain('Bus Name')
        expect($th.eq(1)).to.contain('Bus No')
        expect($th.eq(2)).to.contain('Source')
        expect($th.eq(3)).to.contain('Destination')
        expect($th.eq(4)).to.contain('Available Seats')
        expect($th.eq(5)).to.contain('Rent')
        expect($th.eq(6)).to.contain('Do')
      })


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

      cy.get(':nth-child(2) > :nth-child(7) > .btn > a')
        .click()
        
      cy.wait(100)

      cy.url().should('include', '/reservations/new')
        
      cy.wait(100)
    })

  })
})
