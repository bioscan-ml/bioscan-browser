import { ROOT_NODE_ID } from '@/lib/constants'
import { TaxonomyTreeNode } from '@/types/response-data'
import { useMemo } from 'react'

const flatten = (
  node: TaxonomyTreeNode,
  result: { [id: string]: { taxon: string; label: string } } = {},
) => {
  result[node.li_attr.id] = {
    taxon: node.metadata.taxon,
    label: node.metadata.label,
  }

  if (node.children) {
    node.children.forEach((child) => flatten(child, result))
  }

  return result
}

export const useTaxonomyQuery = (
  taxonomyTree: TaxonomyTreeNode | undefined,
  selectedNodeId: string | null,
) => {
  const metadata = useMemo(() => {
    if (taxonomyTree && selectedNodeId && selectedNodeId !== ROOT_NODE_ID) {
      return flatten(taxonomyTree)[selectedNodeId]
    }
  }, [taxonomyTree, selectedNodeId])

  if (metadata) {
    return `${metadata.taxon}: ${metadata.label}`
  }

  return undefined
}
