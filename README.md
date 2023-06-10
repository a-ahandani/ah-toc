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

## Example

Suppose we have the following HTML content:

```html
<div id="content">
  <h1>Introduction</h1>
  <h2>Section 1</h2>
  <h3>Subsection 1.1</h3>
  <h3>Subsection 1.2</h3>
  <h2>Section 2</h2>
  <h3>Subsection 2.1</h3>
  <h3>Subsection 2.2</h3>
</div>
```

After calling the `init` method with the default options, the generated table of contents will be appended to the `<body>` element and will have the following structure:

```html
<div class="toc">
  <ul>
    <li>
      <a href="#introduction">Introduction</a>
      <ul>
        <li>
          <a href="#section-1">Section 1</a>
          <ul>
            <li><a href="#subsection-1-1">Subsection 1.1</a

></li>
            <li><a href="#subsection-1-2">Subsection 1.2</a></li>
          </ul>
        </li>
        <li>
          <a href="#section-2">Section 2</a>
          <ul>
            <li><a href="#subsection-2-1">Subsection 2.1</a></li>
            <li><a href="#subsection-2-2">Subsection 2.2</a></li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</div>
```

Please note that no CSS styles are added by default to keep the library simple and customizable. You can apply your own CSS styles by targeting the generated classes and elements.


## License

This project is licensed under the [MIT License](LICENSE).
