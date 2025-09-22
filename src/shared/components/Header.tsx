'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Logo from '@/shared/assets/logos/logo.webp'
import DefaultButton from '../ui/buttons/DefaultButton'
import { HoverNavMenu } from '../ui/HoverNavMenu'
import HomeNavMenu from '@/features/home/ui/HomeNavMenu'
import HamburgerMenu from '../ui/HamburgerMenu'

const homeNavs = [
  { label: 'Collection', href: '#collection' },
  { label: 'Benefit', href: '#benefit' },
  { label: 'About', href: '#about' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Family', href: '#family' },
]

const appNavs = [
  { label: 'Mint', href: '/app/mint' },
  { label: 'DAO', href: '/app/dao' },
  { label: 'Proposal', href: '/app/proposal' },
]

export default function Header() {
  const pathname = usePathname()

  const isHome = pathname === '/'
  const isApps = pathname.startsWith('/app/')

  return (
    <header className={`bg-transparent'} fixed left-0 right-0 top-0 z-50`}>
      <div className="flex w-full items-center justify-between px-4 pt-4 tablet:pt-6 desktop:px-6">
        <section className="flex flex-row tablet:w-[200px]">
          {isHome && <HamburgerMenu items={homeNavs} />}
          {isApps && <HamburgerMenu items={appNavs} />}
          <Link href="/">
            <Image
              src={Logo}
              alt="Encoteki Logo"
              className="hidden tablet:block tablet:h-[54px] tablet:w-[79px]"
              priority
            />
          </Link>
        </section>

        <>
          {isHome && (
            <HomeNavMenu items={homeNavs} classname=" justify-center" />
          )}
          {isApps && <HoverNavMenu items={appNavs} />}
        </>

        {isHome && (
          <section className="text-right tablet:w-[200px]">
            <DefaultButton
              onClick={() => (window.location.href = '/app/mint')}
              classname="text-sm tablet:text-base font-medium"
            >
              Launch App
            </DefaultButton>
          </section>
        )}
        {isApps && (
          <section className="text-right tablet:w-[200px]">
            <DefaultButton
              onClick={() => (window.location.href = '/apps/mint')}
              classname="text-sm tablet:text-base font-medium"
            >
              Connect Wallet
            </DefaultButton>
          </section>
        )}
      </div>
    </header>
  )
}
