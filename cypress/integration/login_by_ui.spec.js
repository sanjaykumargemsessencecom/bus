import { LoginPage} from '../support/Base/PageObjects/LoginObject.js';
import { LoginData} from '../support/Base/PageData/LoginData.js';
describe('Login', function(){
  it('login through UI', function(){
    cy.visit('/users/sign_in');
    cy.enterEmail(LoginPage,LoginData.email);
    cy.enterPassword(LoginPage,LoginData.password);
    cy.loginButton(LoginPage);
    cy.contains('Signed in successfully')
  });
});