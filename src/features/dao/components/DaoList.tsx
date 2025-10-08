/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { ProposalType, DaoType } from '../enums/daoTypesEnum'
import Badge from '../ui/Badge'
import { useDaoCtx } from '../context/DaoContext'
import EmptyDao from './EmptyDao'
import { Skeleton } from '@/shared/ui/Skeleton'

const mockProposal = [
  {
    code: 'D001',
    type: ProposalType.DONATION,
  },
  {
    code: 'P001',
    type: ProposalType.PROPOSAL,
  },
  {
    code: 'BP001',
    type: ProposalType.BUSINESS,
  },
  {
    code: 'P002',
    type: ProposalType.PROPOSAL,
  },
  {
    code: 'D002',
    type: ProposalType.DONATION,
  },
  {
    code: 'BP002',
    type: ProposalType.BUSINESS,
  },
]

export function DAOList() {
  const [proposal, setProposal] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { daoType } = useDaoCtx()

  useEffect(() => {
    setLoading(true)
    if (daoType === DaoType.GOVERNANCE) {
      setProposal(mockProposal)
    } else {
      setProposal([])
    }
    setLoading(false)
  }, [daoType])

  return (
    <>
      <section className="h-[calc(145px*3+32px*3)] overflow-hidden">
        {loading && (
          <>
            {' '}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="proposal-card mb-8 cursor-default bg-white p-4"
              >
                <Skeleton className="mb-3 h-6 w-24 rounded-full" />
                <Skeleton className="mb-2 h-5 w-3/5" />
                <div className="mt-3 flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </>
        )}

        {proposal.length == 0 ? (
          <>
            <EmptyDao />
          </>
        ) : (
          <>
            {proposal.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="proposal-card mb-8 transition-shadow duration-500 hover:shadow-lg"
                  onClick={() =>
                    (window.location.href = `/app/dao/${item.code}`)
                  }
                >
                  <Badge type={item.type} />
                  <h1 className="font-medium">Which animal to donate to?</h1>
                  <div className="flex justify-between">
                    <p className="text-neutral-30">Voting ends in 19:00:00</p>
                    <p className="text-neutral-30">3 days ago</p>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </section>

      <div className="flex w-full justify-center">pagination</div>
    </>
  )
}
