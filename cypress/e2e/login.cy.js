const { beforeEach } = require("mocha")

describe('template spec', () => {

  beforeEach(() => {
    cy.visit('https://posit.cloud')
    cy.get('.menuItems').children().first().click()
    cy.Login("irtaya123@gmail.com","Unicorn@123")
  })


  it('create space test case', () => {
    cy.wait(100)
    cy.get('#spaceOwner').click()
    cy.get('.newSpace').click()
    cy.createSpace('new space')
  })

  it('create rs studio project test case', () => {
    cy.createRsStudioProject()
  })


  it('create jupiter project test case', () => {
    cy.wait(100)
    cy.get('.withActionTitle').click();
    cy.get('.popupMenu')
       .should('have.class','open')
       .children('.newJupyterProject').click()

    cy.get('.actions')
       .children('button[type="submit"]')
      .click()
  })

  it('RStudio IDE loads', () => {
    cy.intercept({
      method: 'GET',
      url: '*/rstudio.nocache.js',
    }).as('loads')

    cy.intercept({
      method: 'POST',
      url: '/v1/projects',
    }).as('createProject')

    cy.createRsStudioProject()
    cy.wait(10000)

    //response for the api that create and store new project 
    cy.wait('@createProject',).its('response.statusCode').should('eq', 201)

    //response for the project that loading iframe script file
    cy.wait('@loads',).its('response.statusCode').should('eq', 200)
    cy.wait(10000) 

    cy.frameLoaded('#contentIFrame')
  })

})