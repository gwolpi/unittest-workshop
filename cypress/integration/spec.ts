describe('Cypress test', () => {
  it('should visit the initial project page', () => {
    cy.visit('/')
    cy.contains('Character Id')
  })

  it('should fill in character id and add it to the list', () => {
    cy.get('[data-testid=input-field]').type('201');
    cy.get('[data-testid=submit-button]').click();
    cy.get('[data-testid=input-field]').invoke('val').should('be.empty');
    cy.get('[data-testid=input-field]').type('15');
    cy.get('[data-testid=submit-button]').click()
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  it('should navigate to external website and do something', () => {
    cy.visit('https://www.vwe.nl');
    cy.viewport('macbook-16');
    cy.get('#ctl00_ctl00_ctl00_cphWebPartMenu_wpmWebPartManager_wp2147101090_wp819374865_txtSearchText').type('J-185-PZ');
  })
})
