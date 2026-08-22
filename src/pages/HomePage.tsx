import { useEffect } from 'react'

import { LeadPopupProvider } from '@/components/forms/LeadPopup'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { SectionDivider } from '@/components/layout/SectionDivider'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Hero } from '@/components/sections/Hero'
import { PainPoints } from '@/components/sections/PainPoints'
import { Benefits } from '@/components/sections/Benefits'
import { About } from '@/components/sections/About'
import { Portfolio } from '@/components/sections/Portfolio'
import { Process } from '@/components/sections/Process'
import { Contact } from '@/components/sections/Contact'
import { useGsapScrollMode } from '@/hooks/useGsapScrollMode'
import { useSmoothAnchorScroll } from '@/hooks/useSmoothAnchorScroll'
import { scheduleScrollTriggerRefresh, cancelScrollTriggerRefresh } from '@/lib/scrollTriggerRefresh'

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
            <PainPoints />
          </div>
          <SectionDivider variant="blend" from="compare" to="surface" />
          <SectionWrapper reveal parallax className="flow-bridge-about">
            <About />
          </SectionWrapper>
          <SectionDivider variant="blend" from="surface" to="process-top" />
          <SectionWrapper reveal className="flow-bridge-process">
            <Process />
          </SectionWrapper>
          <SectionDivider variant="blend" from="process-bottom" to="portfolio" />
          <SectionWrapper reveal className="flow-bridge-portfolio">
            <Portfolio />
          </SectionWrapper>
          <SectionDivider variant="blend" from="portfolio" to="bridge" />
          <div className="readiness-finale-flow">
            <SectionWrapper reveal className="flow-bridge-readiness">
              <Benefits />
              <Contact />
            </SectionWrapper>
            <Footer variant="finale" />
          </div>
        </main>

        <WhatsAppFloat />
      </div>
    </LeadPopupProvider>
  )
}
