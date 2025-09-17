interface HomeHeadingProps {
  title: string
  subtitle: string
  classname?: string
}

export default function HomeHeading({
  title,
  subtitle,
  classname,
}: HomeHeadingProps) {
  return (
    <div className={`${classname} mb-6 tablet:mb-14 desktop:mb-14`}>
      <h1 className="mb-2 text-[32px] font-medium tablet:mb-3 tablet:text-5xl">
        {title}
      </h1>
      <h2 className="m-auto text-base desktop:max-w-[570px]">{subtitle}</h2>
    </div>
  )
}
