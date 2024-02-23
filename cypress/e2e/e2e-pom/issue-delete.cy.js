describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
  });

  it('Should delete issue successfully', () => {
    const expectedNumberOfIssuesAfterDeletion = 3;
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    cy.contains('Delete issue').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains('This is an issue of type: Task.').should('not.exist');
      cy.get('[data-testid="list-issue"]').should(
        'have.length',
        expectedNumberOfIssuesAfterDeletion
      );
    });
  });

  it('Should cancel deletion process successfully', () => {
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('[data-testid="icon:trash"]').click();
    cy.get('[data-testid="modal:confirm"]').should('be.visible');
    cy.contains('Cancel').click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      cy.contains('This is an issue of type: Task.').should('be.visible');
    });
  });
});

