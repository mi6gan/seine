describe('Image snapshots of rendered content with', () => {
  before(() => {
    cy.visitStorybook();
  });

  it('text', () => {
    cy.loadStory('Development/Content', 'Text');
  });

  it('image', () => {
    cy.loadStory('Development/Content', 'Image');
  });

  it('table', () => {
    cy.loadStory('Development/Content', 'Table');
  });

  it('flex', () => {
    cy.loadStory('Development/Content', 'Flex');
  });

  it('nested flex', () => {
    cy.loadStory('Development/Content', 'NestedFlex');
  });

  it('pie chart', () => {
    cy.loadStory('Development/Content', 'PieChart');
  });

  it('Bar chart', () => {
    cy.loadStory('Development/Content', 'BarChart');
  });

  it('Column chart', () => {
    cy.loadStory('Development/Content', 'ColumnChart');
  });

  it('line chart', () => {
    cy.loadStory('Development/Content', 'LineChart');
  });

  afterEach(() => {
    cy.matchImageSnapshot();
  });
});
