'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Freebies from '@/features//home/assets/benefits/freebies.svg'
import Secure from '@/features//home/assets/benefits/secure.svg'
import ProfitSharingMini from '@/features//home/assets/benefits/profit-sharing-mini.svg'
import ProfitSharing from '@/features//home/assets/benefits/profit-sharing.svg'
import EventPass from '@/features//home/assets/benefits/event-pass.svg'
import DAO from '@/features//home/assets/benefits/dao.svg'

import HomeHeading from '../ui/HomeHeading'
import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import { Marquee } from '../../../shared/ui/Marquee'
import Suave from '@/features/home/assets/partners/3. Suave.webp'
import Citrust from '@/features/home/assets/partners/1._Citrust_Indonesia_trp.webp'
import StudioSendiri from '@/features/home/assets/partners/10. StudioSendiri.webp'
import PBA from '@/features/home/assets/partners/7. PBA.webp'
import Thru from '@/features/home/assets/partners/2. Thru_trp.webp'

// use YOUR Reveal (IO-based)
import { Reveal } from '@/shared/ui/Reveal'

type Benefit = { title: string; subtitle: string }

const benefits: Benefit[] = [
  { title: 'Secure', subtitle: 'Blockchain-validated proof of payment' },
  {
    title: 'Profit-sharing',
    subtitle:
      'Receive shares of Encoteki’s subsidiaries and a percentage of their profits',
  },
  {
    title: 'Freebies',
    subtitle: 'Free national park and zoo entrance with selected partners',
  },
  { title: 'Event pass', subtitle: 'Community or special event pass' },
  {
    title: 'DAO',
    subtitle: 'Access to DAO voting mechanism for all Encoteki’s projects',
  },
  {
    title: 'Partner discount',
    subtitle:
      'Discounts and special prices to Encoteki partners & subsidiaries',
  },
]

const partners = [Suave, Citrust, StudioSendiri, PBA, Thru]

/* ---------- tiny presentational helpers (no style changes) ---------- */
function BenefitText({
  title,
  subtitle,
  titleClass,
  subtitleClass,
}: {
  title: string
  subtitle: string
  titleClass: string
  subtitleClass: string
}) {
  return (
    <>
      <h1 className={titleClass}>{title}</h1>
      <p className={subtitleClass}>{subtitle}</p>
    </>
  )
}

function DealsLinkInline() {
  return (
    <Link href="/partner-deals">
      <span className="text-sm font-normal text-primary-green tablet:text-base">
        View Offer
      </span>
    </Link>
  )
}

function DealsLinkButton() {
  return (
    <Link href="/partner-deals">
      <DefaultButton>View deals</DefaultButton>
    </Link>
  )
}

function PartnersMarquee() {
  return (
    <>
      <Marquee pauseOnHover className="px-2 [--duration:15s]">
        {partners.map((item, index) => (
          <div
            key={index}
            className="size-30 mx-2 flex items-center justify-center"
          >
            <Image
              src={item}
              alt=""
              loading="lazy"
              className="object-contain"
            />
          </div>
        ))}
      </Marquee>
      <div className="bg-linear-to-r pointer-events-none absolute inset-y-0 left-0 w-1/4 from-[#F9F9F6]"></div>
      <div className="bg-linear-to-l pointer-events-none absolute inset-y-0 right-0 w-1/4 from-[#F9F9F6]"></div>
    </>
  )
}

/* ------------------------------------------------------------------- */

