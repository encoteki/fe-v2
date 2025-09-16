'use client'

import { usePathname } from 'next/navigation'
import InstagramIcon from '@/shared/assets/icons/Instagram'
import ThreadsIcon from '@/shared/assets/icons/Threads'
import XIcon from '@/shared/assets/icons/X'
import TiktokIcon from '@/shared/assets/icons/Tiktok'
import TelegramIcon from '@/shared/assets/icons/Telegram'

export default function Footer() {
  const pathname = usePathname()
  const currentYear: number = new Date().getFullYear()

  const title = 'Join the community and save the world!'
  const copyright = `Encoteki © ${currentYear} All rights reserved`
  const socmed = [
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      url: 'https://www.instagram.com/encoteki/',
    },
    {
      name: 'Thread',
      icon: <ThreadsIcon />,
      url: 'https://www.threads.net/@encoteki',
    },
    {
      name: 'X',
      icon: <XIcon />,
      url: 'https://x.com/encoteki',
    },
    {
      name: 'Tiktok',
      icon: <TiktokIcon />,
      url: 'https://www.tiktok.com/@encoteki',
    },
    {
      name: 'Telegram',
      icon: <TelegramIcon />,
      url: 'https://t.me/encoteki',
    },
  ]

  return (
    <footer className="mx-auto w-full bg-primary-green px-6 py-24 tablet:px-16 desktop:px-32 desktop:py-24">
      <div className="flex h-auto flex-col tablet:flex-row tablet:justify-between">
        {/* Left Content */}
        <section className="mb-14 flex flex-col gap-4 tablet:mb-0 tablet:w-1/2 tablet:justify-between tablet:gap-10">
          <h1 className="text-xl font-medium text-white desktop:text-4xl">
            {title}
          </h1>
          <div className="flex gap-9">
            {socmed.map((item, index) => {
              return (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              )
            })}
          </div>
        </section>

        {/* Right Content */}
        {pathname === '/' ? (
          <div className="flex flex-col justify-end text-right tablet:w-1/2">
            <p className="text-left text-sm font-normal text-white tablet:text-right">
              {copyright}
            </p>
          </div>
        ) : (
          <div className="flex h-auto items-end">
            <p className="text-sm font-normal text-white">{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  )
}
