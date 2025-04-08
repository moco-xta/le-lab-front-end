import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

import ReduxProvider from '@/redux/ReduxProvider'

import Header from '@/components/layout/header'
import MenuButtonsContent from '@/components/layout/header/menu_buttons_content'
import LocaleSwitcherButtonContent from '@/components/layout/header/locale_switcher_button_content'

import '@/styles/globals.scss'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ReduxProvider>
          <NextIntlClientProvider>
            <Header />
            <MenuButtonsContent />
            <LocaleSwitcherButtonContent />
            {children}
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
