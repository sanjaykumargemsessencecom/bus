/// <reference types="Cypress" />

describe('Admin Reservation Page', () => {
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

	it('admin Reservation Page', () => {

    cy.get('tbody > :nth-child(1) > th').should(($th) => {
      expect($th.eq(0)).to.contain('Bus Name')
      expect($th.eq(1)).to.contain('Bus No')
      expect($th.eq(2)).to.contain('Source')
      expect($th.eq(3)).to.contain('Destination')
      expect($th.eq(4)).to.contain('Available Seats')
      expect($th.eq(5)).to.contain('Rent')
      expect($th.eq(6)).to.contain('Do')
    })

    cy.get(':nth-child(2) > :nth-child(7) > .btn > a')
      .click()
      
    cy.wait(100)

    cy.url().should('include', '/reservations/new')
       
    cy.log('Oo.oO')

    cy.log(Math.floor((Math.random() * 25) + 97))

    cy.get('#reservation_date')
      .type('2019-11-20')
      .should('have.value','2019-11-20')

    cy.get('#reservation_booked_seats')
      .type('2')
      .should('have.value','2')
    
    cy.get('[type="checkbox"]')
      .check(['1', '2'])
     
    cy.get('.btn').click()

    cy.visit('admins/reservations')
    
    cy.get('thead > tr > th').should(($th) => {
      expect($th.eq(0)).to.contain('Bus Name')
      expect($th.eq(1)).to.contain('Bus No')
      expect($th.eq(2)).to.contain('Source')
      expect($th.eq(3)).to.contain('Destination')
      expect($th.eq(4)).to.contain('Date')
      expect($th.eq(5)).to.contain('Booked Seats')
      expect($th.eq(6)).to.contain('Seats no.') 
      expect($th.eq(7)).to.contain('Rent')
      expect($th.eq(8)).to.contain('Reservation No')
      expect($th.eq(9)).to.contain('Do')
    })

    cy.get('.table').find('tr:eq(-2)')
      .within(($tr) => {
      
        cy.wrap($tr)
          .should('have.class', 'info')
          .find(':nth-child(5)')
          .and('contain','2019-11-20')
       
        cy.wrap($tr)
          .should('have.class', 'info')
          .find(':nth-child(6)')
          .and('contain','2')

        cy.wrap($tr)
          .should('have.class', 'info')
          .find(':nth-child(7)')
          .and('contain','1,2')
      })
      


	})

  it('admin should able to cancel her reservation', () => {

    cy.contains('Admin')

    cy.get('.account')
      .click()
      
    cy.wait(100)

   
    cy.url().should('include', '/admins/reservations')
    

    cy.get('.btn > a').then($a => { 
        if ($a.is(':visible')) {
            cy.contains("Cancel")
        }
    })

    cy.get('.table')
      .find('tr')
      .then(listing => {
        const listingCount = Cypress.$(listing).length
         cy.get('.info > :nth-child(9)').last().then($id => {
           const id = $id.text()
           cy.log('id')

           cy.log(id)

           cy.get('.btn >a').last().click()

           cy.get('.info > :nth-child(9)').last().then(($p) => {
             cy.log($p.text())
             expect($p.text()).to.not.equal(id)
           
           })

           cy.get('.table')
            .find('tr')
            .then(listing2 => {
               const listingCount2 = Cypress.$(listing2).length
               expect(listingCount).to.eq(listingCount2+2);
             })
         })
     })
 
  })


})
