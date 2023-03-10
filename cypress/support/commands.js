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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-iframe';

Cypress.Commands.add('Login', (email, password) => {
    cy.get('input[name="email"]').type(email)
    cy.get('fieldset').eq(1)
        .children('button[type="submit"]').click()
    cy.get('.chunk')
        .children('input[type="password"]').type(password)
    cy.get('fieldset').eq(1)
        .children('button[type="submit"]').click()

})

Cypress.Commands.add('createSpace',(spaceName) => {
    cy.get('.chunk').children('#name').type(spaceName)
    cy.get('.actions').children('button[type="submit"]').click()
})

Cypress.Commands.add('createRsStudioProject',() => {
    cy.wait(100)
    cy.get('.withActionTitle').click();
    cy.get('.popupMenu')
       .should('have.class','open')
       .children('.newRStudioProject').click()
})