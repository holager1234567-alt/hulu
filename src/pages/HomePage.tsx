import { lazy, Suspense, useEffect } from 'react'

import { LeadPopupProvider } from '@/components/forms/LeadPopup'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SectionDivider } from '@/components/layout/SectionDivider'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { Hero } from '@/components/sections/Hero'
// Sits directly below the fold, so lazy-loading it costs a round trip to save ~2kB.
import { PainPoints } from '@/components/sections/PainPoints'
import { useGsapScrollMode } from '@/hooks/useGsapScrollMode'
import { useSmoothAnchorScroll } from '@/hooks/useSmoothAnchorScroll'
import { configureGsapScroll } from '@/lib/gsapScrollConfig'
import { scheduleScrollTriggerRefresh, cancelScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'

const ScrollProgress = lazy(() =>
  import('@/components/ui/ScrollProgress').then((module) => ({
    default: module.ScrollProgress,
  })),
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
    configureGsapScroll()
    scheduleScrollTriggerRefresh(0)
    scheduleScrollTriggerRefresh(450)
    scheduleScrollTriggerRefresh(1200)

    const onLoad = () => scheduleScrollTriggerRefresh(150)
    window.addEventListener('load', onLoad)

    return () => {
      window.removeEventListener('load', onLoad)
      cancelScrollTriggerRefresh()
    }
  }, [])

  return (
    <LeadPopupProvider>
      <div className="min-h-svh">
        <Suspense fallback={null}>
          <ScrollProgress />
        </Suspense>
        <Header />

        <main className="site-main">
          <div className="site-flow-intro">
            <Hero />
            <SectionDivider variant="blend" from="hero" to="compare" />
            <PainPoints />
          </div>
          <SectionDivider variant="blend" from="compare" to="surface" />
          <Suspense fallback={null}>
            <SectionWrapper reveal className="flow-bridge-about section-deferred">
              <About />
            </SectionWrapper>
          </Suspense>
          <SectionDivider variant="blend" from="surface" to="process-top" />
          <Suspense fallback={null}>
            <SectionWrapper reveal className="flow-bridge-process section-deferred">
              <Process />
            </SectionWrapper>
          </Suspense>
          <SectionDivider variant="blend" from="process-bottom" to="portfolio" />
          <Suspense fallback={null}>
            <SectionWrapper reveal className="flow-bridge-portfolio section-deferred">
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
      </div>
    </LeadPopupProvider>
  )
}
