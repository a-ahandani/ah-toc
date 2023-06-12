
# Table of Contents Generator (+ react hook)

The Table of Contents Generator is a JavaScript library that generates a table of contents based on the headings (e.g., `<h1>`, `<h2>`, `<h3>`) within an HTML document. It provides options for customizing the generated table of contents.

- No external dependencies
- Size: 4.04 kB (minified and gzipped)

## Installation

You can install the Table of Contents Generator library using npm:

```bash
npm install ah-toc
```
#### Examples
[Codesandbox Example ](https://codesandbox.io/s/ah-toc-75y2mh?file=/index.html)

## Usage

To use the Table of Contents Generator in your project, follow these steps:

### 1- Pure Javascript

[Codesandbox]([URL](https://codesandbox.io/s/ah-toc-75y2mh?file=/index.html))


1. Import the library:

```javascript
import TableOfContents from 'ah-toc';
```

2. Create an instance of the `TableOfContents` class:

```javascript
const options = {
  attributes: ['h1', 'h2', 'h3'],
  containerSelector: 'body',
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

### 2- React Hook


```javascript
import { useRef } from 'react';
import useTableOfContents from 'table-of-contents-library/hook';

const MyComponent = () => {
  const contentRef = useRef();
  const tocData = useTableOfContents({ contentRef });

  return (
    <div>
      {/* Your content goes here */}
      <div ref={contentRef}>...</div>

      {/* Render the table of contents */}
      {tocData && (
        <ul>
          {tocData.children.map((node) => (
            <li key={node.id}>
              <a href={`#${node.id}`}>{node.content}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

#### `useTableOfContents` Hook

##### Parameters

- `contentRef`: A `MutableRefObject` containing a reference to the content element in the HTML document that contains the headers.

##### Returns

- `node`: A `NodeType` object representing the table of contents hierarchy. It will be `undefined` initially and will be updated once the table of contents is generated.





## Options

The `TableOfContents` class accepts an optional `options` object during initialization. The available options are:

| Option               | Type       | Default Value        | Optional | Description                                                                                        |
| -------------------- | ---------- | -------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `attributes`         | `string[]` | `['h1', 'h2', 'h3']` | Yes      | An array of HTML heading tag names to include in the table of contents.                            |
| `containerSelector`           | `string`   | `'body'`             | Yes      | The selector of the element to which the table of contents should be appended.                     |
| `containerClassName` | `string`   | `'toc'`              | Yes      | The CSS class name to be applied to the container element of the table of contents.                |
| `ordered`            | `boolean`  | `false`              | Yes      | A boolean value indicating whether the generated table of contents should be ordered or unordered. |
| `contentSelector`    | `string`   | `'#content'`         | Yes      | The selector of the element containing the content to generate the table of contents from.         |


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
