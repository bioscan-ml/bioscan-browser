import { RESOURCES } from '@/lib/constants'
import { MenuItem } from './types'

export const MENU_ITEMS: MenuItem[] = [
  { id: 'asset-querier', label: 'Search & filter', to: '/asset-querier' },
  { id: 'taxonomy-viewer', label: 'Taxonomy tree', to: '/taxonomy-viewer' },
  {
    id: 'resources',
    label: 'Resources',
    children: [
      {
        id: 'find-similar',
        label: 'Find similar',
        to: '/search-similar',
        flags: {
          experimental: true,
        },
      },
      { id: 'style-guide', label: 'Style guide', to: '/style-guide' },
      {
        id: 'system-status',
        label: 'System status',
        to: RESOURCES.SYSTEM_STATUS,
        flags: {
          external: true,
        },
      },
      {
        id: 'github',
        label: 'GitHub',
        to: RESOURCES.GITHUB,
        flags: {
          external: true,
        },
      },
    ],
  },
  { id: 'about', label: 'About', to: '/about' },
]
