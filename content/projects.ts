import { Project } from "../types/project";

const projects: Project[] = [
  {
    slug: 'mini-degens',
    title: 'Mini DeGens',
    description: 'Collection of 10.000 generative AI Art NFT',
    category: 'Blockchain',
    tags: [
      'NFT',
      'AI',
    ],
    url: 'https://twitter.com/mini_degens',
    logo: '/images/projects/minidegens/logo.gif',

    pin: true,
  },
  {
    slug: 'thrace',
    title: 'Thrace',
    description: 'Comprehensive blockchain visual explorer and doxxing tool',
    category: 'Blockchain',
    tags: [
      'TypeScript',
      'React.js',
      'GraphQL',
    ],
    url: 'https://discord.gg/GQk8RPfEPG',
    logo: '/images/projects/thrace/logo.png',
  },
  {
    slug: 'php-open-source-saver',
    title: 'PHP OpenSource Saver',
    category: 'OpenSource',
    tags: [
      'PHP',
      'Laravel',
    ],
    url: 'https://github.com/PHP-Open-Source-Saver',
    logo: '/images/projects/php-open-source-saver/logo.png',
  },
  {
    slug: 'openhaptics',
    title: 'OpenHaptics',
    category: 'Virtual Reality',
    tags: [
      'C++',
      'Embedded',
    ],
    url: 'https://github.com/openhaptics',
  },
  {
    slug: 'cardyo',
    title: 'Cardyo',
    category: 'SaaS',
    tags: [
      'TypeScript',
      'Vue.js',
      'Laravel',
      'GraphQL',
    ],
    url: 'https://cardyo.ru/',
    logo: '/images/projects/cardyo/logo.png',

    display: false,
  },
]

export default projects
