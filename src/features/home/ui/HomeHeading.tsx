'use client'

import React from 'react'
import TextLineReveal from '../../../shared/ui/TextLineReveal'

interface HomeHeadingProps {
  title: string
  desc: string
  align?: 'center' | 'left' | 'right'
  classname?: string
}

export default function HomeHeading({
  title,
  desc,
  align = 'center',
  classname,
}: HomeHeadingProps) {
  const alignText: Record<NonNullable<HomeHeadingProps['align']>, string> = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  }
  const alignWrap: Record<NonNullable<HomeHeadingProps['align']>, string> = {
    center: 'mx-auto',
    left: '',
    right: 'ml-auto',
  }

  return (
    <div
      className={`${alignText[align]} ${alignWrap[align]} tablet:mb-14 tablet:px-16 desktop:mb-14 mb-6 w-full px-8 ${classname ?? ''}`}
    >
      <TextLineReveal
        start="top 80%"
        retrigger={false}
        staggerAmount={0}
        delay={0}
      >
        <div className="line tablet:mb-3 tablet:text-[64px] mb-2 text-4xl font-medium">
          {title.split(' ').map((w, i) => (
            <span key={i} className="inline-block">
              {w}&nbsp;
            </span>
          ))}
        </div>
      </TextLineReveal>

      <TextLineReveal
        start="top 80%"
        retrigger={false}
        staggerAmount={0}
        delay={0.45}
      >
        <div
          className={`line tablet:text-2xl max-w-[660px] text-base leading-relaxed ${alignWrap[align]}`}
        >
          {desc.split(' ').map((word, i) => (
            <span key={i} className="inline-block">
              {word}&nbsp;
            </span>
          ))}
        </div>
      </TextLineReveal>
    </div>
  )
}
