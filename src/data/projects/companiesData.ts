import moment from 'moment'

import type { TCompanyData } from '@/types/data/components/layout/types'

export const companiesData: TCompanyData[] = [
  {
    dates: {
      to: moment(new Date()).format('YYYY-MM-DD'),
      from: '2024-01-01',
    },
  },
  {
    key: 'ponthus',
    index: 1,
    name: 'ponthus (Maastricht, NL)',
    logo: {
      path: 'logos/',
      prefix: 'Logo',
      logo: {
        name: 'Ponthus',
      },
    },
    url: 'https://ponthus.nl/',
    dates: {
      to: '2023-11-31',
      from: '2022-03-01',
    },
  },
  {
    key: 'the_brink',
    index: 2,
    name: 'The Brink (Amsterdam, NL)',
    logo: {
      path: 'logos/',
      prefix: 'Logo',
      logo: {
        name: 'TheBrink',
      },
    },
    url: 'https://www.thebrinkagency.com/',
    dates: {
      to: '2022-02-28',
      from: '2021-03-17',
    },
  },
  {
    dates: {
      to: '2021-05-17',
      from: '2019-05-01',
    },
  },
]
