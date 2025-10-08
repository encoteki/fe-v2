import HandCoins from '../assets/icons/HandCoins'
import Paper from '../assets/icons/Paper'
import Scroll from '../assets/icons/Scroll'
import { ProposalType } from '../enums/daoTypesEnum'

const proposalTypes = [
  {
    type: ProposalType.PROPOSAL,
    bgColor: '#FEF3CD',
    textColor: '#644E02',
    label: 'Proposal',
    icon: <Scroll colors="#644E02" size={18} />,
  },
  {
    type: ProposalType.DONATION,
    bgColor: '#CEEEFD',
    textColor: '#044462',
    label: 'Proof of Donation',
    icon: <HandCoins colors="#044462" size={18} />,
  },
  {
    type: ProposalType.BUSINESS,
    bgColor: '#F0FAF3',
    textColor: '#163C20',
    label: 'Business Proposal',
    icon: <Paper colors={'#163C20'} size={18} />,
  },
]

export default function Badge({ type }: { type: ProposalType }) {
  const current = proposalTypes.find((t) => t.type === type)

  if (!current) return null

  return (
    <div
      className="flex w-fit items-center gap-2 rounded-2xl px-3 py-1 text-sm"
      style={{
        backgroundColor: current.bgColor,
        color: current.textColor,
      }}
    >
      {current.icon}
      {current.label}
    </div>
  )
}
