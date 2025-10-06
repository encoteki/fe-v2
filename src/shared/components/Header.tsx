'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Logo from '@/shared/assets/logos/logo.webp'
import DefaultButton from '../ui/buttons/DefaultButton'
import { AppNavMenu } from '../ui/navs/AppNavMenu'
import HomeNavMenu from '@/features/home/ui/HomeNavMenu'
import HamburgerMenu from '../ui/hamburger/HamburgerMenu'
import { useEffect, useState } from 'react'

const homeNavs = [
  { label: 'Collection', href: '#collection' },
  { label: 'Benefit', href: '#benefit' },
  { label: 'About', href: '#about' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Family', href: '#family' },
]

const appNavs = [
  { label: 'Home', href: '/' },
  { label: 'Mint', href: '/app/mint' },
  { label: 'DAO', href: '/app/dao' },
  { label: 'Deals', href: '/app/deals' },
]

export default function Header() {
  const pathname = usePathname()

  const isHome = pathname === '/'
  const isApps = pathname.startsWith('/app/')

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20) // activate blur after 20px scroll
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`absolute left-0 right-0 top-0 z-50 tablet:fixed ${scrolled ? 'bg-white/20 backdrop-blur-sm' : 'bg-transparent'}`}
    >
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
            <HomeNavMenu items={homeNavs} classname="justify-center" />
          )}
          {isApps && (
            <AppNavMenu items={appNavs.filter((nav) => nav.label !== 'Home')} />
          )}
        </>

        {isHome && (
          <section className="text-right tablet:w-[200px]">
            <DefaultButton
              onClick={() => (window.location.href = '/app/mint')}
              classname="text-sm tablet:text-base font-medium h-full"
            >
              Launch App
            </DefaultButton>
          </section>
        )}
        {isApps && (
          <section className="text-right tablet:w-[200px]">
            <DefaultButton
              onClick={() => (window.location.href = '/apps/mint')}
              classname="text-sm tablet:text-base font-medium h-full"
            >
              Connect Wallet
            </DefaultButton>
          </section>
        )}
      </div>
    </nav>
  )
}
