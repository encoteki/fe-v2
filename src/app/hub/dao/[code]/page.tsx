'use client'

import { ProposalType } from '@/features/dao/enums/daoTypesEnum'
import Badge from '@/features/dao/ui/Badge'
import Breadcrumbs from '@/shared/ui/navs/Breadcrumbs'
import DefaultButton from '@/shared/ui/buttons/DefaultButton'
import { use, useMemo, useState } from 'react'
import URL_ROUTES from '@/shared/constants/urlRoute'

interface DaoDetailPageProps {
  params: Promise<{ code: string }>
}

const mockProposal = {
  code: 'D001',
  type: ProposalType.DONATION,
  name: 'Mock Proposal',
  options: [
    {
      label: 'Mock Opt',
    },
    {
      label: 'Mock Opt',
    },
    {
      label: 'Mock Opt',
    },
    {
      label: 'Mock Opt',
    },
    {
      label: 'Mock Opt',
    },
  ],
}

export default function DaoDetailPage({ params }: DaoDetailPageProps) {
  const { code } = use<{ code: string }>(params)

  const links = useMemo(
    () => [
      { index: 1, page: 'Home', link: URL_ROUTES.HOME },
      { index: 2, page: 'DAO', link: URL_ROUTES.DAO },
      { index: 3, page: mockProposal.name, link: `${URL_ROUTES.DAO}/${code}` },
    ],
    [code],
  )

  const [opt, setOpt] = useState<number | undefined>(undefined)

  const handleClick = (index: number) => {
    setOpt(index)
  }

  return (
    <main className="dao-container">
      <div className="dao-section">
        <header className="space-y-2 tablet:space-y-4 desktop:space-y-8">
          <Breadcrumbs items={links} />
          <div className="flex flex-col gap-3">
            <Badge type={mockProposal.type} />
            <p className="text-48">{code}</p>
            <div className="flex justify-between text-neutral-30">
              <p className="">Voting ends in 10:23:59</p>
              <p className="">Created 2 days ago</p>
            </div>
          </div>
        </header>

        <div className="flex gap-12">
          <section className="flex-2/5 rounded-[32px] bg-white p-8">
            <div className="mb-8 space-y-6">
              <h1 className="font-medium">Options:</h1>
              <div className="space-y-3">
                {mockProposal.options.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleClick(index)}
                      className={`w-full rounded-full border py-3 text-center transition-colors duration-300 hover:border-primary-green ${opt === index ? 'border-primary-green bg-green-90' : 'border-neutral-60 bg-white'}`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
              <p className="text-neutral-10">You have 2 vote left</p>
            </div>
            <div className="flex flex-col gap-4">
              <DefaultButton variant="primary">Vote</DefaultButton>
              <DefaultButton variant="secondary">Remain neutral</DefaultButton>
            </div>
          </section>

          <article className="flex-3/5">
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h3>
          </article>
        </div>
      </div>
    </main>
  )
}
