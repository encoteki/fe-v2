'use client'

import { usePathname } from 'next/navigation'
import InstagramIcon from '@/shared/assets/icons/Instagram'
import ThreadsIcon from '@/shared/assets/icons/Threads'
import XIcon from '@/shared/assets/icons/X'
import TiktokIcon from '@/shared/assets/icons/Tiktok'
import TelegramIcon from '@/shared/assets/icons/Telegram'

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

export default function Footer() {
  const pathname = usePathname()
  const currentYear: number = new Date().getFullYear()

  const title = 'Join the community and save the world!'
  const copyright = `Encoteki © ${currentYear} All rights reserved`

  return (
    <footer className="bg-primary-green tablet:rounded-t-[48px] tablet:px-32 desktop:px-32 desktop:py-48 mx-auto w-full rounded-t-3xl px-16 py-16">
      <div className="tablet:flex-row tablet:justify-between flex h-auto flex-col">
        {/* Left Content */}
        <section className="tablet:mb-0 tablet:w-1/2 tablet:justify-between tablet:gap-10 mb-14 flex flex-col gap-4">
          <h1 className="desktop:text-4xl text-xl font-medium text-white">
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
          <div className="tablet:w-1/2 flex flex-col justify-end text-right">
            <p className="tablet:text-right text-left text-sm font-normal text-white">
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
