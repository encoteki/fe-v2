import About from '@/features/home/components/About'
import Benefits from '@/features/home/components/Benefits'
import Collections from '@/features/home/components/Collections'
import FAQ from '@/features/home/components/FAQ'
import Hero from '@/features/home/components/Hero'
import Roadmap from '@/features/home/components/Roadmap'

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <Benefits />
      <About />
      <Roadmap />
      <FAQ />
    </>
  )
}
