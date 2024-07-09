import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'にんだおカレンダー',
  description: 'みんなの予定が一目で確認できるカレンダー',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}