import { RESOURCES } from '@/lib/constants'
import { MenuItem } from './types'

export const MENU_ITEMS: MenuItem[] = [
  { id: 'search', label: 'Search & filter', to: '/search' },
  { id: 'taxonomy-tree', label: 'Taxonomy tree', to: '/taxonomy-tree' },
  {
    id: 'resources',
    label: 'Resources',
    children: [
      {
        id: 'find-similar',
        label: 'Find similar',
        to: '/find-similar',
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

export const USER_MENU_ITEMS = [
  { id: 'my-bookmarks', label: 'My bookmarks', to: '/my-bookmarks' },
]
