# TableOfContent

`TableOfContent` is a JavaScript library that generates a table of contents based on the headings in a given HTML element. It allows you to easily create a hierarchical structure of the document's headings and provides an automatically generated table of contents for navigation.

## Installation

You can install `TableOfContent` via npm:

```shell
npm install table-of-content
```

## Usage

To use `TableOfContent`, follow these steps:

1. Import the `TableOfContent` class:

   ```javascript
   import { TableOfContent } from 'table-of-content';
   ```

2. Create an instance of `TableOfContent` by passing the target element and optional configuration options:

   ```javascript
   const toc = new TableOfContent({
     el: document.getElementById('content'), // Target element for generating the table of contents
     attributes: ['h1', 'h2', 'h3', 'h4'], // Array of heading tags to include in the table of contents
     ulClassName: 'appendix' // Optional class name for the generated unordered list
   });
   ```

3. Call the `init()` method to generate and append the table of contents to the document:

   ```javascript
   toc.init();
   ```

4. Customize the table of contents appearance using CSS as desired.

## Example

Here's a basic example of using `TableOfContent`:

```html
<body>
  <div id="content">
    <h1 id="header1">Header 1</h1>
    <h2 id="header2">Header 2</h2>
    <h3 id="header3">Header 3</h3>
    <h2 id="header4">Header 4</h2>
  </div>

  <script type="module">
    import { TableOfContent } from 'table-of-content';

    const toc = new TableOfContent({
      el: document.getElementById('content')
    });

    toc.init();
  </script>
</body>
```

This will generate a table of contents based on the headings (`h1`, `h2`, `h3`, `h4`) within the `#content` element.

## Options

The `TableOfContent` constructor accepts an options object with the following properties:

- `el` (required): The target element for generating the table of contents. Must be an HTML element.
- `attributes` (optional): An array of heading tags to include in the table of contents. Defaults to `['h1', 'h2', 'h3', 'h4']`.
- `ulClassName` (optional): The class name to be added to the generated unordered list element. Defaults to `'appendix'`.

## License

This project is licensed under the [MIT License](LICENSE).


## Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/a-ahandani/table-of-content/issues).

## Credits

`TableOfContent` is developed and maintained by [Ahmad Ahandani](https://github.com/a-ahandani).

