import moment from 'moment'

import type { TLocationData } from '@/types/data/components/layout/types'

export const locationsData: TLocationData[] = [
  {
    city: 'paris',
    country: 'FR',
    gpsCoordinates: {
      latitude: 48.5,
      longitude: 2.35,
    },
    dates: {
      to: moment(new Date()).format('YYYY-MM-DD'),
      from: '2024-06-01',
    },
    flag: {
      path: 'flags/',
      prefix: 'Flag',
      flag: {
        name: 'France',
      },
    },
  },
  {
    city: 'maastricht',
    country: 'NL',
    gpsCoordinates: {
      latitude: 51.95,
      longitude: 5.73,
    },
    dates: {
      to: '2024-05-31',
      from: '2022-03-01',
    },
    flag: {
      path: 'flags/',
      prefix: 'Flag',
      flag: {
        name: 'TheNetherlands',
      },
    },
  },
  {
    city: 'amsterdam',
    country: 'NL',
    gpsCoordinates: {
      latitude: 52.37,
      longitude: 4.89,
    },
    dates: {
      to: '2022-02-28',
      from: '2021-05-17',
    },
    flag: {
      path: 'flags/',
      prefix: 'Flag',
      flag: {
        name: 'Amsterdam',
      },
    },
  },
  {
    city: 'london',
    country: 'UK',
    gpsCoordinates: {
      latitude: 51.5,
      longitude: -0.12,
    },
    dates: {
      to: '2021-05-16',
      from: '2020-05-14',
    },
    flag: {
      path: 'flags/',
      prefix: 'Flag',
      flag: {
        name: 'UnitedKingdom',
      },
    },
  },
  {
    city: 'medellín',
    country: 'COL',
    gpsCoordinates: {
      latitude: 6.25,
      longitude: -75.58,
    },
    dates: {
      to: '2020-05-13',
      from: '2019-08-12',
    },
    flag: {
      path: 'flags/',
      prefix: 'Flag',
      flag: {
        name: 'Colombia',
      },
    },
  },
  {
    city: 'genève',
    country: 'CH',
    gpsCoordinates: {
      latitude: 46.2,
      longitude: 6.14,
    },
    dates: {
      to: '2019-10-11',
      from: '2019-05-01',
    },
    flag: {
      path: 'flags/',
      prefix: 'Flag',
      flag: {
        name: 'Switzerland',
      },
    },
  },
]
