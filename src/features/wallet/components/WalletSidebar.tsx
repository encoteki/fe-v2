import WalletAccount from '@/features/wallet/components/WalletAccount'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../../../shared/ui/Sheet'

import WalletButton from '../ui/WalletButton'

export function WalletSidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <WalletButton variant={'secondary'} />
      </SheetTrigger>

      <SheetContent className="bg-khaki-90 w-full border-0 sm:w-[540px] sm:rounded-l-4xl">
        <SheetHeader>
          <SheetTitle />
        </SheetHeader>

        <WalletAccount />
      </SheetContent>
    </Sheet>
  )
}
