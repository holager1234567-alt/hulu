import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { SectionDivider } from '@/components/layout/SectionDivider'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { SplashScreen } from '@/components/layout/SplashScreen'
import { Hero } from '@/components/sections/Hero'
import { PainPoints } from '@/components/sections/PainPoints'
import { About } from '@/components/sections/About'
import { Portfolio } from '@/components/sections/Portfolio'
import { Process } from '@/components/sections/Process'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'
import { EASE } from '@/lib/motion'

const Benefits = lazy(() =>
  import('@/components/sections/Benefits').then((m) => ({ default: m.Benefits })),
)

type HomeContentProps = {
  isFirstReveal: boolean
}

function HomeContent({ isFirstReveal }: HomeContentProps) {
  return (
    <div className="min-h-svh">
      <ScrollProgress />
      <Header />
      <main className="site-main">
        <Hero
          key={isFirstReveal ? 'first-reveal' : 'initial'}
          isFirstReveal={isFirstReveal}
        />
        <SectionDivider variant="wave" tone="to-surface" />
        <PainPoints />
        <SectionDivider variant="gradient-line" />
        <Suspense fallback={<div className="benefits-section min-h-svh" aria-hidden />}>
          <Benefits />
        </Suspense>
        <SectionDivider variant="diagonal" tone="to-burgundy" />
        <SectionWrapper reveal parallax>
          <About />
        </SectionWrapper>
        <SectionDivider variant="fade" tone="from-burgundy" />
        <SectionWrapper reveal>
          <Portfolio />
        </SectionWrapper>
        <SectionDivider variant="diagonal" flip tone="to-process" />
        <SectionWrapper reveal parallax>
          <Process />
        </SectionWrapper>
        <SectionDivider variant="gradient-line" tone="to-surface" />
        <SectionWrapper reveal>
          <Faq />
        </SectionWrapper>
        <SectionDivider variant="wave" tone="to-burgundy" />
        <SectionWrapper reveal>
          <Contact />
        </SectionWrapper>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default function HomePage() {
  const reducedMotion = useReducedMotion()
  const [showSplash, setShowSplash] = useState(!reducedMotion)
  const [isFirstReveal, setIsFirstReveal] = useState(false)

  const handleSplashComplete = () => {
    setShowSplash(false)
    setIsFirstReveal(true)
  }

  useEffect(() => {
    if (showSplash) return

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })
  }, [showSplash])

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : null}
      </AnimatePresence>

      <motion.div
        className="min-h-svh"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.45, ease: EASE, delay: showSplash ? 0 : 0.02 }}
        style={{ pointerEvents: showSplash ? 'none' : 'auto' }}
        aria-hidden={showSplash}
      >
        <HomeContent isFirstReveal={isFirstReveal} />
      </motion.div>
    </>
  )
}
