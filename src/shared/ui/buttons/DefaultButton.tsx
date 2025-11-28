interface DefaultButtonProps {
  children: React.ReactNode
  onClick?: () => void
  classname?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export default function DefaultButton({
  children,
  onClick,
  classname = '',
  variant = 'primary',
  disabled = false,
}: DefaultButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full px-4 py-3 transition-all duration-300 hover:scale-105 tablet:px-6 desktop:px-6 desktop:py-3 ${classname} ${
        variant === 'primary'
          ? 'bg-primary-green text-white hover:bg-green-10'
          : 'bg-white text-primary-green'
      } disabled:cursor-default`}
    >
      {children}
    </button>
  )
}
