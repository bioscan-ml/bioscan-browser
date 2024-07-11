import { TaxonomyTreeNode } from '@/types/response-data'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import './styles.css'

interface TaxonomyTreeProps {
  defaultExpandedNodes?: string[]
  selectedNodeId: string | null
  taxonomyTree?: TaxonomyTreeNode
  onSelectedNodeIdChange: (selectedNodeId: string | null) => void
}

export const TaxonomyTree = ({
  defaultExpandedNodes,
  selectedNodeId,
  taxonomyTree,
  onSelectedNodeIdChange,
}: TaxonomyTreeProps) => (
  <SimpleTreeView
    defaultExpandedItems={defaultExpandedNodes}
    slots={{
      expandIcon: () => <ChevronRightIcon className="w-4 h-4" />,
      collapseIcon: () => <ChevronDownIcon className="w-4 h-4" />,
    }}
    selectedItems={selectedNodeId}
    onSelectedItemsChange={(_, itemId) => onSelectedNodeIdChange(itemId)}
  >
    {taxonomyTree?.children?.map((child) => (
      <TaxonomyTreeItem key={child.li_attr.id} node={child} />
    ))}
  </SimpleTreeView>
)

const TaxonomyTreeItem = ({ node }: { node: TaxonomyTreeNode }) => (
  <TreeItem itemId={node.li_attr.id} label={node.text} className="text-sm">
    {node.children?.map((child) => (
      <TaxonomyTreeItem key={child.li_attr.id} node={child} />
    ))}
  </TreeItem>
)
