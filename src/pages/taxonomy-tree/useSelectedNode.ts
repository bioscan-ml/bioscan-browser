import { TaxonomyTreeNode } from '@/types/response-data'
import { useMemo } from 'react'

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

export const useSelectedNode = (
  taxonomyTree: TaxonomyTreeNode | undefined,
  selectedNodeId: string | null,
) => {
  const selectedNode = useMemo(() => {
    if (taxonomyTree && selectedNodeId) {
      return flatten(taxonomyTree)[selectedNodeId]
    }
  }, [taxonomyTree, selectedNodeId])

  return selectedNode
}
