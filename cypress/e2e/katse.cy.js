describe('Issue comments creating, editing and deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
  });
  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const estimatedHour = '10';
  const EditedHour = '15';
  const getStopWatch = () => cy.get('[data-testid="icon:stopwatch"]')

  it.only('Should add, edit and remove time estimation', () => {
    //Adding estimation

    getIssueDetailsModal().within(() => {
      cy.get('.sc-dxgOiQ.HrhWu').click().clear().type(estimatedHour);
      cy.get('.sc-dxgOiQ.HrhWu').should('have.value', estimatedHour).click();
      cy.get('[data-testid="icon:stopwatch"]').siblings().last().should('contain', '10')
      getStopWatch().click()

    });
cy.get('[data-testid="modal:tracking"]').within(() => {
  cy.get('div').contains('10h estimated').should('be.visible')
  cy.contains('Done').click().should('not.exist');
})
    //EDITING the
    getIssueDetailsModal().within(() => {
      cy.get('.sc-dxgOiQ.HrhWu').click().clear().type(EditedHour);
      cy.get('.sc-dxgOiQ.HrhWu').should('have.value', EditedHour).click();
    });

    //REMOVE estimated hours
    getIssueDetailsModal().within(() => {
      cy.get('.sc-dxgOiQ.HrhWu').click().clear();
      cy.get('.sc-dxgOiQ.HrhWu').should('be.empty');
    });
  });

  const getIssueDetails = () => cy.get('[data-testid="modal:issue-details"]');
  const timeSpent = '8';
  const timeRemaining = '2';
  
  it('Should add, edit and remove time spent and remaining', () => {
    //ADD TIME SPENT AND REMAINING
    getIssueDetails().within(() => {
      getStopWatch()
    });
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.contains('Time spent (hours)')
        .next()
        .find('input')
        .clear()
        .type(timeSpent);
      cy.contains('Time remaining (hours)')
        .next()
        .find('input')
        .click()
        .type(timeRemaining);
    });
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.contains('Done').click().should('not.exist');
    });
    cy.get('.sc-rBLzX.irwmBe').should('contain', timeSpent);
    cy.get('.sc-rBLzX.irwmBe').should('contain', timeRemaining);

    //REMOVE time spent
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.contains('Time spent (hours)').next().find('input').clear();
      cy.contains('Time remaining (hours)').next().find('input').clear();
    });
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.contains('Done').click().should('not.exist');
  });

});
});
