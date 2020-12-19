describe('Image snapshots of rendered content with', () => {
  before(() => {
    cy.visitStorybook();
  });

  const stories = [
    'Text',
    'Image',
    'Table',
    'Flex',
    'NestedFlex',
    'PieChart',
    'BarChart',
    'ColumnChart',
    'LineChart',
  ];

  stories.forEach((story) => {
    it(story, () => {
      cy.loadStory('Development/Content', story);
    });
  });

  afterEach(() => {
    cy.matchImageSnapshot();
  });
});
