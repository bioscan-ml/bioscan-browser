import { TaxonomyTreeNode } from '@/types/response-data'
import { useMemo } from 'react'
import { ROOT_NODE_ID } from './constants'

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
  taxonomy: TaxonomyTreeNode | undefined,
  selectedNodeId: string | null,
) => {
  const metadata = useMemo(() => {
    if (taxonomy && selectedNodeId && selectedNodeId !== ROOT_NODE_ID) {
      return flatten(taxonomy)[selectedNodeId]
    }
  }, [taxonomy, selectedNodeId])

  if (metadata) {
    return `${metadata.taxon}: ${metadata.label}`
  }

  return undefined
}
