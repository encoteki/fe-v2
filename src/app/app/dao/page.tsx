import { DAOList } from '@/features/dao/components/DaoList'
import { DaoType } from '@/features/dao/enums/daoTypesEnum'
import { AnimatedTabs } from '@/features/dao/ui/AnimatedTabs'
import Breadcrumbs from '@/shared/ui/navs/Breadcrumbs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Encoteki DAO',
  description:
    'Encoteki DAO empowers community-driven governance, enabling members to propose, vote, and shape the future of the ecosystem.',
}

const links = [
  { index: 1, page: 'Home', link: '/' },
  { index: 2, page: 'DAO', link: '/app/dao' },
]

const tabs = [
  {
    type: DaoType.GOVERNANCE,
    label: 'Governance',
    primary: '#D6E8F5',
    secondary: '#143852',
  },
  {
    type: DaoType.BUSINESS_PROPOSAL,
    label: 'Business Proposal',
    primary: '#DEF2D9',
    secondary: '#244C1A',
  },
]

export default function DaoPage() {
  return (
    <main className="dao-container">
      <div className="dao-section">
        <header className="space-y-2 tablet:space-y-4">
          <Breadcrumbs items={links} />
          <p className="text-48">Encoteki DAO</p>
          <h3 className="">
            Encoteki governs the Encoteki DAO. Owning an NFT allows you to vote
            on our proposals, with the results determining the direction of
            Encoteki’s future initiatives.
          </h3>
        </header>

        <section className="space-y-6">
          <AnimatedTabs items={tabs} />
          <DAOList />
        </section>
      </div>
    </main>
  )
}
