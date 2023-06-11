
import { MutableRefObject, useEffect, useState } from "react";
import TableOfContents, { NodeType } from "./table-of-contents";

const useTableOfContents = ({ contentRef }: { contentRef: MutableRefObject<undefined> }) => {
    let toc: TableOfContents
    let [node, setNode] = useState<NodeType>()
    useEffect(() => {
        if (!toc) {
            toc = new TableOfContents({
                contentElement: contentRef.current,
                returnObject: true
            });
            const data = toc.init() as NodeType
            setNode(data)
        }

    }, [])
    return node
}

export default useTableOfContents