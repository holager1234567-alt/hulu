import { BrutalFooter } from '@/components/brutal/BrutalFooter'
import { BrutalHero } from '@/components/brutal/BrutalHero'
import { BrutalPillars } from '@/components/brutal/BrutalPillars'
import {
  BrutalContact,
  BrutalProcess,
  BrutalSalesPitch,
  BrutalServices,
  BrutalAbout,
  BrutalWorks,
} from '@/components/brutal/BrutalSections'
import { LeadPopupProvider } from '@/components/forms/LeadPopup'
import { BrutalAmbientBackdrop } from '@/components/brutal/BrutalAmbientBackdrop'
import { BrutalSplash } from '@/components/brutal/BrutalSplash'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { useSmoothAnchorScroll } from '@/hooks/useSmoothAnchorScroll'

export default function HomePage() {
  useSmoothAnchorScroll(true)

  return (
    <LeadPopupProvider>
      <div
        dir="rtl"
        className="theme-brutal relative isolate min-h-screen overflow-x-clip bg-burgundy-deep text-center font-sans text-cream selection:bg-oxblood selection:text-cream"
      >
      <BrutalAmbientBackdrop />
      <div className="relative z-10">
        <BrutalSplash />
        <BrutalHero />
        <BrutalSalesPitch />
        <BrutalPillars />
        <BrutalServices />

        <main className="mx-auto max-w-6xl px-6">
          <BrutalProcess />
          <BrutalWorks />
          <BrutalAbout />
          <BrutalContact />
        </main>

        <BrutalFooter />
      </div>
      <WhatsAppFloat />
      </div>
    </LeadPopupProvider>
  )
}
