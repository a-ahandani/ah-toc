export interface NodeType {
  el: Element | null;
  id: string | null;
  attribute: string;
  content: string | Node;
  level: number;
  children: NodeType[];
  prev?: NodeType;
}

export default class TableOfContents {
  content: HTMLElement | null;
  attributes: string;
  ulClassName: string;
  nodeList: NodeType[] | undefined;
  nodeObject: NodeType | null;
  markup: HTMLElement | null;

  constructor({
    el,
    attributes = ["h1", "h2", "h3", "h4"],
    ulClassName = "appendix"
  }: {
    el: HTMLElement | null;
    attributes?: string[];
    ulClassName?: string;
  }) {
    this.content = el;
    this.attributes = attributes.join(",");
    this.nodeList = [];
    this.ulClassName = ulClassName;
    this.nodeObject = null;
    this.markup = null;
  }

  init = (): void => {
    this.findAllHeaders();
    this.createHierarchy();
    const markup = this.generateMarkup(this.nodeObject);
    if (markup) {
      document.body.append(markup);
    }
  };

  findAllHeaders = (): void => {
    const nodeList = this.content?.querySelectorAll(this.attributes);
    if (nodeList) {
      const nodeArray: NodeType[] = Array.from(nodeList).map((el) => {
        const attribute = el.tagName.toLowerCase();
        return {
          el,
          id: el.getAttribute("id"),
          content: el.innerHTML,
          attribute,
          level: Number(attribute.toLowerCase().slice(-1)),
          children: []
        };
      });

      this.nodeList = nodeArray?.filter((n) => n.id !== null);
    }
  };

  createHierarchy = (): void => {
    if (this.nodeList?.length) {
      const rootNode: NodeType = {
        el: null,
        id: "appendix",
        attribute: "ul",
        content: "Root",
        level: 0,
        children: []
      };

      let currentNode: NodeType = rootNode;

      for (let i = 0; i < this.nodeList.length; i++) {
        const node = this.nodeList[i];
        const newNode: NodeType = {
          el: node.el,
          id: node.id,
          attribute: node.attribute,
          content: node.content,
          level: node.level,
          children: [],
          prev: currentNode
        };

        if (newNode.level > currentNode.level) {
          currentNode.children?.push(newNode);
          currentNode = newNode;
        } else {
          while (newNode.level <= currentNode.level && currentNode.level > 0) {
            currentNode = currentNode.prev as NodeType;
          }
          currentNode.children?.push(newNode);
          currentNode = newNode;
        }
      }
      this.nodeObject = rootNode;
    }
  };

  generateMarkup = (node: NodeType | null): HTMLElement | null => {
    if (node === null) {
      return null;
    }
    let parent: HTMLElement = document.createElement("li");
    if (node.level === 0) {
      parent = document.createElement("div");
    } else {
      const a = document.createElement("a");
      a.append(node.content);
      a.setAttribute("href", `#${node.id}`);
      parent.append(a);
    }
    if (node.children.length > 0) {
      const ul = document.createElement("ul");
      for (let n of node.children) {
        const ull = this.generateMarkup(n);
        if (ull) {
          ul.append(ull);
        }
      }
      parent.append(ul);
    }
    return parent;
  };
}