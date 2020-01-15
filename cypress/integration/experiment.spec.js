describe('request checking', function(){
  const email = 'admin@gmail.com'
  const password = 'admin'
   context('should do something', function(){
     it('cy.request', function(){
       cy.request('http://localhost:3000/')
         .its('body').should('include', 'bus') 
     })
     
    it('login cy.request', function(){
      cy.visit('/')
      cy.server()
      cy.route('GET','https://docs.cypress.io/examples/examples/tutorials.html#8-Full-end-to-end-tests-part-1')
        .as('accountsGet')
      cy.log('OS architecture')
      cy.log(Cypress.arch)
      cy.log('--------------')
      cy.log('browser details')
      cy.log(Cypress.browser.name)
      console.log(Cypress.browser)
      cy.log('--------------')
      cy.log('Platform')
      cy.log(Cypress.platform)
      cy.log('--------------')
      cy.log('Spec file details')
      console.log(Cypress.spec)
      cy.log('--------------')
      cy.log('Cypress Version')
      cy.log(Cypress.version)
      cy.log('--------------')
    })

    it('image', function(){
      cy.fixture('images/birds.png')  
      cy
        .writeFile('cypress/fixtures/users/message.txt', 'Hello World .............')
        .then((text) => {
          expect(text).to.equal('Hello World .............') // true
      })      
    })

    it('check it', function(){
      cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

      // other test code here
      
      cy.get('@comments').should((response) => {
        if (response.status === 200) {
            expect(response).to.have.property('duration')
          } else {
            // whatever you want to check here
          }
    
      })
    })
  })
})
// just to prove we have a session