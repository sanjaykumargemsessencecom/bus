describe('test_name', function() {

 it('what_it_does', function() {

    cy.viewport(1327, 669)
 
    cy.visit('http://localhost:3000/')
 
    cy.visit('http://localhost:3000/')
 
    cy.get('.container-fluid > .nav > .nav > li:nth-child(2) > a:nth-child(2)').click()
 
    cy.get('body > .container > #new_user > .form-group > #user_email').click()
 
    cy.get('body > .container > #new_user > .form-group > #user_email').type('admin@gmail.com')
 
    cy.get('body > .container > #new_user > .form-group > #user_password').click()
 
    cy.get('body > .container > #new_user > .form-group > #user_password').type('admin')
 
    cy.get('body > .container > #new_user > .actions > .btn').click()
 
 })

})
