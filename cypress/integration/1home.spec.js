
describe('Home page', () => {
  beforeEach(() => {

    cy.visit('/')
  })    

	it('Index page should contain', () => {
    cy.get('.changing_text')    
    .contains('Bus Reservation')
    
    cy.get('.table').find('tbody>tr')
      .find('.btn')

    cy.contains('Sign Up')

    cy.contains('Login')

    cy.url().should('eq', Cypress.config().baseUrl+'/')
	})

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
      .contains('mumbai')   

    cy.get('.table').find('tbody > :nth-child(2) > :nth-child(4)')
      .first()
      .contains('pune')
    

    //cy.get('.table').find('tr').as('rows');
    //cy.get('@rows').first().click();

    
    cy.get('.info > :nth-child(5)')
      .contains(/\d+/)

    cy.url().should('include', Cypress.config().baseUrl+'/')

  })

  it('Redirect to login page if a user clicked on Book without login', () => {
    cy.get('.btn').first().click()    
    cy.wait(100)
    cy.url().should('include','/reservations/new')

  })

  it('should navigate to SignUp page', ()=> {
    cy.contains('Sign Up').click()
    cy.url().should('eq', Cypress.config().baseUrl+'/users/sign_up')
    cy.wait(50)
    cy.get('body > :nth-child(5)').click()
    cy.url().should('eq', Cypress.config().baseUrl+'/users/sign_in')
  })
  it('should navigate to Login page', ()=> {
    cy.contains('Login').click()
    cy.url().should('eq', Cypress.config().baseUrl+'/users/sign_in')
    cy.wait(50)
    cy.get('body > :nth-child(5)').click()
    cy.url().should('eq', Cypress.config().baseUrl+'/users/sign_up')
    cy.wait(50)
    cy.visit('/users/sign_in')
    cy.get('[href="/users/password/new"]').click()
    cy.url().should('eq', Cypress.config().baseUrl+'/users/password/new')

  })
})