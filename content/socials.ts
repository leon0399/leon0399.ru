import type { SocialAccount } from '../types/social-account'

export const primarySocials: SocialAccount[] = [
  {
    icon: 'heroicons-solid:mail',
    url: 'mailto:hello@leon0399.ru',
    label: 'Email',
    username: 'hello@leon0399.ru',
  },
  {
    icon: 'fa-brands:telegram',
    url: 'https://t.me/leon0399',
    label: 'Telegram',
    username: '@leon0399',
  },
  {
    icon: 'fa-brands:linkedin',
    url: 'https://www.linkedin.com/in/leonid-meleshin-9604111a9/',
    label: 'LinkedIn',
    username: '@leon0399',
  },
  {
    icon: 'fa-brands:github',
    url: 'https://github.com/leon0399',
    label: 'GitHub',
    username: '@leon0399',
  },
]

export const homeSocials: SocialAccount[] = [
  {
    icon: 'heroicons-solid:mail',
    url: 'mailto:hello@leon0399.ru',
    label: 'Email',
    username: 'hello@leon0399.ru',
  },
  {
    icon: 'fa-brands:telegram',
    url: 'https://t.me/leon0399',
    label: 'Telegram',
    username: '@leon0399',
  },
  {
    icon: 'fa-brands:instagram',
    url: 'https://instagram.com/leon0399',
    label: 'Instagram ',
    username: '@leon0399',
  },
  {
    icon: 'fa-brands:github',
    url: 'https://github.com/leon0399',
    label: 'GitHub',
    username: '@leon0399',
  },
  {
    icon: 'fa-brands:twitter',
    url: 'https://twitter.com/leon0399',
    label: 'Twitter',
    username: '@leon0399',
  },
  {
    icon: 'fa-brands:linkedin',
    url: 'https://www.linkedin.com/in/leonid-meleshin-9604111a9/',
    label: 'LinkedIn',
    username: '@leon0399',
  },
]

const allSocials = [
  ...homeSocials,
  {
    icon: 'fa-brands:gitlab',
    url: 'https://gitlab.com/leon0399',
    label: 'GitLab',
    username: '@leon0399',
  },
  {
    icon: 'fa-brands:ethereum',
    url: 'https://etherscan.io/address/0xd0428c1385c86461104272a7049ee79c561d326b',
    label: 'Ethereum',
    username: '0xd0428c1385...',
  },
  {
    icon: 'fa:h',
    url: 'https://hh.ru/resume/7e8d384bff084694aa0039ed1f486f50304f71',
    label: 'HeadHunter',
    username: 'Leonid Meleshin',
  },
  {
    icon: 'fa-brands:facebook',
    url: 'https://www.facebook.com/meleshin.l',
    label: 'Facebook',
    username: '@leon0399',
  },
  {
    icon: 'fa-brands:discord',
    url: 'https://discordapp.com/users/249980731676164096/',
    label: 'Discord',
    username: 'leon0399#4450',
  },
]

export default allSocials
