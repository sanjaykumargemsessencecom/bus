  Cypress.Commands.add('enterEmail', (loc,data) => {
    cy.get(loc.emailFieldId).type(data)
  })
  
  Cypress.Commands.add('enterPassword', (loc,data) => {
    cy.get(loc.passwordFieldId).type(data)
  })
  
  Cypress.Commands.add('loginButton', (loc) => {
    cy.get(loc.loginButton).click()
  })

  