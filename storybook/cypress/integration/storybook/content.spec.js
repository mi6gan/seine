describe('Image snapshots of rendered content with', () => {
  before(() => {
    cy.visitStorybook();
  });

  const contentStories = [
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

  contentStories.forEach((story) => {
    it(story, () => {
      cy.loadStory('Docs/Content', story);
    });
  });

  const editorStories = [
    'EditorOfText',
    'EditorOfImage',
    'EditorOfTable',
    'EditorOfFlex',
    'EditorOfNestedFlex',
    'EditorOfPieChart',
    'EditorOfBarChart',
    'EditorOfColumnChart',
    'EditorOfLineChart',
  ];

  editorStories.forEach((story) => {
    it(story, () => {
      cy.loadStory('Docs/Editor', story);
    });
  });

  afterEach(() => {
    cy.matchImageSnapshot();
  });
});
