import { lazy, Suspense, useEffect } from 'react'

import { LeadPopupProvider } from '@/components/forms/LeadPopup'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { SectionDivider } from '@/components/layout/SectionDivider'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { useGsapScrollMode } from '@/hooks/useGsapScrollMode'
import { useSmoothAnchorScroll } from '@/hooks/useSmoothAnchorScroll'
import { scheduleScrollTriggerRefresh, cancelScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'

const PainPoints = lazy(() =>
  import('@/components/sections/PainPoints').then((module) => ({ default: module.PainPoints })),
)
const About = lazy(() =>
  import('@/components/sections/About').then((module) => ({ default: module.About })),
)
const Process = lazy(() =>
  import('@/components/sections/Process').then((module) => ({ default: module.Process })),
)
const Portfolio = lazy(() =>
  import('@/components/sections/Portfolio').then((module) => ({ default: module.Portfolio })),
)
const Benefits = lazy(() =>
  import('@/components/sections/Benefits').then((module) => ({ default: module.Benefits })),
)
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((module) => ({ default: module.Contact })),
)

export default function HomePage() {
  useSmoothAnchorScroll(true)
  useGsapScrollMode(true)

  useEffect(() => {
    scheduleScrollTriggerRefresh(0)
    scheduleScrollTriggerRefresh(450)

    const onLoad = () => scheduleScrollTriggerRefresh(0)
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      cancelScrollTriggerRefresh()
    }
  }, [])

  return (
    <LeadPopupProvider>
      <div className="min-h-svh">
        <ScrollProgress />
        <Header />

        <main className="site-main">
          <div className="site-flow-intro">
            <Hero />
            <SectionDivider variant="blend" from="hero" to="compare" />
            <Suspense fallback={null}>
              <PainPoints />
            </Suspense>
          </div>
          <SectionDivider variant="blend" from="compare" to="surface" />
          <Suspense fallback={null}>
            <SectionWrapper reveal parallax className="flow-bridge-about">
              <About />
            </SectionWrapper>
          </Suspense>
          <SectionDivider variant="blend" from="surface" to="process-top" />
          <Suspense fallback={null}>
            <SectionWrapper reveal className="flow-bridge-process">
              <Process />
            </SectionWrapper>
          </Suspense>
          <SectionDivider variant="blend" from="process-bottom" to="portfolio" />
          <Suspense fallback={null}>
            <SectionWrapper reveal className="flow-bridge-portfolio">
              <Portfolio />
            </SectionWrapper>
          </Suspense>
          <SectionDivider variant="blend" from="portfolio" to="bridge" />
          <div className="readiness-finale-flow">
            <Suspense fallback={null}>
              <SectionWrapper reveal className="flow-bridge-readiness">
                <Benefits />
                <Contact />
              </SectionWrapper>
            </Suspense>
            <Footer variant="finale" />
          </div>
        </main>

        <WhatsAppFloat />
      </div>
    </LeadPopupProvider>
  )
}
