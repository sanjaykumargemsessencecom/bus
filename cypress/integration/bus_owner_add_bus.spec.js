
describe('Bus Owner add a bus and delete a bus ', () => {
	beforeEach(() => {
		cy.fixture('users/bus_owner.json').then((data) => {
    cy.login(data.email,data.password)
    cy.visit('http://localhost:3000/owners/buses/new')
  })		
	})

	afterEach(() => {
    cy.logout()
    cy.contains('Signed out successfully')
	})
  context('Bus Owner Is Adding A New Bus', function(){

    it('Add a new bus', () => {
      
      cy.get('.navbar-right > :nth-child(2) > a')
        .then(element => {
          expect(element.text()).to.equal('Owner edited name')
      })

      cy.get('#bus_bus_name').type('New Bus')
        .should('have.value','New Bus')
      
      cy.get('#bus_bus_no').type('2522')
        .should('have.value','2522')
    
      cy.get('#bus_source').type('Bhopal')
        .should('have.value','Bhopal')

      cy.get('#bus_destination').type('Raisen')
        .should('have.value','Raisen')
      
      cy.get('#bus_rent').clear().type('250')
        .should('have.value','250')

      cy.get('#bus_total_seats').clear().type('30')
        .should('have.value','30')

      cy.get('#bus_status').select('completed')
      
      cy.get('.btn').click()
      
      cy.url().should('eq',Cypress.config().baseUrl+'/owners/buses')
      
      cy.get('.table').find('tr:eq(-2)')
        .within(($tr) => {
        
          cy.wrap($tr)
            .should('have.class', 'info')
            .find(':nth-child(1)')
            .and('contain','New Bus')
        
          cy.wrap($tr)
            .should('have.class', 'info')
            .find(':nth-child(2)')
            .and('contain','2522')
        })
      
    })
  })
  context('Bus Owner Is Canceling A Bus', function(){
    it('Should be able to delete a bus',() => {
      cy.visit('/owners/buses')
      cy.get('.table')
        .find('tr')
        .then(listing => {
          const listingCount = Cypress.$(listing).length
          cy.get('.info > :nth-child(2)').last().then($id => {
            const id = $id.text()
            cy.log('id')

            cy.log(id)

            cy.get('.info > :nth-child(9)').last().click()

            cy.get('.info > :nth-child(2)').last().then(($p) => {

              expect($p.text()).to.not.equal(id)
            
            })
          })
        })

    })
  })
})
