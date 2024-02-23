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

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';
  const issueDetailModal = '[data-testid="modal:issue-details"]';
  const deleteButton = '[data-testid="icon:trash"]';
  const confirmationPopup = '[data-testid="modal:confirm"]';
  const deleteButtonName = 'Delete issue';
  

  it('Should delete issue successfully', () => {
    cy.get(issueDetailModal).should('be.visible');
    cy.get(deleteButton).click();
    cy.get(confirmationPopup).should('be.visible');
    cy.get(confirmationPopup).within(() => {
      cy.contains(deleteButtonName).click();
     cy.get(confirmationPopup).should('not.exist');
     
      
    });
  });

  it('Should cancel deletion process successfully', () => {
    cy.get(issueDetailModal).should('be.visible');
    cy.get(deleteButton).click();
    cy.get(confirmationPopup).should('be.visible');
    cy.get(confirmationPopup).within(() => {
      cy.contains(cancelDeletionButtonName).click();
      cy.get(confirmationPopup).should('not.exist')

    })
  })
});
