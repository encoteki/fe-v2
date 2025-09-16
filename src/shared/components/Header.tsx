import Image from 'next/image'
import Logo from '@/shared/assets/logos/logo.webp'

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-3 px-4 pt-4 tablet:px-8 tablet:pt-8">
      <Image
        src={Logo}
        alt="Encoteki Logo"
        className="h-[54px] w-[79px] tablet:block tablet:h-[64px] tablet:w-[92px]"
        priority
      />
    </header>
  )
}
