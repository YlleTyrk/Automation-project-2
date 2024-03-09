describe('Time-tracking tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });
  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const getstopWatch = () => cy.get('[data-testid="icon:stopwatch"]');
  const getTimeTracking = () => cy.get('[data-testid="modal:tracking"]');
  const estimatedHour = '10';
  const EditedHour = '15';
  const timeSpent = '8';
  const timeRemaining = '2';

  it('Should create new issue, add, edit and remove estimated hour', () => {
    cy.wait(3000);
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').click();
      cy.get('.ql-editor').type('Description');
      cy.get('input[name="title"]').type('TestingTitle');
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('button[type="submit"]').click();
    });

    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    // Wait for the issue details modal to be visible
    cy.reload();
    cy.wait(30000);
    cy.get('[data-testid="list-issue"]').eq(0).click();

    //Adding estimation

    getIssueDetailsModal().should('be.visible');
    getIssueDetailsModal().within(() => {
      cy.get('.sc-dxgOiQ.HrhWu').click().type(estimatedHour);
      cy.get('.sc-dxgOiQ.HrhWu').should('have.value', estimatedHour).click();
      cy.get('[data-testid="icon:stopwatch"]')
        .siblings()
        .last()
        .should('contain', '10');
    });

    //EDITING the
    getIssueDetailsModal().within(() => {
      cy.get('.sc-dxgOiQ.HrhWu').click().clear().type(EditedHour);
      cy.get('.sc-dxgOiQ.HrhWu').should('have.value', EditedHour).click();
      cy.get('[data-testid="icon:stopwatch"]')
        .siblings()
        .last()
        .should('contain', '15');
    });

    //REMOVE estimated hours
    getIssueDetailsModal().within(() => {
      cy.get('.sc-dxgOiQ.HrhWu').click().clear().type('{enter}');
      cy.get('.sc-dxgOiQ.HrhWu').should('be.empty');
      cy.get('.sc-rBLzX.irwmBe').contains('No time logged');
    });
});
    
it('Should create new issue, add, edit and remove time spent', () => {
    cy.wait(3000);
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').click();
      cy.get('.ql-editor').type('Description');
      cy.get('input[name="title"]').type('TestingTitle');
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('button[type="submit"]').click();
    });

    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    // Wait for the issue details modal to be visible
    cy.reload();
    cy.wait(30000);
    cy.get('[data-testid="list-issue"]').eq(0).click()

    //ADD spent time

    getstopWatch().click();
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.contains('Time spent (hours)').next().find('input').type(timeSpent);
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
    cy.get('.sc-rBLzX.irwmBe').contains('No time logged').should('not.exist');

    //REMOVE spent time

    getstopWatch().click();
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.contains('Time spent (hours)').next().find('input').clear();
      cy.contains('Time remaining (hours)').next().find('input').clear();
    });
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.contains('Done').click().should('not.exist');
    });
  });
});
