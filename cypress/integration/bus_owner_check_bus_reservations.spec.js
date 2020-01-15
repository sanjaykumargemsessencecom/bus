
describe('Bus Owner check all reservations for a bus', () => {
 beforeEach(() => {
    cy.fixture('users/bus_owner.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('/owners/buses')
  })    
  })

  afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
  })
   
  context('Bus Owner Is Checking Reservations For A Bus', function(){

    it('check a reservation table', () => {
      
      cy.get('.changing_text')    
      .contains('Bus Reservation')

      cy.contains('Add Bus')

      cy.contains('All Bus')

      cy.contains('Account')
      
      cy.contains('Logout')

      cy.url().should('eq', Cypress.config().baseUrl+'/owners/buses')
      
      cy.get(':nth-child(2) > :nth-child(10) > .btn > a')
        .click() 
      
      cy.url().should('include','check_reservation')

      cy.get('tbody > :nth-child(1) > th').should(($th) => {
        expect($th.eq(0)).to.contain('Reservation Id')
        expect($th.eq(1)).to.contain('Bus No')
        expect($th.eq(2)).to.contain('Bus Name')
        expect($th.eq(3)).to.contain('Customer Name')
        expect($th.eq(4)).to.contain('Booked Seats')
        expect($th.eq(5)).to.contain('Seats no')
        expect($th.eq(6)).to.contain('Rent')
        expect($th.eq(7)).to.contain('Date')
      })

      cy.get('.search_form').find('#date')
      .type('2019-10-11').should('have.value','2019-10-11')

      cy.get('[type="submit"]').click()

      cy.get('.info > :nth-child(8)')
        .should('contain','2019-10-11')
      

      //cy.get('.table').find('tr').as('rows');
      //cy.get('@rows').first().click();

      
      cy.get('.info > :nth-child(5)')
        .contains(/\d+/)

      cy.url().should('include', Cypress.config().baseUrl+'/')

    })
  })
})