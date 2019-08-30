Cypress.Commands.add('login', (email,password) => {
  cy.visit('users/sign_in')
  cy.get('#user_email')
      .type(email)
      .should("have.value", email);
    
  cy.get('#user_password')
      .type(password)
      .should("have.value", password);
  cy.get("form").submit();

})
Cypress.Commands.add('logout', () => {
  cy.visit('/')
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
