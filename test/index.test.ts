import TableOfContents from '../src';


describe('TableOfContents', () => {
  beforeEach(() => {
    // Create a sample HTML structure for testing
    document.body.innerHTML = `
      <div id="content">
        <h1 id="header1">Header 1</h1>
        <h2 id="header2">Header 2</h2>
        <h3 id="header3">Header 3</h3>
        <h2 id="header4">Header 4</h2>
      </div>
    `;
  });

  test('init() should generate the correct table of contents', () => {

    const toc = new TableOfContents();
    toc.init();

    const generatedMarkup = document.body.innerHTML;

    // Assert the generated table of contents markup
    expect(generatedMarkup).toMatchSnapshot();
  });



});
