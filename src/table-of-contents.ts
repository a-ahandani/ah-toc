export interface NodeType {
    el: Element | null;
    id: string | null;
    attribute: string;
    content: string;
    level: number;
    children: NodeType[];
    prev?: NodeType;
}

export interface OptionsType {
    attributes?: ("h1" | "h2" | "h3" | "h4" | "h5")[];
    containerClassName?: string;
    ordered?: boolean;
    containerSelector?: string;
    containerElement?: HTMLElement;
    contentSelector?: string;
    contentElement?: HTMLElement;
    returnObject?: boolean
}

export default class TableOfContents {
    content: HTMLElement | null;
    nodeList: NodeType[] | undefined;
    nodeObject: NodeType | null;
    markup: HTMLElement | null;
    options?: OptionsType;
    settings: OptionsType;

    constructor(options?: OptionsType) {
        const defaultOptions: OptionsType = {
            attributes: ["h1", "h2", "h3"],
            containerClassName: "toc",
            ordered: false,
            returnObject: false,
            containerSelector: "body",
            containerElement: undefined,
            contentSelector: "#content",
            contentElement: undefined,
        };
        this.settings = { ...defaultOptions, ...options };
        this.nodeList = [];
        this.nodeObject = null;
        this.markup = null;
        this.options = options;
        this.content = this.settings.contentElement || document.querySelector(
            this.settings.contentSelector as string
        );
    }

    public init = (): void | NodeType | null => {
        this.findAllHeaders();
        this.createHierarchy();
        if (!this.settings.returnObject) {
            const markup = this.generateMarkup(this.nodeObject);
            const container = this.settings.containerElement || document.querySelector(this.settings.containerSelector as string)
            if (container && markup) {
                container.append(markup);
            }
        } else {
            return this.nodeObject
        }
    };

    private findAllHeaders = (): void => {
        const query = this.settings.attributes?.join(",") as string;
        const nodeList = query ? this.content?.querySelectorAll(query) : undefined;
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

    private createHierarchy = (): void => {
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

    private generateMarkup = (node: NodeType | null): HTMLElement | null => {
        if (node === null) {
            return null;
        }
        let parent: HTMLElement = document.createElement("li");
        if (node.level === 0) {
            parent = document.createElement("div");
            const className = this.settings.containerClassName;
            if (className) {
                parent.classList.add(className);
            }
        } else {
            const a = document.createElement("a");
            a.append(node.content);
            a.setAttribute("href", `#${node.id}`);
            parent.append(a);
        }
        if (node.children.length > 0) {
            const list = document.createElement(this.settings.ordered ? "ol" : "ul");
            for (let n of node.children) {
                const ull = this.generateMarkup(n);
                if (ull) {
                    list.append(ull);
                }
            }
            parent.append(list);
        }
        return parent;
    };
}