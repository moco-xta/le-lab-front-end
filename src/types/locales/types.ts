import { locales } from '@/i18n/config'

export type TLocale = (typeof locales)[number]

export type TLocales = 'en' | 'es' | 'fr'
