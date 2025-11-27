import Link from 'next/link'
import Image from 'next/image'
import NotFoundImg from '@/shared/assets/404.webp'

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[488px] text-center font-normal">
        <Image
          src={NotFoundImg}
          alt="404 Not Found"
          className="tablet:h-[325px] tablet:w-[488px] m-auto h-[182px] w-[272px]"
        />
        <h1 className="tablet:text-3xl mb-2 text-2xl font-medium">
          This page is lost in the wild
        </h1>
        <p className="tablet:text-base text-sm">
          The page you are looking for cannot be found. Please recheck the URL
          and try again.
        </p>
        <Link href="/">
          <button className="bg-primary-green my-8 rounded-[32px] px-6 py-3 text-white">
            Go back home
          </button>
        </Link>
      </div>
    </div>
  )
}
