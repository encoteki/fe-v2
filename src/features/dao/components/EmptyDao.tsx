import Image from 'next/image'
import EmptyBox from '@/features/dao/assets/empty-box.webp'

export default function EmptyDao() {
  return (
    <div className="max-w-90 mx-auto flex h-full flex-col items-center justify-center gap-3 text-center">
      <Image
        src={EmptyBox}
        alt="alt"
        width={256}
        height={256}
        className="size-32 tablet:size-64"
      />
      <h2 className="font-medium">No proposals available</h2>
      <p className="text-neutral-30">
        Proposals you can vote for will appear here. Check back later!
      </p>
    </div>
  )
}
