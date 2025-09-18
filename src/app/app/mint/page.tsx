import TransactionStatus from '@/features/mint/components/TransactionStatus'

export default function MintPage() {
  return (
    <main className="app-container flex min-h-screen flex-col bg-khaki-90 tablet:justify-center">
      <section className="mx-auto">
        <TransactionStatus />
      </section>
    </main>
  )
}
