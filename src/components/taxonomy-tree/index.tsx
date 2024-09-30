import { TaxonomyTreeNode } from '@/types/response-data'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem } from '@mui/x-tree-view/TreeItem'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
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
    key={defaultExpandedNodes?.toString()}
    defaultExpandedItems={defaultExpandedNodes}
    slots={{
      expandIcon: () => <ChevronRightIcon className="w-4 h-5" />,
      collapseIcon: () => <ChevronDownIcon className="w-4 h-5" />,
    }}
    selectedItems={selectedNodeId}
    onSelectedItemsChange={(_, itemId) => onSelectedNodeIdChange(itemId)}
  >
    {taxonomyTree?.children?.map((child) => (
      <TaxonomyTreeItem key={child.li_attr.id} node={child} />
    ))}
  </SimpleTreeView>
)

const TaxonomyTreeItem = ({ node }: { node: TaxonomyTreeNode }) => {
  const { label, numChildren, numInstances } = node.metadata

  return (
    <TreeItem
      itemId={node.li_attr.id}
      label={
        <>
          <Badge
            className="mt-[-1px] mb-[-1px] ml-2 float-right"
            variant="outline"
          >
            {numInstances.toLocaleString()}
          </Badge>
          <span className="break-all">
            {label.split(' ').map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </span>
          <br />
          {numChildren ? (
            <span className="text-xs text-muted-foreground">
              {numChildren.toLocaleString()}{' '}
              {numChildren === 1 ? 'child' : 'children'}
            </span>
          ) : null}
        </>
      }
    >
      {node.children?.map((child) => (
        <TaxonomyTreeItem key={child.li_attr.id} node={child} />
      ))}
    </TreeItem>
  )
}
