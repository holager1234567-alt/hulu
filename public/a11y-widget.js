;(function initHuluAccessibilityWidget() {
  'use strict'

  if (window.__HULU_A11Y_LOADED__) return
  window.__HULU_A11Y_LOADED__ = true

  const STORAGE_KEY = 'hulu-a11y-settings'

  const DEFAULTS = {
    lightBg: false,
    fontSize: 0,
    highContrast: false,
    highlightLinks: false,
    stopAnimations: false,
    minimized: false,
    fabBottom: null,
    fabInlineEnd: null,
  }

  const ICON_ACCESSIBILITY =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="m15 9-1 2h-4l-1-2"/><path d="M12 11v8"/><path d="m8 22 2-5h4l2 5"/><path d="M6.5 9 8 11"/><path d="M17.5 9 16 11"/></svg>'

  const ICON_CLOSE =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'

  /** @type {typeof DEFAULTS} */
  let settings = loadSettings()

  const root = document.createElement('div')
  root.id = 'hulu-a11y-widget'
  root.setAttribute('data-a11y-interactive', '')
  root.innerHTML = `
    <button type="button" class="hulu-a11y-fab" data-a11y-interactive aria-label="פתיחת תפריט נגישות" aria-expanded="false" aria-controls="hulu-a11y-panel">
      ${ICON_ACCESSIBILITY}
    </button>
    <div class="hulu-a11y-backdrop" data-a11y-interactive hidden aria-hidden="true"></div>
    <div id="hulu-a11y-panel" class="hulu-a11y-panel" role="dialog" aria-modal="true" aria-labelledby="hulu-a11y-panel-title" hidden>
      <div class="hulu-a11y-panel-header">
        <h2 id="hulu-a11y-panel-title" class="hulu-a11y-panel-title">הגדרות נגישות</h2>
        <button type="button" class="hulu-a11y-close" data-a11y-interactive aria-label="סגירת תפריט נגישות">
          ${ICON_CLOSE}
        </button>
      </div>
      <div class="hulu-a11y-panel-body">
        <p class="hulu-a11y-hint">בטלפון: לחיצה ארוכה על כפתור הנגישות ממזערת/מחזירה אותו. ניתן לגרור את הכפתור למיקום נוח.</p>
        <div class="hulu-a11y-option">
          <span class="hulu-a11y-option-label">הארת רקע עדינה</span>
          <button type="button" class="hulu-a11y-toggle" data-setting="lightBg" aria-pressed="false" aria-label="הארת רקע עדינה"></button>
        </div>
        <div class="hulu-a11y-option">
          <span class="hulu-a11y-option-label">גודל טקסט</span>
          <div class="hulu-a11y-btn-row">
            <button type="button" class="hulu-a11y-action" data-font="0">רגיל</button>
            <button type="button" class="hulu-a11y-action" data-font="1">גדול</button>
            <button type="button" class="hulu-a11y-action" data-font="2">גדול מאוד</button>
          </div>
        </div>
        <div class="hulu-a11y-option">
          <span class="hulu-a11y-option-label">ניגודיות גבוהה</span>
          <button type="button" class="hulu-a11y-toggle" data-setting="highContrast" aria-pressed="false" aria-label="ניגודיות גבוהה"></button>
        </div>
        <div class="hulu-a11y-option">
          <span class="hulu-a11y-option-label">הדגשת קישורים</span>
          <button type="button" class="hulu-a11y-toggle" data-setting="highlightLinks" aria-pressed="false" aria-label="הדגשת קישורים"></button>
        </div>
        <div class="hulu-a11y-option">
          <span class="hulu-a11y-option-label">עצירת אנימציות</span>
          <button type="button" class="hulu-a11y-toggle" data-setting="stopAnimations" aria-pressed="false" aria-label="עצירת אנימציות"></button>
        </div>
        <button type="button" class="hulu-a11y-reset" data-a11y-interactive>איפוס הגדרות</button>
      </div>
    </div>
  `

  document.body.appendChild(root)

  const fab = /** @type {HTMLButtonElement} */ (root.querySelector('.hulu-a11y-fab'))
  const backdrop = /** @type {HTMLDivElement} */ (root.querySelector('.hulu-a11y-backdrop'))
  const panel = /** @type {HTMLDivElement} */ (root.querySelector('.hulu-a11y-panel'))
  const closeBtn = /** @type {HTMLButtonElement} */ (root.querySelector('.hulu-a11y-close'))
  const resetBtn = /** @type {HTMLButtonElement} */ (root.querySelector('.hulu-a11y-reset'))
  const toggleButtons = /** @type {NodeListOf<HTMLButtonElement>} */ (
    root.querySelectorAll('.hulu-a11y-toggle')
  )
  const fontButtons = /** @type {NodeListOf<HTMLButtonElement>} */ (
    root.querySelectorAll('[data-font]')
  )

  let panelOpen = false
  let longPressTimer = /** @type {ReturnType<typeof setTimeout> | null} */ (null)
  let suppressClick = false

  const drag = {
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    startBottom: 0,
    startInlineEnd: 0,
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return { ...DEFAULTS }
      return { ...DEFAULTS, ...JSON.parse(raw) }
    } catch {
      return { ...DEFAULTS }
    }
  }

  function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }

  function applySettings() {
    const body = document.body

    body.classList.toggle('a11y-light-bg', settings.lightBg)
    body.classList.toggle('a11y-high-contrast', settings.highContrast)
    body.classList.toggle('a11y-highlight-links', settings.highlightLinks)
    body.classList.toggle('a11y-stop-animations', settings.stopAnimations)
    body.classList.toggle('a11y-font-lg', settings.fontSize === 1)
    body.classList.toggle('a11y-font-xl', settings.fontSize === 2)

    fab.classList.toggle('is-minimized', settings.minimized)

    if (settings.fabBottom != null && settings.fabInlineEnd != null) {
      fab.style.bottom = `${settings.fabBottom}px`
      fab.style.insetInlineEnd = `${settings.fabInlineEnd}px`
    } else {
      fab.style.bottom = ''
      fab.style.insetInlineEnd = ''
    }

    toggleButtons.forEach((btn) => {
      const key = /** @type {keyof typeof DEFAULTS} */ (btn.dataset.setting)
      btn.setAttribute('aria-pressed', String(Boolean(settings[key])))
    })

    fontButtons.forEach((btn) => {
      const level = Number(btn.dataset.font)
      btn.classList.toggle('is-active', settings.fontSize === level)
    })
  }

  function openPanel() {
    panelOpen = true
    panel.hidden = false
    backdrop.hidden = false
    panel.classList.add('is-open')
    backdrop.classList.add('is-open')
    backdrop.setAttribute('aria-hidden', 'false')
    fab.setAttribute('aria-expanded', 'true')
    closeBtn.focus()
    document.documentElement.style.overflow = 'hidden'
  }

  function closePanel() {
    panelOpen = false
    panel.classList.remove('is-open')
    backdrop.classList.remove('is-open')
    backdrop.setAttribute('aria-hidden', 'true')
    fab.setAttribute('aria-expanded', 'false')
    document.documentElement.style.overflow = ''

    window.setTimeout(() => {
      if (!panelOpen) {
        panel.hidden = true
        backdrop.hidden = true
      }
    }, 280)
  }

  function togglePanel() {
    if (panelOpen) closePanel()
    else openPanel()
  }

  function toggleSetting(key) {
    settings[key] = !settings[key]
    saveSettings()
    applySettings()
  }

  function setFontSize(level) {
    settings.fontSize = level
    saveSettings()
    applySettings()
  }

  function resetAll() {
    settings = { ...DEFAULTS }
    saveSettings()
    applySettings()
  }

  function toggleMinimized() {
    settings.minimized = !settings.minimized
    saveSettings()
    applySettings()
  }

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches
  }

  function getFabMetrics() {
    const rect = fab.getBoundingClientRect()
    return {
      bottom: window.innerHeight - rect.bottom,
      inlineEnd:
        document.documentElement.dir === 'rtl'
          ? rect.left
          : window.innerWidth - rect.right,
    }
  }

  function clampFabPosition(bottom, inlineEnd) {
    const margin = 8
    const maxBottom = window.innerHeight - fab.offsetHeight - margin
    const maxInlineEnd = window.innerWidth - fab.offsetWidth - margin

    return {
      bottom: Math.min(Math.max(bottom, margin), maxBottom),
      inlineEnd: Math.min(Math.max(inlineEnd, margin), maxInlineEnd),
    }
  }

  function onFabPointerDown(event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    const metrics = getFabMetrics()
    drag.active = true
    drag.moved = false
    drag.startX = event.clientX
    drag.startY = event.clientY
    drag.startBottom = settings.fabBottom ?? metrics.bottom
    drag.startInlineEnd = settings.fabInlineEnd ?? metrics.inlineEnd

    fab.classList.add('is-dragging')
    fab.setPointerCapture(event.pointerId)

    if (isMobile()) {
      longPressTimer = window.setTimeout(() => {
        suppressClick = true
        toggleMinimized()
        if (navigator.vibrate) navigator.vibrate(30)
      }, 600)
    }
  }

  function onFabPointerMove(event) {
    if (!drag.active) return

    const deltaX = event.clientX - drag.startX
    const deltaY = event.clientY - drag.startY

    if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
      drag.moved = true
      if (longPressTimer) {
        clearTimeout(longPressTimer)
        longPressTimer = null
      }
    }

    if (!drag.moved) return

    const rtl = document.documentElement.dir === 'rtl'
    const inlineDelta = rtl ? -deltaX : deltaX
    const next = clampFabPosition(
      drag.startBottom - deltaY,
      drag.startInlineEnd - inlineDelta,
    )

    fab.style.bottom = `${next.bottom}px`
    fab.style.insetInlineEnd = `${next.inlineEnd}px`
  }

  function onFabPointerUp(event) {
    if (!drag.active) return

    fab.classList.remove('is-dragging')
    fab.releasePointerCapture(event.pointerId)
    drag.active = false

    if (longPressTimer) {
      clearTimeout(longPressTimer)
      longPressTimer = null
    }

    if (drag.moved) {
      suppressClick = true
      const metrics = getFabMetrics()
      settings.fabBottom = metrics.bottom
      settings.fabInlineEnd = metrics.inlineEnd
      saveSettings()
    }

    drag.moved = false
  }

  fab.addEventListener('click', (event) => {
    if (suppressClick) {
      suppressClick = false
      event.preventDefault()
      return
    }
    togglePanel()
  })

  fab.addEventListener('pointerdown', onFabPointerDown)
  fab.addEventListener('pointermove', onFabPointerMove)
  fab.addEventListener('pointerup', onFabPointerUp)
  fab.addEventListener('pointercancel', onFabPointerUp)

  closeBtn.addEventListener('click', closePanel)
  backdrop.addEventListener('click', closePanel)
  resetBtn.addEventListener('click', resetAll)

  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = /** @type {keyof typeof DEFAULTS} */ (btn.dataset.setting)
      toggleSetting(key)
    })
  })

  fontButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setFontSize(Number(btn.dataset.font))
    })
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && panelOpen) closePanel()
  })

  window.addEventListener('resize', () => {
    if (settings.fabBottom != null && settings.fabInlineEnd != null) {
      const next = clampFabPosition(settings.fabBottom, settings.fabInlineEnd)
      settings.fabBottom = next.bottom
      settings.fabInlineEnd = next.inlineEnd
      saveSettings()
      applySettings()
    }
  })

  applySettings()

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySettings)
  }
})()
