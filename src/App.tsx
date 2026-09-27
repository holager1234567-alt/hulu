import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import AccessibilityStatement from '@/pages/AccessibilityStatement'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/accessibility" element={<AccessibilityStatement />} />
    </Routes>
  )
}
