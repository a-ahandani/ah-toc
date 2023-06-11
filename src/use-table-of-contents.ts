
import { MutableRefObject, useEffect, useState } from "react";
import TableOfContents, { NodeType, OptionsType } from "./table-of-contents";

const useTableOfContents = ({ contentRef, options }: { contentRef: MutableRefObject<undefined>, options: OptionsType }) => {
    let toc: TableOfContents
    let [node, setNode] = useState<NodeType>()
    useEffect(() => {
        if (!toc) {
            toc = new TableOfContents({
                contentElement: contentRef.current,
                returnObject: true,
                ...options,
            });
            const data = toc.init() as NodeType
            setNode(data)
        }

    }, [])
    return node
}

export default useTableOfContents