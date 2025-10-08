import Image from 'next/image'
import Tiggy from '@/shared/assets/tsb/Tiggy_tp.webp'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-khaki-90">
      <div className="space-y-3">
        <Image
          className="animate-spin"
          alt="Loading"
          src={Tiggy}
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}
