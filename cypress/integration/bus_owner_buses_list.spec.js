
describe('Bus Owner Is Checking Buses List', () => {
	beforeEach(() => {
		cy.fixture('users/bus_owner.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('http://localhost:3000/owners/buses')
  })		
	})

	afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
	})
  context('Bus Owner Is Checking Buses', function(){

    it('Bus Owner Should Be Able To Check Buses List', () => {
      
      cy.get('.navbar-right > :nth-child(2) > a')
        .then(element => {
          expect(element.text()).to.equal('Owner edited name')
      })

    cy.get('tbody > :nth-child(1) > th').should(($th) => {
      expect($th.eq(0)).to.contain('Bus Name')
      expect($th.eq(1)).to.contain('Bus No')
      expect($th.eq(2)).to.contain('Source')
      expect($th.eq(3)).to.contain('Destination')
      expect($th.eq(4)).to.contain('Total Seats')
      expect($th.eq(5)).to.contain('Rent')
      expect($th.eq(6)).to.contain('Status')
      expect($th.eq(7)).to.contain('Edit')
      expect($th.eq(8)).to.contain('Delete')
      expect($th.eq(9)).to.contain('Check Reservation')

    })
    
    })
  })
  it('should navigate to edit bus details page', ()=> {
    cy.get(':nth-child(8) > .btn > a').last().click()
    cy.url().should('include', '/edit')
  })

  it('Should navigate to all Reservation for a bus', ()=> {
    
    cy.get(':nth-child(10) > .btn > a').last().click()
    cy.url().should('include', '/check_reservations')
  })
})

