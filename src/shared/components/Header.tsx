'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Logo from '@/shared/assets/logos/logo.webp'
import DefaultButton from '../ui/buttons/DefaultButton'
import { HubNav } from '../ui/navs/HubNav'
import HamburgerMenu from '../ui/hamburger/HamburgerMenu'
// import { WalletSidebar } from '@/features/wallet/components/WalletSidebar'
import URL_ROUTES from '../constants/urlRoute'
import { HomeNav } from '@/features/home/ui/HomeNav'
import { ConnectButton } from '@xellar/kit'
import { useEffect, useState } from 'react'

const homeNavs = [
  { label: 'Collection', id: 'collection' },
  { label: 'Benefit', id: 'benefit' },
  { label: 'About', id: 'about' },
  { label: 'Roadmap', id: 'roadmap' },
  { label: 'FAQ', id: 'faq' },
]

const hubNavs = [
  { label: 'Home', id: URL_ROUTES.HOME },
  { label: 'Mint', id: URL_ROUTES.MINT },
  { label: 'DAO', id: URL_ROUTES.DAO },
]

export default function Header() {
  // 1. Buat state untuk melacak apakah sudah di browser
  const [mounted, setMounted] = useState(false)

  // 2. Set true hanya setelah useEffect berjalan (artinya sudah di browser)
  useEffect(() => {
    setMounted(true)
  }, [])

  const pathname = usePathname()
  const isHome = pathname === URL_ROUTES.HOME
  const isHub = pathname.startsWith(URL_ROUTES.HUB)

  return (
    <nav
      className={`${isHome ? 'fixed' : 'absolute'} top-0 right-0 left-0 z-50 bg-transparent`}
    >
      <div className="tablet:pt-6 desktop:px-8 flex w-full items-center justify-between px-4 pt-4">
        <section className="flex items-center gap-4 md:w-[200px]">
          {isHome && <HamburgerMenu items={homeNavs} />}
          {isHub && <HamburgerMenu items={hubNavs} />}

          <Link href="/">
            <Image
              src={Logo}
              alt="Home"
              className="hidden md:block md:h-[54px] md:w-[79px]"
              priority
            />
          </Link>
        </section>

        <>
          {isHome && <HomeNav items={homeNavs} />}
          {isHub && (
            <HubNav items={hubNavs.filter((nav) => nav.label !== 'Home')} />
          )}
        </>

        {isHome && (
          <section className="text-right md:w-[200px]">
            <DefaultButton
              onClick={() => (window.location.href = URL_ROUTES.MINT)}
              classname="text-sm md:text-base font-medium "
            >
              Launch App
            </DefaultButton>
          </section>
        )}
        {isHub && (
          // <section className="text-right md:w-[200px]">
          //   <WalletSidebar />
          // </section>
          <>
            {mounted ? (
              <ConnectButton />
            ) : (
              // Opsional: Tampilkan tombol loading/kosong agar layout tidak bergeser
              <div className="h-10 w-[150px]" />
            )}
          </>
        )}
      </div>
    </nav>
  )
}
