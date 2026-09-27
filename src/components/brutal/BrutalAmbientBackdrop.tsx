/** Fixed decorative layer — sits behind page content, no pointer events. */
export function BrutalAmbientBackdrop() {
  return (
    <div aria-hidden className="brutal-ambient-backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="brutal-ambient-orb brutal-ambient-orb--a" />
      <div className="brutal-ambient-orb brutal-ambient-orb--b" />
      <div className="brutal-ambient-orb brutal-ambient-orb--c" />
      <div className="brutal-ambient-sheen" />
      <div className="brutal-ambient-grain" />
      <div className="brutal-ambient-vignette" />
    </div>
  )
}
