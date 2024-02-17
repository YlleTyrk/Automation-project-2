import { faker } from '@faker-js/faker';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        // System will already open issue creating modal in beforeEach block
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('Should create an issue and validate it successfully', () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      // Type value to description input field
      cy.get('.ql-editor').type('TEST_DESCRIPTION');
      cy.get('.ql-editor').should('have.text', 'TEST_DESCRIPTION');

      // Type value to title input field
      // Order of filling in the fields is first description, then title on purpose
      // Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('TEST_TITLE');
      cy.get('input[name="title"]').should('have.value', 'TEST_TITLE');

      // Open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      cy.get('[data-testid="icon:story"]').should('be.visible');

      // Select Lord Gaben from assignee dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();

      // Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    // Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    // Reload the page to be able to see recently created issue
    // Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    // Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .and('have.length', '1')
      .within(() => {
        // Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('TEST_TITLE')
          .siblings()
          .within(() => {
            //Assert that correct avatar and type icon are visible
            cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
            cy.get('[data-testid="icon:story"]').should('be.visible');
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains('TEST_TITLE')
      .within(() => {
        // Assert that correct avatar and type icon are visible
        cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
        cy.get('[data-testid="icon:story"]').should('be.visible');
      });
  });

  it('Should validate title is required field if missing', () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      // Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      // Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should(
        'contain',
        'This field is required'
      );
    });
  });

  const description = '.ql-editor';
  const title = 'input[name="title"]';
  const issuetype = '[data-testid="select:type"]';

  it('should create a custom issue and validate it', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get(description).type('My bug description');
      cy.get(description).should('have.text', 'My bug description');
      cy.get(title).type('Bug');
      cy.get(title).should('have.value', 'Bug');
      cy.get(issuetype).click();
      cy.get('[data-testid="select-option:Bug"]')
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      cy.get('[data-testid="icon:bug"]').should('be.visible');
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="avatar:Pickle Rick"]')
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]')
        .wait(1000)
        .trigger('mouseover')
        .trigger('click');
      cy.get('button[type="submit"]').click();
    });
  });

  it('should create a custom issue using random data plugin', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {});
    const randomTitle = faker.lorem.word();
    const randomDescription = faker.lorem.words(5);
    cy.get(description).type(randomDescription);
    cy.get(description).should('have.text', randomDescription);
    cy.get(title).type(randomTitle);
    cy.get(title).should('have.value', randomTitle);
    cy.get(issuetype).click();
    cy.get('[data-testid="icon:task"]');
    cy.get('[data-testid="icon:task"]').should('be.visible');
    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Low"]').click();
    cy.get('[data-testid="select:reporterId"]').should('be.visible').click();
    cy.get('[data-testid="select-option:Baby Yoda"]')
      .should('be.visible')
      .click();
    cy.get('button[type="submit"]').click();
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
  });
});
