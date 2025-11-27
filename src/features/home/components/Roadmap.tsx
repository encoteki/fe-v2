import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui/Carousel'
import HomeHeading from '../ui/HomeHeading'
import { Reveal } from '../../../shared/ui/Reveal'

// helper for staggered ms delay
const stepDelay = (index: number, base = 0, step = 100) => base + index * step

const roadmap = [
  {
    phase: 1,
    title: 'Phase one',
    description: [
      'Storyline Chapter I (First Collection Launch)',
      'First Donation',
      'Website Deployment',
      'Strategic Organizational Partnership',
      'Merchandises Launch',
      'Limited Unique Desk-Size Collectibles',
    ],
    colors: {
      primary: '#D6E8F5',
      secondary: '#045e88',
    },
  },
  {
    phase: 2,
    title: 'Phase two',
    description: [
      'Storyline Chapter II (Second Collection Launch)',
      'Second Donation',
      'Website Enhancement',
      'Community Events',
      'NFT Utility Exploration',
      'Collaboration with Local Artists & Brands',
      'More Strategic Organizational Partnership',
      'Subsidiaries Preparation',
    ],
    colors: {
      primary: '#DEF2D9',
      secondary: '#244C1A',
    },
  },
  {
    phase: 3,
    title: 'Phase three',
    description: [
      'Storyline Chapter III (Third Collection Launch)',
      'Third Donation',
      'Impacting Community Project',
      'Partnership with Key Individuals',
      'NFT New Utility Launch',
      'Subsidiaries Launch',
    ],
    colors: {
      primary: '#F5EAD6',
      secondary: '#523C14',
    },
  },
  {
    phase: 4,
    title: 'Phase four',
    description: [
      'Metaverse Presence',
      'Educational Platform Environment (esp. Indonesia’s Environment)',
      'Decentralized Autonomous Organization (DAO)',
    ],
    colors: {
      primary: '#D2F1F9',
      secondary: '#0C4A5A',
    },
  },
]

export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="home-container mx-auto max-w-[3000px] px-0"
    >
      <HomeHeading
        title={'Roadmap'}
        desc={'This roadmap is the blueprint of our sustainable growth ahead'}
      />

      <Carousel opts={{ align: 'start' }} className="w-full">
        <CarouselContent className="mx-8">
          {roadmap.map((item, index) => (
            <CarouselItem key={index} className="mr-4 max-w-[800px] basis-1/1">
              <Reveal
                variant="up"
                duration={600}
                delay={stepDelay(index, 0, 120)}
                threshold={0.2}
              >
                <div
                  className="tablet:h-[400px] h-[500px] w-full overflow-hidden rounded-4xl"
                  style={{ backgroundColor: item.colors.primary }}
                >
                  <div className="relative flex h-full">
                    {/* Left block */}
                    <Reveal
                      variant="up"
                      duration={500}
                      delay={0}
                      threshold={0.35}
                    >
                      <div
                        className="tablet:flex-row tablet:justify-between tablet:p-8 flex h-full w-full flex-col items-center justify-center gap-4 rounded-r-4xl p-6"
                        style={{ backgroundColor: item.colors.secondary }}
                      >
                        <Reveal
                          variant="up"
                          duration={400}
                          delay={120}
                          threshold={0.35}
                        >
                          <h1 className="text-white">Phase</h1>
                        </Reveal>
                        <Reveal
                          variant="up"
                          duration={400}
                          delay={220}
                          threshold={0.35}
                        >
                          <h1 className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white font-medium">
                            {index + 1}
                          </h1>
                        </Reveal>
                      </div>
                    </Reveal>
                    {/* Right block */}
                    <div className="tablet:p-8 flex h-full w-3/5 flex-col justify-center-safe p-4">
                      <ul className="tablet:text-lg list-disc space-y-2 pl-5 text-sm font-medium text-gray-700">
                        {item.description.map((point, i) => (
                          <Reveal
                            key={i}
                            variant="up"
                            duration={500}
                            delay={stepDelay(i, 200, 80)} // stagger each list item
                            threshold={0.2}
                          >
                            <li>{point}</li>
                          </Reveal>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
