import { cn } from '@/lib/utils'

import AppProfileMenu from './app-profilemenu'
import { Menubar } from './ui/menubar'

export default function AppMenubar() {
  return (
    <Menubar className={cn('fixed flex w-full flex-row')}>
      <AppProfileMenu />
    </Menubar>
  )
}