export default function Benefit() {
  return (
    <div id="benefit" className="home-container">
      <Reveal variant="fade" duration={500} threshold={0.2}>
        <HomeHeading
          title={'Benefits'}
          desc={
            'Here are some benefits you will receive as an owner of The Satwas Band NFT'
          }
        />
      </Reveal>

      {/* Mobile View */}
      <div className="block tablet:hidden">
        <div className="flex flex-col gap-4">
          {/* 0 - Secure */}
          <Reveal variant="up" duration={600}>
            <div className="bento-card relative h-36">
              <Image
                src={Secure}
                alt={benefits[0].title}
                width={128}
                loading="lazy"
                className="absolute right-0 top-0 m-4"
              />
              <div className="absolute bottom-0 left-0 m-4">
                <BenefitText
                  title={benefits[0].title}
                  subtitle={benefits[0].subtitle}
                  titleClass="mb-1 text-xl font-medium"
                  subtitleClass="text-sm"
                />
              </div>
            </div>
          </Reveal>

          {/* 1 - Profit-sharing */}
          <Reveal variant="up" duration={600} delay={60}>
            <div className="bento-card relative h-36">
              <Image
                src={ProfitSharingMini}
                alt={benefits[1].title}
                width={128}
                loading="lazy"
                className="absolute right-0 top-0 m-4"
              />
              <div className="absolute bottom-0 left-0 m-4 w-1/2">
                <BenefitText
                  title={benefits[1].title}
                  subtitle={benefits[1].subtitle}
                  titleClass="mb-1 text-xl font-medium"
                  subtitleClass="text-sm"
                />
              </div>
            </div>
          </Reveal>

          {/* 2 - Freebies */}
          <Reveal variant="up" duration={600} delay={90}>
            <div className="bento-card relative h-36">
              <Image
                src={Freebies}
                alt={benefits[2].title}
                width={161}
                loading="lazy"
                className="absolute bottom-0 right-0 m-4"
              />
              <div className="absolute left-0 top-0 m-4 w-1/2">
                <BenefitText
                  title={benefits[2].title}
                  subtitle={benefits[2].subtitle}
                  titleClass="mb-1 text-xl font-medium"
                  subtitleClass="text-sm"
                />
              </div>
            </div>
          </Reveal>

          {/* 3 - Event pass */}
          <Reveal variant="fade" duration={500} delay={40}>
            <div className="bento-card">
              <h1 className="mb-1 text-xl font-medium">{benefits[3].title}</h1>
              <span className="text-sm">{benefits[3].subtitle}</span>
            </div>
          </Reveal>

          {/* 4 - DAO */}
          <Reveal variant="fade" duration={500} delay={80}>
            <div className="bento-card">
              <h1 className="mb-1 text-xl font-medium">{benefits[4].title}</h1>
              <span className="text-sm">{benefits[4].subtitle}</span>
            </div>
          </Reveal>

          {/* 5 - Partner discount */}
          <Reveal variant="up" duration={600} delay={120}>
            <div className="bento-card">
              <h1 className="mb-1 text-xl font-medium">{benefits[5].title}</h1>
              <p className="mb-1 text-sm">{benefits[5].subtitle}</p>
              <DealsLinkInline />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Tablet View */}
      <div className="hidden tablet:grid tablet:gap-4 desktop:hidden">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {/* 0 - Secure */}
          <Reveal variant="left" duration={600}>
            <div className="bento-card relative h-[356px]">
              <Image
                src={Secure}
                alt="alt"
                width={213}
                loading="lazy"
                className="absolute right-0 top-0 m-8"
              />
              <div className="absolute bottom-0 left-0 m-8">
                <BenefitText
                  title={benefits[0].title}
                  subtitle={benefits[0].subtitle}
                  titleClass="text-[32px] font-medium"
                  subtitleClass="text-base"
                />
              </div>
            </div>
          </Reveal>

          {/* 1 - Profit-sharing */}
          <Reveal variant="right" duration={600} delay={60}>
            <div className="bento-card relative h-[356px]">
              <Image
                src={ProfitSharing}
                alt="alt"
                width={140}
                loading="lazy"
                className="absolute right-0 top-0 m-8"
              />
              <div className="absolute bottom-0 left-0 m-8">
                <BenefitText
                  title={benefits[1].title}
                  subtitle={benefits[1].subtitle}
                  titleClass="text-[32px] font-medium"
                  subtitleClass="text-base"
                />
              </div>
            </div>
          </Reveal>

          {/* 2 - Freebies */}
          <Reveal variant="up" duration={600} delay={90}>
            <div className="bento-card relative h-[356px]">
              <Image
                src={Freebies}
                alt="alt"
                width={250}
                loading="lazy"
                className="absolute bottom-0 mb-8"
              />
              <div className="absolute left-0 top-0 m-8">
                <BenefitText
                  title={benefits[2].title}
                  subtitle={benefits[2].subtitle}
                  titleClass="text-[32px] font-medium"
                  subtitleClass="text-base"
                />
              </div>
            </div>
          </Reveal>

          {/* 3,4 stacked */}
          <Reveal variant="fade" duration={500}>
            <div className="grid-row-2 grid h-[356px] gap-4">
              <div className="bento-card">
                <BenefitText
                  title={benefits[3].title}
                  subtitle={benefits[3].subtitle}
                  titleClass="text-[32px] font-medium"
                  subtitleClass="text-base"
                />
              </div>
              <div className="bento-card">
                <BenefitText
                  title={benefits[4].title}
                  subtitle={benefits[4].subtitle}
                  titleClass="text-[32px] font-medium"
                  subtitleClass="text-base"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* 5 - Deals full width */}
        <Reveal variant="up" duration={600}>
          <div className="bento-card w-full">
            <BenefitText
              title={benefits[5].title}
              subtitle={benefits[5].subtitle}
              titleClass="text-[32px] font-medium"
              subtitleClass="text-base"
            />
            <DealsLinkInline />
          </div>
        </Reveal>
      </div>

      {/* Desktop View */}
      <div className="hidden desktop:block">
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            {/* 0 - Secure */}
            <Reveal variant="left" duration={600}>
              <div className="bento-card relative h-[302px]">
                <Image
                  src={Secure}
                  alt={benefits[0].title}
                  loading="lazy"
                  className="absolute right-0 top-0 m-8"
                />
                <div className="absolute bottom-0 left-0 m-8 w-[200px]">
                  <BenefitText
                    title={benefits[0].title}
                    subtitle={benefits[0].subtitle}
                    titleClass="mb-1 text-[32px] font-medium"
                    subtitleClass="text-base font-normal"
                  />
                </div>
              </div>
            </Reveal>

            {/* 1 - Profit-sharing */}
            <Reveal variant="right" duration={600} delay={60}>
              <div className="bento-card relative h-[302px]">
                <Image
                  src={ProfitSharing}
                  alt={benefits[1].title}
                  loading="lazy"
                  className="absolute right-0 top-0 m-8"
                />
                <div className="absolute bottom-0 left-0 m-8 w-[268px]">
                  <BenefitText
                    title={benefits[1].title}
                    subtitle={benefits[1].subtitle}
                    titleClass="mb-1 text-[32px] font-medium"
                    subtitleClass="text-base font-normal"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid h-[440px] grid-cols-3 gap-3">
            {/* 2 - Freebies */}
            <Reveal variant="up" duration={600}>
              {/* h-full fixes height collapse when inner children are absolute */}
              <div className="bento-card relative h-full">
                <div className="absolute left-0 top-0 m-8">
                  <BenefitText
                    title={benefits[2].title}
                    subtitle={benefits[2].subtitle}
                    titleClass="mb-1 text-[32px] font-medium"
                    subtitleClass="text-base font-normal"
                  />
                </div>
                <Image
                  src={Freebies}
                  alt={benefits[2].title}
                  loading="lazy"
                  className="absolute bottom-0 left-0 m-8"
                />
              </div>
            </Reveal>

            {/* 5 - Deals + partners marquee */}
            <Reveal variant="fade" duration={600} delay={40}>
              <div className="bento-card grid h-full">
                <div className="space-y-1">
                  <h1 className="text-[32px] font-medium">
                    {benefits[5].title}
                  </h1>
                  <p className="pb-4 text-base font-normal">
                    {benefits[5].subtitle}
                  </p>
                  <DealsLinkButton />
                </div>

                <div className="relative overflow-hidden bg-transparent">
                  <PartnersMarquee />
                </div>
              </div>
            </Reveal>

            {/* 3,4 stacked */}
            <div className="grid grid-rows-2 gap-3">
              {/* 3 - Event pass */}
              <Reveal variant="left" duration={600}>
                <div className="bento-card relative h-full">
                  <h1 className="mb-1 text-[32px] font-medium">
                    {benefits[3].title}
                  </h1>
                  <p className="text-base font-normal">
                    {benefits[3].subtitle}
                  </p>
                  <Image
                    src={EventPass}
                    alt={benefits[3].title}
                    loading="lazy"
                    className="absolute bottom-0 right-0 m-8"
                  />
                </div>
              </Reveal>

              {/* 4 - DAO */}
              <Reveal variant="right" duration={600} delay={60}>
                <div className="bento-card relative h-full">
                  <div className="w-2/3">
                    <h1 className="mb-1 text-[32px] font-medium">
                      {benefits[4].title}
                    </h1>
                    <p className="text-base font-normal">
                      {benefits[4].subtitle}
                    </p>
                  </div>
                  <Image
                    src={DAO}
                    alt={benefits[4].title}
                    loading="lazy"
                    className="absolute bottom-0 right-0 m-8"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
