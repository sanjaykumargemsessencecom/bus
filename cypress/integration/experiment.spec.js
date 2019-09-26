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
     
      })

      it('image', function(){
        cy.fixture('images/birds.png')  
        cy
          .writeFile('cypress/fixtures/users/message.txt', 'Hello World .............')
          .then((text) => {
           expect(text).to.equal('Hello World .............') // true
  })      
      })
  })
})
// just to prove we have a session