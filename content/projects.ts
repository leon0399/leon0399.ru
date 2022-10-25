import { Project } from '../types/project'

const projects: Project[] = [
  {
    slug: 'mini-degens',
    title: 'Mini DeGens',
    description: 'Collection of 10.000 generative AI Art NFT',
    category: 'Web3',
    tags: ['TypeScript', 'React.js'],
    url: 'https://twitter.com/mini_degens',
    logo: '/images/projects/minidegens/logo.gif',
  },
  {
    slug: 'thrace',
    title: 'Thrace',
    description: 'Comprehensive blockchain visual explorer and doxxing tool',
    category: 'Web3',
    tags: ['TypeScript', 'React.js', 'GraphQL'],
    url: 'https://discord.gg/GQk8RPfEPG',
    isExternalUrl: true,
    logo: '/images/projects/thrace/logo.png',
  },
  {
    slug: 'php-open-source-saver',
    title: 'PHP OpenSource Saver',
    category: 'OpenSource',
    tags: ['PHP', 'Laravel'],
    url: 'https://github.com/PHP-Open-Source-Saver',
    isExternalUrl: true,
    logo: '/images/projects/php-open-source-saver/logo.png',
  },
  {
    slug: 'openhaptics',
    title: 'OpenHaptics',
    description: 'Wearable haptic-feedback devices firmware for VR',
    category: 'Virtual Reality',
    tags: ['C++', 'Embedded'],
    isExternalUrl: true,
    url: 'https://github.com/openhaptics',

    pin: true,
  },
  {
    slug: 'cardyo',
    title: 'Cardyo',
    category: 'SaaS',
    tags: ['TypeScript', 'Vue.js', 'Laravel', 'GraphQL'],
    url: 'https://cardyo.ru/',
    isExternalUrl: true,
    logo: '/images/projects/cardyo/logo.png',

    display: false,
  },
]

export default projects
