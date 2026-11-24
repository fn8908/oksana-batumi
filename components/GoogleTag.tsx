'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { saveSource } from '@/lib/source'

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL
const TELEGRAM_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_TELEGRAM_LABEL
// Второй рекламный аккаунт (692-314-9148): заявки уходят в оба
const ADS_ID_2 = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID_2
const LEAD_LABEL_2 = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL_2
const TELEGRAM_LABEL_2 = process.env.NEXT_PUBLIC_GOOGLE_ADS_TELEGRAM_LABEL_2

type Gtag = (...args: unknown[]) => void

function conversion(id?: string, label?: string) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (gtag && id && label) gtag('event', 'conversion', { send_to: `${id}/${label}` })
}

export default function GoogleTag() {
  const pathname = usePathname()

  useEffect(saveSource, [])

  // Все формы сайта ведут на /thank-you - это и есть заявка
  useEffect(() => {
    if (pathname.endsWith('/thank-you')) {
      conversion(ADS_ID, LEAD_LABEL)
      conversion(ADS_ID_2, LEAD_LABEL_2)
    }
  }, [pathname])

  // Клик по любой ссылке на Telegram
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a')
      if (a?.href.includes('t.me/')) {
        conversion(ADS_ID, TELEGRAM_LABEL)
        conversion(ADS_ID_2, TELEGRAM_LABEL_2)
      }
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
          ${ADS_ID_2 ? `gtag('config', '${ADS_ID_2}');` : ''}
        `}
      </Script>
    </>
  )
}
