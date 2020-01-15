describe('User Sign Up', () => {
 beforeEach(function () {
    cy.visit('/users/sign_up')
    cy.get('#user_name').type('Cypress')
    cy.get('#user_email').type('cypress@gmail.com')
    cy.get('#user_password').type('cypress')
    cy.get('#user_password_confirmation').type('cypress')
    cy.get('[type="radio"]').check('owner')

  })
  it('Display form validations for email', function () {
    cy.get('#user_email').clear() // clear out first name
    cy.get('form').submit()
    cy.get('#error_explanation').should('contain','Email can\'t be blank' )
  })
  it('Display form validations for Password', function () {
    cy.get('#user_password').clear() // clear out first name
    cy.get('form').submit()
    cy.get('#error_explanation').should('contain','Password can\'t be blank')
  })
  it('Display form validations for Confirmation Password', function () {
    cy.get('#user_password_confirmation').clear() // clear out first name
    cy.get('form').submit()
    cy.get('#error_explanation').should('contain','Password confirmation doesn\'t match Password')
  })
  it('Display form validations for Short Password', function () {
    cy.get('#user_password').clear().type('12')
    cy.get('#user_password_confirmation').clear().type('12')
    cy.get('form').submit()
    cy.get('#error_explanation').should('contain','Password is too short (minimum is 3 characters)')
  })
  it('Can submit a valid form', function () {
    cy.get('form').submit()
    cy.contains('Welcome! You have signed up successfully')
  })
  it('Display form validations for Email has already been taken', function () {
    cy.get('#user_password')
    cy.get('#user_password_confirmation')
    cy.get('form').submit()
    cy.get('#error_explanation').should('contain','Email has already been taken')
  })

})