import { PATHS, RESOURCES } from '@/lib/constants'
import { MenuItem } from './types'

export const MENU_ITEMS: MenuItem[] = [
  { id: 'search', label: 'Search & filter', to: PATHS.SEARCH },
  { id: 'taxonomy-tree', label: 'Taxonomy tree', to: PATHS.TAXONOMY_TREE },
  {
    id: 'resources',
    label: 'Resources',
    children: [
      {
        id: 'find-similar',
        label: 'Find similar',
        to: PATHS.FIND_SIMILAR,
        flags: {
          experimental: true,
        },
      },
      { id: 'report', label: 'Report a problem', to: PATHS.REPORT },
      { id: 'style-guide', label: 'Style guide', to: PATHS.STYLE_GUIDE },
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
  { id: 'about', label: 'About', to: PATHS.ABOUT },
]

export const USER_MENU_ITEMS = [
  { id: 'my-bookmarks', label: 'My bookmarks', to: PATHS.MY_BOOKMARKS },
]
