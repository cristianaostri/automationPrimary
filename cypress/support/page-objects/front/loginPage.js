class LoginPage {
    get_UserNameField() {
      return cy.get('#user');
    }
  
    get_PasswordField() {
      return cy.get('#password');
    }
  
    getLoginButton() {
      return cy.contains('button', 'Ingresar'); // Cambialo si tu selector es más específico
    }
  
    fillCredentials(username, password) {
      console.log('🧪 username:', username);
      console.log('🧪 password:', password);
      this.get_UserNameField().type(username);
      this.get_PasswordField().type(password);
    }
  
    submitLogin() {
      this.getLoginButton().click();
    }
  
    login(username, password) {
      cy.visit('https://app.oneclearing.testing.primary/login');
      this.fillCredentials(username, password);
      this.submitLogin();
    }
  }
  
  export default new LoginPage();