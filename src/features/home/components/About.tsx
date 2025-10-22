'use client'

import Image, { StaticImageData } from 'next/image'
import iconLightBulb from '@/features/home/assets/icons/icon.lightbulb.svg'
import iconTarget from '@/features/home/assets/icons/icon.target.svg'
import iconArrow from '@/features/home/assets/icons/green.arrow.svg'
import { Reveal } from '@/shared/ui/Reveal'

const visionMission = [
  {
    icon: iconLightBulb,
    title: 'Our vision',
    content: [
      {
        item: 'Develop a self-sustainable environment and community through technology.',
      },
    ],
  },
  {
    icon: iconTarget,
    title: 'Our mission',
    content: [
      {
        item: 'Conserve endangered Indonesian animals through real contribution.',
      },
      {
        item: 'Benefit environment, community, and holders through value-added initiatives.',
      },
    ],
  },
]

const paragraphs = [
  {
    paragraph:
      'ENCOTEKI is a combination of ‘EN’ (Environment), ‘CO’ (Community), and ‘TEKI’ (Teman Kita, meaning ‘our friend’ in Bahasa).',
  },
  {
    paragraph:
      'The name reflects our belief that both the environment and community are our friends, making them the core of ENCOTEKI.',
  },
  {
    paragraph:
      'We believe you as an individual and everyone on this planet can make a great impact on the environment and community. Together we can create impact for the things we do really care for.',
  },
]

const whitePaperUrl = process.env.WHITEPAPER_DRIVE_URL ?? ''

// small helper for stagger-like delays (in ms)
const stepDelay = (index: number, base = 0, step = 80) => base + index * step

export default function About() {
  return (
    <section id="about" className="home-container">
      <div className="max-w-full">
        <div className="rounded-2xl bg-primary-green px-4 py-6 tablet:rounded-[32px] tablet:p-16 desktop:px-28 desktop:py-20">
          <div className="flex flex-col desktop:flex-row desktop:gap-x-20">
            {/* Mobile & Tablet */}
            <div className="flex flex-col gap-10 tablet:gap-y-20 desktop:hidden">
              <Reveal as="div" variant="up" duration={600}>
                <AboutBlockMobile paragraphs={paragraphs} />
              </Reveal>

              <div className="flex flex-col gap-6">
                {visionMission.map((vm, i) => (
                  <Reveal
                    key={i}
                    as="div"
                    variant="up"
                    duration={600}
                    delay={stepDelay(i, 0, 100)}
                  >
                    <VMCard
                      variant="mobile"
                      icon={vm.icon}
                      title={vm.title}
                      content={vm.content}
                    />
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Desktop Left */}
            <div
              id="desktop-left-content"
              className="hidden w-1/2 desktop:block"
            >
              <div className="flex h-full flex-col justify-between">
                <Reveal
                  as="h2"
                  variant="up"
                  duration={600}
                  className="text-white desktop:text-5xl desktop:font-medium"
                >
                  About Encoteki
                </Reveal>

                <div className="font-inter flex flex-col text-base font-normal text-white desktop:gap-y-10">
                  {paragraphs.map((p, i) => (
                    <Reveal
                      key={i}
                      as="div"
                      variant="up"
                      duration={500}
                      delay={stepDelay(i, 0, 120)}
                    >
                      <p className="text-sm font-normal tablet:text-base">
                        {p.paragraph}
                      </p>
                    </Reveal>
                  ))}
                </div>

                <Reveal variant="up" duration={600}>
                  <WhitepaperButton href={whitePaperUrl} size="lg" />
                </Reveal>
              </div>
            </div>

            {/* Desktop Right */}
            <div
              id="desktop-right-content"
              className="hidden w-1/2 desktop:block"
            >
              <div className="flex flex-col justify-between gap-y-10">
                {visionMission.map((vm, i) => (
                  <Reveal
                    key={i}
                    as="div"
                    variant="up"
                    duration={600}
                    delay={stepDelay(i, 0, 120)}
                  >
                    <VMCard
                      variant="desktop"
                      icon={vm.icon}
                      title={vm.title}
                      content={vm.content}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- pieces ---------- */

function AboutBlockMobile({
  paragraphs,
}: {
  paragraphs: { paragraph: string }[]
}) {
  return (
    <div className="text-white">
      <h1 className="mb-8 text-[32px] font-medium tablet:text-5xl">
        About Encoteki
      </h1>

      <div className="font-inter mb-8 flex flex-col gap-y-6">
        {paragraphs.map((p, i) => (
          <Reveal
            key={i}
            as="p"
            variant="up"
            duration={500}
            delay={stepDelay(i, 0, 90)}
          >
            <span className="text-sm font-normal tablet:text-base">
              {p.paragraph}
            </span>
          </Reveal>
        ))}
      </div>

      <Reveal variant="up" duration={600}>
        <WhitepaperButton href={whitePaperUrl} size="md" />
      </Reveal>
    </div>
  )
}

function WhitepaperButton({ href, size }: { href: string; size: 'md' | 'lg' }) {
  const base = 'rounded-[32px] bg-white duration-300'
  const sizing =
    size === 'lg'
      ? 'h-[56px] w-[216px] px-6 py-3 hover:bg-green-90'
      : 'px-6 py-3'

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button className={`${base} ${sizing}`}>
        <div className="flex flex-row justify-center gap-x-2 text-base">
          <span
            className={`${
              size === 'lg' ? 'text-base font-medium' : 'font-normal'
            } text-primary-green`}
          >
            View Whitepaper
          </span>
          <Image src={iconArrow} alt="alt" width={24} height={24} />
        </div>
      </button>
    </a>
  )
}

function VMCard({
  variant,
  icon,
  title,
  content,
}: {
  variant: 'mobile' | 'desktop'
  icon: StaticImageData
  title: string
  content: { item: string }[]
}) {
  const hasList = content.length > 1
  const commonList = `${hasList ? 'ml-5 list-disc' : 'list-none'} text-base font-normal`

  const CardShell = ({ children }: { children: React.ReactNode }) => (
    <Reveal variant="up" duration={600}>
      {children}
    </Reveal>
  )

  if (variant === 'mobile') {
    return (
      <CardShell>
        <div className="rounded-2xl bg-white px-5 py-6">
          <div className="w-fit rounded-full bg-khaki-99 p-2">
            <Image src={icon} alt="alt" width={32} height={32} />
          </div>
          <div>
            <h3 className="mb-3 text-base font-medium">{title}</h3>
            <ol className={commonList}>
              {content.map((c, i) => (
                <li className="text-sm" key={i}>
                  {c.item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardShell>
    )
  }

  // desktop
  return (
    <CardShell>
      <div className="flex flex-col rounded-[32px] bg-white p-8">
        <div className="mb-6 h-14 w-14 rounded-xl bg-khaki-90 p-3">
          <Image src={icon} alt="alt" width={32} height={32} />
        </div>
        <div className="mb-3 text-2xl font-medium">{title}</div>
        <ol className={commonList}>
          {content.map((c, i) => (
            <li key={i}>{c.item}</li>
          ))}
        </ol>
      </div>
    </CardShell>
  )
}
