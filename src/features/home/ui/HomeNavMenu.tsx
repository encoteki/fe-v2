import Link from 'next/link'

interface HoverNavMenuProps {
  label: string
  href?: string
}

export default function HomeNavMenu({
  items,
  classname = '',
}: {
  items: HoverNavMenuProps[]
  classname?: string
}) {
  return (
    <div
      className={`${classname} hidden tablet:flex tablet:gap-4 desktop:gap-8`}
    >
      {items.map((item, index) => {
        return (
          <Link
            key={index}
            href={item.href ? item.href : '/'}
            className="duration-300 hover:text-primary-green"
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
