Cypress.Commands.add("login", (email,password) => {
   cy.request({
        method: 'GET',
        url: '/users/sign_in'
    })    
    .then((response)=>{
        let X = response.body
        let token = Cypress.$(X).find('form').find('input[name="authenticity_token"]').val()
        cy.log('token')
        cy.log(X)
        cy.request({
          method: 'POST',
          url: '/users/sign_in',
          body: {
            'authenticity_token': token,
            'user': {
              'email' : email,
              'password': password
            }
          }           
        })
    })
    


})
Cypress.Commands.add('logout', () => {
  cy.get('.logout').click()

})





// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
