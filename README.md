# Table of Contents Generator

The Table of Contents Generator is a JavaScript library that generates a table of contents based on the headings (e.g., `<h1>`, `<h2>`, `<h3>`) within an HTML document. It provides options for customizing the generated table of contents.

- No external dependencies
- Size: 1.33 kB (minified and gzipped)

## Installation

You can install the Table of Contents Generator library using npm:

```bash
npm install html-toc-generator
```

## Usage

To use the Table of Contents Generator in your project, follow these steps:

1. Import the library:

```javascript
import TableOfContents from 'html-toc-generator';
```

2. Create an instance of the `TableOfContents` class:

```javascript
const options = {
  attributes: ['h1', 'h2', 'h3'],
  appendTo: 'body',
  containerClassName: 'toc',
  ordered: false,
  contentSelector: '#content'
};

const tableOfContents = new TableOfContents(options);
```

3. Call the `init` method to generate the table of contents:

```javascript
tableOfContents.init();
```

## Options

The `TableOfContents` class accepts an optional `options` object during initialization. The available options are:

| Option               | Type       | Default Value        | Optional | Description                                                                                        |
| -------------------- | ---------- | -------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `attributes`         | `string[]` | `['h1', 'h2', 'h3']` | Yes      | An array of HTML heading tag names to include in the table of contents.                            |
| `appendTo`           | `string`   | `'body'`             | Yes      | The selector of the element to which the table of contents should be appended.                     |
| `containerClassName` | `string`   | `'toc'`              | Yes      | The CSS class name to be applied to the container element of the table of contents.                |
| `ordered`            | `boolean`  | `false`              | Yes      | A boolean value indicating whether the generated table of contents should be ordered or unordered. |
| `contentSelector`    | `string`   | `'#content'`         | Yes      | The selector of the element containing the content to generate the table of contents from.         |
s
## License

This project is licensed under the [MIT License](LICENSE).
