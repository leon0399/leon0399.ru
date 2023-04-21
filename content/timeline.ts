import { TimelineItem } from '../types/timeline'

export const timeline: TimelineItem[] = [
  {
    title: 'Senior Software Engineer at [Plesk](https://www.plesk.com/)',
    tags: ['Laravel', 'React.js', 'Golang'],
    duration: {
      start: 'November 2022',
      end: 'Present',
    },
    icon: 'heroicons-outline:briefcase',
    color: 'gray',
    homepage: true,
  },
  // {
  //   title: 'Living in Istanbul, Turkey',
  //   duration: {
  //     start: 'May 2022',
  //     end: 'Present',
  //   },
  //   icon: 'heroicons-outline:globe',
  //   color: 'green',
  //   homepage: true,
  // },
  {
    title: 'Developer at [Innoscripta GmbH](https://www.innoscripta.com/)',
    tags: ['Laravel', 'React.js'],
    description: `
* Built a microservice architecture (interaction map of microservices and services in Miro)
* Organized transitioin from the monolith into microservices (Laravel PHP => PHP, Node / TS, Golang)
* Implemented API Gateway and GraphQL (Amazon API Gateway & Apollo/Yoga GraphQL)
* Implemented asynchronous architecture (RabbitMQ)
* Advised microfrontends (Webpack Federation & React)
* Optimized and decomposed the database structure for more optimal and faster queries
* Introduced the practice of cross-review
* Organized an internal library of dependencies and packgages (Composer & NPM)`,
    duration: {
      start: 'October 2020',
      end: 'July 2022',
    },
    icon: 'heroicons-outline:briefcase',
    color: 'gray',
    homepage: true,
  },
  {
    title: 'Founder of [Devolt.One](https://devolt.one/?ref=leon0399.ru)',
    description: `Development studio making turnkey websites with custom-built CRM systems using Laravel and Vue.js/Nuxt.js.`,
    duration: {
      start: 'August 2018',
    },
    icon: 'heroicons-outline:fire',
    color: 'red',
  },
  {
    title: 'Outsource development for Russian Railways',
    tags: ['Laravel', 'Vue.js'],
    description: `[Marketplace](http://education.rzd.ru) to purchase and schedule corporate education from external training facilities for every Russian Railways department across the country`,
    duration: {
      start: 'August 2018',
      end: 'March 2019',
    },
    icon: 'heroicons-outline:briefcase',
    color: 'gray',
  },
  {
    title: 'Web Developer at [#VA](https://va-promotion.ru/)',
    tags: ['Laravel', 'WordPress'],
    description:
      'Turnkey websites Development on Wordpress and Laravel. Theme development, layout and integration.',
    duration: {
      start: 'October 2017',
      end: 'August 2018',
    },
    icon: 'heroicons-outline:briefcase',
    color: 'gray',
  },
  {
    title: 'First job as Developer at [AMSKA](https://amska.ru/)',
    duration: {
      start: 'November 2016',
      end: 'January 2017',
    },
    icon: 'heroicons-outline:briefcase',
    color: 'gray',
  },
  {
    title:
      'Informational Security at [Moscow Technological University](https://english.mirea.ru/)',
    duration: {
      start: '2016',
      end: '2020',
    },
    homepage: true,
    icon: 'heroicons-outline:academic-cap',
    color: 'blue',
  },
  {
    title: 'First [Open-Source project](https://github.com/leon0399/dadata)',
    duration: {
      start: 'June 2016',
    },
    icon: 'heroicons-outline:chip',
    color: 'yellow',
  },
  {
    title: 'Born at Moscow, Russia',
    duration: {
      start: '30th April 1999 ',
    },
    icon: 'heroicons-outline:cake',
    color: 'pink',
    homepage: true,
  },
]
