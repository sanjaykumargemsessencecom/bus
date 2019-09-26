import faker from 'faker'

describe('Bus Owner Edit Page', () => {
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

	it('Bus Owner Edit Details Page', () => {
    
    cy.url().should('include', '/owners/buses')
    
    cy.log('Really')
    
    cy.log(faker.random.number())
    
    cy.log(faker.name.findName())

    cy.get('.table')
      .find('tr')
      .then(listing => {
        const listingCount = Cypress.$(listing).length
         cy.get('.info > :nth-child(6)').last().then($id => {
           const id = $id.text()
           cy.log('id')

           cy.log(id)

           cy.get(':nth-child(8) > .btn > a')
             .last()
             .click()
           
           cy.get('#bus_rent').clear()
             .type(Math.floor((Math.random() * 25) + 97))

           cy.url().should('include', '/edit')
           
           cy.get('.btn').click()

           cy.get('.info > :nth-child(6)').last().then(($p) => {
             cy.log($p.text())
             expect($p.text()).to.not.equal(id)
           
           })

         })
     })
 



	})
})

