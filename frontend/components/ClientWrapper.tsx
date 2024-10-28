'use client'
import dynamic from 'next/dynamic'

const DynamicContent = dynamic(
  () => import('./DynamicContent'),
  { ssr: false }
)

export default function ClientWrapper() {
  return <DynamicContent />
}