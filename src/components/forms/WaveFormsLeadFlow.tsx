import { LeadQualificationForm } from '@/components/forms/LeadQualificationForm'
import { WaveFormsEmbed } from '@/components/forms/WaveFormsEmbed'
import { getWaveFormsEmbedUrl } from '@/lib/waveForms'

export function WaveFormsLeadFlow() {
  const embedUrl = getWaveFormsEmbedUrl()

  if (embedUrl) {
    return <WaveFormsEmbed url={embedUrl} />
  }

  return <LeadQualificationForm />
}
