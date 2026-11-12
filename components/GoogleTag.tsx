'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL
const TELEGRAM_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_TELEGRAM_LABEL

type Gtag = (...args: unknown[]) => void

function conversion(label?: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (gtag && label) gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}` })
}

export default function GoogleTag() {
  const pathname = usePathname()

  // Все формы сайта ведут на /thank-you - это и есть заявка
  useEffect(() => {
    if (pathname.endsWith('/thank-you')) conversion(LEAD_LABEL)
  }, [pathname])

  // Клик по любой ссылке на Telegram
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a')
      if (a?.href.includes('t.me/')) conversion(TELEGRAM_LABEL)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (!ADS_ID) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ADS_ID}');
        `}
      </Script>
    </>
  )
}
