'use client'

import { usePathname } from 'next/navigation'
import InstagramIcon from '@/assets/icons/instagram'
import ThreadsIcon from '@/assets/icons/threads'
import XIcon from '@/assets/icons/x'
import TiktokIcon from '@/assets/icons/tiktok'
import TelegramIcon from '@/assets/icons/telegram'

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
    <footer className="mx-auto w-full rounded-t-3xl bg-primary-green px-16 py-16 tablet:rounded-t-[48px] tablet:px-32 desktop:px-32 desktop:py-48">
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
