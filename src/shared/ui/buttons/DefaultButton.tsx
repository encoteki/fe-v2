interface DefaultButtonProps {
  children: React.ReactNode
  onClick?: () => void
  classname?: string
  variant?: 'primary' | 'secondary'
}

export default function DefaultButton({
  children,
  onClick,
  classname = '',
  variant = 'primary',
}: DefaultButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 transition-colors tablet:px-6 tablet:py-3 desktop:px-8 desktop:py-4 ${classname} ${
        variant === 'primary'
          ? 'bg-primary-green text-white hover:bg-green-10'
          : 'bg-white text-primary-green'
      }`}
    >
      {children}
    </button>
  )
}
