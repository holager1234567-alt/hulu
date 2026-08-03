let refreshTimer = 0

export function cancelScrollTriggerRefresh() {
  window.clearTimeout(refreshTimer)
  refreshTimer = 0
}

export function scheduleScrollTriggerRefresh(delayMs = 0) {
  cancelScrollTriggerRefresh()

  refreshTimer = window.setTimeout(() => {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      const refresh = () => ScrollTrigger.refresh()
      requestAnimationFrame(() => requestAnimationFrame(refresh))
    })
  }, delayMs)
}
