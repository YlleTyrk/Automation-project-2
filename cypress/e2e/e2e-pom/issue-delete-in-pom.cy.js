/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from '../../pages/IssueModal';

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        //open issue detail modal with title from line 16
        cy.contains(issueTitle).click();
      });
  });

  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();
    IssueModal.validateIssueVisibilityState(issueTitle, false);
  });

  it('Should cancel deletion process successfully', () => {
    IssueModal.ensureIssueIsVisibleOnBoard;
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();
    IssueModal.validateIssueVisibilityState;
  });
});
