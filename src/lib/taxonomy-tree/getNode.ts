import { TaxonomyTreeNode } from '@/types/response-data'

const flatten = (
  node: TaxonomyTreeNode,
  result: { [id: string]: TaxonomyTreeNode } = {},
) => {
  result[node.li_attr.id] = node

  if (node.children) {
    node.children.forEach((child) => flatten(child, result))
  }

  return result
}

export const getNode = (
  taxonomyTree: TaxonomyTreeNode,
  nodeId: string | null,
) => {
  if (taxonomyTree && nodeId) {
    return flatten(taxonomyTree)[nodeId]
  }
}
