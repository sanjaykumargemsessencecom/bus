
describe('Home page', () => {
  beforeEach(() => {

    cy.visit('/')
  })    
  context('Index Page', function(){
    it.only('Index page should contain', () => {
      cy.get('.changing_text')    
      .contains('Bus Reservation')
      
      cy.get('.table').find('tbody>tr')
        .find('.btn')

      cy.contains('Sign Up')

      cy.contains('Login')

      cy.url().should('eq', Cypress.config().baseUrl+'/')
    })
  })
  context('Search a bus', function(){
    it('index page bus searching from', () => {
      
      cy.get('tbody > :nth-child(1) > th').should(($th) => {
        expect($th.eq(0)).to.contain('Bus Name')
        expect($th.eq(1)).to.contain('Bus No')
        expect($th.eq(2)).to.contain('Source')
        expect($th.eq(3)).to.contain('Destination')
        expect($th.eq(4)).to.contain('Available Seats')
        expect($th.eq(5)).to.contain('Rent')
        expect($th.eq(6)).to.contain('Do')
      })

      cy.get('.search_form').find('#source')
      .type('mumbai').should('have.value','mumbai')

      cy.get('.search_form').find('#destination')
      .type('pune').should('have.value','pune')

      cy.get('.search_form').find('#date')
      .type('2019-08-29').should('have.value','2019-08-29')

      cy.get('[type="submit"]').click()
      
      cy.get('.table').find('tbody > :nth-child(2) > :nth-child(3)')
        .first()
        .contains('Mumbai')   

      cy.get('.table').find('tbody > :nth-child(2) > :nth-child(4)')
        .first()
        .contains('Pune')
      

      //cy.get('.table').find('tr').as('rows');
      //cy.get('@rows').first().click();

      
      cy.get('.info > :nth-child(5)')
        .contains(/\d+/)

      cy.url().should('include', Cypress.config().baseUrl+'/')

    })
  })
  it('Should Render login page if a user clicked on Book without login', () => {
    cy.get('.btn').first().click()    
    cy.wait(100)
    cy.url().should('include','/reservations/new')
    cy.contains('You need to sign in or sign up before continuing.')
    cy.contains('Log in')
  })

})