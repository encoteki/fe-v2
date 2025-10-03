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
      className={`rounded-full px-4 py-3 transition-colors duration-300 tablet:px-6 desktop:px-8 desktop:py-4 ${classname} ${
        variant === 'primary'
          ? 'bg-primary-green text-white hover:bg-green-10'
          : 'bg-white text-primary-green'
      } disabled:cursor-default`}
    >
      {children}
    </button>
  )
}
