import toc, { NodeType as NT, OptionsType as OT } from "./table-of-contents";
import hook from "./use-table-of-contents";

export type NodeType = NT;
export type OptionsType = OT;
export const TableOfContents = toc;
export const useTableOfContents = hook;