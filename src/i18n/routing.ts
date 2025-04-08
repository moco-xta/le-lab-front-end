import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

import { locales } from './config'

export const routing = defineRouting({
  locales: locales,
  defaultLocale: locales[0],
  localePrefix: 'always',
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
