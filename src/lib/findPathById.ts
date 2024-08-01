import { TaxonomyTreeNode } from '@/types/response-data'

export const findPathById = (
  items: TaxonomyTreeNode[],
  id: string,
  path: string[] = [],
) => {
  for (const item of items) {
    const itemId = item.li_attr.id

    if (itemId === id) {
      return [...path, itemId]
    }

    if (item.children) {
      const childPath: string[] = findPathById(item.children, id, [
        ...path,
        itemId,
      ])

      if (childPath.length) {
        return childPath
      }
    }
  }

  return []
}
