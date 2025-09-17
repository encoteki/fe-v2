interface DefaultButtonProps {
  children: React.ReactNode
  onClick?: () => void
  classname?: string
}

export default function DefaultButton({
  children,
  onClick,
  classname = '',
}: DefaultButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-primary-green px-4 py-2 text-white transition-colors hover:bg-green-10 tablet:px-6 tablet:py-3 desktop:px-8 desktop:py-4 ${classname}`}
    >
      {children}
    </button>
  )
}
